# Facebook Login Clone

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://your-live-demo-url.com)
[![GitHub license](https://img.shields.io/github/license/sadahamvishwanath/Facebook_Login)](https://github.com/sadahamvishwanath/Facebook_Login/blob/main/LICENSE)

A full-stack clone of the Facebook login and sign-up flow built with **HTML, CSS, JavaScript (frontend)** and **Python/Flask + SQLite (backend)**. This project is designed as a learning journey to master web development from the ground up.

---

## ✨ Features

- **User Registration** – Create a new account with a hashed password.
- **User Login** – Authenticate with email and password.
- **Session Management** – Persistent login using Flask sessions.
- **Responsive UI** – Works on desktop and mobile.
- **Error Handling** – Clear feedback for invalid credentials or duplicate emails.
- **Welcome Dashboard** – Personalized greeting after successful login.
- **Logout** – Cleanly end the session.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------------|--------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Backend** | Python 3, Flask, Flask‑CORS |
| **Database** | SQLite3 (lightweight, file‑based) |
| **Version Control** | Git & GitHub |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+ installed ([download](https://www.python.org/downloads/))
- Git installed ([download](https://git-scm.com/))
- A modern web browser (Chrome, Firefox, Edge)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sadahamvishwanath/Facebook_Login.git
   cd Facebook_Login
   ```

2. **Set up the backend**

   ```bash
   cd Backend
   pip install -r requirements.txt
   ```

3. **Run the Flask server**

   ```bash
   python app.py
   ```

   The server will start at `http://localhost:5000`.  
   You'll see: `✅ Database initialized!` and `* Running on http://127.0.0.1:5000`.

4. **Open the frontend**

   Open the `Frontend/login.html` file in your browser (or use a live server extension in VS Code).  
   The frontend communicates with the backend via `fetch` calls to `http://localhost:5000/api/...`.

5. **Create an account and log in**
   - Click **"Create new account"**.
   - Fill in your details and submit.
   - Return to the login page and sign in with the same credentials.
   - You'll be redirected to the welcome page.

---

## 📁 Project Structure

```
Facebook_Login/
├── Backend/
│   ├── app.py                # Flask application with all routes
│   ├── requirements.txt      # Python dependencies
│   └── database/
│       └── users.db          # SQLite database (auto‑created)
├── Frontend/
│   ├── login.html            # Login page
│   ├── register.html         # Registration page
│   ├── welcome.html          # Dashboard after login
│   ├── style.css             # Shared styles
│   └── script.js             # Frontend logic (fetch, DOM manipulation)
├── .gitignore                # Git ignore rules
├── README.md                 # This file
└── LICENSE                   # MIT License
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Create a new user account |
| POST | `/api/login` | Authenticate and log in a user |
| GET | `/api/user` | Get current logged‑in user info |
| POST | `/api/logout` | Log out the current user |

All endpoints return JSON responses.

---

## 🧪 Testing the API (without frontend)

You can test the endpoints using `curl` or tools like **Postman**:

**Register:**

```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"full_name":"John Doe","email":"john@example.com","password":"123456"}'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

---

## 🌐 Live Demo

**Note:** The live demo link above is a placeholder. Once you deploy the project to a cloud platform (e.g., Render, Heroku, or PythonAnywhere), update the badge URL and add the actual link here.

> The badge at the top links to `https://your-live-demo-url.com`. Once you deploy your project, replace that URL with your actual live site.

---

## 🗺️ Roadmap / Future Improvements

- Add **JWT authentication** for stateless sessions.
- Create a **news feed** with posts and comments.
- Implement **password reset** via email.
- Add **profile pictures** (file uploads).
- Deploy to a cloud service.
- Write **unit tests** for the backend.
- Use **environment variables** for configuration.

---

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are always welcome!  
Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- The [Flask](https://flask.palletsprojects.com/) documentation.
- [SQLite](https://www.sqlite.org/) for the lightweight database.
- The Facebook brand is used for educational purposes only – this project is not affiliated with Meta.

**Made with ❤️ by [Sadaham Vishwanath](https://github.com/sadahamvishwanath)**
