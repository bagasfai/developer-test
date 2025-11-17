# Developer Test

## 🚀 How to Run the Application

### Prerequisites

- PHP 8.1+ with Composer
- Node.js 18+ with npm
- MySQL/SQLite database

### Backend Setup (Laravel API)

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install PHP dependencies:**

   ```bash
   composer install
   ```

3. **Setup environment:**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database in `.env` file:**

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=developer_test
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. **Run database migrations:**

   ```bash
   php artisan migrate:fresh --seed
   ```

6. **Start the Laravel development server:**

   ```bash
   php artisan serve
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup (React)

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The React app will be available at `http://localhost:5173`

## 📖 How the Application Works

This is a **Sales Management System** that provides CRUD (Create, Read, Update, Delete) operations for managing business data and payment processing for sales.

### Core Modules:

#### 1. **Marketing** 📊

- Manage marketing campaigns and strategies
- Basic CRUD operations for marketing data

#### 2. **Sales** 💼

- Create and manage sales records
- Track customer purchases and transactions
- View sales history and details
- **Payment Integration**: Process payments for sales transactions

#### 3. **Commission** 💰

- Calculate and track sales commissions
- Monitor commission payments

#### 4. **Payments** 💳

- Process payments for sales transactions
- View payment history and transaction details

### Technology Stack:

- **Backend**: Laravel (PHP) - RESTful API
- **Frontend**: React with Vite - Modern UI
- **Database**: MySQL/SQLite
- **Styling**: TailwindCSS
- **State Management**: TanStack Query for server state
