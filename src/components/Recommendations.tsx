import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sparkles, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';

export function Recommendations() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Recommendations</h2>
        <p className="text-sm text-muted-foreground">AI-powered content recommendations based on your interests</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <CardTitle>Trending Topics</CardTitle>
            </div>
            <CardDescription>
              Discover what's trending in your areas of interest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="outline" className="mr-2">AI & Machine Learning</Badge>
              <Badge variant="outline" className="mr-2">Productivity</Badge>
              <Badge variant="outline" className="mr-2">Design</Badge>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              Explore Topics
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <CardTitle>Recommended Reads</CardTitle>
            </div>
            <CardDescription>
              Articles and posts tailored to your reading history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Based on your saved posts, we recommend exploring:</p>
              <ul className="text-sm space-y-1 list-disc list-inside text-slate-600">
                <li>Advanced React Patterns</li>
                <li>TypeScript Best Practices</li>
                <li>UI/UX Design Trends</li>
              </ul>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              View Recommendations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <CardTitle>Popular Authors</CardTitle>
            </div>
            <CardDescription>
              Authors you might find interesting based on your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Discover new voices in your field:</p>
              <ul className="text-sm space-y-1 list-disc list-inside text-slate-600">
                <li>Tech Industry Leaders</li>
                <li>Design Thought Leaders</li>
                <li>Product Management Experts</li>
              </ul>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              Explore Authors
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personalized Feed</CardTitle>
          <CardDescription>
            Your personalized content feed based on AI analysis of your interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Your personalized recommendations will appear here</p>
            <p className="text-xs mt-2">We're analyzing your preferences to provide better suggestions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
