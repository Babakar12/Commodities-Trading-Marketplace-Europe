# Commodities Trading Marketplace - API Documentation

## Overview
This document describes all available API endpoints for the Commodities Trading Marketplace platform.

## Base URL
`http://localhost:5000/api`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### Authentication

#### Register User
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "seller",
    "company_name": "My Company",
    "phone": "+1234567890",
    "address": "123 Main St, City"
  }
  ```

#### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Listings

#### Get All Listings
- **GET** `/listings`
- **Query Parameters:**
  - `commodity_type`: Filter by commodity
  - `location`: Filter by location
  - `min_price`: Minimum price
  - `max_price`: Maximum price

#### Get Single Listing
- **GET** `/listings/:id`

#### Create Listing
- **POST** `/listings` (Requires authentication)
- **Body:**
  ```json
  {
    "commodity_type": "Bauxite",
    "quantity": 1000,
    "unit": "tons",
    "price_per_unit": 150,
    "description": "High quality bauxite",
    "location": "Guinea",
    "available_from": "2024-06-01",
    "bulk_packed": "bulk"
  }
  ```

### Market Data

#### Get Current Prices
- **GET** `/market/prices`

#### Get Price for Specific Commodity
- **GET** `/market/prices/:commodity`

#### Get Price History
- **GET** `/market/history/:commodity`
- **Query Parameters:**
  - `days`: Number of days of history (default: 30)

### Calculators

#### Shipping Cost Calculator
- **POST** `/calculators/shipping-cost`
- **Body:**
  ```json
  {
    "weight": 500,
    "distance": 1000,
    "cargo_type": "general"
  }
  ```

#### Fuel Cost Calculator
- **POST** `/calculators/fuel-cost`
- **Body:**
  ```json
  {
    "distance": 500,
    "fuel_price": 1.5,
    "consumption": 25
  }
  ```

#### Profit Margin Calculator
- **POST** `/calculators/profit-margin`
- **Body:**
  ```json
  {
    "cost_price": 100,
    "selling_price": 150
  }
  ```

### Orders

#### Create Order
- **POST** `/orders` (Requires authentication)
- **Body:**
  ```json
  {
    "seller_id": 1,
    "listing_id": 1,
    "quantity": 100,
    "total_price": 15000,
    "shipping_method": "truck",
    "payment_method": "stripe"
  }
  ```

#### Get Order Details
- **GET** `/orders/:id` (Requires authentication)

#### Update Order Status
- **PUT** `/orders/:id/status` (Requires authentication)
- **Body:**
  ```json
  {
    "status": "shipped"
  }
  ```

## Response Format

All responses are in JSON format.

### Success Response
```json
{
  "data": {...},
  "message": "Success"
}
```

### Error Response
```json
{
  "error": "Error message",
  "status": 400
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
