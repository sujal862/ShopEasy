# ShopEasy - React Shopping Website

## Overview
ShopEasy is a modern e-commerce website built with React and Vite that integrates with the FakeStoreAPI. The application provides a complete shopping experience including user authentication, product browsing, cart management, and checkout functionality.

## Features

- User authentication with JWT tokens
- Product browsing and filtering
- Shopping cart management
- Responsive design
- Secure checkout process
- Error handling and loading states

## Tech Stack

### Frontend
- **React 19**: Core UI library
- **React Router 7**: For navigation and routing
- **Context API**: For global state management (cart)
- **Axios**: For API requests
- **Plane CSS**: For styling

### API
- **FakeStoreAPI**: Backend API for products and authentication

## Project Structure

```
src/
├── assets/            # Static assets
├── components/        # UI components
├── context/           # React Context providers
├── pages/             # Page components
├── services/          # API services
├── App.jsx            # Main component
├── App.css            # Global styles
└── main.jsx           # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/sujal862/ShopEasy.git
   cd ShopEasy
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials
- **Username**: mor_2314
- **Password**: 83r5^_

## API Integration

The app uses FakeStoreAPI for user auth, products, and categories. API calls are in `src/services/api.js`.

## State Management

React Context API manages the cart state. Local state handles UI elements.

## Styling

Custom CSS are used. Global styles in `src/App.css`, component styles in their files. Mobile-first design.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [FakeStoreAPI](https://fakestoreapi.com/) for providing the backend API
