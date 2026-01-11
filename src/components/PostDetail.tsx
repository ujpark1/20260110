import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { mockPosts } from '../lib/mockData';
import { ArrowLeft, Mic, CheckCircle2, AlertCircle, Globe, FileText, Book, Trash2, Edit2, Save, XCircle, Loader2, ExternalLink, Copy, Link, MessageSquare, StopCircle, Calendar } from 'lucide-react';
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

interface PostDetailProps {
  postId: string;
  onBack: () => void;
  onComplete?: () => void;
  onDelete?: () => void;
  onOpenChat?: (postId: string) => void;
  onTagClick?: (tag: string) => void;
}

export function PostDetail({ postId, onBack, onComplete, onDelete, onOpenChat, onTagClick }: PostDetailProps) {
  const post = mockPosts.find(p => p.id === postId);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [editedMemo, setEditedMemo] = useState(post?.voiceMemo || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [updatedAnalysis, setUpdatedAnalysis] = useState<string | null>(null);

  const handleOpenChat = () => {
    if (onOpenChat) {
      onOpenChat(postId);
    }
  };

  const getCredibilityLabel = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Unknown';
    }
  };

  const getCredibilityColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'medium':
        return 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
      case 'low':
        return 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
      default:
        return 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-300';
    }
  };

  const getPlatformIcon = () => {
    switch (post?.platform) {
      case 'linkedin':
        return <Globe className="w-4 h-4" />;
      case 'x':
        return <Globe className="w-4 h-4" />;
      case 'web':
      case 'article':
      case 'blog':
        return <Globe className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    onDelete && onDelete();
    onBack();
    toast('Post has been deleted.', {
      duration: 3000,
    });
  };

  const handleSaveMemo = () => {
    setIsEditingMemo(false);
    setIsAnalyzing(true);
    
    toast('Voice memo updated. Updating AI analysis...', {
      duration: 2000,
    });

    // Simulate AI analysis update
    setTimeout(() => {
      setUpdatedAnalysis('Based on your updated voice memo, I\'ve re-analyzed this post. The content aligns with your new perspective and notes. The credibility assessment remains consistent, but I\'ve incorporated your additional context into the analysis.');
      setIsAnalyzing(false);
      toast('AI analysis updated', {
        duration: 2000,
      });
    }, 3000);
  };

  const handleStartRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast('Voice memo recorded', {
        duration: 2000,
      });
    } else {
      setIsRecording(true);
    }
  };

  const handleCopyLink = () => {
    const linkToCopy = post?.sourceUrl || post?.originalUrl;
    if (linkToCopy) {
      // Fallback for clipboard API
      try {
        navigator.clipboard.writeText(linkToCopy).then(() => {
          toast('Link copied to clipboard', {
            duration: 2000,
          });
        }).catch(() => {
          // Fallback method
          const textArea = document.createElement('textarea');
          textArea.value = linkToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            toast('Link copied to clipboard', {
              duration: 2000,
            });
          } catch (err) {
            toast('Failed to copy link', {
              duration: 2000,
            });
          }
          document.body.removeChild(textArea);
        });
      } catch (err) {
        // If clipboard API is not available at all, use fallback immediately
        const textArea = document.createElement('textarea');
        textArea.value = linkToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          toast('Link copied to clipboard', {
            duration: 2000,
          });
        } catch (err) {
          toast('Failed to copy link', {
            duration: 2000,
          });
        }
        document.body.removeChild(textArea);
      }
    }
  };

  if (!post) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Post not found</p>
          <Button onClick={onBack} variant="outline" className="mt-4">
            Back
          </Button>
        </div>
      </div>
    );
  }

  const originalUrl = post.sourceUrl || post.originalUrl;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleOpenChat}
            variant="outline"
            size="sm"
            className="gap-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <MessageSquare className="w-4 h-4" />
            AI Chat
          </Button>
          <Button
            onClick={() => setDeleteDialogOpen(true)}
            variant="outline"
            size="sm"
            className="gap-2 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Captured Date Badge */}
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Captured on {post.capturedAt.toLocaleDateString()} at {post.capturedAt.toLocaleTimeString()}
        </span>
      </div>

      {/* Post Content */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Author Info */}
          {(post.author || post.authorHandle) && (
            <div className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
              {post.authorAvatar && (
                <img
                  src={post.authorAvatar}
                  alt={post.author || post.authorHandle || ''}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {post.author || post.authorHandle}
                  </p>
                  <Badge variant="outline" className="gap-1">
                    {getPlatformIcon()}
                    <span className="capitalize">{post.platform}</span>
                  </Badge>
                </div>
                {post.authorTitle && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">{post.authorTitle}</p>
                )}
              </div>
            </div>
          )}

          {/* Source Info for web content */}
          {post.sourceName && (
            <div className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1">
                    {getPlatformIcon()}
                    <span className="capitalize">{post.platform}</span>
                  </Badge>
                </div>
                <p className="font-medium text-slate-900 dark:text-slate-100 mt-2">
                  {post.sourceName}
                </p>
              </div>
            </div>
          )}

          {/* Post Content */}
          <div className="pt-2">
            <p className="text-slate-900 dark:text-slate-100 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </p>
            
            {/* Posted Date */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Posted on {new Date(new Date(post.capturedAt).getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className={`text-xs ${onTagClick ? 'cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors' : ''}`}
                  onClick={() => onTagClick && onTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Original Link Section */}
          {originalUrl && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Original Link:</p>
              <div className="flex items-center gap-2">
                <a
                  href={originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 flex-1 overflow-hidden"
                >
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{originalUrl}</span>
                </a>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="sm"
                  className="gap-1 flex-shrink-0"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Memo */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Your Voice Memo</h3>
            </div>
            {!isEditingMemo && (
              <Button
                onClick={() => setIsEditingMemo(true)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </Button>
            )}
          </div>

          {isEditingMemo ? (
            <div className="space-y-3">
              <Textarea
                value={editedMemo}
                onChange={(e) => setEditedMemo(e.target.value)}
                placeholder="Add your thoughts, questions, or notes about this post..."
                className="min-h-[100px]"
              />
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleStartRecording}
                  variant="outline"
                  size="sm"
                  className={`gap-2 ${isRecording ? 'border-red-300 dark:border-red-700 text-red-600 dark:text-red-400' : ''}`}
                >
                  {isRecording ? (
                    <>
                      <StopCircle className="w-3 h-3 animate-pulse" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-3 h-3" />
                      Record
                    </>
                  )}
                </Button>
                <div className="flex-1" />
                <Button onClick={handleSaveMemo} size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Save className="w-3 h-3" />
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setIsEditingMemo(false);
                    setEditedMemo(post.voiceMemo || '');
                  }}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <XCircle className="w-3 h-3" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600 dark:text-slate-400 italic">
              {post.voiceMemo || 'No voice memo yet. Add your thoughts about this post.'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Analysis */}
      {post.aiAnalysis && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100">AI Analysis</h3>
            </div>

            {isAnalyzing ? (
              <div className="flex items-center gap-3 py-8">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Updating AI Analysis...</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Incorporating your voice memo updates</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {updatedAnalysis || post.aiAnalysis.aiResponse}
                </div>

                {post.aiAnalysis.nextSteps && post.aiAnalysis.nextSteps.length > 0 && (
                  <div className="pt-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs font-medium text-blue-900 dark:text-blue-300 mb-3">Suggested Next Steps:</p>
                    <ul className="space-y-2">
                      {post.aiAnalysis.nextSteps.map((step, index) => (
                        <li key={index} className="text-sm text-blue-900 dark:text-blue-200 flex items-start gap-2">
                          <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}