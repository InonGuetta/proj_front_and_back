## Anonymous Complaints Box (Soldiers Base)

Full-stack Node.js + Express app serving static HTML for anonymous complaint submission, saving to MongoDB, and an admin-only view protected by a password.

## ✨ Features
- Static HTML pages served by Express (no frontend framework)
- Anonymous complaint submission form (category + message)
- MongoDB persistence via Mongoose (with createdAt timestamp)
- Admin-only listing of all complaints (password from .env)
- Works fully from http://localhost:3000 (no Live Server needed)

## 🧱 Project Structure

```
proj_front_and_back/
├─ client/                    # Static client assets served by Express
│  ├─ index.html              # Home page (goal, links, admin form)
│  ├─ complaints.html         # Complaint form page
│  └─ css/
│     ├─ style.index.css
│     └─ style.complaints.css
│
├─ server/
│  ├─ server.js               # Express bootstrap, static serving, DB connect
│  ├─ routes/
│  │  └─ complaints.js        # Routes: '/', '/submit-complaint', '/admin-to-show-all'
│  ├─ db/
│  │  └─ connect.js           # connectDB(uri) using Mongoose
│  ├─ models/
│  │  └─ complaint.model.js   # Mongoose schema (category, message, createdAt)
│  ├─ middlewares/
│  │  └─ validateComplaint.js # Validates required fields from form/API
│  └─ tests/
│     └─ complaints.test.js   # (placeholder; add tests here)
│
├─ .env                        # PASSWORD_ADMIN, MONGODB_URI, PORT
├─ package.json                # Scripts and dependencies
└─ README.md                   # This file
```

## 🧰 Tech Stack
- Node.js + Express (ES Modules)
- Mongoose (MongoDB)
- Static HTML + CSS
- dotenv for configuration

## ⚙️ Setup
1) Install dependencies
	 - npm install

2) Create .env in the project root with:
	 - PASSWORD_ADMIN=your_admin_password
	 - MONGODB_URI=your_mongodb_connection_string
	 - PORT=3000

3) Start the server
	 - npm start

4) Open in your browser
	 - http://localhost:3000/

Important: Do not use "Open with Live Server" (127.0.0.1:5500). The app is served by Express on port 3000 (including the form POST endpoints).

## 🔌 Server entry (server/server.js)
- Loads .env and configures Express
- Body parsers for HTML forms and JSON:
	- express.urlencoded({ extended: true })
	- express.json()
- Serves the static client folder:
	- express.static(path.join(__dirname, '..', 'client'))
- Mounts routes from server/routes/complaints.js at '/'
- Connects to MongoDB via connectDB(process.env.MONGODB_URI) and starts listening on PORT (default 3000)

## 🗄️ Database (server/db/connect.js)
- Mongoose connection helper:
	- Skips connect if already connected (readyState >= 1)
	- Sets strictQuery
	- Connects using the provided URI and dbName: 'soldiers_complaints_db'

## 🧩 Data Model (server/models/complaint.model.js)
- complaintSchema fields:
	- category: String (enum: 'אוכל', 'ציוד', 'פקודות', 'אחר'), required
	- message: String, required, minlength: 2
	- createdAt: Date, default: now
- Exports Complaint model (reuses existing if defined to avoid overwrite errors during hot reloads)

## 🔀 Routes (server/routes/complaints.js)
- GET /
	- Serves client/index.html

- POST /submit-complaint
	- Validates req.body.category and req.body.message (validateComplaint middleware)
	- Saves to MongoDB via Complaint.create({ category, message })
	- If content-type is application/x-www-form-urlencoded (HTML form) → redirects to /complaints.html?sent=1
	- Otherwise returns JSON: { msg: 'complaint saved', id }

- POST /admin-to-show-all
	- Reads password from req.body.password
	- Compares to process.env.PASSWORD_ADMIN
	- If wrong → returns 403 with an HTML error message
	- If correct → returns an HTML page listing all complaints with category, message, and local timestamp; includes a link back to '/'

## 🖥️ Client Pages
- client/index.html
	- Purpose: Explain system, link to complaint form, and admin login form
	- Admin form: <form action="/admin-to-show-all" method="POST"><input name="password" ... /></form>
	- CSS: client/css/style.index.css

- client/complaints.html
	- Purpose: Complaint submission form
	- Form: <form action="/submit-complaint" method="POST"> with select name="category" and textarea name="message"
	- On successful submit: server redirects to /complaints.html?sent=1 and a success message is shown by inline JS (reveals #success-message)
	- CSS: client/css/style.complaints.css

## 🔒 Security
- No identifying user data is collected (anonymous by design)
- Admin password is stored only in .env (PASSWORD_ADMIN)
- MongoDB URI is stored only in .env (MONGODB_URI)


## 🧭 Tips & Troubleshooting
- Always open the app at http://localhost:3000/ (do not use Live Server)
- If MongoDB connection fails, verify MONGODB_URI in .env and network access (Atlas IP allowlist)
- Ensure form field names match the model (category, message)
- If you see 403 on admin page, check the password sent in the form and the .env value

## 📄 License
This project is for educational purposes and created by Inon Guetta.
 
