import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    default: "general",
  },
  status: {
    type: String,
    enum: ["read", "unread"],
    default: "unread",
  },
  dismissed: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;

// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema(
//   {
//     message: {
//       type: String,
//       required: true,  // The content of the notification
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",  // Reference to the user the notification is for
//     },
//     roles: {
//       type: [String],  // Array to handle multiple roles
//       enum: ['admin', 'superadmin', 'PRManager', 'user'],  // Add more roles as needed
//       default: ['user'],  // Default to 'user' role if no specific role is provided
//     },
//     type: {
//       type: String,
//       enum: ['general', 'alert', 'update', 'message'],  // Different notification types
//       default: 'general',
//     },
//     status: {
//       type: String,
//       enum: ["read", "unread"],  // Mark notifications as read or unread
//       default: "unread",
//     },
//     dismissed: {
//       type: Boolean,
//       default: false,  // Indicates if the notification was dismissed
//     },
//     timestamp: {
//       type: Date,
//       default: Date.now,  // Default timestamp for when the notification is created
//     },
//     readBy: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",  // Track which users have read the notification
//     }],
//   },
//   { timestamps: true }  // Automatically add createdAt and updatedAt fields
// );

// const Notification = mongoose.model("Notification", notificationSchema);

// export default Notification;

// server.js or another controller file

// import Notification from './models/Notification.js';
// import User from './models/User.js';
// import io from 'socket.io';  // Assuming you're using Socket.IO

// // Create and send a notification for specific roles
// const sendNotification = async (message, roles = ['user'], userId = null, type = 'general') => {
//   try {
//     // Create a new notification document
//     const notification = new Notification({
//       message,
//       roles,  // Assign roles
//       user: userId,  // If you have a specific user
//       type,  // Specify the type of notification
//     });

//     // Save the notification to the database
//     await notification.save();

//     // Emit the notification to users with the specified roles via Socket.IO
//     roles.forEach((role) => {
//       if (role === 'admin') {
//         io.emit('receiveAdminNotification', notification);
//       } else if (role === 'superadmin') {
//         io.emit('receiveSuperAdminNotification', notification);
//       } else if (role === 'PRManager') {
//         io.emit('receivePRManagerNotification', notification);
//       } else if (role === 'user') {
//         io.emit('receiveUserNotification', notification);
//       }
//     });

//     console.log('Notification sent:', notification);
//   } catch (err) {
//     console.error('Error sending notification:', err);
//   }
// };

// // Example usage
// sendNotification('This is an important update for admins!', ['admin', 'superadmin'], null, 'alert');

// Fetch notifications for a specific role
// const getNotificationsForRole = async (role) => {
//   try {
//     const notifications = await Notification.find({
//       roles: { $in: [role] },  // Find notifications with the specified role
//     }).sort({ timestamp: -1 });  // Sort by the latest notifications

//     console.log('Notifications for role', role, notifications);
//     return notifications;
//   } catch (err) {
//     console.error('Error fetching notifications:', err);
//   }
// };

// // Example usage
// getNotificationsForRole('admin');  // Get all admin notifications

// Mark a notification as read for a specific user
// const markNotificationAsRead = async (notificationId, userId) => {
//   try {
//     const notification = await Notification.findById(notificationId);

//     // Add the user to the readBy array (if not already there)
//     if (!notification.readBy.includes(userId)) {
//       notification.readBy.push(userId);
//     }

//     // Update the status and save the notification
//     notification.status = 'read';
//     await notification.save();

//     console.log('Notification marked as read:', notification);
//   } catch (err) {
//     console.error('Error marking notification as read:', err);
//   }
// };

// // Example usage
// markNotificationAsRead('60d5c8f0f88b6e1a3484c9f2', '60d5c8f0f88b6e1a3484c9f1');  // Mark notification as read for a specific user

// Hooks

// hooks/useSocket.js

// import { useEffect } from 'react';
// import io from 'socket.io-client';

// let socket;

// const useSocket = (role) => {
//   useEffect(() => {
//     socket = io('http://localhost:3001');  // Replace with your server URL

//     // Listen for notifications based on the user's role
//     if (role === 'admin') {
//       socket.on('receiveAdminNotification', (notification) => {
//         console.log('Admin Notification:', notification);
//         // Handle admin-specific notification (e.g., display it in the UI)
//       });
//     } else if (role === 'superadmin') {
//       socket.on('receiveSuperAdminNotification', (notification) => {
//         console.log('SuperAdmin Notification:', notification);
//         // Handle superadmin-specific notification
//       });
//     } else if (role === 'PRManager') {
//       socket.on('receivePRManagerNotification', (notification) => {
//         console.log('PRManager Notification:', notification);
//         // Handle PRManager-specific notification
//       });
//     } else {
//       socket.on('receiveUserNotification', (notification) => {
//         console.log('User Notification:', notification);
//         // Handle general user notification
//       });
//     }

//     return () => {
//       socket.disconnect();
//     };
//   }, [role]);

//   return {};
// };

// export default useSocket;
