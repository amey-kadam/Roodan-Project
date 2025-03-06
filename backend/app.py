from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Email configuration - store these in a .env file in production
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER", "your-email@gmail.com")  # Your sender email
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your-app-password")  # Use app password for Gmail
RECIPIENT_EMAIL = "amey.p.kadam@gmail.com"

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        # Get form data from request
        data = request.json
        name = data.get('name', '')
        email = data.get('email', '')
        message = data.get('message', '')
        
        # Validate input
        if not all([name, email, message]):
            return jsonify({"success": False, "message": "All fields are required"}), 400
        
        # Create email content
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = f"New Contact Form Submission from {name}"
        
        # Email body
        body = f"""
        You have received a new contact form submission:
        
        Name: {name}
        Email: {email}
        
        Message:
        {message}
        """
        
        # Attach message to email
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to SMTP server and send email
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()  # Secure the connection
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)
        
        return jsonify({"success": True, "message": "Your message has been sent successfully!"}), 200
    
    except Exception as e:
        # Log the error (you would use a proper logging system in production)
        print(f"Error sending email: {str(e)}")
        return jsonify({"success": False, "message": "Failed to send message. Please try again later."}), 500

@app.route('/api/inquiry', methods=['POST'])
def inquiry():
    try:
        # Get form data from request
        data = request.json
        company = data.get('company', '')
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        product = data.get('product', '')
        quantity = data.get('quantity', '')
        delivery = data.get('delivery', '')
        message = data.get('message', '')
        
        # Validate required input
        if not all([company, name, email, phone, product, quantity, delivery]):
            return jsonify({"success": False, "message": "Please fill all required fields"}), 400
        
        # Create email content
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = f"New Product Inquiry from {company}"
        
        # Email body
        body = f"""
        You have received a new product inquiry:
        
        Company: {company}
        Contact Person: {name}
        Email: {email}
        Phone: {phone}
        
        Product: {product}
        Quantity: {quantity}
        Delivery Terms: {delivery}
        
        Additional Message:
        {message}
        """
        
        # Attach message to email
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to SMTP server and send email
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()  # Secure the connection
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)
        
        return jsonify({"success": True, "message": "Your inquiry has been submitted successfully!"}), 200
    
    except Exception as e:
        # Log the error (you would use a proper logging system in production)
        print(f"Error sending inquiry email: {str(e)}")
        return jsonify({"success": False, "message": "Failed to submit inquiry. Please try again later."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)