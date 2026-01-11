import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { mockPosts } from '../lib/mockData';
import { Linkedin, Twitter, Mic, CheckCircle2, AlertCircle, Globe, FileText, Book, Sparkles, X, Send, Paperclip, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface RecentPostCardProps {
  post: typeof mockPosts[0];
}

export function RecentPostCard({ post }: RecentPostCardProps) {
  const [floatingChatOpen, setFloatingChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleOpenFloatingChat = () => {
    setFloatingChatOpen(true);
    
    // Initialize with AI's response from the post
    if (post.aiAnalysis) {
      setChatMessages([
        {
          role: 'assistant',
          content: post.aiAnalysis.aiResponse,
          timestamp: new Date()
        }
      ]);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, userMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: generateContextualResponse(chatInput, post),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateContextualResponse = (query: string, post: typeof mockPosts[0]): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('source')) {
      if (post.author) {
        return `This post was published by ${post.author}(${post.authorHandle}) on ${post.platform}.`;
      } else if (post.sourceName) {
        return `This post is from ${post.sourceName}(${post.sourceUrl}).`;
      } else {
        return 'This post has no clear source. It was either directly saved by you or collected from an unofficial channel.';
      }
    } else if (lowerQuery.includes('credibility')) {
      if (post.aiAnalysis) {
        const level = post.aiAnalysis.credibilityLevel;
        if (level === 'high') {
          return 'This post has high credibility. It is from a verified source or has academic basis.';
        } else if (level === 'medium') {
          return 'This post has medium credibility. Some verification is needed or it contains subjective opinions.';
        } else {
          return 'This post has low credibility. The source is unclear or it contains unverified claims, requiring caution.';
        }
      }
    } else if (lowerQuery.includes('summary')) {
      return `Post content: \"${post.content.slice(0, 100)}...\" ${post.voiceMemo ? `\\n\\nYour memo: \"${post.voiceMemo}\"` : ''}`;
    }
    
    return `If you have specific questions about this post, please ask. I can answer about the source, credibility, related information, etc.`;
  };

  const handleCompleteTask = () => {
    toast('Task completed. You can see this post in the History tab.', {
      duration: 5000,
    });
  };

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    toast('Post has been deleted.', {
      duration: 3000,
    });
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const getCredibilityLabel = (level: 'high' | 'medium' | 'low') => {
    if (level === 'high') return 'High Credibility';
    if (level === 'medium') return 'Medium Credibility';
    return 'Low Credibility';
  };

  const getCredibilityColor = (level: 'high' | 'medium' | 'low') => {
    if (level === 'high') return 'text-green-700 bg-green-50 border-green-200';
    if (level === 'medium') return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getCredibilityIcon = (level: 'high' | 'medium' | 'low') => {
    if (level === 'high') return <CheckCircle2 className="w-3 h-3" />;
    return <AlertCircle className="w-3 h-3" />;
  };

  const getCategoryLabel = (category?: string) => {
    if (!category) return null;
    const labels = {
      'web-search': 'Web Search',
      'fact-check': 'Fact Check',
      'remind': 'Remind',
      'summarize': 'Summarize',
      'explain': 'Explain Easier'
    };
    return labels[category as keyof typeof labels];
  };

  const getCategoryColor = (category?: string) => {
    if (!category) return 'bg-slate-100 text-slate-900';
    const colors = {
      'web-search': 'bg-blue-50 text-blue-900 border-blue-200',
      'fact-check': 'bg-red-50 text-red-900 border-red-200',
      'remind': 'bg-yellow-50 text-yellow-900 border-yellow-200',
      'summarize': 'bg-green-50 text-green-900 border-green-200',
      'explain': 'bg-purple-50 text-purple-900 border-purple-200'
    };
    return colors[category as keyof typeof colors] || 'bg-slate-100 text-slate-900';
  };

  const getPlatformIcon = () => {
    if (post.platform === 'linkedin') return <span className="text-xs font-medium text-slate-600">LinkedIn</span>;
    if (post.platform === 'x') return <span className="text-xs font-medium text-slate-600">X</span>;
    if (post.platform === 'article') return <FileText className="w-4 h-4" />;
    if (post.platform === 'blog') return <Book className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <>
      <Card 
        className="cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardContent className="p-6">
          <div className="space-y-3">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-3">
              {/* Left: Author Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {post.author ? (
                  <>
                    {(post.platform === 'linkedin' || post.platform === 'x') && post.authorAvatar ? (
                      <img 
                        src={post.authorAvatar} 
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm">{post.author}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="truncate">{post.authorTitle || post.authorHandle}</span>
                        <span>•</span>
                        {(post.platform === 'linkedin' || post.platform === 'x') && (
                          <>
                            {getPlatformIcon()}
                            <span>•</span>
                          </>
                        )}
                        <span>{post.capturedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </>
                ) : post.sourceName ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                      {getPlatformIcon()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate">{post.sourceName}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="truncate">{post.sourceUrl}</span>
                        <span>•</span>
                        {(post.platform === 'linkedin' || post.platform === 'x') && (
                          <>
                            {getPlatformIcon()}
                            <span>•</span>
                          </>
                        )}
                        <span>{post.capturedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                      {getPlatformIcon()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-600 text-sm">No Source</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Directly Saved Content</span>
                        <span>•</span>
                        {(post.platform === 'linkedin' || post.platform === 'x') && (
                          <>
                            {getPlatformIcon()}
                            <span>•</span>
                          </>
                        )}
                        <span>{post.capturedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                {post.category && (
                  <Badge variant="outline" className={getCategoryColor(post.category)}>
                    {getCategoryLabel(post.category)}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCompleteTask();
                  }}
                  className="h-8 w-8 p-0"
                  title="Complete Task"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenFloatingChat();
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteDialogOpen(true);
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-2">
              <p className="text-sm text-slate-900">
                {isExpanded ? post.content : truncateText(post.content, 100)}
              </p>

              {/* Voice Memo - Collapsed View */}
              {post.voiceMemo && !isExpanded && (
                <div className="flex items-start gap-2 text-sm text-slate-700">
                  <Mic className="w-4 h-4 mt-0.5 text-slate-500 flex-shrink-0" />
                  <p>{truncateText(post.voiceMemo, 80)}</p>
                </div>
              )}
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="space-y-3 pt-3 border-t">
                {/* Voice Memo - Expanded */}
                {post.voiceMemo && (
                  <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                    <div className="flex items-start gap-2">
                      <Mic className="w-4 h-4 mt-0.5 text-slate-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-600 mb-1">Your Voice Memo:</p>
                        <p className="text-sm text-slate-900">{post.voiceMemo}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                )}

                {/* AI Response */}
                {post.aiAnalysis && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">AI Response</p>
                      <Badge className={getCredibilityColor(post.aiAnalysis.credibilityLevel)}>
                        <span className="flex items-center gap-1">
                          {getCredibilityIcon(post.aiAnalysis.credibilityLevel)}
                          <span className="text-xs">{getCredibilityLabel(post.aiAnalysis.credibilityLevel)}</span>
                        </span>
                      </Badge>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-sm text-slate-900 whitespace-pre-line">{post.aiAnalysis.aiResponse}</p>
                    </div>

                    {/* Next Steps */}
                    {post.aiAnalysis.nextSteps && post.aiAnalysis.nextSteps.length > 0 && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-900 mb-2 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Recommended Next Steps:
                        </p>
                        <ul className="text-sm text-blue-900 space-y-1">
                          {post.aiAnalysis.nextSteps.map((step, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-0.5">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Floating Chat Interface */}
      {floatingChatOpen && (
        <div className="fixed bottom-0 right-0 w-full h-full sm:bottom-6 sm:right-6 sm:w-96 sm:h-[700px] bg-white sm:rounded-lg shadow-2xl border border-slate-200 flex flex-col z-50">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 sm:rounded-t-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-slate-700" />
              <h3 className="font-semibold text-sm">AI Chat</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFloatingChatOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Post Summary */}
          <div className="p-3 bg-slate-50 border-b border-slate-200">
            <p className="text-xs text-slate-600 mb-1">Analyzing Post:</p>
            <p className="text-xs text-slate-900 line-clamp-2">{post.content}</p>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3" ref={chatRef}>
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className="text-xs whitespace-pre-line">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-3 border-t border-slate-200 flex-shrink-0">
            <div className="flex gap-2">
              <Button 
                onClick={() => console.log('File attachment clicked')} 
                size="sm" 
                variant="outline"
                className="flex-shrink-0"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Ask follow-up questions..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="text-sm"
              />
              <Button onClick={handleSendMessage} size="sm" className="bg-slate-900 hover:bg-slate-800 flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? Deleted posts cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}