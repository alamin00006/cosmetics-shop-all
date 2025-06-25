const notification = (req, res, next) => {
  res.on("finish", () => {
    if (res.statusCode === 201 && req.notificationMessage) {
      const io = req.app.get("socketio");
      console.log("Emitting new notification:", req.notificationMessage); // Log before emitting
      io.emit("new_notification", {
        message: req.notificationMessage,
        timestamp: new Date(),
      });
    }
  });

  next();
};

export default notification;
