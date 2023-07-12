# SWIFT-CART Web Application Documentation

## Introduction
The Self-Checkout Web Application is designed to reduce queues in stores by allowing customers to check out items on their own. This documentation provides an overview of the application, its functionality, and the API endpoints available for integration.

### Stack Used
- Frontend: Vue.js, Quasar
- Backend: Express.js, Node.js
- Authentication: jwt, Firebase Auth
- Database: MongoDB
- Storage: S3
- Language: TypeScript
- Deployment: Docker, AWS EC2

## Features
1. Check-in: Customers can check into the store by scanning a QR code using the application. This notifies the store manager that a customer has entered.
2. Cart Management: Customers can scan product QR codes to add items to their cart. They can increment or decrement the quantity of each item as per their preference.
3. Payment: Customers can make payments using UPI or other supported payment methods.
4. Real-time Inventory: The store manager can view the items in a customer's cart as they are added, enabling better stock management.
5. Confirmation: After completing the payment, customers can scan a QR code to confirm their payment by matching the stored hash with the payment hash.

## System Architecture

![swift-cart](https://github.com/hack4bengal-apoc/swift-cart-customer/assets/89103181/8f3cad01-5445-4def-b807-2bdf9bc935c3)


## API Endpoints

### `GET /getProduct`
- Description: Retrieves information about a specific product.
- Request Parameters:
  - `productId` (string): ID of the product to retrieve information for.
- Response:
  - `product` (object): Product information including name, price, description, etc.

### `GET /getReviews`
- Description: Retrieves reviews for a specific product.
- Request Parameters:
  - `productId` (string): ID of the product to retrieve reviews for.
- Response:
  - `reviews` (array): List of reviews for the specified product.

### `DELETE /delReviews`
- Description: Deletes a specific review for a product.
- Request Parameters:
  - `reviewId` (string): ID of the review to delete.
- Response:
  - `message` (string): Success message indicating the review has been deleted.

### `PATCH /patchReviews`
- Description: Updates a specific review for a product.
- Request Parameters:
  - `reviewId` (string): ID of the review to update.
  - `review` (object): Updated review information including rating, comment, etc.
- Response:
  - `message` (string): Success message indicating the review has been updated.

### `POST /postReviews`
- Description: Adds a new review for a product.
- Request Parameters:
  - `productId` (string): ID of the product to add the review to.
  - `review` (object): Review information including rating, comment, etc.
- Response:
  - `message` (string): Success message indicating the review has been added.

### `POST /checkInUser`
- Description: Allows a customer to check into the store.
- Request Parameters:
  - `qrCode` (string): QR code scanned by the customer to check-in.
- Response:
  - `message` (string): Success message indicating the customer has checked in.

### `POST /checkoutUser`
- Description: Allows a customer to checkout and complete the payment.
- Request Parameters:
  - `qrCode` (string): QR code scanned by the customer to confirm payment.
  - `paymentHash` (string): Hash generated after completing the payment.
- Response:
  - `message` (string): Success message indicating the customer has checked out.

### `POST /postUser`
- Description: Registers a new user.
- Request Parameters:
  - `userData` (object): User information including name, email, etc.
- Response:
  - `message` (string): Success message indicating the user has been registered.

## Conclusion
The SWITFT-CART Web Application provides a convenient way for customers to reduce queues in stores by enabling self-checkout. By leveraging QR codes, customers can easily add items to their cart, make payments, and confirm their purchases. The API endpoints listed above allow for seamless integration with the application, enabling access to product information, reviews, and user management functionalities. The technology stack of Vue.js, Quasar, Express.js, Node.js, TypeScript, and MongoDB provides a robust foundation for developing and deploying the application.
