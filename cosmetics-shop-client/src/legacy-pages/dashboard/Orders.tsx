"use client";

import { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package,
  Truck,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
  Calendar,
  ExternalLink,
  Copy,
  X
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useOrders } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { OrderCardSkeleton, ErrorMessage } from '@/components/ui/loading-skeleton';
import { ApiOrder } from '@/lib/api-client';

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: Clock },
  processing: { label: 'Processing', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-500/10 text-green-600 border-green-500/20', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/10 text-red-600 border-red-500/20', icon: X },
};

const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];

const Orders = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  const { data: orders, isLoading, error, refetch } = useOrders();

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders?.filter((o: ApiOrder) => o.status === filter);

  const copyTrackingNumber = (trackingNumber: string) => {
    navigator.clipboard.writeText(trackingNumber);
    toast.success('Tracking number copied to clipboard');
  };

  const getStatusProgress = (status: string) => {
    if (status === 'cancelled') return 0;
    const index = statusSteps.indexOf(status);
    return ((index + 1) / statusSteps.length) * 100;
  };

  return (
    <DashboardLayout 
      title="My Orders"
      description="Track and manage your orders"
    >
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {[
          { value: 'all', label: 'All Orders' },
          { value: 'processing', label: 'Processing' },
          { value: 'shipped', label: 'Shipped' },
          { value: 'delivered', label: 'Delivered' },
          { value: 'cancelled', label: 'Cancelled' },
        ].map((item) => (
          <Button
            key={item.value}
            variant={filter === item.value ? "default" : "secondary"}
            size="sm"
            onClick={() => setFilter(item.value)}
            className="rounded-full whitespace-nowrap"
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))
        ) : error ? (
          <ErrorMessage 
            title="Failed to load orders"
            message="We couldn't fetch your orders. Please try again."
            onRetry={() => refetch()}
          />
        ) : !filteredOrders || filteredOrders.length === 0 ? (
          <div className="bg-card rounded-3xl border border-border/50 p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-4">
              {filter === 'all' 
                ? "You haven't placed any orders yet." 
                : `No ${filter} orders found.`}
            </p>
            <Link to="/products">
              <Button className="rounded-full">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          filteredOrders.map((order: ApiOrder, index: number) => {
            const isExpanded = expandedOrder === order.id;
            const StatusIcon = statusConfig[order.status].icon;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div 
                  className="p-5 cursor-pointer hover:bg-secondary/20 transition-colors"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Product Images */}
                    <div className="flex -space-x-3">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div
                          key={i}
                          className="w-14 h-14 rounded-xl border-2 border-background overflow-hidden bg-secondary"
                        >
                          <img 
                            src={item.product.image} 
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-14 h-14 rounded-xl border-2 border-background bg-secondary flex items-center justify-center text-sm font-medium text-muted-foreground">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-foreground">
                          {order.orderNumber}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className={cn("rounded-full", statusConfig[order.status].color)}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[order.status].label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-display text-lg font-bold text-foreground">
                        ${order.total.toFixed(2)}
                      </p>
                      <div className="mt-1">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground ml-auto" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground ml-auto" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar for Active Orders */}
                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <div className="mt-4">
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${getStatusProgress(order.status)}%` }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Order Placed</span>
                        <span>Processing</span>
                        <span>Shipped</span>
                        <span>Delivered</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <Separator />
                      
                      {/* Order Items */}
                      <div className="p-5 bg-secondary/20">
                        <h4 className="text-sm font-semibold text-foreground mb-4">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item, i) => (
                            <Link
                              key={i}
                              to={`/product/${item.product.id}`}
                              className="flex items-center gap-4 p-3 bg-background rounded-2xl hover:shadow-md transition-shadow"
                            >
                              <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate">
                                  {item.product.name}
                                </p>
                                {item.color && (
                                  <div className="flex items-center gap-2 mt-1">
                                    <div 
                                      className="w-3 h-3 rounded-full border border-border"
                                      style={{ backgroundColor: item.color.hex }}
                                    />
                                    <span className="text-xs text-muted-foreground">
                                      {item.color.name}
                                    </span>
                                  </div>
                                )}
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-semibold text-foreground">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Order Details Grid */}
                      <div className="grid md:grid-cols-3 gap-6 p-5">
                        {/* Shipping Address */}
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            Shipping Address
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p className="font-medium text-foreground">{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                          </div>
                        </div>

                        {/* Payment */}
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                            <CreditCard className="h-4 w-4 text-primary" />
                            Payment Method
                          </div>
                          <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                          
                          {order.trackingNumber && (
                            <div className="mt-4">
                              <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                                <Truck className="h-4 w-4 text-primary" />
                                Tracking Number
                              </div>
                              <div className="flex items-center gap-2">
                                <code className="text-sm bg-secondary px-2 py-1 rounded">
                                  {order.trackingNumber}
                                </code>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyTrackingNumber(order.trackingNumber!);
                                  }}
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-secondary/30 rounded-2xl p-4">
                          <h4 className="text-sm font-semibold text-foreground mb-3">Order Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                              <span>Subtotal</span>
                              <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span>Shipping</span>
                              <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span>Tax</span>
                              <span>${order.tax.toFixed(2)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-semibold text-foreground">
                              <span>Total</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="px-5 pb-5 flex gap-3">
                        <Button variant="outline" className="rounded-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Invoice
                        </Button>
                        {order.status === 'delivered' && (
                          <Button variant="outline" className="rounded-full">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
};

export default Orders;
