import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, Star } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useWishlist, useRemoveFromWishlist, useAddToCart } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { WishlistCardSkeleton, ErrorMessage } from '@/components/ui/loading-skeleton';
import { ApiWishlistItem } from '@/lib/api-client';

const Wishlist = () => {
  const { data: wishlist, isLoading, error, refetch } = useWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const addToCart = useAddToCart();

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist.mutate(productId, {
      onSuccess: () => {
        toast.success('Removed from wishlist');
      },
      onError: () => {
        toast.error('Failed to remove from wishlist');
      },
    });
  };

  const handleAddToCart = (item: ApiWishlistItem) => {
    addToCart.mutate(
      { 
        productId: item.product.id, 
        quantity: 1, 
        colorId: item.product.colors?.[0]?.id 
      },
      {
        onSuccess: () => {
          toast.success(`${item.product.name} added to bag!`);
        },
        onError: () => {
          toast.error('Failed to add to cart');
        },
      }
    );
  };

  const handleMoveAllToCart = () => {
    if (!wishlist) return;
    
    wishlist.forEach((item: ApiWishlistItem) => {
      addToCart.mutate({
        productId: item.product.id,
        quantity: 1,
        colorId: item.product.colors?.[0]?.id,
      });
    });
    toast.success(`${wishlist.length} items added to bag!`);
  };

  return (
    <DashboardLayout 
      title="My Wishlist"
      description={`${wishlist?.length || 0} item${(wishlist?.length || 0) !== 1 ? 's' : ''} saved for later`}
    >
      {wishlist && wishlist.length > 0 && (
        <div className="flex justify-end mb-6">
          <Button onClick={handleMoveAllToCart} className="rounded-full" disabled={addToCart.isPending}>
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add All to Bag
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <WishlistCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorMessage 
          title="Failed to load wishlist"
          message="We couldn't fetch your wishlist. Please try again."
          onRetry={() => refetch()}
        />
      ) : !wishlist || wishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border/50 p-12 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
            <Heart className="h-10 w-10 text-rose-500" />
          </div>
          <h3 className="font-display text-xl font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">
            Save items you love by clicking the heart icon on products
          </p>
          <Link to="/products">
            <Button className="rounded-full">Explore Products</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {wishlist.map((item: ApiWishlistItem, index: number) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden group"
              >
                <div className="flex">
                  {/* Product Image */}
                  <Link 
                    to={`/product/${item.product.id}`}
                    className="w-32 sm:w-40 flex-shrink-0 relative overflow-hidden"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">
                        NEW
                      </Badge>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="flex-1">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.product.brand}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{item.product.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({item.product.reviewCount})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="font-display text-lg font-bold text-foreground">
                          ${item.product.price.toFixed(2)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Colors */}
                      {item.product.colors && item.product.colors.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-3">
                          {item.product.colors.slice(0, 4).map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            />
                          ))}
                          {item.product.colors.length > 4 && (
                            <span className="text-xs text-muted-foreground">
                              +{item.product.colors.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        size="sm"
                        className="flex-1 rounded-full"
                        disabled={!item.product.inStock || addToCart.isPending}
                      >
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        {item.product.inStock ? 'Add to Bag' : 'Out of Stock'}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-9 w-9 text-muted-foreground hover:text-destructive hover:border-destructive"
                        onClick={() => handleRemoveFromWishlist(item.product.id)}
                        disabled={removeFromWishlist.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Added Date */}
                <div className="px-4 pb-3 text-xs text-muted-foreground">
                  Added on {new Date(item.addedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Wishlist;
