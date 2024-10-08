# Backend -- CoursePublish_Auth

# Course Selling App

This is a basic course selling application built using **Node.js** and **MongoDB**. The app allows two types of users: Admins and Users. Admins can create and manage courses, while Users can view and purchase courses. Authentication is simplified by passing credentials in the request headers for every authenticated route.

## Features

### Admin:
- **Admin Signup:** Create new admin accounts.
- **Create Courses:** Admins can create new courses with a title, description, price, and image link.
- **List Courses:** Admins can view all created courses.

### Users:
- **User Signup:** Create new user accounts.
- **List Courses:** Users can view all available courses.
- **Purchase Courses:** Users can purchase courses.
- **View Purchased Courses:** Users can view all the courses they have purchased.

## Routes

### Admin Routes
- **POST /admin/signup:** Create a new admin account.
  - **Input:** `{ username: 'admin', password: 'pass' }`
  - **Output:** `{ message: 'Admin created successfully' }`

- **POST /admin/courses:** Create a new course.
  - **Headers:** `{ 'username': 'admin', 'password': 'pass' }`
  - **Body:** `{ title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }`
  - **Output:** `{ message: 'Course created successfully', courseId: 'new_course_id' }`

- **GET /admin/courses:** List all courses.
  - **Headers:** `{ 'username': 'admin', 'password': 'pass' }`
  - **Output:** `{ courses: [{ id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }] }`

### User Routes
- **POST /users/signup:** Create a new user account.
  - **Input:** `{ username: 'user', password: 'pass' }`
  - **Output:** `{ message: 'User created successfully' }`

- **GET /users/courses:** List all available courses.
  - **Headers:** `{ 'username': 'user', 'password': 'pass' }`
  - **Output:** `{ courses: [{ id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }] }`

- **POST /users/courses/:courseId:** Purchase a course by its ID.
  - **Headers:** `{ 'username': 'user', 'password': 'pass' }`
  - **Output:** `{ message: 'Course purchased successfully' }`

- **GET /users/purchasedCourses:** List all purchased courses.
  - **Headers:** `{ 'username': 'user', 'password': 'pass' }`
  - **Output:** `{ purchasedCourses: [{ id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }] }`

## Technology Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **HTTP Requests:** RESTful API

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/VedPrakash483/Backend---CoursePublish_Auth.git
   cd course-selling-app
