const UserReducer = (state, action) => {
    switch (action.type) {
        case "SOCKET":
            return {
                ...state,
                socket: action.payload,
            };
        case "ONLINE_USERS":
            return {
                ...state,
                onlineUsers: action.payload,
            };
        case "ARRIVAL_MESSAGE":
            return {
                ...state,
                message: action.payload,
            };
        case "ADD_NOTIFICATION":
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };     
        case "READ_NOTIFICATIONS":
            return {
                ...state,
                notifications: state.notifications.filter(notification => notification.type !== action.payload),
            };    
        case "CLEAR_NOTIFICATIONS":
            return {
                ...state,                
                notifications: [],
            }; 
        default:
            return { ...state };
    }
};

export default UserReducer;