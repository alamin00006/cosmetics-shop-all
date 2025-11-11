const Notification = ({ notification, onDismiss }) => (
  <div className="p-4 rounded-lg mb-3 bg-white ">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{notification?.message}</p>
      </div>
      <button
        onClick={() => onDismiss(notification?._id)}
        className="text-sm px-2 py-1 rounded text-rose-600 font-bold"
      >
        Dismiss
      </button>
    </div>
  </div>
);

export default Notification;
