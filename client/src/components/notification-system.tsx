import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { 
  Bell, X, Check, AlertCircle, Info, CheckCircle, AlertTriangle
} from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  isRead: boolean;
  createdAt: string;
}

export default function NotificationSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications, isLoading, error } = useQuery({
    queryKey: ['/api/notifications'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/notifications');
        if (!res.ok) {
          console.warn('Notifications API not available');
          return [];
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      } catch (error) {
        console.warn('Failed to fetch notifications:', error);
        return [];
      }
    },
    refetchInterval: 5000,
    retry: false,
    enabled: true,
    initialData: []
  });

  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: number) => 
      apiRequest("PUT", `/api/notifications/${notificationId}/read`),
    onSuccess: () => {
      // Immediately refetch to update the UI
      queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
      queryClient.refetchQueries({ queryKey: ['/api/notifications'] });
    }
  });

  const unreadCount = Array.isArray(notifications) ? notifications.filter((n: Notification) => !n.isRead).length : 0;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "error": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "success": return "bg-green-50 border-green-200";
      case "warning": return "bg-yellow-50 border-yellow-200";
      case "error": return "bg-red-50 border-red-200";
      default: return "bg-blue-50 border-blue-200";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const handleMarkAsRead = (notificationId: number) => {
    markAsReadMutation.mutate(notificationId);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] z-10">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Loading notifications...</p>
              </div>
            ) : Array.isArray(notifications) && notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification: Notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-xs h-6 px-2"
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatTime(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}