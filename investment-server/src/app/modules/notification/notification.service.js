import Notification from "./notification.model.js";

const getNotification = async (payload) => {
  const query = {
    user: payload?.userId,
    status: "unread",
  };

  const notifications = await Notification.find(query).sort({
    timestamp: -1,
  });
  return notifications;
};
const updateNotification = async (id) => {
  const query = {
    _id: id,
  };

  const notifications = await Notification.updateOne(query, {
    $set: {
      status: "read",
      dismissed: true,
    },
  });

  return notifications;
};
const updateAllNotification = async (payload) => {
  //   console.log(payload);
  const notifications = await Notification.updateMany(
    { user: payload?.user, status: "unread" },
    {
      $set: {
        status: "read",
        dismissed: true,
      },
    }
  );

  return notifications;
};

export const NotificationService = {
  getNotification,
  updateNotification,
  updateAllNotification,
};
