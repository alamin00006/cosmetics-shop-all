import axios from "axios";
import io from "socket.io-client";
import NotificationList from "./NotificationList";
import { FiBell } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import { getBaseUrl, getMainBaseUrl } from "@/helpers/config/envConfig";

const NotificationData = ({
  IsNotificationOpen,
  setIsNotificationOpen,
  setIsDropdownOpen,
}) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null); // Reference for the notification dropdown

  useEffect(() => {
    // Connect to Socket.IO server
    const socket = io(`${getMainBaseUrl()}`);

    // Listen for new notifications and increment the unread count
    socket.on("new_notification", (data) => {
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
      setUnreadCount((prevCount) => prevCount + 1); // Increment unread count only when new notifications arrive
    });

    // Fetch existing notifications from the database
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/notifications`);
        setNotifications(response.data);

        // Initialize unread count based on fetched notifications
        const dismissedNotifications =
          JSON.parse(localStorage.getItem("dismissedNotifications")) || [];
        const initialUnreadCount = response.data.filter(
          (notification) => !dismissedNotifications.includes(notification?._id)
        ).length;

        setUnreadCount(initialUnreadCount); // Set unread count based on fetched data
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Toggle the notification dropdown
  const ToggleNotifications = () => {
    setIsNotificationOpen((prev) => {
      if (!prev) {
        setUnreadCount(0); // Reset unread count when opening the notification list
      }
      return !prev; // Toggle the open state
    });
    setIsDropdownOpen(false);
  };

  // Handle clicks outside the notification dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsNotificationOpen]);

  return (
    <div ref={notificationRef}>
      <button
        onClick={ToggleNotifications}
        className="relative p-2 rounded-full focus:outline-none"
      >
        <FiBell className="h-6 w-6 text-gray-600 hover:text-blue-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>
      {IsNotificationOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4">
          <NotificationList
            notifications={notifications}
            onDismiss={(id) => {
              setNotifications((prevNotifications) =>
                prevNotifications.filter(
                  (notification) => notification._id !== id
                )
              );
              setUnreadCount((prevCount) => Math.max(prevCount - 1, 0));
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationData;
