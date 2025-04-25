from flask import Blueprint, jsonify, render_template, request, session, redirect, url_for
import sqlite3
import os
import datetime
import uuid
from functools import wraps
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create a Blueprint for the admin routes
admin_bp = Blueprint('admin', __name__)

# Database setup
def get_db_connection():
    """Create a connection to the SQLite database"""
    # Use absolute path for cPanel environment
    base_dir = os.path.abspath(os.path.dirname(__file__))
    db_path = os.path.join(base_dir, 'instance', 'tracker.db')
    
    # Ensure directory exists
    if not os.path.exists(os.path.dirname(db_path)):
        os.makedirs(os.path.dirname(db_path))
    
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database with required tables."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create enquiries table with ticket number and expiration
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT,
        ticket_no TEXT UNIQUE,
        expires_at DATETIME,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create quotations table with ticket number and expiration
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS quotations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_no TEXT UNIQUE,
        company TEXT,
        name TEXT,
        email TEXT,
        phone TEXT,
        product TEXT,
        quantity TEXT,
        delivery TEXT,
        message TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        expires_at DATETIME
    )
    ''')
    
    # Create LOI submissions table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS loi_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT,
        rep_name TEXT,
        email TEXT,
        phone TEXT,
        product TEXT,
        quantity TEXT,
        submission_date DATETIME,
        loi_data TEXT
    )
    ''')
    
    # Create admin users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
    ''')
    
    # Insert a default admin user if none exists
    cursor.execute("SELECT COUNT(*) FROM admin_users")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO admin_users (username, password) VALUES (?, ?)", 
                      ("admin", "password123"))
    
    conn.commit()
    conn.close()

def update_enquiries_table():
    """Update the enquiries table to include ticket_no and expires_at columns."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if the table already has the required columns
    cursor.execute("PRAGMA table_info(enquiries)")
    columns = [column[1] for column in cursor.fetchall()]
    
    if 'ticket_no' not in columns or 'expires_at' not in columns:
        # Rename the old table
        cursor.execute("ALTER TABLE enquiries RENAME TO old_enquiries")
        
        # Create the new table with the updated schema
        cursor.execute('''
        CREATE TABLE enquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            message TEXT,
            ticket_no TEXT UNIQUE,
            expires_at DATETIME,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        # Copy data from the old table to the new table
        cursor.execute('''
        INSERT INTO enquiries (id, name, email, message, timestamp)
        SELECT id, name, email, message, timestamp FROM old_enquiries
        ''')
        
        # Drop the old table
        cursor.execute("DROP TABLE old_enquiries")
    
    conn.commit()
    conn.close()

def update_quotations_table():
    """Update the quotations table to include ticket_no and expires_at columns."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if the table already has the required columns
    cursor.execute("PRAGMA table_info(quotations)")
    columns = [column[1] for column in cursor.fetchall()]
    
    if 'ticket_no' not in columns or 'expires_at' not in columns:
        # Rename the old table
        cursor.execute("ALTER TABLE quotations RENAME TO old_quotations")
        
        # Create the new table with the updated schema
        cursor.execute('''
        CREATE TABLE quotations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticket_no TEXT UNIQUE,
            company TEXT,
            name TEXT,
            email TEXT,
            phone TEXT,
            product TEXT,
            quantity TEXT,
            delivery TEXT,
            message TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            expires_at DATETIME
        )
        ''')
        
        # Copy data from the old table to the new table
        cursor.execute('''
        INSERT INTO quotations (id, company, name, email, phone, product, quantity, delivery, message, timestamp)
        SELECT id, company, name, email, phone, product, quantity, delivery, message, timestamp FROM old_quotations
        ''')
        
        # Drop the old table
        cursor.execute("DROP TABLE old_quotations")
    
    conn.commit()
    conn.close()

# Function to record LOI submissions
def record_loi_submission(company_name, rep_name, email, phone, product, quantity, loi_data):
    """Record an LOI submission"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO loi_submissions 
            (company_name, rep_name, email, phone, product, quantity, submission_date, loi_data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (company_name, rep_name, email, phone, product, quantity, 
             datetime.datetime.now(), str(loi_data)))
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error recording LOI submission: {str(e)}")
        return False

# Function to record enquiries with ticket number and expiration
def record_enquiry(name, email, message):
    """Record a contact form submission with a ticket number and expiration date."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Generate a unique ticket number (format: ENQ-YYYYMMDD-XXXXX)
        date_prefix = datetime.datetime.now().strftime('%Y%m%d')
        ticket_no = f"ENQ-{date_prefix}-{str(uuid.uuid4())[:5].upper()}"
        
        # Set expiration date to 7 days from now
        expires_at = datetime.datetime.now() + datetime.timedelta(days=7)
        
        cursor.execute(
            "INSERT INTO enquiries (name, email, message, ticket_no, expires_at) VALUES (?, ?, ?, ?, ?)",
            (name, email, message, ticket_no, expires_at)
        )
        
        conn.commit()
        conn.close()
        return ticket_no
    except Exception as e:
        print(f"Error recording enquiry: {str(e)}")
        return None

# Function to record quotation requests
def record_quotation(company, name, email, phone, product, quantity, delivery, message):
    """Record a quotation request and return the ticket number (id)."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Set expiration date to 7 days from now
        expires_at = datetime.datetime.now() + datetime.timedelta(days=7)
        
        # Insert the quotation into the database
        cursor.execute(
            "INSERT INTO quotations (company, name, email, phone, product, quantity, delivery, message, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (company, name, email, phone, product, quantity, delivery, message, expires_at)
        )
        
        # Get the id of the newly inserted record
        ticket_no = cursor.lastrowid
        
        conn.commit()
        conn.close()
        return ticket_no
    except Exception as e:
        print(f"Error recording quotation: {str(e)}")
        return None

