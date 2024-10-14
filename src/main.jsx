import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/WishListPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Wrap with App which includes Navbar
    children: [
      {
        path: "/", // Home route
        element: <HomePage />,
      },
      {
        path: "wishlist", // Wishlist route
        element: <WishlistPage />,
      },
      {
        path: "book/:id", // Dynamic book details route
        element: <BookDetailsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
