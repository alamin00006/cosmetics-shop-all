import Link from "next/link";
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Package,
  Truck,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { demoOrders, demoWishlist, demoAddresses, demoUser } from '@/data/demoUser';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-600', icon: Clock },
  processing: { label: 'Processing', color: 'bg-blue-500/10 text-blue-600', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-purple-500/10 text-purple-600', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-500/10 text-green-600', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/10 text-red-600', icon: Clock },
};

const Dashboard = () => {
  const activeOrders = demoOrders.filter(o => !['delivered', 'cancelled'].includes(o.status));
  const recentOrders = demoOrders.slice(0, 3);

  const stats = [
    { 
      label: 'Total Orders', 
      value: demoOrders.length, 
      icon: ShoppingBag, 
      color: 'from-primary/20 to-primary/5',
      iconColor: 'text-primary'
    },
    { 
      label: 'Wishlist Items', 
      value: demoWishlist.length, 
      icon: Heart, 
      color: 'from-rose-500/20 to-rose-500/5',
      iconColor: 'text-rose-500'
    },
    { 
      label: 'Saved Addresses', 
      value: demoAddresses.length, 
      icon: MapPin, 
      color: 'from-emerald-500/20 to-emerald-500/5',
      iconColor: 'text-emerald-500'
    },
    { 
      label: 'Active Orders', 
      value: activeOrders.length, 
      icon: Truck, 
      color: 'from-violet-500/20 to-violet-500/5',
      iconColor: 'text-violet-500'
    },
  ];

  return (
    <DashboardLayout 
      title={`Welcome back, ${demoUser.name.split(' ')[0]}!`}
      description="Here's what's happening with your account."
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 border border-border/50`}
          >
            <div className={`w-10 h-10 rounded-xl bg-background/80 flex items-center justify-center mb-3 ${stat.iconColor}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <div>
              <h2 className="font-display text-lg font-semibold">Recent Orders</h2>
              <p className="text-sm text-muted-foreground">Your latest purchases</p>
            </div>
            <Link to="/dashboard/orders">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="divide-y divide-border/50">
            {recentOrders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <Link
                  key={order.id}
                  to="/dashboard/orders"
                  className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                    <img 
                      src={order.items[0].product.image} 
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} • ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <Badge variant="secondary" className={statusConfig[order.status].color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig[order.status].label}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Wishlist Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <div>
              <h2 className="font-display text-lg font-semibold">Your Wishlist</h2>
              <p className="text-sm text-muted-foreground">Items you've saved</p>
            </div>
            <Link to="/dashboard/wishlist">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-3 p-4">
            {demoWishlist.slice(0, 4).map((item) => (
              <Link
                key={item.product.id}
                to={`/product/${item.product.id}`}
                className="group bg-secondary/30 rounded-2xl p-3 hover:bg-secondary/50 transition-colors"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-2">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm font-medium text-foreground truncate">
                  {item.product.name}
                </p>
                <p className="text-sm text-primary font-semibold">
                  ${item.product.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl border border-border/50 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-semibold">Quick Actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/products">
            <Button variant="secondary" className="rounded-full">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Browse Products
            </Button>
          </Link>
          <Link to="/dashboard/addresses">
            <Button variant="secondary" className="rounded-full">
              <MapPin className="h-4 w-4 mr-2" />
              Manage Addresses
            </Button>
          </Link>
          <Link to="/dashboard/profile">
            <Button variant="secondary" className="rounded-full">
              Edit Profile
            </Button>
          </Link>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
