# Makario Admin Dashboard

A modern, elegant, and powerful admin dashboard UI for the Makario e-commerce platform (Premium Makhana Brand).

## 📁 Folder Structure

```
admin/
├── layouts/
│   └── AdminLayout.tsx          # Main layout wrapper with sidebar + topbar
├── components/
│   ├── AdminSidebar.tsx         # Navigation sidebar
│   ├── AdminTopBar.tsx          # Top navigation bar
│   ├── KPICard.tsx              # KPI metric card component
│   ├── NotificationFeed.tsx     # Live notification feed
│   ├── charts/
│   │   ├── SalesChart.tsx       # Sales trend visualization
│   │   └── TrafficChart.tsx     # Traffic sources pie chart
│   └── tables/
│       ├── TopProductsTable.tsx # Top performing products
│       └── RecentOrdersTable.tsx# Recent orders listing
├── pages/
│   ├── Dashboard.tsx            # Dashboard home page
│   ├── Orders.tsx               # Order management
│   ├── Products.tsx             # Product management
│   ├── Customers.tsx            # Customer management
│   ├── AbandonedCheckouts.tsx   # Abandoned cart recovery
│   ├── Discounts.tsx            # Discount code management
│   ├── Content.tsx              # Blog & page management
│   ├── Payments.tsx             # Payment transactions
│   ├── Integrations.tsx         # Third-party integrations
│   ├── Analytics.tsx            # Analytics & reports
│   ├── Settings.tsx             # Store settings
│   └── Support.tsx              # Logs & system alerts
├── hooks/                        # Custom React hooks (future)
├── utils/                        # Utility functions (future)
├── AdminRoutes.tsx              # Router configuration
└── index.ts                     # Exports
```

## 🎨 Design System

### Colors
- **Primary (Mint Deep Green)**: `#1a4d3e`
- **Secondary (Mint Dark)**: `#0f3d2f`
- **Accent (Gold)**: `#d4af37`
- **Highlight (Light Gold)**: `#f4d03f`
- **Background**: Light off-white / mint tint
- **Text**: Gray shades for hierarchy

### Typography
- **Headlines**: Playfair Display (for main section headings)
- **Body**: Inter / Poppins (for UI text)
- **Monospace**: For codes and keys

### Components
- Rounded cards with soft shadows
- Smooth hover effects and micro-animations
- Responsive design for mobile/tablet/desktop
- Dark mode toggle ready (in TopBar)

## 📄 Pages Overview

### 1. **Dashboard** (`/admin`)
Real-time business overview with:
- 6 KPI cards (Sales, Orders, AOV, Conversion, Customers, Abandoned Carts)
- Sales trend chart (weekly)
- Traffic sources pie chart
- Top products table
- Recent orders table
- Live notifications feed
- Quick action buttons

### 2. **Orders** (`/admin/orders`)
Comprehensive order management:
- Searchable orders table
- Filters: status, payment status, date range, amount range
- Order statuses: Pending, Processing, Shipped, Delivered, Cancelled, Refunded
- Payment statuses: Paid, COD, Failed
- Quick actions: View, Print, Export
- Pagination support

### 3. **Products** (`/admin/products`)
Product catalog management:
- Grid and List view modes
- Filters: category, stock status, visibility
- Product cards with image, price, stock level
- Actions: Edit, Delete
- Stock indicators (in stock/low/out)
- Category and visibility badges

### 4. **Customers** (`/admin/customers`)
Customer relationship management:
- Customer types: B2C, B2B, Distributor
- Customer metrics: Orders, Total Spend, Last Order Date
- Status indicators: Active/Inactive
- Actions: Email, Message, View Profile
- Sortable columns

### 5. **Abandoned Checkouts** (`/admin/abandoned-checkouts`)
Cart recovery and analytics:
- Recovery rate statistics
- Abandoned carts table
- Status: Not Contacted, Email Sent, Recovered, Lost
- Recovery actions: Email, SMS, WhatsApp, Coupon
- Potential value tracking

### 6. **Discounts** (`/admin/discounts`)
Coupon and promotion management:
- Discount types: Percentage, Fixed, Free Shipping
- Usage tracking and limits
- Active/Expired status
- Top performer badges
- Start/End date management

### 7. **Blog & Content** (`/admin/content`)
Content management system:
- Two tabs: Blog Posts, Static Pages
- Blog: Title, Category, Author, Views, Status
- Pages: About, Quality, Farmers, Policies
- Draft/Published status
- SEO-friendly management

