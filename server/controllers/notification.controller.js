import Notification from "../models/notification.model.js"

export const createNotification = async (request, response, next) => {
  try {
        const notification = new Notification({
        user_id: userId,
        message: message,
        link: link
        });
        await notification.save();
        response.status(201).json({message: "admin created successfully"});
    } catch (error) {
        next(error);
    }   
};
export const getUserNotifications  = async (request, response, next) => {
    try {
        const userId = request.userId;
        const notifications = await Notification.find({ user_id: userId, read: false })
          .populate('user_id') // this populates the user details in the notifications
          .sort({ created_at: -1 });
          response.status(201).json(notifications);
    } catch (error) {
        next(error);
    }   
};

export const markNotificationAsRead = async (req, res) => {
    const { notification } = req.body;
    try {
      const notif = await Notification.findByIdAndUpdate(notification._id, { read: true });
      if(notif.link === null){
        notif.read = true;
        await notif.save();
      }else{
        await Notification.updateMany(
            { user_id: notification.user_id, link: notification.link, read: false },
            { read: true }
          );
      }
      
      res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      res.status(500).json({ error: 'Failed to mark notifications as read' });
    }
  };