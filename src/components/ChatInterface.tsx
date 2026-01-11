import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { mockChatHistory, promptPills } from '../lib/mockData';
import { Send, Sparkles, Plus, MessageSquare, Clock, Paperclip } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  lastMessageAt: Date;
}

export function ChatInterface() {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'Summary of AI posts from last week',
      messages: mockChatHistory,
      lastMessageAt: new Date('2025-11-18T14:00:05')
    },
    {
      id: '2',
      title: 'Analysis of investment-related posts',
      messages: [
        {
          role: 'user',
          content: 'Analyze investment-related saved posts',
          timestamp: new Date('2025-11-17T10:00:00')
        },
        {
          role: 'assistant',
          content: 'Analysis of 2 investment-related posts:\n\n⚠️ Both show low credibility. Common patterns: lack of concrete data, emotional language use, unverifiable claims.',
          timestamp: new Date('2025-11-17T10:00:05')
        }
      ],
      lastMessageAt: new Date('2025-11-17T10:00:05')
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState<string>('1');
  const [messages, setMessages] = useState<Message[]>(chatHistories[0].messages);
  const [input, setInput] = useState('');

  const currentChat = chatHistories.find(chat => chat.id === currentChatId);

  const handleCreateNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatHistory = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      lastMessageAt: new Date()
    };
    setChatHistories([newChat, ...chatHistories]);
    setCurrentChatId(newChatId);
    setMessages([]);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    const selectedChat = chatHistories.find(chat => chat.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    // Update chat history
    const updatedChatHistories = chatHistories.map(chat => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          title: chat.messages.length === 0 ? input.slice(0, 30) : chat.title,
          messages: newMessages,
          lastMessageAt: new Date()
        };
      }
      return chat;
    });
    setChatHistories(updatedChatHistories);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: generateMockResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => {
        const updatedMessages = [...prev, aiResponse];
        
        // Update chat history with AI response
        setChatHistories(prevHistories => 
          prevHistories.map(chat => {
            if (chat.id === currentChatId) {
              return {
                ...chat,
                messages: updatedMessages,
                lastMessageAt: new Date()
              };
            }
            return chat;
          })
        );
        
        return updatedMessages;
      });
    }, 1000);
  };

  const generateMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('summary') || lowerQuery.includes('summarize')) {
      return 'You saved a total of 5 posts over the past 7 days. Main topics: AI (2), Healthcare (1), Investment (2). Average credibility is 5.8/10, with posts from "Tech Insider" and "Investment Guru" particularly showing low credibility (2.5 or below).';
    } else if (lowerQuery.includes('suspect') || lowerQuery.includes('doubt')) {
      return 'Found 2 posts you were suspicious about:\n\n1. Tech Insider\'s quantum computing post - "Exaggerated and stock manipulation intent"\n2. Investment Guru\'s market prediction - "Seems like a complete scammer"\n\nBoth posts also received low scores in AI credibility analysis.';
    } else if (lowerQuery.includes('investment') || lowerQuery.includes('invest')) {
      return 'Analysis of 2 investment-related posts:\n\n⚠️ Both show low credibility. Common patterns: lack of concrete data, emotional language use, unverifiable claims. Not recommended for investment decisions.';
    } else if (lowerQuery.includes('insight') || lowerQuery.includes('learning')) {
      return 'Key learning insights this month:\n\n1. Advances and limitations of AI medical diagnosis\n2. Recognizing misinformation patterns on social media\n3. Criteria for evaluating academic research credibility\n4. Practical data on remote work\n5. Warning signs in investment advice\n\nOverall, you show high interest in technology and research fields, with excellent critical thinking about misinformation.';
    } else {
      return 'I understand your question. I\'ll answer based on your saved posts and voice memos. Please ask more specific questions for more accurate information.';
    }
  };

  const handlePillClick = (pill: string) => {
    setInput(pill);
  };

  const handleFileAttachment = () => {
    // File attachment logic will be implemented here
    console.log('File attachment clicked');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Chat Area */}
      <Card className="lg:col-span-3 border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {currentChat?.title || 'New Chat'}
          </CardTitle>
          <CardDescription className="text-slate-600">Ask questions based on your saved posts and voice memos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mb-6">
                    <Sparkles className="w-16 h-16 text-blue-500" />
                  </div>
                  <h3 className="text-lg text-slate-900 mb-2">Start a new conversation</h3>
                  <p className="text-sm text-slate-600 max-w-md">
                    Ask questions based on your saved posts and voice memos.
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p
                        className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Button 
              onClick={handleFileAttachment} 
              size="icon" 
              variant="outline"
              className="flex-shrink-0 border-slate-300 hover:bg-slate-100 rounded-xl"
            >
              <Paperclip className="w-4 h-4 text-slate-600" />
            </Button>
            <Input
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="border-slate-300 rounded-xl focus:ring-blue-500"
            />
            <Button onClick={handleSend} size="icon" className="bg-blue-500 hover:bg-blue-600 flex-shrink-0 rounded-xl shadow-md">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sidebar - Chat History & Prompt Pills */}
      <div className="lg:col-span-1 space-y-4">
        {/* Chat History */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-slate-900">Chat History</CardTitle>
              <Button 
                size="sm" 
                onClick={handleCreateNewChat}
                className="bg-blue-500 hover:bg-blue-600 rounded-xl"
              >
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {chatHistories.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      currentChatId === chat.id
                        ? 'bg-blue-50 border-blue-200 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <MessageSquare className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        currentChatId === chat.id ? 'text-blue-500' : 'text-slate-600'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm break-words ${
                          currentChatId === chat.id ? 'text-blue-900 font-medium' : 'text-slate-700'
                        }`}>{chat.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <p className="text-xs text-slate-500">
                            {chat.lastMessageAt.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Prompt Pills */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base text-slate-900">Suggested Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {promptPills.slice(0, 4).map((pill, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-3 text-xs whitespace-normal border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 rounded-xl transition-all"
                  onClick={() => handlePillClick(pill)}
                >
                  {pill}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}