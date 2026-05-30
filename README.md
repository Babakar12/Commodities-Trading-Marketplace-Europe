# Commodities Trading Marketplace Europe

A comprehensive B2B marketplace platform for trading commodities and logistics across Europe.

## Features

### Platform Capabilities
- **Multi-Role System:** Buyers, Sellers, Shipping Companies, Logistics Providers
- **Commodity Listings:** Bauxite, Limestone, Norwegian Seafood, Norwegian Timber, General Cargo, Special Machinery
- **Real-Time Market Data:** Updated every 3 minutes from global commodity exchanges
- **Advanced Calculators:** Fuel, Distance, Shipping Costs, Profit Margins, ROI
- **Payment & Shipping Terms:** Flexible payment options and shipping agreements
- **Shipping & Tracking:** Integrated logistics management
- **User Ratings & Reviews:** Build trust in the marketplace
- **Document Management:** Invoices, Certificates, Contracts

### Commodities Supported
1. **Raw Minerals:** Bauxite, Limestone
2. **Norwegian Products:** Seafood (Fresh, Frozen), Timber (Logs, Processed)
3. **General Cargo:** Packaged goods, bulk commodities
4. **Special Machinery:** Heavy equipment, industrial machinery
5. **All European Cargoes:** Flexible for any commodity type

## Tech Stack

### Frontend
- **React** - Modern UI framework
- **Redux** - State management
- **Material-UI** - Component library
- **Leaflet/Google Maps** - Geolocation & mapping
- **Chart.js** - Data visualization for market trends

### Backend
- **Node.js + Express** - API server
- **PostgreSQL** - Database
- **Redis** - Caching & real-time updates
- **Socket.io** - Real-time notifications
- **Scheduler (node-cron)** - Market data updates every 3 minutes

### External APIs
- **Commodity Data:** Investing.com, Metals API, USDA
- **Maps & Distance:** Google Maps API
- **Payments:** Stripe/PayPal
- **Weather:** OpenWeatherMap (for shipping conditions)

## Project Structure

```
├── backend/
│   ├── config/              # Database & API configurations
│   ├── controllers/         # Business logic
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   ├── services/            # External API integrations
│   ├── schedulers/          # Market data & cron jobs
│   ├── middleware/          # Authentication, validation
│   ├── utils/               # Helper functions & calculators
│   └── server.js            # Main entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API calls
│   │   ├── store/           # Redux state
│   │   ├── calculators/     # Client-side calculators
│   │   └── App.js           # Main app component
│   └── public/
│
├── docs/                    # Documentation
├── .env.example             # Environment variables template
└── docker-compose.yml       # Docker setup
```

## Installation

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- Redis
- Git

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Listings
- `GET /api/listings` - Get all listings
- `POST /api/listings` - Create listing
- `GET /api/listings/:id` - Get listing details
- `PUT /api/listings/:id` - Update listing
- `DELETE /api/listings/:id` - Delete listing

### Market Data
- `GET /api/market/prices` - Get current commodity prices
- `GET /api/market/prices/:commodity` - Get specific commodity price
- `GET /api/market/history/:commodity` - Get price history

### Calculators
- `POST /api/calculators/shipping-cost` - Calculate shipping cost
- `POST /api/calculators/fuel-cost` - Calculate fuel cost
- `POST /api/calculators/profit-margin` - Calculate profit margin
- `POST /api/calculators/distance` - Calculate distance
- `POST /api/calculators/roi` - Calculate ROI

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/ratings` - Get user ratings

## Environment Variables

See `.env.example` for required environment variables including:
- Database credentials
- API keys (Google Maps, Stripe, etc.)
- Market data sources
- JWT secret
- Redis connection

## Market Data Updates

The platform automatically updates commodity prices every 3 minutes from:
- **Metals:** London Metal Exchange (LME), COMEX
- **Seafood:** Norwegian Seafood Council, local exchanges
- **Timber:** European Timber Exchange
- **Agricultural:** USDA, Euronext

## Key Features Explained

### 1. Real-Time Market Data
- Prices updated every 3 minutes
- Historical data for trend analysis
- Price alerts for users
- Charts and analytics

### 2. Advanced Calculators
- **Shipping Cost Calculator:** Based on weight, distance, cargo type
- **Fuel Cost Calculator:** Real-time fuel prices, vehicle efficiency
- **Profit Margin Calculator:** Automatic margin calculation
- **Distance Calculator:** Google Maps integration
- **ROI Calculator:** Investment return analysis

### 3. Multi-Role System
- **Sellers:** List commodities with bulk/packed options
- **Buyers:** Search, bid, and purchase
- **Shipping Companies:** Offer shipping services
- **Logistics Providers:** Provide warehouse and logistics

### 4. Payment Terms
- Flexible payment methods (Credit card, bank transfer, PayPal)
- Escrow system for trust
- Invoice generation
- Payment tracking

### 5. Shipping & Logistics
- Real-time tracking
- Multiple shipping options
- Cost comparison
- Document management (certificates, compliance)

## Solved Industry Problems

1. **Price Transparency:** Real-time market data prevents information asymmetry
2. **Cost Calculation:** Automated calculators reduce errors and save time
3. **Trust & Verification:** Rating system and verified sellers/logistics
4. **Documentation:** Automated invoice and certificate generation
5. **Compliance:** Built-in compliance checks for European trade
6. **Payment Security:** Escrow and secure payment gateways
7. **Logistics Optimization:** Smart matching of shipments and carriers

## Future Enhancements

- [ ] AI-powered price predictions
- [ ] Blockchain for document verification
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Insurance integration
- [ ] Customs documentation automation
- [ ] Multi-language support
- [ ] Advanced reporting for tax compliance

## Support

For issues and questions, please open an issue on GitHub.

## License

MIT License - See LICENSE file for details
