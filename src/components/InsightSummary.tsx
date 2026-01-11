import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Filter, Lightbulb, TrendingUp, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

type TimeRange = 'week' | 'month' | 'custom';

interface InsightSummaryProps {
  onBack?: () => void;
}

export function InsightSummary({ onBack }: InsightSummaryProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [selectedMonth, setSelectedMonth] = useState<string>('2024-01');
  const [selectedWeek, setSelectedWeek] = useState<string>('2024-W03');

  // Mock insights data organized by time
  const weeklyInsights = {
    '2024-W03': [
      { id: 1, text: 'AI medical diagnostic technology can achieve high accuracy with synthetic data, but data privacy issues are critical when applying to developing countries', tags: ['Healthcare', 'AI'], importance: 'high' },
      { id: 2, text: 'Exaggerated tech-related claims on social media are likely intended for stock manipulation - concrete data and source verification essential', tags: ['Red Flag'], importance: 'critical' },
      { id: 3, text: 'Results from long-term research projects (10+ years) generally have high credibility, and authors from academic institutions are likely to provide verified information', tags: ['Research'], importance: 'high' },
      { id: 4, text: 'Real company data on remote work productivity has more practical value than theoretical claims - review team applicability', tags: ['Remote Work'], importance: 'medium' },
      { id: 5, text: 'Investment advice using subjective expressions like "Trust me" mostly has low credibility - pattern of inducing emotion-based decision making', tags: ['Warning'], importance: 'critical' },
    ],
    '2024-W02': [
      { id: 6, text: 'LLM hallucination issues can be critical especially in medical/legal fields and must require human verification', tags: ['AI', 'Safety'], importance: 'critical' },
      { id: 7, text: 'Actual application cases of blockchain technology are limited compared to promotion, and energy consumption issues remain unresolved', tags: ['Blockchain'], importance: 'medium' },
      { id: 8, text: 'Sustainability of open-source projects depends more on the quality of core contributors than community size', tags: ['Open Source'], importance: 'high' },
    ],
    '2024-W01': [
      { id: 9, text: 'Practical application of quantum computing is much further in the future than media reports, and is currently only valid for specific algorithms', tags: ['Quantum'], importance: 'medium' },
      { id: 10, text: 'In SaaS business models, customer retention is 5x more cost-efficient than acquisition', tags: ['Business'], importance: 'high' },
    ],
  };

  const monthlyInsights = {
    '2024-01': [
      { id: 11, text: 'A balanced perspective is needed between excessive optimism and pessimism about AI technology', tags: ['AI', 'Critical Thinking'], importance: 'high' },
      { id: 12, text: 'Recognize survivorship bias where only startup success stories are reported, and there is much to learn from failure cases', tags: ['Business', 'Bias'], importance: 'high' },
      { id: 13, text: 'Problem-centric approaches are more effective than following technology trends for solutions', tags: ['Strategy'], importance: 'medium' },
      { id: 14, text: 'As data privacy regulations strengthen, GDPR compliance becomes essential for global services', tags: ['Privacy', 'Legal'], importance: 'high' },
      { id: 15, text: 'The gap between academic research and practical application is large, requiring intermediate verification steps', tags: ['Research'], importance: 'medium' },
    ],
    '2023-12': [
      { id: 16, text: 'The emergence of ChatGPT has begun to fundamentally change AI education and usage methods', tags: ['AI', 'Education'], importance: 'high' },
      { id: 17, text: 'The importance of asynchronous communication is further highlighted in remote work environments', tags: ['Remote Work'], importance: 'medium' },
      { id: 18, text: 'Users must clearly understand the tradeoff between privacy protection and service convenience', tags: ['Privacy'], importance: 'high' },
    ],
  };

  const getInsights = () => {
    if (timeRange === 'week') {
      return weeklyInsights[selectedWeek as keyof typeof weeklyInsights] || [];
    } else if (timeRange === 'month') {
      return monthlyInsights[selectedMonth as keyof typeof monthlyInsights] || [];
    }
    return [];
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-700 bg-red-50 border-red-200';
      case 'high': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'medium': return 'text-amber-700 bg-amber-50 border-amber-200';
      default: return 'text-slate-500 bg-slate-100 border-slate-200';
    }
  };

  const insights = getInsights();

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <Card>
        <CardHeader>
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="mb-4 w-fit"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          )}
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            Insight Summary
          </CardTitle>
          <CardDescription>Review your learning insights organized by time period</CardDescription>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Time Range Selection */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-sm">Time Range:</span>
              <div className="flex gap-2 ml-2">
                <Button
                  variant={timeRange === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('week')}
                  className={timeRange === 'week' ? 'bg-slate-900' : ''}
                >
                  Weekly
                </Button>
                <Button
                  variant={timeRange === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('month')}
                  className={timeRange === 'month' ? 'bg-slate-900' : ''}
                >
                  Monthly
                </Button>
              </div>
            </div>

            {/* Week/Month Selector */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-600" />
              <span className="text-sm">Select Period:</span>
              {timeRange === 'week' ? (
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="ml-2 px-3 py-2 border border-slate-200 rounded-lg text-sm"
                >
                  <option value="2024-W03">Week 3, 2024 (Jan 15-21)</option>
                  <option value="2024-W02">Week 2, 2024 (Jan 8-14)</option>
                  <option value="2024-W01">Week 1, 2024 (Jan 1-7)</option>
                </select>
              ) : (
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="ml-2 px-3 py-2 border border-slate-200 rounded-lg text-sm"
                >
                  <option value="2024-01">January 2024</option>
                  <option value="2023-12">December 2023</option>
                </select>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {timeRange === 'week' ? `Weekly Insights (${selectedWeek})` : `Monthly Insights (${selectedMonth})`}
          </CardTitle>
          <CardDescription>
            {insights.length} insight{insights.length !== 1 ? 's' : ''} discovered
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No insights saved for this period
            </div>
          ) : (
            insights.map((insight, index) => (
              <div key={insight.id} className="flex items-start gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all border border-slate-200">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                  insight.importance === 'critical' ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white' :
                  insight.importance === 'high' ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' :
                  insight.importance === 'medium' ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white' :
                  'bg-gradient-to-br from-slate-400 to-slate-500 text-white'
                }`}>
                  <span className="font-semibold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-sm leading-relaxed text-slate-700">{insight.text}</p>
                    {insight.importance === 'critical' && (
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    {insight.importance === 'high' && (
                      <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {insight.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-slate-300">
                        {tag}
                      </Badge>
                    ))}
                    <Badge variant="outline" className={`text-xs ${getImportanceColor(insight.importance)}`}>
                      {insight.importance.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle>Period Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Main Learning Areas:</strong>{' '}
              {timeRange === 'week' && selectedWeek === '2024-W03' && 
                'AI/Healthcare, Investment scam detection, Academic research evaluation, Remote work productivity'}
              {timeRange === 'week' && selectedWeek === '2024-W02' && 
                'AI safety, Blockchain reality, Open-source sustainability'}
              {timeRange === 'week' && selectedWeek === '2024-W01' && 
                'Quantum computing, SaaS business models'}
              {timeRange === 'month' && selectedMonth === '2024-01' && 
                'Balanced AI perspective, Survivorship bias, Problem-centric approach, GDPR compliance'}
              {timeRange === 'month' && selectedMonth === '2023-12' && 
                'ChatGPT impact, Asynchronous communication, Privacy protection'}
            </p>
            <p>
              <strong>Core Pattern:</strong>{' '}
              You prefer academic research and verified data, while maintaining a skeptical attitude toward exaggerated claims or emotional language.
            </p>
            <p className="text-slate-600">
              💡 Continue saving content from diverse perspectives and make source verification a habit.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}