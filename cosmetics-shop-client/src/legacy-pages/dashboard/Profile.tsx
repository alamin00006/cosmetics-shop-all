"use client";

import { motion } from 'framer-motion';
import { 
  User,
  Mail,
  Phone,
  Camera,
  Save,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useProfile, useUpdateProfile, useChangePassword } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ErrorMessage } from '@/components/ui/loading-skeleton';

const Profile = () => {
  const { data: user, isLoading, error, refetch } = useProfile();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    sms: false,
  });

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    updateProfile.mutate(
      {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
      },
      {
        onSuccess: () => {
          toast.success('Profile updated successfully');
        },
        onError: () => {
          toast.error('Failed to update profile');
        },
      }
    );
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    changePassword.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          toast.success('Password changed successfully');
          (e.target as HTMLFormElement).reset();
        },
        onError: () => {
          toast.error('Failed to change password');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <DashboardLayout 
        title="Profile Settings"
        description="Manage your account settings and preferences"
      >
        <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center gap-6">
            <Skeleton className="h-28 w-28 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout 
        title="Profile Settings"
        description="Manage your account settings and preferences"
      >
        <ErrorMessage 
          title="Failed to load profile"
          message="We couldn't fetch your profile. Please try again."
          onRetry={() => refetch()}
        />
      </DashboardLayout>
    );
  }

  if (!user) return null;

  return (
    <DashboardLayout 
      title="Profile Settings"
      description="Manage your account settings and preferences"
    >
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1 rounded-full">
          <TabsTrigger value="profile" className="rounded-full data-[state=active]:bg-background">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-full data-[state=active]:bg-background">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-full data-[state=active]:bg-background">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden"
          >
            {/* Avatar Section */}
            <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="font-display text-2xl font-bold text-foreground">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <Separator />

            {/* Profile Form */}
            <form onSubmit={handleProfileSubmit} className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Full Name
                  </Label>
                  <Input 
                    id="name" 
                    name="name" 
                    defaultValue={user.name}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Address
                  </Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    defaultValue={user.email}
                    className="rounded-xl"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel"
                    defaultValue={user.phone || ''}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="rounded-full" disabled={updateProfile.isPending}>
                  {updateProfile.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Change Password */}
            <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Change Password</h3>
                    <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input 
                      id="currentPassword" 
                      name="currentPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="rounded-xl pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" className="rounded-full" disabled={changePassword.isPending}>
                    {changePassword.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : null}
                    Update Password
                  </Button>
                </div>
              </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-card rounded-3xl border border-border/50 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full">
                  Enable
                </Button>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">Choose what you want to be notified about</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-border/50">
              {[
                {
                  key: 'orderUpdates',
                  title: 'Order Updates',
                  description: 'Get notified about your order status',
                },
                {
                  key: 'promotions',
                  title: 'Promotions & Offers',
                  description: 'Receive exclusive deals and promotions',
                },
                {
                  key: 'newsletter',
                  title: 'Newsletter',
                  description: 'Weekly beauty tips and product launches',
                },
                {
                  key: 'sms',
                  title: 'SMS Notifications',
                  description: 'Receive updates via text message',
                },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-6">
                  <div>
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => {
                      setNotifications(prev => ({ ...prev, [item.key]: checked }));
                      toast.success(`${item.title} ${checked ? 'enabled' : 'disabled'}`);
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Profile;
