#  SkillSwap

SkillSwap is a collaborative platform where users exchange knowledge by teaching and learning from one another — no money involved, just pure skill sharing.

## 🚀 Live Demo

🌐 Frontend: [https://skillswap-frontend-henna.vercel.app](https://skillswap-frontend-henna.vercel.app)
🔗 Backend: [https://skillswap-backend-qky7.onrender.com](https://skillswap-backend-qky7.onrender.com)

---

## 🛆 Tech Stack

* **Frontend:** React, TailwindCSS, Firebase Auth, Vite
* **Backend:** Flask, PostgreSQL, SQLAlchemy, JWT, Firebase Admin
* **Deployment:** Vercel (frontend), Render (backend)
* **Auth:** Firebase Authentication + custom JWT

---

## ✨ Features

* 🔐 Secure login with email/password and Google
* 📬 Real-time messaging between users
* 🧑‍🏫 Post what you can teach and want to learn
* 🔎 Filter, search, and explore skill exchange offers
* 🗕️ Schedule sessions with others
* 👤 View and update your profile
* ✅ Auth-protected routes and smart JWT token refresh

---

## 🛠️ Installation (Local)

### Backend

```bash
cd skillswap-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file with:

```env
DATABASE_URL=your_postgres_url
SECRET_KEY=your_secret_key
FIREBASE_CREDENTIALS_JSON=your_firebase_json_inline
```

```bash
flask db upgrade
flask run
```

### Frontend

```bash
cd skillswap-frontend
npm install
npm run dev
```

Set up `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing

Test login, posting exchanges, messaging, and scheduling by signing in with multiple accounts.

---
## 📚 API Documentation

You can view the full Swagger-generated API docs here:

👉 [SkillSwap API Docs](https://skillswap-backend-qky7.onrender.com/docs)




## License

This project is licensed under the [MIT License](./LICENSE).

