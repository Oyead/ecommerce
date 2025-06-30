# E-Commerce Application

This is a dynamic and responsive e-commerce web application built with React and Vite. It provides a complete shopping experience, from browsing products and adding them to a cart to user authentication and online payments.
[Click here to try it out](https://oyead.github.io/ecommerce/)
## Features

-   **User Authentication**: Secure sign-up, sign-in, and logout functionality.
-   **Password Recovery**: A complete password reset flow including email verification with a code.
-   **Product Browsing**: Users can view all products, featured products, categories, and brands.
-   **Product Search**: An integrated search bar to easily find products by title.
-   **Product Details**: A dedicated page for each product showing detailed information, images, and related items.
-   **Shopping Cart**: A fully functional cart where users can add items, update quantities, remove items, or clear the entire cart.
-   **Wishlist**: Users can add their favorite products to a wishlist and manage it.
-   **Online Payments**: Integration with Stripe for seamless and secure online checkout.
-   **Protected Routes**: Certain routes like the cart and wishlist are protected and only accessible to logged-in users.
-   **Responsive Design**: The UI is built with Tailwind CSS to be fully responsive across different screen sizes.
-   **Notifications**: User-friendly toast notifications for actions like adding items to the cart or wishlist.

## Tech Stack

-   **Frontend:** React, Vite
-   **Routing:** React Router
-   **State Management & Data Fetching:** TanStack Query (React Query)
-   **Styling:** Tailwind CSS, Flowbite
-   **Form Handling:** Formik & Yup
-   **API Client:** Axios
-   **Notifications:** React Hot Toast
-   **UI Components:** React Slick (for carousels), Font Awesome
-   **Password Recovery:** EmailJS
-   **Payment Gateway:** Stripe
-   **Linting:** ESLint

## Project Structure

The source code is organized as follows:

```
src/
├── Context/        # React Context providers for global state (user token, cart count)
├── apis/           # API call definitions (e.g., payment)
├── components/     # Reusable UI components and page components
├── hooks/          # Custom hooks for data fetching and mutations with React Query
├── App.jsx         # Main application component with routing setup
└── main.jsx        # Application entry point, providers setup
```

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/oyead/ecommerce.git
    cd ecommerce
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Starts the development server with Vite.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Runs ESLint to analyze the code for potential errors.
-   `npm run deploy`: Deploys the built application to GitHub Pages.
