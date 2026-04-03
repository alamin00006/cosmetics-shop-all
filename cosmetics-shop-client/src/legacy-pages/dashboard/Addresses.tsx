"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Plus, 
  Home, 
  Building2, 
  MapPinned,
  Edit3,
  Trash2,
  Check,
  Star
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAddresses, useCreateAddress, useUpdateAddress, useDeleteAddress, useSetDefaultAddress } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ApiAddress, CreateAddressDto } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import { AddressCardSkeleton, ErrorMessage } from '@/components/ui/loading-skeleton';

const addressTypeIcons = {
  home: Home,
  work: Building2,
  other: MapPinned,
};

const Addresses = () => {
  const { data: addresses, isLoading, error, refetch } = useAddresses();
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const deleteAddress = useDeleteAddress();
  const setDefaultAddress = useSetDefaultAddress();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<ApiAddress | null>(null);

  const handleSetAsDefault = (addressId: string) => {
    setDefaultAddress.mutate(addressId, {
      onSuccess: () => {
        toast.success('Default address updated');
      },
      onError: () => {
        toast.error('Failed to update default address');
      },
    });
  };

  const handleDeleteAddress = (addressId: string, isDefault: boolean) => {
    if (isDefault) {
      toast.error('Cannot delete default address');
      return;
    }
    
    deleteAddress.mutate(addressId, {
      onSuccess: () => {
        toast.success('Address deleted');
      },
      onError: () => {
        toast.error('Failed to delete address');
      },
    });
  };

  const handleSaveAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const addressData: CreateAddressDto = {
      type: formData.get('type') as 'home' | 'work' | 'other',
      name: formData.get('name') as string,
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      country: formData.get('country') as string,
      isDefault: editingAddress?.isDefault || (addresses?.length === 0),
    };

    if (editingAddress) {
      updateAddress.mutate(
        { id: editingAddress.id, data: addressData },
        {
          onSuccess: () => {
            toast.success('Address updated');
            setIsDialogOpen(false);
            setEditingAddress(null);
          },
          onError: () => {
            toast.error('Failed to update address');
          },
        }
      );
    } else {
      createAddress.mutate(addressData, {
        onSuccess: () => {
          toast.success('Address added');
          setIsDialogOpen(false);
        },
        onError: () => {
          toast.error('Failed to add address');
        },
      });
    }
  };

  const openEditDialog = (address: ApiAddress) => {
    setEditingAddress(address);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout 
      title="My Addresses"
      description="Manage your shipping addresses"
    >
      {/* Add Address Button */}
      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveAddress} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Address Type</Label>
                  <Select name="type" defaultValue={editingAddress?.type || 'home'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    defaultValue={editingAddress?.name}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input 
                  id="street" 
                  name="street" 
                  defaultValue={editingAddress?.street}
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    defaultValue={editingAddress?.city}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    name="state" 
                    defaultValue={editingAddress?.state}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input 
                    id="zipCode" 
                    name="zipCode" 
                    defaultValue={editingAddress?.zipCode}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    name="country" 
                    defaultValue={editingAddress?.country || 'United States'}
                    required 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingAddress(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createAddress.isPending || updateAddress.isPending}
                >
                  {editingAddress ? 'Update Address' : 'Save Address'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Addresses Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <AddressCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorMessage 
          title="Failed to load addresses"
          message="We couldn't fetch your addresses. Please try again."
          onRetry={() => refetch()}
        />
      ) : !addresses || addresses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border/50 p-12 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-10 w-10 text-primary" />
          </div>
          <h3 className="font-display text-xl font-semibold mb-2">No addresses saved</h3>
          <p className="text-muted-foreground mb-6">
            Add a shipping address to make checkout faster
          </p>
          <Button onClick={openAddDialog} className="rounded-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {addresses.map((address: ApiAddress, index: number) => {
              const TypeIcon = addressTypeIcons[address.type];
              
              return (
                <motion.div
                  key={address.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "bg-card rounded-3xl border shadow-sm overflow-hidden relative group",
                    address.isDefault 
                      ? "border-primary/50 ring-2 ring-primary/20" 
                      : "border-border/50"
                  )}
                >
                  {/* Default Badge */}
                  {address.isDefault && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Default
                      </Badge>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Type Icon & Label */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center",
                        address.type === 'home' && "bg-blue-500/10 text-blue-600",
                        address.type === 'work' && "bg-amber-500/10 text-amber-600",
                        address.type === 'other' && "bg-purple-500/10 text-purple-600"
                      )}>
                        <TypeIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground capitalize">
                          {address.type} Address
                        </h3>
                        <p className="text-sm text-muted-foreground">{address.name}</p>
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="text-sm text-muted-foreground space-y-1 mb-6">
                      <p>{address.street}</p>
                      <p>{address.city}, {address.state} {address.zipCode}</p>
                      <p>{address.country}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {!address.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => handleSetAsDefault(address.id)}
                          disabled={setDefaultAddress.isPending}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-9 w-9"
                        onClick={() => openEditDialog(address)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      {!address.isDefault && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-9 w-9 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteAddress(address.id, address.isDefault)}
                          disabled={deleteAddress.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Addresses;
