🎵 MelodyMart - Musical Instruments E-commerce Platform
MelodyMart is an e-commerce platform designed to help music lovers purchase a variety of musical instruments with ease. The platform features user-friendly browsing, an interactive cart system, and a smooth checkout process for both users and admins.

# 🚀 Features
## User Features:

Browse instruments by categories.
Search products with a search bar.
Add items to cart and adjust quantities.
Checkout with a user-friendly interface.
View order history and manage profile settings.
## Admin Features:
Add, edit, and delete products.
View and manage user orders.
Monitor customer details and product stock levels.

# 🛠️ Tech Stack
  Frontend: React, TailwindCSS, React Router, Bootstrap, Material UI
  Backend: Node.js, Express.js
  Database: MongoDB
  Authentication: JWT
  Deployment: Vercel for Frontend, Backend on local/hosted server
# 📦 Installation
Clone the repository:
```bash
git clone https://github.com/your-username/melodymart.git
cd melodymart
```
Install dependencies for both frontend and backend:

Frontend:
```bash
cd client
npm install
```
Backend:
```bash
cd server
npm install
```
# 🔑 Environment Variables
Create a ```.env``` file inside the server directory and provide the following keys:

makefile
```
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5001
```
For Vercel deployment, make sure to add the necessary environment variables in the Vercel dashboard as well.

# ▶️ Running the Application
Run the Backend Server:
```bash
cd backend
npm start
```
Run the Frontend:
```bas
cd frontend
npm start
```
Open your browser and navigate to:
http://localhost:3000 for the frontend
http://localhost:5001 for the backend
📂 Project Structure
```
melodymart/
│
├── frontend/                # Frontend React app
│   ├── public/            
│   ├── src/               
│   │   ├── components/    # UI components (e.g., Home, Cart, Admin Dashboard)
│   │   ├── styles/        # CSS/Tailwind styling files
│   │   ├── Router/        # Routing logic
│   │   └── App.js         # Main App component
│
├── backend/                # Backend Node.js app
│   ├── models/            # MongoDB schemas (e.g., User, Product, Cart)
│   ├── routes/            # API routes (e.g., Orders, Products)
│   ├── controllers/       # Request handlers
│   └── index.js           # Server entry point
│
└── README.md              # Project documentation
```


# 👥 Contributors
Hanok Erugurala – Developer
G Chandrakanth - Developer
M Akhil Reddy - Developer
