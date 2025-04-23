from flask import Flask, request, jsonify, render_template, session, redirect, url_for, send_from_directory
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from admin import record_loi_submission, record_enquiry, record_quotation, admin_bp, send_email, init_db

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure CORS to allow requests from the frontend
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:8080", "http://127.0.0.1:8080", "http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Accept", "Authorization", "X-Requested-With", "Cache-Control", "Pragma", "Origin"],
        "expose_headers": ["Content-Type", "Accept", "Authorization"],
        "supports_credentials": True,
        "max_age": 3600
    }
})

# Configure Flask app
app.secret_key = os.getenv("SECRET_KEY", "your-secret-key-for-sessions")
app.config['SESSION_TYPE'] = 'filesystem'

# Register the admin blueprint with the correct URL prefix
app.register_blueprint(admin_bp, url_prefix='/admin')

# Initialize the database
with app.app_context():
    init_db()

# Email configuration
EMAIL_HOST = os.getenv("EMAIL_HOST", "mail.roodan.ae")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "465"))
EMAIL_USER = os.getenv("EMAIL_USER", "info@roodan.ae")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your-email-password")
RECIPIENT_EMAIL = "info@roodan.ae"

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

@app.route('/')
def index():
    return render_template('admin_login.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not all([name, email, message]):
            return jsonify({"error": "Missing required fields"}), 400

        # Record the enquiry
        if not record_enquiry(name, email, message):
            return jsonify({"error": "Failed to record enquiry"}), 500

        # Create HTML email with tables for better organization
        subject = "New Contact Form Submission"
        
        # Create HTML content with tables
        html_content = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                table {{ border-collapse: collapse; width: 100%; margin-bottom: 20px; }}
                th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
                th {{ background-color: #f2f2f2; }}
                h2 {{ color: #333; }}
            </style>
        </head>
        <body>
            <h1>New Contact Form Submission</h1>
            
            <h2>Contact Information</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{email}</td>
                </tr>
            </table>
            
            <h2>Message</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Message</td>
                    <td>{message}</td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        # Create plain text version for email clients that don't support HTML
        plain_text = f"""
        New contact form submission received:
        
        Name: {name}
        Email: {email}
        Message: {message}
        """
        
        # Send HTML email
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = EMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Reply-To'] = email
        
        # Attach both plain text and HTML versions
        msg.attach(MIMEText(plain_text, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))
        
        # Send the email
        try:
            with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT) as server:
                server.login(EMAIL_USER, EMAIL_PASSWORD)
                server.send_message(msg)
            print("Email sent successfully")
        except Exception as e:
            print(f"Failed to send email: {str(e)}")
            # Continue anyway, as the submission was recorded

        return jsonify({"message": "Message sent successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/quote-request', methods=['POST'])
def quote_request():
    try:
        data = request.get_json()
        company = data.get('company')
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        product = data.get('product')
        quantity = data.get('quantity')
        delivery = data.get('delivery')
        message = data.get('message')

        if not all([company, name, email, phone, product, quantity, delivery]):
            return jsonify({"error": "Missing required fields"}), 400

        # Record the quotation request and get ticket number
        ticket_no = record_quotation(company, name, email, phone, product, quantity, delivery, message)
        if not ticket_no:
            return jsonify({"error": "Failed to record quotation request"}), 500

        # Create HTML email with tables for better organization
        subject = f"New Quote Request - Ticket #{ticket_no}"
        
        # Create HTML content with tables
        html_content = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                table {{ border-collapse: collapse; width: 100%; margin-bottom: 20px; }}
                th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
                th {{ background-color: #f2f2f2; }}
                h2 {{ color: #333; }}
            </style>
        </head>
        <body>
            <h1>New Quote Request Received</h1>
            <p><strong>Ticket Number:</strong> {ticket_no}</p>
            
            <h2>Company Information</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Company Name</td>
                    <td>{company}</td>
                </tr>
            </table>
            
            <h2>Contact Information</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Contact Name</td>
                    <td>{name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{email}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>{phone}</td>
                </tr>
            </table>
            
            <h2>Product Information</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Product</td>
                    <td>{product}</td>
                </tr>
                <tr>
                    <td>Quantity</td>
                    <td>{quantity}</td>
                </tr>
                <tr>
                    <td>Delivery</td>
                    <td>{delivery}</td>
                </tr>
            </table>
            
            <h2>Additional Information</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Message</td>
                    <td>{message or 'N/A'}</td>
                </tr>
            </table>
            
            <p><em>Note: This quotation request will expire in 4 days.</em></p>
        </body>
        </html>
        """
        
        # Create plain text version for email clients that don't support HTML
        plain_text = f"""
        New quote request received:
        
        Ticket Number: {ticket_no}
        Company: {company}
        Name: {name}
        Email: {email}
        Phone: {phone}
        Product: {product}
        Quantity: {quantity}
        Delivery: {delivery}
        Message: {message}
        
        Note: This quotation request will expire in 4 days.
        """
        
        # Send HTML email
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = EMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Reply-To'] = email
        
        # Attach both plain text and HTML versions
        msg.attach(MIMEText(plain_text, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))
        
        # Send the email
        try:
            with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT) as server:
                server.login(EMAIL_USER, EMAIL_PASSWORD)
                server.send_message(msg)
            print("Email sent successfully")
        except Exception as e:
            print(f"Failed to send email: {str(e)}")
            # Continue anyway, as the submission was recorded

        return jsonify({
            "message": "Quote request submitted successfully",
            "ticket_no": ticket_no
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/loi-submission', methods=['POST', 'OPTIONS'])
def loi_submission():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return '', 204
        
    try:
        # Log request details for debugging
        print(f"Received LOI submission request from {request.remote_addr}")
        print(f"Request headers: {dict(request.headers)}")
        
        data = request.get_json()
        if not data:
            print("No JSON data received in request")
            return jsonify({"error": "No data provided"}), 400
            
        # Extract required fields
        company_name = data.get('companyName')
        rep_name = data.get('representativeName')
        email = data.get('email')
        phone = data.get('phone')
        product = data.get('productName')
        quantity = data.get('quantity')
        
        # Create a dictionary of LOI data for storage
        loi_data = {
            'issuedDate': data.get('issuedDate'),
            'validUntil': data.get('validUntil'),
            'origin': data.get('origin'),
            'shipments': data.get('shipments'),
            'frequencyOfDelivery': data.get('frequencyOfDelivery'),
            'contractLength': data.get('contractLength'),
            'totalContractAmount': data.get('totalContractAmount'),
            'incoterms': data.get('incoterms'),
            'deliveryPort': data.get('deliveryPort'),
            'targetPrice': data.get('targetPrice'),
            'paymentTerms': data.get('paymentTerms'),
            'inspection': data.get('inspection'),
            'observations': data.get('observations'),
            'specifications': data.get('specifications'),
            'companyRegistrationNumber': data.get('companyRegistrationNumber'),
            'address': data.get('address'),
            'title': data.get('title'),
            'website': data.get('website'),
            'bankName': data.get('bankName'),
            'bankSwiftCode': data.get('bankSwiftCode'),
            'bankAddress': data.get('bankAddress'),
            'accountName': data.get('accountName'),
            'accountNumber': data.get('accountNumber'),
            'bankOfficerName': data.get('bankOfficerName'),
            'bankOfficerTitle': data.get('bankOfficerTitle'),
            'bankPhone': data.get('bankPhone')
        }

        # Check for required fields
        missing_fields = []
        if not company_name:
            missing_fields.append('companyName')
        if not rep_name:
            missing_fields.append('representativeName')
        if not email:
            missing_fields.append('email')
        if not phone:
            missing_fields.append('phone')
        if not product:
            missing_fields.append('productName')
        if not quantity:
            missing_fields.append('quantity')

        if missing_fields:
            error_msg = f"Missing required fields: {', '.join(missing_fields)}"
            print(f"Validation error: {error_msg}")
            return jsonify({"error": error_msg}), 400

        # Record the LOI submission
        success = record_loi_submission(company_name, rep_name, email, phone, product, quantity, loi_data)
        if not success:
            print("Failed to record LOI submission in database")
            return jsonify({"error": "Failed to record LOI submission"}), 500

        # Create HTML email with tables for better organization
        subject = "New LOI Submission"
        
        # Create HTML content with tables
        html_content = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                table {{ border-collapse: collapse; width: 100%; margin-bottom: 20px; }}
                th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
                th {{ background-color: #f2f2f2; }}
                h2 {{ color: #333; }}
            </style>
        </head>
        <body>
            <h1>New LOI Submission Received</h1>
            
            <h2>Company Information</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Company Name</td>
                    <td>{company_name}</td>
                </tr>
                <tr>
                    <td>Company Registration Number</td>
                    <td>{loi_data.get('companyRegistrationNumber', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{loi_data.get('address', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Website</td>
                    <td>{loi_data.get('website', 'N/A')}</td>
                </tr>
            </table>
            
            <h2>Representative Information</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Representative Name</td>
                    <td>{rep_name}</td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>{loi_data.get('title', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{email}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>{phone}</td>
                </tr>
            </table>
            
            <h2>Product Information</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Product</td>
                    <td>{product}</td>
                </tr>
                <tr>
                    <td>Quantity</td>
                    <td>{quantity}</td>
                </tr>
                <tr>
                    <td>Origin</td>
                    <td>{loi_data.get('origin', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Shipments</td>
                    <td>{loi_data.get('shipments', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Frequency of Delivery</td>
                    <td>{loi_data.get('frequencyOfDelivery', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Contract Length</td>
                    <td>{loi_data.get('contractLength', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Total Contract Amount</td>
                    <td>{loi_data.get('totalContractAmount', 'N/A')}</td>
                </tr>
            </table>
            
            <h2>LOI Details</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Issued Date</td>
                    <td>{loi_data.get('issuedDate', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Valid Until</td>
                    <td>{loi_data.get('validUntil', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Incoterms</td>
                    <td>{loi_data.get('incoterms', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Delivery Port</td>
                    <td>{loi_data.get('deliveryPort', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Target Price</td>
                    <td>{loi_data.get('targetPrice', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Payment Terms</td>
                    <td>{loi_data.get('paymentTerms', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Inspection</td>
                    <td>{loi_data.get('inspection', 'N/A')}</td>
                </tr>
            </table>
            
            <h2>Bank Information</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Bank Name</td>
                    <td>{loi_data.get('bankName', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Bank SWIFT Code</td>
                    <td>{loi_data.get('bankSwiftCode', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Bank Address</td>
                    <td>{loi_data.get('bankAddress', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Account Name</td>
                    <td>{loi_data.get('accountName', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Account Number</td>
                    <td>{loi_data.get('accountNumber', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Bank Officer Name</td>
                    <td>{loi_data.get('bankOfficerName', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Bank Officer Title</td>
                    <td>{loi_data.get('bankOfficerTitle', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Bank Phone</td>
                    <td>{loi_data.get('bankPhone', 'N/A')}</td>
                </tr>
            </table>
            
            <h2>Additional Information</h2>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Observations</td>
                    <td>{loi_data.get('observations', 'N/A')}</td>
                </tr>
                <tr>
                    <td>Specifications</td>
                    <td>{loi_data.get('specifications', 'N/A')}</td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        # Create plain text version for email clients that don't support HTML
        plain_text = f"""
        New LOI submission received:
        
        Company: {company_name}
        Representative: {rep_name}
        Email: {email}
        Phone: {phone}
        Product: {product}
        Quantity: {quantity}
        
        LOI Details:
        Issued Date: {loi_data.get('issuedDate')}
        Valid Until: {loi_data.get('validUntil')}
        Origin: {loi_data.get('origin')}
        Delivery Port: {loi_data.get('deliveryPort')}
        Target Price: {loi_data.get('targetPrice')}
        Incoterms: {loi_data.get('incoterms')}
        Inspection: {loi_data.get('inspection')}
        
        Additional Information:
        Observations: {loi_data.get('observations')}
        Specifications: {loi_data.get('specifications')}
        """
        
        # Send HTML email
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = EMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Reply-To'] = email
        
        # Attach both plain text and HTML versions
        msg.attach(MIMEText(plain_text, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))
        
        # Send the email
        try:
            with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT) as server:
                server.login(EMAIL_USER, EMAIL_PASSWORD)
                server.send_message(msg)
            print("Email sent successfully")
        except Exception as e:
            print(f"Failed to send email: {str(e)}")
            # Continue anyway, as the submission was recorded
        
        print("LOI submission processed successfully")
        return jsonify({"message": "LOI submitted successfully"}), 200
        
    except Exception as e:
        print(f"Error in LOI submission: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# Admin redirect
@app.route('/admin', methods=['GET'])
def admin_redirect():
    return redirect(url_for('admin.login'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
