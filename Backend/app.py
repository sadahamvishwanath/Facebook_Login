from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3
import hashlib
import os

# ---------- APP SETUP ----------
app = Flask(__name__)
app.secret_key = "your-secret-key-here"  # CHANGE THIS in production!
CORS(app)  # Allows frontend to talk to backend

# ---------- CREATE DATABASE FOLDER IF MISSING ----------
os.makedirs('database', exist_ok=True)

# ---------- DATABASE HELPER ----------
def get_db():
    """Connect to SQLite database"""
    conn = sqlite3.connect('database/users.db')
    conn.row_factory = sqlite3.Row  # Access columns by name
    return conn

def init_db():
    """Create the users table if it doesn't exist"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()
    print("✅ Database initialized!")

# ---------- ROUTES ----------

@app.route('/api/register', methods=['POST'])
def register():
    """Create a new user account"""
    data = request.get_json()
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')

    # Basic validation
    if not full_name or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    # Hash the password (never store plain text!)
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)',
            (full_name, email, hashed_password)
        )
        conn.commit()
        conn.close()
        return jsonify({'message': 'User registered successfully!'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 400

@app.route('/api/login', methods=['POST'])
def login():
    """Authenticate a user"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        (email, hashed_password)
    )
    user = cursor.fetchone()
    conn.close()

    if user:
        # Store user info in session (optional)
        session['user_id'] = user['id']
        session['user_name'] = user['full_name']
        return jsonify({
            'success': True,
            'user': {
                'id': user['id'],
                'name': user['full_name'],
                'email': user['email']
            }
        }), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/api/user', methods=['GET'])
def get_user():
    """Get current logged-in user (for welcome page)"""
    if 'user_id' in session:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE id = ?', (session['user_id'],))
        user = cursor.fetchone()
        conn.close()
        if user:
            return jsonify({
                'id': user['id'],
                'name': user['full_name'],
                'email': user['email']
            })
    return jsonify({'error': 'Not logged in'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    """Log out the user"""
    session.clear()
    return jsonify({'message': 'Logged out'}), 200

# ---------- RUN THE SERVER ----------
if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)