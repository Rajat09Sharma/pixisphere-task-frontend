# 📸 Pixisphere Frontend

Pixisphere is a React-based frontend application that showcases a list of photographers, featuring advanced filtering, search, and infinite scroll capabilities.

- 🚀 **Website ScreenShot**: <img width="1920" height="875" alt="Screenshot 2025-07-12 005918" src="https://github.com/user-attachments/assets/238b457c-681e-4161-907a-d7faef8fc471" />

---


## 🌐 Project Links

- 🚀 **Live Website**: [https://pixisphere-rajat.netlify.app/](https://pixisphere-rajat.netlify.app/)

- 💻 **Frontend Repo**: [GitHub - Pixisphere Frontend](https://github.com/Rajat09Sharma/pixisphere-task-frontend)

- 🔧 **Backend Repo**: [GitHub - Pixisphere Backend](https://github.com/Rajat09Sharma/pixisphere-task-backend)

---

## 🚀 Tech Stack

React.js

SCSS

Axios

JSON Server (Mock Backend)

Lodash (for debounce)

---


## 🌟 Features

- 🔍 Search with Debounce (name, styles, tags, location)
- 🗂️ Filters (Price, Rating, Location)
- 📊 Sorting (Price Low to High, High to Low)
- ♾️ Infinite Scroll Pagination
- 📱 Mobile Responsive Design + Filter Drawer
- 🚦 Loading and Error Handling UI
- 📃 Fully Customizable JSON Mock API


---

## 📦 Setup & Installation

1. Clone the Repositories

# Frontend
https://github.com/Rajat09Sharma/pixisphere-task-frontend

# Backend (JSON Server)
https://github.com/Rajat09Sharma/pixisphere-task-backend

2. Frontend Setup

cd pixisphere-frontend
npm install
npm run dev

3. Backend Setup (JSON Server)

cd pixisphere-backend
npm install
npm start

Make sure you have a valid db.json in the root of your backend directory.

.env Setup

In the frontend, create a .env file:

VITE_API_URL=http://localhost:3001

---

## 🔍 Filtering & Debounce Logic

This app features powerful client-side filtering and search with smooth performance optimizations:

- ### 🔃 Filtering Logic:

     - The data can be filtered by:

     - Price: below ₹10,000 or ₹10,000 and above.

     - Rating: minimum rating selection (e.g., 3★, 4★).

     - Location: filters data by city/state.

     - Search: supports flexible search across name, location, tags, and styles using .includes() match.

- ### 📊 Sorting Logic:

     - Users can sort results by:

     - Price: Low to High (asc)

     - Price: High to Low (desc)

- ### 🔀 Debounce Implementation:
Search input uses lodash.debounce to delay API logic by 300ms, ensuring optimized performance and preventing excessive filtering during rapid typing.

- ### ⚙️ Technical Details:

     - IntersectionObserver is used for infinite scrolling.

     - Filtering is done client-side after fetching paginated data from the mock backend (JSON Server).

     - The custom hook usePhotographersHook encapsulates fetch, debounce, and filter logic in a clean, reusable way.


---


## 👤 Author

### Rajat Sharma

