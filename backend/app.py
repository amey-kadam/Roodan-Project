from flask import Flask, request, jsonify, render_template, session, redirect, url_for
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from admin import record_loi_submission

# Import admin module
from admin import admin_bp, init_db, track_visit, record_enquiry, record_quotation

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Flask app
app.secret_key = os.getenv("SECRET_KEY", "your-secret-key-for-sessions")
app.config['SESSION_TYPE'] = 'filesystem'

# Register the admin blueprint
app.register_blueprint(admin_bp, url_prefix='/admin')

# Initialize the database
init_db()

# Email configuration
EMAIL_HOST = os.getenv("EMAIL_HOST", "mail.roodan.ae")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "465"))
EMAIL_USER = os.getenv("EMAIL_USER", "info@roodan.ae")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your-email-password")
RECIPIENT_EMAIL = "info@roodan.ae"

# Track visit for all routes
@app.before_request
def before_request():
    if not request.path.startswith('/static') and not request.path.startswith('/admin/api'):
        track_visit(request.path)

# Function to Send Emails
def send_email(sender_email, subject, body):
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER  # Must use your verified sender email for SMTP
        msg['To'] = RECIPIENT_EMAIL
        msg['Reply-To'] = sender_email  # Sets user's email for reply
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Connect to SMTP server with SSL for security
        with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT) as server:
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)

        print("✅ Email sent successfully!")
        return True
    except Exception as e:
        print(f"❌ Error sending email: {str(e)}")
        return False

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.json
        name = data.get('name', '')
        email = data.get('email', '')
        message = data.get('message', '')

        if not all([name, email, message]):
            return jsonify({"success": False, "message": "All fields are required"}), 400

        subject = f"New Contact Form Submission from {name}"
        body = f"""
        You have received a new contact form submission:

        Name: {name}
        Email: {email}

        Message:
        {message}
        """

        if send_email(email, subject, body):
            record_enquiry(name, email, message)
            return jsonify({"success": True, "message": "Your message has been sent successfully!"}), 200
        else:
            return jsonify({"success": False, "message": "Failed to send message. Please try again later."}), 500

    except Exception as e:
        print(f"Error in contact endpoint: {str(e)}")
        return jsonify({"success": False, "message": "An error occurred."}), 500

@app.route('/api/loi-submission', methods=['POST'])
def loi_submission():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = [
            'issuedDate', 'validUntil', 'productName', 'quantity',
            'origin', 'deliveryPort', 'targetPrice', 'companyName',
            'companyRegistrationNumber', 'representativeName', 'email', 'phone'
        ]
        
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return jsonify({
                "success": False,
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }), 400

        # Build email content
        subject = f"New LOI Submission from {data['companyName']}"
        body = f"""
        LETTER OF INTENT DETAILS:
        Issued Date: {data['issuedDate']}
        Valid Until: {data['validUntil']}

        PRODUCT DETAILS:
        Product Name: {data['productName']}
        Quantity: {data['quantity']}
        Origin: {data['origin']}
        Delivery Port: {data['deliveryPort']}
        Target Price: {data['targetPrice']}
        Incoterms: {data['incoterms']}
        Total Contract Amount: {data['totalContractAmount']}

        BUYER INFORMATION:
        Company: {data['companyName']}
        Registration Number: {data['companyRegistrationNumber']}
        Address: {data['address']}
        Representative: {data['representativeName']} ({data['title']})
        Phone: {data['phone']}
        Email: {data['email']}
        Website: {data['website']}

        BANK DETAILS:
        Bank Name: {data['bankName']}
        SWIFT Code: {data['bankSwiftCode']}
        Account Name: {data['accountName']}
        Account Number: {data['accountNumber']}

        ADDITIONAL DETAILS:
        Observations: {data['observations']}
        Specifications: {data['specifications']}
        """

        # Send email
        if send_email(data['email'], subject, body):
            # Record full submission in database
            record_loi_submission(
                company_name=data['companyName'],
                rep_name=data['representativeName'],
                email=data['email'],
                phone=data['phone'],
                product=data['productName'],
                quantity=data['quantity'],
                loi_data=data  # Pass entire data object
            )
            return jsonify({
                "success": True,
                "message": "LOI submitted successfully!"
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "Failed to submit LOI. Please try again later."
            }), 500

    except Exception as e:
        print(f"LOI submission error: {str(e)}")
        return jsonify({
            "success": False,
            "message": "An error occurred while processing your LOI."
        }), 500

# Admin redirect
@app.route('/admin', methods=['GET'])
def admin_redirect():
    return redirect(url_for('admin.login'))

# Default route for testing
@app.route('/')
def index():
    return "General Trading Company API is running. Access the admin dashboard at /admin"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
