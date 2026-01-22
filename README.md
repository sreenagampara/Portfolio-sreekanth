# Portfolio Website with Admin Dashboard

This is a full-stack portfolio application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). It features a dynamic frontend to showcase your work and skills, and a secure **Admin Dashboard** to manage all content dynamically.

## 🚀 Features

-   **Dynamic Content**: All sections (About, Skills, Projects) are fetched dynamically from the database.
-   **Admin Dashboard**: A secure area to manage portfolio content.
    -   **Projects**: Add, Edit, Delete projects (with image uploads).
    -   **Skills**: Manage your technical skills and icons.
    -   **About Me**: Update your bio and profile picture.
    -   **Messages**: View messages sent via the Contact form.
-   **Image Hosting**: Integrated with **Cloudinary** for efficient image storage.
-   **Secure Authentication**: Admin routes are protected with JWT authentication.
-   **Responsive Design**: Fully responsive UI built with **Tailwind CSS**.
-   **Contact Form**: Functional contact form that saves messages to the database.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Axios.
-   **Backend**: Node.js, Express.js, MongoDB (Mongoose).
-   **Authentication**: JSON Web Tokens (JWT), Bcrypt.js.
-   **Storage**: Cloudinary (for images).

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:
```bash
npm start
# OR for development with nodemon
npm run dev
```

### 3. Frontend Setup
Navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

## 🔐 Admin Access

To access the Admin Dashboard:
1.  Go to `http://localhost:5173/admin/login` (or the port Vite is running on).
2.  **Default Credentials**:
    -   **Username**: `admin`
    -   **Password**: `password123`
3.  **Important**: Change your password immediately from the **Settings** tab in the dashboard.

## 📂 Project Structure

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Admin & Public)
│   │   ├── context/        # State Management (Auth, Projects)
│   │   └── ...
│   └── ...
├── server/                 # Node.js Backend
│   ├── config/             # DB & Cloudinary Config
│   ├── controllers/        # Route Logic
│   ├── models/             # Mongoose Models
│   ├── routes/             # API Routes
│   └── ...
└── README.md
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
