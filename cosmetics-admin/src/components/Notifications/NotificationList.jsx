import { useEffect, useState } from "react";
import Notifications from "./Notifications";

const NotificationList = ({ notifications, onDismiss }) => {
  const [notificationList, setNotificationList] = useState([]);

  // Load dismissed notifications from local storage and filter notifications
  useEffect(() => {
    const dismissedNotifications =
      JSON.parse(localStorage.getItem("dismissedNotifications")) || [];
    const filteredNotifications = notifications?.filter(
      (notification) => !dismissedNotifications.includes(notification?._id)
    );

    setNotificationList(filteredNotifications);
  }, [notifications]);

  const dismissNotification = (id) => {
    // Update the dismissed notifications in local storage
    const dismissedNotifications =
      JSON.parse(localStorage.getItem("dismissedNotifications")) || [];

    if (!dismissedNotifications.includes(id)) {
      dismissedNotifications.push(id);
      localStorage.setItem(
        "dismissedNotifications",
        JSON.stringify(dismissedNotifications)
      );
    }

    // Remove the notification from the display list
    setNotificationList((prevList) =>
      prevList.filter((notification) => notification?._id !== id)
    );

    // Call the onDismiss function to update unread count in NotificationData
    onDismiss(id);
  };

  return (
    <div>
      {notificationList.length > 0 ? (
        notificationList.map((notification) => (
          <Notifications
            key={notification?._id}
            notification={notification}
            onDismiss={dismissNotification}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No notifications</p>
      )}
    </div>
  );
};

export default NotificationList;