### 8. **Payments** (`/admin/payments`)
Payment processing and reconciliation:
- Transaction metrics cards
- All transactions table
- Payment methods: Razorpay, PhonePe, Cashfree, PayU, COD
- Status tracking: Success, Pending, Failed
- Fee and net amount calculation
- Export functionality

### 9. **Integrations** (`/admin/integrations`)
Third-party service management:
- Payment Gateways: Razorpay, PhonePe, Cashfree, PayU
- Shipping: Shiprocket, Shipway, iThink Logistics
- Communication: SendGrid, Twilio, WhatsApp API
- Status indicators: Connected/Not Connected
- Configuration buttons for each service

### 10. **Analytics** (`/admin/analytics`)
Comprehensive business intelligence:
- Tabs: Sales, Customers, Products, Marketing
- Time period selector
- Sales trend with bar charts
- Customer segments breakdown
- Product performance metrics
- Conversion and source tracking

### 11. **Settings** (`/admin/settings`)
Store configuration:
- **General**: Store name, contact info, timezone, currency
- **Branding**: Logo upload, brand colors
- **SEO**: Meta tags, indexing settings
- **Email & SMS**: Provider configuration, API keys
- **Checkout**: Guest checkout, COD settings, minimum order
- **User Roles**: Admin, Manager, Support, Warehouse roles

### 12. **Support** (`/admin/support`)
System logs and alerts:
- Alert summary cards
- Error logs with status tracking
- Warning messages
- Info logs
- Integration status notifications
- Help section with contact options

## 🚀 Getting Started

### Installation

```bash
# Install dependencies (if not already done)
npm install

# Run the development server
npm run dev
```

### Using Admin Routes

In your main `App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoutes from './admin/AdminRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Other routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Access Admin Panel

```
http://localhost:5173/admin
```

## 🎯 Features

### ✅ Implemented
- Full sidebar navigation with 12 main sections
- Responsive top bar with search, notifications, profile
- Dashboard with KPIs, charts, and tables
- All 11 main pages with functional UI
- Table components with sorting, filtering
- Search functionality across pages
- Status badges and indicators
- Card-based layouts for integrations
- Dark mode toggle (UI ready)

### 🔄 To Be Implemented
- Real data integration with backend API
- Advanced filtering and sorting logic
- Form validation for settings and product creation
- Modal dialogs for confirmations
- PDF export for reports and invoices
- Real-time chart updates
- User authentication and authorization
- Role-based access control
- Notification real-time updates
- Image upload functionality
- Rich text editor for blog content

## 📊 Data Structures

### KPI Card Props
```tsx
interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  icon: LucideIcon;
}
```

### Order Object
```tsx
interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  phone: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'cod' | 'failed';
  amount: string;
  channel: string;
}
```

## 🎨 Customization

### Changing Brand Colors

Update color values in component classes:
- Primary: `from-[#1a4d3e]` → your color
- Accent: `from-[#d4af37]` → your color
- Or modify `tailwind.config.ts` for global color scheme

### Adding New Pages

1. Create new file in `/pages`
2. Import in `AdminRoutes.tsx`
3. Add route in Routes element
4. Add sidebar navigation item in `AdminSidebar.tsx`

### Modifying Sidebar Items

Edit the `navItems` array in `AdminSidebar.tsx`:

```tsx
const navItems = [
  {
    label: 'Custom Section',
    href: '/admin/custom',
    icon: IconComponent,
  },
  // ...
];
```

## 📱 Responsive Design

- **Desktop**: Full sidebar + main content
- **Tablet**: Collapsible sidebar + optimized tables
- **Mobile**: Hidden sidebar (toggle), card-based layouts

Sidebar collapse toggle available in top bar menu.

## 🔐 Security Notes

- API keys shown in settings should be masked
- Implement proper authentication before deployment
- Add CSRF protection for form submissions
- Validate all user inputs on backend
- Use HTTPS only in production

## 📚 Dependencies

- **React 18+**: UI framework
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **TypeScript**: Type safety

## 🤝 Contributing

To add new features:

1. Follow the existing folder structure
2. Use the established color scheme
3. Ensure mobile responsiveness
4. Add proper TypeScript types
5. Keep components modular and reusable

## 📝 License

Part of Makario E-commerce Platform
