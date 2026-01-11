import { Bell, CheckCircle, AlertTriangle, TrendingUp, User, Target, Lightbulb, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Notification {
  id: string;
  type: 'fact-check' | 'credibility' | 'similar-post' | 'task' | 'analysis' | 'insight' | 'bias' | 'trending';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export function NotificationView() {
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
    {
      id: '6',
      type: 'insight',
      title: 'New insight generated',
      message: 'AI discovered a pattern: 78% of top performers post between 9-11 AM on weekdays.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      read: true,
    },
    {
      id: '7',
      type: 'trending',
      title: 'Trending topic detected',
      message: '#AI and #MachineLearning are trending in your network with 245 mentions today.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
      read: true,
    },
    {
      id: '8',
      type: 'analysis',
      title: 'Analysis ready',
      message: 'Your weekly content analysis report is ready. 127 posts analyzed with 18 key insights.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
  ];

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'fact-check':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'credibility':
        return <User className="w-5 h-5 text-blue-500" />;
      case 'similar-post':
        return <Target className="w-5 h-5 text-purple-500" />;
      case 'task':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'analysis':
        return <BarChart3 className="w-5 h-5 text-blue-500" />;
      case 'insight':
        return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'bias':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'trending':
        return <TrendingUp className="w-5 h-5 text-pink-500" />;
      default:
        return <Bell className="w-5 h-5 text-slate-500" />;
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 dark:text-slate-100">Notifications</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Stay updated with your content insights
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
              {unreadCount} new
            </span>
            <Button variant="outline" size="sm">
              Mark all as read
            </Button>
          </div>
        )}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 transition-all hover:shadow-md cursor-pointer ${
              !notification.read
                ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`p-2 rounded-lg flex-shrink-0 ${
                !notification.read 
                  ? 'bg-white dark:bg-slate-800' 
                  : 'bg-slate-50 dark:bg-slate-900'
              }`}>
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm font-medium ${
                    !notification.read 
                      ? 'text-slate-900 dark:text-slate-100' 
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {notification.message}
                </p>
                {!notification.read && (
                  <div className="flex items-center gap-2 mt-3">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white text-xs h-7">
                      View details
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      Mark as read
                    </Button>
                  </div>
                )}
              </div>

              {/* Unread indicator */}
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Empty state if no notifications */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
            No notifications yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            You're all caught up! Check back later for updates.
          </p>
        </div>
      )}
    </div>
  );
}
