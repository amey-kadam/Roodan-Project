import mysql.connector
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get MySQL connection parameters from environment variables
mysql_host = os.getenv('MYSQL_HOST')
mysql_user = os.getenv('MYSQL_USER')
mysql_password = os.getenv('MYSQL_PASSWORD')
mysql_db = os.getenv('MYSQL_DB')

print(f"Attempting to connect to MySQL database...")
print(f"Host: {mysql_host}")
print(f"User: {mysql_user}")
print(f"Database: {mysql_db}")

try:
    # Establish connection
    connection = mysql.connector.connect(
        host=mysql_host,
        user=mysql_user,
        password=mysql_password,
        database=mysql_db
    )
    
    if connection.is_connected():
        db_info = connection.get_server_info()
        print(f"✅ Success! Connected to MySQL Server version {db_info}")
        
        cursor = connection.cursor()
        cursor.execute("SELECT DATABASE();")
        database_name = cursor.fetchone()[0]
        print(f"✅ Active database: {database_name}")
        
        # Try creating a test table
        print("Attempting to create a test table...")
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS test_connection (
            id INT AUTO_INCREMENT PRIMARY KEY,
            test_column VARCHAR(255)
        )
        ''')
        print("✅ Test table created or already exists!")
        
        # Try inserting a test record
        print("Inserting test data...")
        cursor.execute('''
        INSERT INTO test_connection (test_column) VALUES ('Connection test successful')
        ''')
        connection.commit()
        print(f"✅ Test record inserted! Rows affected: {cursor.rowcount}")
        
        # Verify the insert worked
        cursor.execute("SELECT * FROM test_connection")
        rows = cursor.fetchall()
        print(f"✅ Data in test table: {rows}")
        
except mysql.connector.Error as error:
    print(f"❌ Error connecting to MySQL: {error}")
    
finally:
    if 'connection' in locals() and connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")