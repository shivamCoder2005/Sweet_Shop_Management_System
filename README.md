# 🍭 Sweet Shop Management System

This project is a comprehensive implementation of a Sweet Shop Management application using the principles of **Test-Driven Development (TDD)**. Built as part of the Incyubyte TDD challenge, it demonstrates step-by-step feature development through tests first, ensuring high reliability and clean architecture.

<br/>

## ✨ Key Functionalities

### 👨‍🍳 Owner Dashboard

* Add, update, or delete sweet items
* Add new stock to existing sweets
* Manage full inventory from a central interface
* Monitor real-time stock levels after every purchase

### 🧑‍💼 Customer Interface

* View all available sweets with details
* Purchase sweets with input quantity validation

### 📦 Inventory Automation

* Stock quantity auto-decrements after each purchase
* Purchase is restricted to available stock only
* Owners can add stock directly to existing inventory records

### 🔎 Sorting & Filtering

* Sort sweets by name, price, or quantity
* Apply filters using custom criteria like category or keywords
* Backend support for scalable sort-filter logic

---
<br/>

## 🧪 Test Strategy

* Key routes and logic modules are covered with unit tests
* Supports isolated testing of specific files during development
* Example usage:

  ```bash
  npm test test/sweet.test.js
  npm test test/user.test.js
  npm test test/owner.test.js
  ```

<br/>

## 🛠 Tech Stack

### 💻 Frontend

* React.js for building dynamic UIs
* Tailwind CSS for responsive, modern styling

### 🔙 Backend

* Node.js for server-side logic
* Express.js as the REST API framework

### 💾 Database

* MongoDB (NoSQL)
* Mongoose ODM for schema and data management

### 🧪 Testing & Tools

* Jest for unit testing
* Supertest for HTTP route testing
* Postman for API verification
* Git & GitHub for version control

<br/>

## ✅ Feature & Test Summary

| Description               | Method | Route                  | Expected Result                     |
| ------------------------- | ------ | ---------------------- | ----------------------------------- |
| Owner signup success      | POST   | /owner/signup          | 200 OK – Owner created              |
| Duplicate owner signup    | POST   | /owner/signup          | 409 Conflict – Email already exists |
| Valid owner login         | POST   | /owner/login           | 200 OK – Login success              |
| Unregistered owner login  | POST   | /owner/login           | 404 Not Found – User does not exist |
| Incorrect owner password  | POST   | /owner/login           | 401 Unauthorized – Wrong password   |
| User signup success       | POST   | /user/signup           | 200 OK – User created               |
| Duplicate user signup     | POST   | /user/signup           | 409 Conflict – Email already exists |
| Valid user login          | POST   | /user/login            | 200 OK – Login success              |
| Unregistered user login   | POST   | /user/login            | 404 Not Found – User does not exist |
| Incorrect user password   | POST   | /user/login            | 401 Unauthorized – Wrong password   |
| Add sweet success         | POST   | /owner/sweets          | 200 OK – Sweet added                |
| Add duplicate sweet       | POST   | /owner/sweets          | 409 Conflict – Already exists       |
| Get all sweets            | GET    | /sweets/all            | 200 OK – Fetched list               |
| Get sweet by ID           | GET    | /sweets/\:id           | 200 OK – Sweet found                |
| Update sweet success      | PUT    | /owner/sweets/\:id     | 200 OK – Updated                    |
| Update non-existent sweet | PUT    | /owner/sweets/\:id     | 500 Error – Sweet not found         |
| Delete sweet success      | DELETE | /owner/sweets/\:id     | 200 OK – Deleted                    |
| Delete non-existent sweet | DELETE | /owner/sweets/\:id     | 500 Error – Not found               |
| Filter & sort sweets      | POST   | /sweets/sort-filter    | 200 OK – Filtered results           |
| Add stock to sweets       | POST   | /owner/sweets/addStock | 200 OK – Stock updated              |
| Valid sweet purchase      | POST   | /user/sweets/buy       | 200 OK – Purchase complete          |

<br/>

## 🧪 Sample Test Report

![Test Results](./test_result.jpg)

<br/>

## 📦 API Routes

### 🔐 Owner Routes (`/owner`)

| Method | Endpoint                 | Functionality                    |
| ------ | ------------------------ | -------------------------------- |
| POST   | `/owner/signup`          | Register as an owner             |
| POST   | `/owner/login`           | Login for owner                  |
| POST   | `/owner/sweets`          | Add a new sweet                  |
| PUT    | `/owner/sweets/:sweetId` | Update existing sweet            |
| DELETE | `/owner/sweets/:sweetId` | Delete sweet by ID               |
| POST   | `/owner/sweets/addStock` | Add stock to existing sweet item |


### 🍬 Sweet Routes (`/sweet`)

| Method | Endpoint             | Functionality                 |
| ------ | -------------------- | ----------------------------- |
| GET    | `/sweet/all`         | Retrieve all available sweets |
| GET    | `/sweet/:sweetId`    | Get sweet details by ID       |
| POST   | `/sweet/sort-filter` | Apply filters and sorting     |


### 👤 User Routes (`/user`)

| Method | Endpoint           | Functionality     |
| ------ | ------------------ | ----------------- |
| POST   | `/user/signup`     | Register new user |
| POST   | `/user/login`      | Login as user     |
| POST   | `/user/sweets/buy` | Purchase sweet    |

<br/>

## ⚙ Local Setup Instructions

### 📁 Clone the Repository

```bash
git clone https://github.com/shivamCoder2005/Sweet_Shop_Management_System.git
cd Sweet_Shop_Management_System
```

### 🖼 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

### 🖥 Backend Setup

```bash
cd Backend
npm install
node app.js
```

<br/>

## 🗂 Folder Layout

### Backend

```
Backend/
├── controllers/
│   ├── index.js
│   ├── owner.controller.js
│   ├── sweet.controller.js
│   └── user.controller.js
│
├── models/
│   ├── index.js
│   ├── owner.js
│   ├── sweet.js
│   └── user.js
│
├── routes/
│   ├── index.js
│   ├── owner.route.js
│   ├── sweet.routes.js
│   └── user.route.js
│
├── test/
│   ├── owner.test.js
│   ├── sweet.test.js
│   └── user.test.js
│
├── index.js

```

### Frontend

```
├── public/
├── src/
│   ├── components/
│   │   ├── constants/
│   │   │   └── constant.js
│   │   │
│   │   ├── owner/
│   │   │   ├── OwnerAddStock.jsx
│   │   │   ├── OwnerAddSweet.jsx
│   │   │   ├── OwnerLogIn.jsx
│   │   │   ├── OwnerSignup.jsx
│   │   │   └── OwnerUpdateSweet.jsx
│   │   │
│   │   ├── user/
│   │   │   ├── UserBuySweet.jsx
│   │   │   ├── UserLogIn.jsx
│   │   │   └── UserSignup.jsx
│   │   │
│   │   └── utils/
│   │       ├── Home.jsx
│   │       └── index.js
│   │
│   ├── App.jsx
│   ├── index.js
│   ├── index.css
│   └── main.jsx
```
<br/>

## 📚 Resources

* [Sweet Shop Management Problem Statement](https://drive.google.com/file/d/1Ut7A8QRK96-mWFcIlK1eQ1eOoM9qlAta/view?usp=sharing)
* [Jest Documentation](https://jestjs.io/docs/getting-started)
* [React Documentation](https://reactjs.org/docs/getting-started.html)
* [MongoDB Documentation](https://www.mongodb.com/docs/)

---
