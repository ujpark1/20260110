import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { mockPosts } from '../lib/mockData';
import { Linkedin, Twitter, Mic, CheckCircle2, AlertCircle, Globe, FileText, Book, Sparkles, Trash2 } from 'lucide-react';
import { useState } from 'react';
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

interface HistoryPostCardProps {
  post: typeof mockPosts[0];
  onDelete?: () => void;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  showCheckbox?: boolean;
  onPostClick?: (postId: string) => void;
  onOpenChat?: (postId: string) => void;
}

export function HistoryPostCard({ post, onDelete, isSelected = false, onToggleSelect, showCheckbox = true, onPostClick, onOpenChat }: HistoryPostCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    onDelete && onDelete();
    toast('Post has been deleted.', {
      duration: 3000,
    });
  };

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
        className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        onClick={() => onPostClick && onPostClick(post.id)}
      >
        <CardContent className="p-6">
          <div className="space-y-3">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-3">
              {/* Left: Checkbox + Author Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {showCheckbox && onToggleSelect && (
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      onToggleSelect();
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-shrink-0"
                  />
                )}
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenChat) onOpenChat(post.id);
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