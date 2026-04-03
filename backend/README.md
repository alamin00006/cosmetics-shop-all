# E-Commerce Backend (NestJS)

A fully-featured e-commerce backend built with NestJS, Prisma, and PostgreSQL.

## Features

- 🔐 **Authentication** - JWT-based auth with secure password hashing
- 👤 **User Management** - Profile, password change, addresses
- 🛍️ **Products** - CRUD operations with categories, colors, filtering
- 🛒 **Shopping Cart** - Add, update, remove items
- 📦 **Orders** - Create, track, cancel orders
- ❤️ **Wishlist** - Save favorite products
- 📊 **Admin Dashboard** - Stats, analytics, management
- 📈 **Sales Analytics** - Revenue reports, category breakdown, top products
- 📖 **API Documentation** - Interactive Swagger/OpenAPI docs

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport JWT
- **Validation**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcryptjs

## Project Structure

```
src/
├── admin/           # Admin dashboard & analytics
├── addresses/       # User address management
├── auth/            # Authentication (login, signup, JWT)
├── cart/            # Shopping cart operations
├── categories/      # Product categories
├── common/          # Shared decorators, guards, filters
├── orders/          # Order management
├── prisma/          # Database service
├── products/        # Product catalog
├── users/           # User profile management
├── wishlist/        # Wishlist operations
├── app.module.ts    # Root module
└── main.ts          # Application entry point
```

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your database URL
# DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
# JWT_SECRET="your-secure-jwt-secret"

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with demo data
npm run db:seed
```

### Running the Application

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3001/api`.

## API Documentation (Swagger)

Interactive API documentation is available at `http://localhost:3001/api/docs` after starting the server.

Features:
- **Try it out**: Test endpoints directly from the browser
- **Authentication**: Use the "Authorize" button to add your JWT token
- **Request/Response schemas**: View detailed schemas for all endpoints

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update profile
- `POST /api/users/change-password` - Change password

### Products
- `GET /api/products` - List products (with pagination, filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/new-arrivals` - Get new arrivals
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/category/:category` - Products by category

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get single category

### Cart (requires auth)
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PATCH /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart

### Orders (requires auth)
- `GET /api/orders` - List user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `POST /api/orders/:id/cancel` - Cancel order

### Wishlist (requires auth)
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

### Addresses (requires auth)
- `GET /api/addresses` - List user addresses
- `POST /api/addresses` - Create address
- `PATCH /api/addresses/:id` - Update address
- `DELETE /api/addresses/:id` - Delete address
- `POST /api/addresses/:id/default` - Set as default

### Admin (requires admin role)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/analytics/sales` - Sales analytics
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PATCH /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - List all orders
- `PATCH /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/users` - List all users
- `GET /api/admin/categories` - List categories
- `POST /api/admin/categories` - Create category
- `PATCH /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category

## Demo Accounts

After seeding:
- **User**: demo@example.com / demo123
- **Admin**: admin@example.com / admin123

## Scripts

```bash
npm run start:dev    # Start development server
npm run build        # Build for production
npm run start:prod   # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
npm run lint         # Run ESLint
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
| JWT_SECRET | Secret key for JWT tokens | Yes |
| PORT | Server port (default: 3000) | No |

## Frontend Integration

Set the environment variable in your React app:

```env
VITE_API_URL=http://localhost:3000/api
```

The React app is already configured with:
- `src/lib/api-client.ts` - Type-safe API client
- `src/hooks/use-api.ts` - React Query hooks for all endpoints

## Deployment

### Backend (Railway/Render/Fly.io)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables (DATABASE_URL, JWT_SECRET)
4. Deploy

### Database (Supabase/Neon/Railway)
1. Create PostgreSQL instance
2. Copy connection string to DATABASE_URL
3. Run `npx prisma migrate deploy`

## License

MIT
