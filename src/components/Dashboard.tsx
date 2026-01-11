import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { mockPosts, mockAuthors } from '../lib/mockData';
import { TrendingUp, FileText, Users, ThumbsUp, ThumbsDown, AlertTriangle, ArrowRight, Brain, Sparkles, CheckCircle2, Clock, Lightbulb, RefreshCw, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Area, AreaChart } from 'recharts';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { LearningInsightModal } from './LearningInsightModal';

interface DashboardProps {
  onNavigateToSummary?: () => void;
  onNavigateToTasks?: () => void;
  onInsightClick?: (type: 'theme' | 'behavior' | 'bias' | 'reading') => void;
  onPostClick?: (postId: string) => void;
  onTopicClick?: (topic: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function Dashboard({ onNavigateToSummary, onNavigateToTasks, onInsightClick, onPostClick, onTopicClick }: DashboardProps) {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedInsight, setSelectedInsight] = useState<'theme' | 'behavior' | 'bias' | 'reading' | null>(null);
  
  const totalPosts = mockPosts.length;
  const positiveRatings = mockPosts.filter(p => p.userRating === 'positive').length;
  const negativeRatings = mockPosts.filter(p => p.userRating === 'negative').length;
  const avgCredibility = mockPosts.reduce((acc, p) => acc + (p.aiAnalysis?.credibilityScore || 0), 0) / totalPosts;

  // Daily posts (last 24 hours simulation - using most recent posts)
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  
  const dailyPosts = mockPosts
    .filter(p => p.category)
    .sort((a, b) => b.capturedAt.getTime() - a.capturedAt.getTime())
    .slice(0, 5); // Simulating 5 posts captured today
  
  const completedTasksCount = 0; // User hasn't completed any tasks (Case A)
  const pendingTasksCount = dailyPosts.length;

  // Generate AI titles for tasks
  const generateTaskTitle = (post: typeof mockPosts[0]) => {
    const authorName = post.author || post.sourceName || 'Unknown';
    const categoryLabel = post.category === 'fact-check' ? 'Fact check requested' :
                         post.category === 'summarize' ? 'Summarize requested' :
                         post.category === 'explain' ? 'Explain requested' :
                         post.category === 'remind' ? 'Reminder set' :
                         post.category === 'web-search' ? 'Web search requested' : '';
    
    const topicHint = post.tags[0] || 'General topic';
    
    return `${authorName}'s post on ${topicHint} - ${categoryLabel}`;
  };

  // Create 15 topic bubbles with specific values
  const topicData = [
    { name: 'AI', value: 15 },
    { name: 'Healthcare', value: 8 },
    { name: 'Research', value: 6 },
    { name: 'Tech', value: 5 },
    { name: 'Investment', value: 4 },
    { name: 'Finance', value: 4 },
    { name: 'Data', value: 3 },
    { name: 'Innovation', value: 3 },
    { name: 'Science', value: 3 },
    { name: 'Startup', value: 2 },
    { name: 'Policy', value: 2 },
    { name: 'Climate', value: 2 },
    { name: 'Education', value: 1 },
    { name: 'Design', value: 1 },
    { name: 'Security', value: 1 }
  ];

  // Rating distribution
  const ratingData = [
    { name: 'Positive', value: positiveRatings, color: '#2563EB' },
    { name: 'Negative', value: negativeRatings, color: '#EF4444' },
    { name: 'Neutral', value: totalPosts - positiveRatings - negativeRatings, color: '#94A3B8' }
  ];

  // Weekly activity
  const weeklyData = [
    { day: 'Mon', posts: 2 },
    { day: 'Tue', posts: 4 },
    { day: 'Wed', posts: 3 },
    { day: 'Thu', posts: 5 },
    { day: 'Fri', posts: 1 },
    { day: 'Sat', posts: 0 },
    { day: 'Sun', posts: 0 }
  ];

  const colors = ['#2563EB', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  return (
    <div className="space-y-6">
      {/* Daily Insight Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-xl">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-slate-900">Today's Insight Summary</CardTitle>
                <CardDescription className="text-slate-600 flex items-center gap-2">
                  Last updated: {lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-xl"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Section 1: Daily Status */}
          <div className="p-5 bg-white/90 backdrop-blur rounded-xl border border-white/50 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Daily Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Posts Captured */}
              <div className="relative overflow-hidden p-4 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all group">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-xs text-slate-600 font-medium">Today</div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{dailyPosts.length}</div>
                  <div className="text-xs text-slate-600">Posts Captured</div>
                </div>
              </div>

              {/* Tasks Completed */}
              <div className="relative overflow-hidden p-4 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all group">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      {completedTasksCount === 0 ? '0%' : `${Math.round((completedTasksCount / pendingTasksCount) * 100)}%`}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{completedTasksCount}</div>
                  <div className="text-xs text-slate-600">Tasks Completed</div>
                </div>
              </div>

              {/* Tasks Pending */}
              <div className="relative overflow-hidden p-4 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all group">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-xs text-slate-600 font-medium">Action Needed</div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{pendingTasksCount}</div>
                  <div className="text-xs text-slate-600">Tasks Pending</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Daily Tasks */}
          {pendingTasksCount > 0 && (
            <div className="p-4 bg-white/90 backdrop-blur rounded-xl border border-white/50 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  Today's Tasks to Review ({pendingTasksCount})
                </h3>
              </div>
              <div className="space-y-2">
                {dailyPosts.slice(0, 4).map((post, index) => (
                  <div 
                    key={post.id}
                    className="p-3 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => onPostClick ? onPostClick(post.id) : onNavigateToTasks?.()}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 font-medium group-hover:text-blue-600 transition-colors">
                          {generateTaskTitle(post)}
                        </p>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                          {post.content.slice(0, 80)}...
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
              {pendingTasksCount > 4 && (
                <Button 
                  onClick={onNavigateToTasks}
                  variant="ghost" 
                  className="w-full mt-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  View all {pendingTasksCount} tasks
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          )}

          {/* Section 3: Daily Learning */}
          <div className="p-4 bg-white/90 backdrop-blur rounded-xl border border-white/50 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-purple-600" />
              Today's Learning Insights
            </h3>
            <div className="space-y-4">
              {/* Today's Main Theme */}
              <div 
                className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-100 cursor-pointer hover:shadow-md transition-all"
                onClick={() => onInsightClick ? onInsightClick('theme') : setSelectedInsight('theme')}
              >
                <h4 className="text-xs font-semibold text-purple-900 mb-2 flex items-center gap-1">
                  <span className="text-base">🎯</span>
                  Today's Main Theme
                </h4>
                <p className="text-sm text-slate-700">
                  Today's captured content primarily focuses on <span className="font-semibold text-purple-700">AI in Healthcare, Medical Imaging, and Synthetic Data</span>. Your interest shows a clear pattern toward cutting-edge medical technology applications.
                </p>
                <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  Click for detailed analysis
                </p>
              </div>

              {/* Behavior Insight */}
              <div 
                className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100 cursor-pointer hover:shadow-md transition-all"
                onClick={() => onInsightClick ? onInsightClick('behavior') : setSelectedInsight('behavior')}
              >
                <h4 className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1">
                  <span className="text-base">📊</span>
                  Today's Behavior Insight
                </h4>
                <p className="text-sm text-slate-700">
                  You've shown heightened interest in <span className="font-semibold text-blue-700">peer-reviewed research</span> and academic publications today. This indicates a preference for evidence-based information over opinion pieces.
                </p>
                <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  Click for detailed analysis
                </p>
              </div>

              {/* Bias Detection */}
              <div 
                className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-100 cursor-pointer hover:shadow-md transition-all"
                onClick={() => onInsightClick ? onInsightClick('bias') : setSelectedInsight('bias')}
              >
                <h4 className="text-xs font-semibold text-amber-900 mb-2 flex items-center gap-1">
                  <span className="text-base">⚠️</span>
                  Bias Detection Alert
                </h4>
                <p className="text-sm text-slate-700">
                  Some captured posts today show <span className="font-semibold text-amber-700">confirmation bias</span> - presenting only data that supports their claims while omitting contradictory evidence. Be mindful when evaluating these sources.
                </p>
                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  Click for detailed analysis
                </p>
              </div>

              {/* Recommended Reading */}
              <div 
                className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-100 cursor-pointer hover:shadow-md transition-all"
                onClick={() => onInsightClick ? onInsightClick('reading') : setSelectedInsight('reading')}
              >
                <h4 className="text-xs font-semibold text-emerald-900 mb-2 flex items-center gap-1">
                  <span className="text-base">📚</span>
                  Recommended Reading
                </h4>
                <p className="text-sm text-slate-700 mb-2">
                  Based on your interest in medical AI with synthetic data, consider reading:
                </p>
                <p className="text-sm text-emerald-700 font-medium">
                  "Synthetic Data in Healthcare: A Comprehensive Review" by MIT Health AI Lab
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  This addresses real-world implementation challenges and regulatory considerations you haven't explored yet.
                </p>
                <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  Click for detailed analysis
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-md bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-900 dark:text-slate-100">Total Saved Posts</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{totalPosts}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">+2 from last week</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-900 dark:text-slate-100">Tracked Authors</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{mockAuthors.length}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Across 2 platforms</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity - Modern Area Chart */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Weekly Activity</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Posts saved per day this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke="#94A3B8"
                style={{ fontSize: '12px' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#94A3B8"
                style={{ fontSize: '12px' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area 
                type="monotone" 
                dataKey="posts" 
                stroke="#2563EB" 
                strokeWidth={3}
                fill="url(#colorPosts)"
                dot={{ fill: '#2563EB', r: 4, strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#FFFFFF' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Topic Trends - Modern Bubble Design */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Topic Trends</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Most captured topics this month</CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {topicData.map((topic, index) => {
              const maxValue = Math.max(...topicData.map(t => t.value));
              const percentage = (topic.value / maxValue);
              const size = 80 + (percentage * 100);
              const color = colors[index % colors.length];
              
              return (
                <div
                  key={topic.name}
                  className="relative group cursor-pointer transition-all hover:scale-110"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                  }}
                  onClick={() => onTopicClick && onTopicClick(topic.name)}
                >
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                    style={{
                      background: `linear-gradient(135deg, ${color}dd, ${color}99)`,
                    }}
                  >
                    <span className="text-white font-semibold text-center px-2" style={{ fontSize: `${10 + percentage * 8}px` }}>
                      {topic.name}
                    </span>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                    {topic.value} posts · Click to filter
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Behavioral Insights */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Behavioral Pattern Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-5 border-0 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
            <h4 className="font-semibold mb-3 text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
              <span className="text-xl">🎯</span>
              Your Information Consumption Style
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 dark:text-emerald-400 text-lg">✓</span>
                <span className="text-slate-700 dark:text-slate-300">Excellent critical thinking, values sources and evidence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 dark:text-emerald-400 text-lg">✓</span>
                <span className="text-slate-700 dark:text-slate-300">High preference for scientific/academic content</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 dark:text-emerald-400 text-lg">✓</span>
                <span className="text-slate-700 dark:text-slate-300">Immediate suspicion of emotional manipulation or exaggerated claims</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 dark:text-amber-400 text-lg">⚠</span>
                <span className="text-slate-700 dark:text-slate-300">May be overly skeptical of investment/financial information</span>
              </li>
            </ul>
          </div>

          <div className="p-5 border-0 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <h4 className="font-semibold mb-3 text-blue-900 dark:text-blue-300 flex items-center gap-2">
              <span className="text-xl">💡</span>
              Improvement Suggestions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">1.</span>
                <span className="text-slate-700 dark:text-slate-300">Also reference reports from verified financial institutions to maintain balanced perspective</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">2.</span>
                <span className="text-slate-700 dark:text-slate-300">Save content from diverse viewpoints to prevent echo chamber effect</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">3.</span>
                <span className="text-slate-700 dark:text-slate-300">Consider practical experience-based insights alongside academic research</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Learning Insight Modal */}
      <LearningInsightModal 
        type={selectedInsight}
        open={selectedInsight !== null}
        onOpenChange={(open) => !open && setSelectedInsight(null)}
      />
    </div>
  );
}