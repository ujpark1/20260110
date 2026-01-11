import { Badge } from './ui/badge';
import { mockPosts } from '../lib/mockData';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface LearningInsightDetailProps {
  type: 'theme' | 'behavior' | 'bias' | 'reading';
  onBack: () => void;
  onPostClick?: (postId: string) => void;
}

export function LearningInsightDetail({ type, onBack, onPostClick }: LearningInsightDetailProps) {
  const getInsightContent = () => {
    switch (type) {
      case 'theme':
        return {
          title: '🎯 Today\'s Main Theme',
          description: 'AI in Healthcare, Medical Imaging, and Synthetic Data',
          fullContent: `Your captured content today shows a strong focus on cutting-edge medical technology applications. Here's a detailed analysis:

**Primary Topics Identified:**
• AI-powered diagnostic systems and their accuracy rates
• Synthetic data generation for medical imaging
• Real-world clinical applications and case studies
• Privacy and regulatory considerations in healthcare AI
• Comparative studies: real vs. synthetic training data

**Why This Matters:**
This pattern suggests you're tracking the latest developments in medical AI technology. These topics are interconnected and form a comprehensive view of how AI is transforming healthcare diagnostics.

**Learning Opportunity:**
Understanding both the technical capabilities (95% accuracy rates) and practical limitations (privacy concerns, regulatory hurdles) gives you a balanced perspective crucial for evaluating real-world applications.`,
          relatedPosts: mockPosts.filter(p => 
            p.tags.some(tag => ['AI', 'Healthcare', 'Medical Imaging', 'Synthetic Data', 'Research'].includes(tag))
          ).slice(0, 4),
          gradient: 'from-purple-50 to-indigo-50',
          border: 'border-purple-200'
        };
      
      case 'behavior':
        return {
          title: '📊 Today\'s Behavior Insight',
          description: 'Preference for Evidence-Based Information',
          fullContent: `Your information consumption pattern reveals a sophisticated approach to content evaluation:

**Key Behavioral Patterns:**
• Strong preference for peer-reviewed research papers
• Consistent verification of sources and credentials  
• Skepticism toward sensational claims without data
• Interest in academic publications over opinion pieces
• Focus on methodology and statistical significance

**What This Reveals:**
You prioritize evidence-based information and scientific rigor. This is a valuable trait in the age of misinformation, showing critical thinking skills and media literacy.

**Growth Areas:**
While skepticism is healthy, consider occasionally exploring well-written opinion pieces from domain experts. They can provide valuable context and real-world perspectives that complement academic research.

**Impact on Your Learning:**
This approach helps you build a solid foundation of knowledge based on verified information, making you less susceptible to trending misinformation.`,
          relatedPosts: mockPosts.filter(p => 
            p.tags.includes('Research') || p.platform === 'article' || 
            (p.aiAnalysis?.credibilityLevel === 'high' && p.tags.some(t => ['AI', 'Healthcare', 'Science'].includes(t)))
          ).slice(0, 4),
          gradient: 'from-blue-50 to-cyan-50',
          border: 'border-blue-200'
        };
      
      case 'bias':
        return {
          title: '⚠️ Bias Detection Alert',
          description: 'Confirmation Bias Patterns Detected',
          fullContent: `Several captured posts today exhibit confirmation bias - a common cognitive bias where information is presented selectively:

**What is Confirmation Bias?**
Confirmation bias occurs when authors cherry-pick data that supports their hypothesis while ignoring contradictory evidence. This creates a misleading narrative that appears convincing but lacks completeness.

**Examples from Today's Posts:**
• Posts highlighting only success rates without discussing failure cases
• Studies citing supportive data while omitting conflicting research
• Claims that ignore important contextual limitations
• Selective statistics that paint an incomplete picture

**How to Identify:**
1. Look for absence of counterarguments or limitations
2. Check if contradictory studies are acknowledged
3. Verify if sample sizes and methodologies are disclosed
4. Assess whether edge cases are discussed

**Why This Matters:**
Recognizing confirmation bias helps you evaluate information more critically. Even well-intentioned researchers can fall into this trap, so being aware protects you from accepting incomplete conclusions.

**Action Steps:**
When encountering claims, actively search for alternative perspectives and contradictory evidence to form a complete picture.`,
          relatedPosts: mockPosts.filter(p => 
            p.userRating === 'negative' || 
            p.aiAnalysis?.credibilityLevel === 'low' ||
            p.tags.includes('Suspicious')
          ).slice(0, 3),
          gradient: 'from-amber-50 to-orange-50',
          border: 'border-amber-200'
        };
      
      case 'reading':
        return {
          title: '📚 Recommended Reading',
          description: 'Deepen Your Understanding',
          fullContent: `Based on your interest in medical AI and synthetic data, here are carefully selected resources to expand your knowledge:

**Primary Recommendation:**
"Synthetic Data in Healthcare: A Comprehensive Review" by MIT Health AI Lab

This comprehensive review addresses critical gaps in your current reading:

**Why This Resource:**
• Covers real-world implementation challenges you haven't encountered
• Discusses regulatory considerations (FDA, HIPAA, international standards)
• Provides case studies of successful and failed deployments
• Explains the technical pipeline from data generation to clinical validation
• Addresses ethical considerations in synthetic data use

**What You'll Learn:**
• Practical frameworks for evaluating synthetic data quality
• Common pitfalls in medical AI implementation
• Stakeholder perspectives (clinicians, patients, regulators)
• Future directions and emerging research areas

**Additional Resources:**
1. Nature Medicine Special Issue: "AI in Clinical Practice" - Latest peer-reviewed research
2. FDA Guidance Document: "AI/ML-Based Software as Medical Device" - Regulatory perspective
3. Stanford HAI Report: "AI Index 2024 - Healthcare Chapter" - Industry trends

**Why Now:**
These resources complement your current knowledge by adding practical implementation details and regulatory context that academic papers often omit.`,
          relatedPosts: mockPosts.filter(p => 
            (p.tags.includes('AI') || p.tags.includes('Healthcare')) &&
            p.aiAnalysis?.credibilityLevel === 'high'
          ).slice(0, 3),
          gradient: 'from-emerald-50 to-teal-50',
          border: 'border-emerald-200'
        };
    }
  };

  const content = getInsightContent();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 hover:bg-slate-100"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{content.title}</h1>
        <p className="text-lg text-slate-600">{content.description}</p>
      </div>

      {/* Full Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className={`p-6 bg-gradient-to-br ${content.gradient} border-b ${content.border}`}>
          <div className="prose prose-sm max-w-none">
            {content.fullContent.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="font-semibold text-slate-900 text-lg mt-6 mb-3 first:mt-0">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              } else if (paragraph.startsWith('•')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 text-slate-700 my-3">
                    {items.map((item, i) => (
                      <li key={i} className="text-base">{item.replace('•', '').trim()}</li>
                    ))}
                  </ul>
                );
              } else if (paragraph.match(/^\d+\./)) {
                const items = paragraph.split('\n');
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 text-slate-700 my-3">
                    {items.map((item, i) => (
                      <li key={i} className="text-base">{item.replace(/^\d+\./, '').trim()}</li>
                    ))}
                  </ol>
                );
              } else {
                return (
                  <p key={index} className="text-slate-700 text-base my-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
            })}
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-4">
          <ExternalLink className="w-5 h-5 text-blue-600" />
          Related Posts ({content.relatedPosts.length})
        </h3>
        <div className="space-y-3">
          {content.relatedPosts.map((post) => (
            <div 
              key={post.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md transition-all cursor-pointer group"
              onClick={() => onPostClick?.(post.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.platform.toUpperCase()}
                    </Badge>
                    {post.author && (
                      <span className="text-xs text-slate-600 truncate">
                        {post.author}
                      </span>
                    )}
                    {post.sourceName && (
                      <span className="text-xs text-slate-600 truncate">
                        {post.sourceName}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-900 font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <p className="text-sm text-slate-600">
          Found this insight helpful? Continue exploring related content.
        </p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onBack}
        >
          Back to Dashboard
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
