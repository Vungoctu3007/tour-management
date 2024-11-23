// NotificationProvider.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext();
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const showNotification = useCallback((message, type = 'success', duration = 3000) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type, duration }]);
    }, []);
    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, []);
    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            {notifications.map(({ id, message, type, duration }) => (
                <Snackbar
                    key={id}
                    open
                    autoHideDuration={duration}
                    onClose={() => removeNotification(id)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert
                        onClose={() => removeNotification(id)}
                        severity={type}
                        sx={{
                            width: '100%',
                            fontSize: '1.2rem', 
                            padding: '16px', 
                            '& .MuiAlert-message': {
                                fontWeight: 'bold', 
                            },
                            marginLeft: '10px',
                        }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            ))}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification phải được sử dụng trong 1 NotificationProvider');
    }
    return context;
};
