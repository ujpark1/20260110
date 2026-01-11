import { useState } from 'react';
import { Bell, MessageSquare, CheckCircle, AlertTriangle, TrendingUp, User, Target, Lightbulb, BarChart3, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface Notification {
  id: string;
  type: 'fact-check' | 'credibility' | 'similar-post' | 'task' | 'analysis' | 'insight' | 'bias' | 'trending';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface TopNavigationProps {
  chatOpen: boolean;
  onToggleChat: () => void;
}

export function TopNavigation({ chatOpen, onToggleChat }: TopNavigationProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'fact-check',
      title: 'Fact-check completed',
      message: 'AI fact-checking found 2 claims that need verification in your recent post about climate data.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
      read: false,
    },
    {
      id: '2',
      type: 'credibility',
      title: 'Author credibility updated',
      message: 'Sarah Chen\'s credibility score increased to 92% based on recent verified content.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
    },
    {
      id: '3',
      type: 'similar-post',
      title: 'Similar content detected',
      message: 'Found 3 posts discussing similar topics about AI regulation in your timeline.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: true,
    },
    {
      id: '4',
      type: 'task',
      title: 'Task completed',
      message: 'You completed "Review LinkedIn posts about product launch" - Great work!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: true,
    },
    {
      id: '5',
      type: 'bias',
      title: 'Bias detection alert',
      message: 'Detected potential confirmation bias in 4 posts from your feed today.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      read: true,
    },
  ];

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'fact-check':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'credibility':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'similar-post':
        return <Target className="w-4 h-4 text-purple-500" />;
      case 'task':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'analysis':
        return <BarChart3 className="w-4 h-4 text-blue-500" />;
      case 'insight':
        return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'bias':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-pink-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else {
      return `${days}d ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="hidden lg:block fixed top-0 left-64 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-30">
      <div className="h-full px-6 flex items-center justify-end gap-3">
        {/* Notification Bell */}
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" align="end">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" className="text-xs h-7">
                    Mark all as read
                  </Button>
                )}
              </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                    <Bell className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    No notifications yet
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm">{notification.title}</h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                            {notification.message}
                          </p>
                          <span className="text-xs text-slate-500 dark:text-slate-500 mt-1 inline-block">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* AI Chat Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleChat}
          className={chatOpen ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''}
        >
          <Sparkles className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}