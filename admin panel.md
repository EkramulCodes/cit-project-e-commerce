# Project Nirvoya: Admin Panel & Content Management Guide

This guide explains how to manage the content of Project Nirvoya and the steps required to implement a fully functional Admin Panel.

## 1. Current State (Static / Demo Mode)
Currently, the website is a React-based frontend that fetches product data from [DummyJSON](https://dummyjson.com). Because DummyJSON is a placeholder API, changes made via the website (like adding to cart) are local, and the product list is managed by the external API.

### How to edit local content today:
- **Banner Images & Text**: Edit `src/components/Layout/Home/Banner.jsx`.
- **Static Products & Categories**: Some fallback data is stored in `src/constants.js`. You can manually update these arrays to change the "Featured" or "Category" sections.
- **Navbar Links**: Managed in `src/components/Layout/Home/Navbar.jsx`.

---

## 2. Implementing a Real Admin Panel
To have a persistent Admin Panel where you can login and edit products, you need to transition from a "Frontend-only" project to a "Full-Stack" project.

### Step A: Backend Setup
You will need a server (Node.js/Express) and a database (MongoDB is recommended for e-commerce).
1. **Create an API**: Replace the DummyJSON URLs in `src/services/api.js` with your own server URLs (e.g., `http://localhost:5000/api/products`).
2. **Admin Schema**: Create a User model in your database with a `role: "admin"` field.

### Step B: Admin Routes in React
1. **Create Admin Components**:
   - `AdminDashboard.jsx`: Overview of sales and stock.
   - `ProductManagement.jsx`: A table to Add, Edit, or Delete products.
   - `OrderManagement.jsx`: To view and update customer orders.
2. **Protected Routes**: Wrap these pages in an authentication check to ensure only users with the `admin` role can access them.

---

## 3. Where to Edit Specific Content

### Managing Products
To edit products, your Admin Panel should have a form with these fields:
- **Title**: Name of the product.
- **Price**: Numeric value (the frontend automatically converts this to Taka).
- **Category**: Dropdown to select from existing categories.
- **Images**: Upload to a service like Cloudinary or AWS S3 and store the URL.
- **Stock**: To manage availability.

### Managing Home Page Content
- **Banner Management**: Create a database collection for "Banners". The frontend can then fetch these dynamically instead of having them hardcoded in `Banner.jsx`.
- **Campaigns/Deals**: Add a "discount" field to products; the frontend is already styled to show "25% OFF" badges if this data is present.

---

## 4. Alternative: Headless CMS (Fastest Way)
If you don't want to build a full backend, you can use a Headless CMS like **Strapi**, **Sanity**, or **Contentful**.
1. Create your content types (Products, Banners) in their dashboard.
2. Update the `baseUrl` in `src/services/api.js` to point to their API.
3. Use their built-in Admin Panel to edit your website content in real-time without touching the code.

---

## 5. Security Note
- Never hardcode Admin credentials in the frontend.
- Always use **JWT (JSON Web Tokens)** or **Firebase Auth** for secure login.
- Ensure the "Delete" and "Update" buttons in your API are protected by middleware that checks for Admin privileges.
