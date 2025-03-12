import React, { useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'warning';

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500',
  }[type];

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg
                shadow-lg flex items-center justify-between min-w-[300px] z-50
                animate-slide-up`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 hover:text-gray-200 transition-colors"
      >
        ✕
      </button>
    </div>
  );
};

export default Notification; 