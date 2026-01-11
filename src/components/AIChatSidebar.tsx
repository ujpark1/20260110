import { useState } from 'react';
import { Send, MoreVertical, Plus, History, ArrowLeft, MessageSquare, X, CheckCircle2, AlertCircle, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  lastUpdated: Date;
}

interface Post {
  id: string;
  content: string;
  author?: string;
  authorHandle?: string;
  platform?: string;
  capturedAt: Date;
  voiceMemo?: string;
  aiAnalysis?: {
    aiResponse: string;
    credibilityLevel: 'high' | 'medium' | 'low';
  };
}

interface AIChatSidebarProps {
  onClose?: () => void;
  postContext?: Post | null;
  chatActivated?: boolean;
  onClearContext?: () => void;
}

export function AIChatSidebar({ onClose, postContext, chatActivated = false, onClearContext }: AIChatSidebarProps) {
  const [currentChatId, setCurrentChatId] = useState<string>('default');
  const [chatSessions, setChatSessions] = useState<Record<string, ChatSession>>({
    default: {
      id: 'default',
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      lastUpdated: new Date(),
    },
  });
  const [inputValue, setInputValue] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showPostContext, setShowPostContext] = useState(true);

  const currentChat = chatSessions[currentChatId];
  const messages = currentChat?.messages || [];

  const promptPills = [
    {
      text: "Summarize today's insights",
    },
    {
      text: "What are my pending tasks?",
    },
    {
      text: "Show top authors this week",
    },
    {
      text: "Find similar posts",
    },
  ];

  const handleSendMessage = (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    // Update chat title based on first message
    const isFirstMessage = currentChat.messages.length === 0;
    const newTitle = isFirstMessage ? messageContent.slice(0, 30) + (messageContent.length > 30 ? '...' : '') : currentChat.title;

    setChatSessions((prev) => ({
      ...prev,
      [currentChatId]: {
        ...prev[currentChatId],
        title: newTitle,
        messages: [...prev[currentChatId].messages, userMessage],
        lastUpdated: new Date(),
      },
    }));
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        role: 'assistant',
        content: `I understand you're asking about "${messageContent}". Let me analyze your captured content...`,
        timestamp: new Date(),
      };
      setChatSessions((prev) => ({
        ...prev,
        [currentChatId]: {
          ...prev[currentChatId],
          messages: [...prev[currentChatId].messages, aiMessage],
          lastUpdated: new Date(),
        },
      }));
    }, 1000);
  };

  const handlePillClick = (text: string) => {
    handleSendMessage(text);
  };

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setChatSessions((prev) => ({
      ...prev,
      [newChatId]: {
        id: newChatId,
        title: 'New Chat',
        messages: [],
        createdAt: new Date(),
        lastUpdated: new Date(),
      },
    }));
    setCurrentChatId(newChatId);
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
    setShowHistory(false);
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

  return (
    <div className="w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 flex flex-col fixed right-0 top-16 bottom-0">
      {!showHistory ? (
        <>
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">AI Assistant</h2>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleNewChat}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create new chat
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowHistory(true)}>
                      <History className="mr-2 h-4 w-4" />
                      Chat history
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {onClose && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Only show post context and actionable copy when chatActivated is true and showPostContext is true */}
            {postContext && chatActivated && showPostContext && (
              <div className="mb-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Continue the conversation about this post
                </p>
              </div>
            )}

            {/* Post Context Banner - Only when chatActivated and showPostContext */}
            {postContext && chatActivated && showPostContext && (
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-blue-900 dark:text-blue-300 mb-1">
                      Analyzing Post:
                    </p>
                    <p className="text-xs text-blue-800 dark:text-blue-200 line-clamp-3">
                      {postContext.content}
                    </p>
                    {(postContext.author || postContext.authorHandle) && (
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                        by {postContext.author || postContext.authorHandle}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowPostContext(false);
                      onClearContext?.();
                    }}
                    className="h-6 w-6 p-0 flex-shrink-0"
                  >
                    <X className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
                  </Button>
                </div>

                {/* Voice Memo */}
                {postContext.voiceMemo && (
                  <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-2">
                      <Mic className="w-3.5 h-3.5 text-blue-700 dark:text-blue-300 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-blue-900 dark:text-blue-300 mb-1">
                          Your Voice Memo:
                        </p>
                        <p className="text-xs text-blue-800 dark:text-blue-200 italic">
                          "{postContext.voiceMemo}"
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Analysis */}
                {postContext.aiAnalysis && (
                  <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
                    <p className="text-xs font-medium text-blue-900 dark:text-blue-300 mb-2">
                      AI Analysis:
                    </p>
                    <p className="text-xs text-blue-800 dark:text-blue-200 whitespace-pre-line">
                      {postContext.aiAnalysis.aiResponse}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Show empty state when no messages and either no postContext or chatActivated is false or showPostContext is false */}
            {messages.length === 0 && (!postContext || !chatActivated || !showPostContext) ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                {/* Welcome Message */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    How can I help you?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Ask me anything about your captured content
                  </p>
                </div>

                {/* Prompt Pills */}
                <div className="w-full space-y-2 mt-4">
                  {promptPills.map((pill, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => handlePillClick(pill.text)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all text-left"
                      >
                        <span className="text-sm text-slate-700 dark:text-slate-300">{pill.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 rounded-xl border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
              />
              <Button
                onClick={() => handleSendMessage()}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Chat History View */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(false)}
                className="h-8 w-8 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">Chat History</h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {Object.values(chatSessions)
                .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
                .map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleChatSelect(chat.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      chat.id === currentChatId
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{chat.title}</p>
                        <p className={`text-xs mt-1 ${
                          chat.id === currentChatId ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {chat.messages.length} messages • {chat.lastUpdated.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}