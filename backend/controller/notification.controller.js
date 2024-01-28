const { notification } = require("../model/notification.model");
const responseSender = require("../utils/responseSender");

const usernotification = async (req, resp) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return resp
                .status(400)
                .send(responseSender(false, 400, "Invalid user", null));
        }

        const userNotifications = await notification.find({ user: userId });

        if (!userNotifications || userNotifications.length === 0) {
            return resp
                .status(404)
                .send(responseSender(false, 404, "No notifications found for the user", null));
        }

        return resp
            .status(200)
            .send(responseSender(true, 200, "Fetching user notifications", userNotifications));
    } catch (error) {
        console.error(error);
        return resp
            .status(500)
            .send(responseSender(false, 500, "Internal server error", null));
    }
}

module.exports = { usernotification };
