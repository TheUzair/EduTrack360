# **Personal & Social Records System (EduTrack360)**

**EduTrack360** is a comprehensive school management system designed to track and manage various aspects of student life, including behavioral records, extracurricular activities, academic achievements, class sections, and more. This application provides a user-friendly interface for managing and visualizing student data while supporting role-based access control to ensure appropriate permissions.

## **Features**

- **Student Behavioral Records Management**: Track and manage behavioral records for students, including disciplinary actions, positive feedback, and comments from teachers.
- **Extracurricular Activities Tracking**: Record student participation in sports, arts, clubs, and competitions with details about achievements and levels of participation.
- **Student Awards & Achievements**: Manage awards given to students for their excellence in various fields.
- **Class Section Management**: Create and manage class sections, assign teachers, and keep track of students in each section.
- **Academic Term Details**: Manage academic terms with start and end dates for each term, including the academic year.
- **Responsive Design with Mobile Support**: Fully responsive UI that works seamlessly on mobile devices.
- **Role-based Access Control**: Manage access to the application based on user roles such as admin, teacher, and student.

## **Tech Stack**

### **Frontend**
- **React 19** with Vite for fast development and optimized build.
- **React Router DOM** for client-side routing and navigation.
- **Shadcn UI components** for modern, accessible, and reusable UI components.
- **Tailwind CSS** for utility-first, responsive styling.
- **Axios** for making API requests and handling data.
- **Lucide React** for scalable, customizable icons.

### **Backend**
- **Node.js** for the backend runtime environment.
- **Express.js** for building the REST API and handling server-side logic.
- **MongoDB** with **Mongoose** for the database, providing easy-to-use, schema-based solutions for MongoDB.
- **CORS** enabled for cross-origin requests.
- **dotenv** for managing environment variables and sensitive configuration.

## **Getting Started**

### **Prerequisites**
- **Node.js** (v20 or higher)
- **MongoDB** for database management.

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TheUzair/EduTrack360.git
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

4. **Configure Environment Variables**: Create a `.env` file in the backend directory with the following content:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/personal-social-records
   ```

### **Running the Application**

1. **Start Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Development Server**:
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## **Project Structure**

```plaintext
├── backend/
│   ├── controllers/             # Business logic for handling requests
│   ├── models/                  # Mongoose models for database schemas
│   ├── routes/                  # API route definitions
│   ├── database/                # Database connection and setup
│   └── app.js                   # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── lib/                 # Utility functions and helpers
│   │   ├── pages/               # Page-level components
│   │   └── App.jsx              # Main frontend component
│   └── public/                  # Static files (images, icons, etc.)
```

## **Available Scripts**

### Backend
- **`npm start`**: Start the production server.
- **`npm run dev`**: Start the development server with **nodemon** for auto-reloading.
- **`npm run init-db`**: Initialize the database with seed data.

### Frontend
- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the frontend for production.
- **`npm run preview`**: Preview the production build.
- **`npm run lint`**: Run ESLint for code quality checks.

## **Contributing**

We welcome contributions to the **KreupCampus360** project. To contribute, follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request (PR) to merge your changes.

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## **Acknowledgments**

- **Shadcn UI**: For providing a set of modern UI components that make UI development easier.
- **Lucide React**: For offering a collection of customizable and scalable icons.
- All contributors who have helped shape this project.

---

### **Improvements & Future Plans**

- **Enhanced Reporting**: Future updates may include advanced reporting capabilities, allowing administrators to generate detailed reports based on student data.
- **Notification System**: A system for sending notifications (email/SMS) to students and staff for updates on activities and achievements.
- **AI-based Recommendations**: We might add an AI-based recommendation engine to suggest extracurricular activities and awards for students based on their interests and performance.
- **Integration with Learning Management Systems (LMS)**: Future versions of KreupCampus360 could integrate with LMS platforms to track academic progress alongside extracurricular achievements.