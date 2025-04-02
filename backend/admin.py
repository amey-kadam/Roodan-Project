from flask import Blueprint, jsonify, render_template, request, session, redirect, url_for
import sqlite3
import os
import datetime
from functools import wraps

# Create a Blueprint for the admin routes
admin_bp = Blueprint('admin', __name__)

# Database setup
def get_db_connection():
    """Create a connection to the SQLite database"""
    if not os.path.exists('instance'):
        os.makedirs('instance')
    conn = sqlite3.connect('instance/tracker.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database with required tables"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create visits table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_address TEXT,
        user_agent TEXT,
        path TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create enquiries table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create quotations table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS quotations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company TEXT,
        name TEXT,
        email TEXT,
        phone TEXT,
        product TEXT,
        quantity TEXT,
        delivery TEXT,
        message TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
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
        # Default credentials: admin/password123 (you should change this in production)
        cursor.execute("INSERT INTO admin_users (username, password) VALUES (?, ?)", 
                      ("admin", "password123"))
    
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
    

# Function to track page visits
def track_visit(path):
    """Track a page visit"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        ip_address = request.remote_addr
        user_agent = request.headers.get('User-Agent', '')
        
        cursor.execute(
            "INSERT INTO visits (ip_address, user_agent, path) VALUES (?, ?, ?)",
            (ip_address, user_agent, path)
        )
        
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error tracking visit: {str(e)}")

# Function to record enquiries
def record_enquiry(name, email, message):
    """Record a contact form submission"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "INSERT INTO enquiries (name, email, message) VALUES (?, ?, ?)",
            (name, email, message)
        )
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error recording enquiry: {str(e)}")
        return False

# Function to record quotation requests
def record_quotation(company, name, email, phone, product, quantity, delivery, message):
    """Record a quotation request"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "INSERT INTO quotations (company, name, email, phone, product, quantity, delivery, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (company, name, email, phone, product, quantity, delivery, message)
        )
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error recording quotation: {str(e)}")
        return False

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
    
    # Get total visits
    cursor.execute("SELECT COUNT(*) FROM visits")
    total_visits = cursor.fetchone()[0]
    
    # Get total enquiries
    cursor.execute("SELECT COUNT(*) FROM enquiries")
    total_enquiries = cursor.fetchone()[0]
    
    # Get total quotations
    cursor.execute("SELECT COUNT(*) FROM quotations")
    total_quotations = cursor.fetchone()[0]
    
    # Get total LOI submissions
    cursor.execute("SELECT COUNT(*) FROM loi_submissions")
    total_lois = cursor.fetchone()[0]
    
    # Get recent visits (last 30 days)
    thirty_days_ago = (datetime.datetime.now() - datetime.timedelta(days=30)).strftime('%Y-%m-%d')
    cursor.execute(f"SELECT COUNT(*) FROM visits WHERE date(timestamp) >= '{thirty_days_ago}'")
    recent_visits = cursor.fetchone()[0]
    
    # Get daily visits for the past 7 days
    visits_by_day = []
    for i in range(6, -1, -1):
        date = (datetime.datetime.now() - datetime.timedelta(days=i)).strftime('%Y-%m-%d')
        next_date = (datetime.datetime.now() - datetime.timedelta(days=i-1)).strftime('%Y-%m-%d')
        cursor.execute(f"SELECT COUNT(*) FROM visits WHERE date(timestamp) >= '{date}' AND date(timestamp) < '{next_date}'")
        count = cursor.fetchone()[0]
        visits_by_day.append({
            'date': date,
            'count': count
        })
    
    conn.close()
    
    return jsonify({
        'total_visits': total_visits,
        'recent_visits': recent_visits,
        'total_enquiries': total_enquiries,
        'total_quotations': total_quotations,
        'total_lois': total_lois,
        'visits_by_day': visits_by_day
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
@admin_bp.route('/api/enquiries')
@login_required
def get_enquiries():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM enquiries ORDER BY timestamp DESC LIMIT 50")
    enquiries = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return jsonify(enquiries)

@admin_bp.route('/api/quotations')
@login_required
def get_quotations():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM quotations ORDER BY timestamp DESC LIMIT 50")
    quotations = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return jsonify(quotations)