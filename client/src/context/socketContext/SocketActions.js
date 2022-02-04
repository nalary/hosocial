export const Socket = (socket) => ({
    type: "SOCKET",
    payload: socket,
});

export const OnlineUsers = (onlineUsers) => ({
    type: "ONLINE_USERS",
    payload: onlineUsers,
});

export const ArrivalMessage = (message) => ({
    type: "ARRIVAL_MESSAGE",
    payload: message,
});

export const Add_Notification = (notification) => ({
    type: "ADD_NOTIFICATION",
    payload: notification,
});

export const ReadNotifications = (type) => ({
    type: "READ_NOTIFICATIONS",
    payload: type,
});

export const ClearNotifications = () => ({
    type: "CLEAR_NOTIFICATIONS",
});