# Function to clean up expired quotations
def cleanup_expired_quotations():
    """Remove quotations that have expired"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        now = datetime.datetime.now()
        cursor.execute("DELETE FROM quotations WHERE expires_at < ?", (now,))
        
        deleted_count = cursor.rowcount
        conn.commit()
        conn.close()
        
        return deleted_count
    except Exception as e:
        print(f"Error cleaning up expired quotations: {str(e)}")
        return 0

# Login required decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'admin_logged_in' not in session or not session['admin_logged_in']:
            return redirect(url_for('admin.login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

# Admin routes
@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM admin_users WHERE username = ? AND password = ?", 
                      (username, password))
        user = cursor.fetchone()
        conn.close()
        
        if user:
            session['admin_logged_in'] = True
            session['admin_username'] = username
            return redirect(url_for('admin.dashboard'))
        else:
            error = 'Invalid credentials. Please try again.'
    
    return render_template('admin_login.html', error=error)

@admin_bp.route('/logout')
def logout():
    session.pop('admin_logged_in', None)
    session.pop('admin_username', None)
    return redirect(url_for('admin.login'))

@admin_bp.route('/dashboard')
@login_required
def dashboard():
    return render_template('admin_dashboard.html')

@admin_bp.route('/api/stats')
@login_required
def get_stats():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get total enquiries
    cursor.execute("SELECT COUNT(*) FROM enquiries")
    total_enquiries = cursor.fetchone()[0]
    
    # Get total quotations
    cursor.execute("SELECT COUNT(*) FROM quotations")
    total_quotations = cursor.fetchone()[0]
    
    # Get total LOI submissions
    cursor.execute("SELECT COUNT(*) FROM loi_submissions")
    total_lois = cursor.fetchone()[0]
    
    conn.close()
    
    return jsonify({
        'total_enquiries': total_enquiries,
        'total_quotations': total_quotations,
        'total_lois': total_lois
    })

# Add new route for LOI submissions
@admin_bp.route('/api/loi-submissions')
@login_required
def get_loi_submissions():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM loi_submissions ORDER BY submission_date DESC LIMIT 50")
    submissions = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return jsonify(submissions)

# Routes to view detailed data
@admin_bp.route('/api/enquiries', methods=['GET'])
def get_enquiries():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Fetch all enquiries
        cursor.execute("SELECT * FROM enquiries ORDER BY timestamp DESC")
        enquiries = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        return jsonify(enquiries), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/api/quotations', methods=['GET'])
def get_quotations():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Fetch all quotations
        cursor.execute("SELECT id AS ticket_no, company, name, email, phone, product, quantity, delivery, message, timestamp, expires_at FROM quotations ORDER BY timestamp DESC")
        quotations = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        return jsonify(quotations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/api/quotations')
@login_required
def get_quotations_admin():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Clean up expired quotations first
    cleanup_expired_quotations()
    
    # Get active quotations
    cursor.execute("SELECT * FROM quotations ORDER BY timestamp DESC LIMIT 50")
    quotations = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return jsonify(quotations)

@admin_bp.route('/api/quotations/search/<int:ticket_no>', methods=['GET'])
@login_required
def search_quotation(ticket_no):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Fetch the quotation by ticket_no
        cursor.execute("SELECT id AS ticket_no, company, name, email, phone, product, quantity, delivery, message, timestamp, expires_at FROM quotations WHERE id = ?", (ticket_no,))
        quotation = cursor.fetchone()
        
        conn.close()
        
        if quotation:
            return jsonify(dict(quotation)), 200
        else:
            return jsonify({"error": "Quotation not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Email configuration
def send_email(to_email, subject, html_content):
    """Send an email using SMTP with HTML content"""
    try:
        smtp_server = os.getenv('SMTP_SERVER')
        smtp_port = int(os.getenv('SMTP_PORT', 587))
        smtp_username = os.getenv('SMTP_USERNAME')
        smtp_password = os.getenv('SMTP_PASSWORD')
        from_email = os.getenv('FROM_EMAIL')
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Attach HTML content
        msg.attach(MIMEText(html_content, 'html'))
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.send_message(msg)
        
        print("✅ Email sent successfully!")
        return True
    except Exception as e:
        print(f"❌ Error sending email: {str(e)}")
        return False