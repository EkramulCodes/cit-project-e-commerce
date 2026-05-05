# MongoDB Setup & API Integration

## Part 1: What to do in your MongoDB Account (Atlas)

1.  **Create a Cluster**: Log in to MongoDB Atlas and click "Build a Cluster" (Shared/Free Tier is fine).
2.  **Database User**:
    *   Go to **Database Access** under the "Security" tab.
    *   Click "Add New Database User".
    *   Set a **username** and **password** (Save these! You will need them for the `.env` file).
    *   Set the role to "Read and write to any database".
3.  **Network Access**:
    *   Go to **Network Access** under the "Security" tab.
    *   Click "Add IP Address".
    *   Choose **"Allow Access From Anywhere"** (0.0.0.0/0) for development, or add your specific IP.
4.  **Get Connection String**:
    *   Go to the **Database** tab and click **"Connect"** on your cluster.
    *   Choose **"Connect your application"**.
    *   Copy the connection string (it looks like `mongodb+srv://<username>:<password>@cluster0...`).
    *   Replace `<password>` with your actual user password.

---

## Part 2: Backend Implementation (Already Scaffolded)

I have created a `server/` directory in your project root with the following structure:
- `index.js`: The entry point of your API.
- `models/Product.js`: The data structure for your products.
- `routes/productRoutes.js`: The search and management logic.

### How to start the server:
1.  Open a terminal in the `server` folder.
2.  Create a `.env` file and paste your connection string:
    ```
    MONGODB_URI=your_mongodb_connection_string_here
    PORT=5000
    ```
3.  Run the following commands:
    ```bash
    npm install
    node index.js
    ```

---

## Part 3: Switching the Frontend
To switch the frontend from the demo (DummyJSON) to your real MongoDB database:
1.  Open `src/services/api.js`.
2.  Change the `baseUrl` from `"/api"` to `http://localhost:5000/api`.
3.  Your frontend will now fetch data from your local server instead of the internet demo.
