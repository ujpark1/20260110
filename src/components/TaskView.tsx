import { TopicsFilterModal } from './TopicsFilterModal';
import { MoreFiltersModal } from './MoreFiltersModal';
import { LabelContextMenu, Label } from './LabelContextMenu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockPosts } from '../lib/mockData';
import { Linkedin, Twitter, Mic, CheckCircle2, AlertCircle, Globe, FileText, Book, X, Send, Sparkles, Paperclip, Trash2, ChevronDown, ChevronUp, RotateCcw, Tag, Filter, Square, Save, Archive, Star, Inbox, Edit, MoreVertical, Tags } from 'lucide-react';
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from './ui/pagination';
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

interface TaskViewProps {
  onPostClick: (postId: string) => void;
  onOpenChat?: (postId: string) => void;
  initialTopics?: string[];
  activeSubTab: 'inbox' | 'not-rated' | 'favorite' | 'archive';
  initialLabelFilters?: string[];
  allLabels?: Label[];
  onCreateLabel?: (title: string) => void;
  onEditLabel?: (id: string, title: string) => void;
  onDeleteLabel?: (id: string) => void;
  selectedLabels?: string[];
  onToggleLabelSelection?: (labelId: string) => void;
  showAllLabels?: boolean;
  onToggleAllLabels?: () => void;
}

export function TaskView({ onPostClick, onOpenChat, initialTopics = [], activeSubTab, initialLabelFilters = [], allLabels: propAllLabels, onCreateLabel, onEditLabel, onDeleteLabel, selectedLabels, onToggleLabelSelection, showAllLabels, onToggleAllLabels }: TaskViewProps) {
  const sortedPosts = [...mockPosts].sort((a, b) => b.capturedAt.getTime() - a.capturedAt.getTime());
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortType, setSortType] = useState<string>('time-newest');
  const [archivedPosts, setArchivedPosts] = useState<Set<string>>(new Set());
  const [favoritePosts, setFavoritePosts] = useState<Set<string>>(new Set());
  const [deletedPosts, setDeletedPosts] = useState<Set<string>>(new Set());
  const [ratedPosts, setRatedPosts] = useState<Set<string>>(new Set(['post-1', 'post-2', 'post-4', 'post-6'])); // Default some posts as rated
  const [readPosts, setReadPosts] = useState<Set<string>>(new Set(['post-1', 'post-2', 'post-4', 'post-6', 'post-8'])); // Default some posts as read
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [topicsModalOpen, setTopicsModalOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(initialTopics);
  const [moreFiltersModalOpen, setMoreFiltersModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // Label management states
  const [allLabels, setAllLabels] = useState<Label[]>((propAllLabels && propAllLabels.length > 0) ? propAllLabels : [
    { id: 'label-1', title: 'Important', createdAt: new Date() },
    { id: 'label-2', title: 'Follow-up', createdAt: new Date() },
    { id: 'label-3', title: 'Research', createdAt: new Date() },
  ]);
  const [postLabels, setPostLabels] = useState<{ [postId: string]: string[] }>({
    'post-1': ['label-1'], // Important
    'post-3': ['label-1'], // Important
    'post-2': ['label-2'], // Follow-up
    'post-5': ['label-2', 'label-3'], // Follow-up, Research
    'post-4': ['label-3'], // Research
    'post-7': ['label-1', 'label-2'], // Important, Follow-up
  });

  // Get all unique topics from posts
  const allTopics = Array.from(
    new Set(
      mockPosts
        .filter(post => post.category && !deletedPosts.has(post.id))
        .flatMap(post => post.tags || [])
    )
  ).sort();

  const handleArchivePost = (postId: string) => {
    setArchivedPosts(prev => new Set(prev).add(postId));
    
    toast('Post archived successfully.', {
      duration: 5000,
      action: {
        label: 'Undo',
        onClick: () => handleUndoArchive(postId)
      }
    });
  };

  const handleUndoArchive = (postId: string) => {
    setArchivedPosts(prev => {
      const newSet = new Set(prev);
      newSet.delete(postId);
      return newSet;
    });
  };

  const handleToggleFavorite = (postId: string) => {
    setFavoritePosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        toast('Removed from favorites');
      } else {
        newSet.add(postId);
        toast('Added to favorites');
      }
      return newSet;
    });
  };

  const handleDeletePost = (postId: string) => {
    setDeletedPosts(prev => new Set(prev).add(postId));
  };

  const handleMarkAsRated = (postId: string) => {
    setRatedPosts(prev => new Set(prev).add(postId));
  };

  const handlePostClick = (postId: string) => {
    // Mark post as read when clicked
    setReadPosts(prev => new Set(prev).add(postId));
    // Call the original onPostClick handler
    onPostClick(postId);
  };

  // Label handlers
  const handleCreateLabel = (title: string) => {
    const newLabel: Label = {
      id: `label-${Date.now()}`,
      title,
      createdAt: new Date(),
    };
    setAllLabels(prev => [...prev, newLabel]);
    if (onCreateLabel) onCreateLabel(title);
  };

  const handleUpdateLabel = (id: string, title: string) => {
    setAllLabels(prev => prev.map(label => 
      label.id === id ? { ...label, title } : label
    ));
    if (onEditLabel) onEditLabel(id, title);
  };

  const handleDeleteLabel = (id: string) => {
    setAllLabels(prev => prev.filter(label => label.id !== id));
    // Remove this label from all posts
    setPostLabels(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(postId => {
        updated[postId] = updated[postId].filter(labelId => labelId !== id);
        if (updated[postId].length === 0) {
          delete updated[postId];
        }
      });
      return updated;
    });
    if (onDeleteLabel) onDeleteLabel(id);
  };

  const handleApplyLabels = (postId: string, labelIds: string[]) => {
    setPostLabels(prev => {
      if (labelIds.length === 0) {
        const updated = { ...prev };
        delete updated[postId];
        return updated;
      }
      return {
        ...prev,
        [postId]: labelIds,
      };
    });
    if (onToggleLabelSelection) {
      labelIds.forEach(labelId => onToggleLabelSelection(labelId));
    }
  };
  
  const getFilteredPosts = () => {
    let filtered = sortedPosts.filter(post => post.category && !deletedPosts.has(post.id));
    
    // Apply sub-tab filter
    if (activeSubTab === 'inbox') {
      filtered = filtered.filter(post => !archivedPosts.has(post.id));
    } else if (activeSubTab === 'not-rated') {
      // Not rated: Inbox items that don't have voice memo (not rated yet)
      filtered = filtered.filter(post => !archivedPosts.has(post.id) && !ratedPosts.has(post.id));
    } else if (activeSubTab === 'favorite') {
      filtered = filtered.filter(post => favoritePosts.has(post.id));
    } else if (activeSubTab === 'archive') {
      filtered = filtered.filter(post => archivedPosts.has(post.id));
    }
    
    // Apply label filter (from initialLabelFilters)
    if (initialLabelFilters.length > 0) {
      filtered = filtered.filter(post => {
        const labels = postLabels[post.id] || [];
        return labels.some(labelId => initialLabelFilters.includes(labelId));
      });
    }
    
    // Apply topic filter
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(post =>
        post.tags && post.tags.some(tag => selectedTopics.includes(tag))
      );
    }
    
    // Apply category filter from More Filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post => post.category && selectedCategories.includes(post.category));
    }
    
    // Apply platform filter from More Filters
    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter(post => {
        if (selectedPlatforms.includes('web')) {
          // If 'web' is selected, include web, article, and blog
          return selectedPlatforms.includes(post.platform) || 
                 (post.platform === 'web' || post.platform === 'article' || post.platform === 'blog');
        } else if (selectedPlatforms.includes('other')) {
          // If 'other' is selected, include platforms not in the main list
          return selectedPlatforms.includes(post.platform) ||
                 !['linkedin', 'x', 'web', 'article', 'blog'].includes(post.platform);
        }
        return selectedPlatforms.includes(post.platform);
      });
    }
    
    // Apply sorting
    if (sortType === 'category') {
      const categoryOrder = ['web-search', 'fact-check', 'remind', 'summarize', 'explain'];
      filtered = filtered.sort((a, b) => {
        const aIndex = categoryOrder.indexOf(a.category || '');
        const bIndex = categoryOrder.indexOf(b.category || '');
        return aIndex - bIndex;
      });
    } else if (sortType === 'time-newest') {
      filtered = filtered.sort((a, b) => b.capturedAt.getTime() - a.capturedAt.getTime());
    } else if (sortType === 'time-oldest') {
      filtered = filtered.sort((a, b) => a.capturedAt.getTime() - b.capturedAt.getTime());
    } else if (sortType === 'platform') {
      const platformOrder = ['linkedin', 'x', 'web', 'article', 'blog'];
      filtered = filtered.sort((a, b) => {
        const aIndex = platformOrder.indexOf(a.platform);
        const bIndex = platformOrder.indexOf(b.platform);
        return aIndex - bIndex;
      });
    }
    
    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [platformFilter, categoryFilter, sortType, activeSubTab, initialLabelFilters]);

  // Update selectedTopics when initialTopics changes
  useEffect(() => {
    if (initialTopics.length > 0) {
      setSelectedTopics(initialTopics);
    }
  }, [initialTopics]);

  const getCategoryCount = (cat: string) => {
    const postsWithCategory = sortedPosts.filter(p => p.category && !deletedPosts.has(p.id));
    if (cat === 'all') return postsWithCategory.length;
    return postsWithCategory.filter(p => p.category === cat).length;
  };

  // Get filtered count for More Filters modal
  const getMoreFiltersCount = (categories: string[], platforms: string[]) => {
    let filtered = sortedPosts.filter(post => post.category && !deletedPosts.has(post.id));
    
    // Apply sub-tab filter
    if (activeSubTab === 'inbox') {
      filtered = filtered.filter(post => !archivedPosts.has(post.id));
    } else if (activeSubTab === 'not-rated') {
      filtered = filtered.filter(post => !archivedPosts.has(post.id) && !ratedPosts.has(post.id));
    } else if (activeSubTab === 'favorite') {
      filtered = filtered.filter(post => favoritePosts.has(post.id));
    } else if (activeSubTab === 'archive') {
      filtered = filtered.filter(post => archivedPosts.has(post.id));
    }
    
    // Apply current topic filter
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(post =>
        post.tags && post.tags.some(tag => selectedTopics.includes(tag))
      );
    }
    
    // Apply category filter
    if (categories.length > 0) {
      filtered = filtered.filter(post => post.category && categories.includes(post.category));
    }
    
    // Apply platform filter
    if (platforms.length > 0) {
      filtered = filtered.filter(post => {
        if (platforms.includes('web')) {
          return platforms.includes(post.platform) || 
                 (post.platform === 'web' || post.platform === 'article' || post.platform === 'blog');
        } else if (platforms.includes('other')) {
          return platforms.includes(post.platform) ||
                 !['linkedin', 'x', 'web', 'article', 'blog'].includes(post.platform);
        }
        return platforms.includes(post.platform);
      });
    }
    
    return filtered.length;
  };

  // Get filtered count for Topics modal
  const getTopicsFilteredCount = (topics: string[]) => {
    let filtered = sortedPosts.filter(post => post.category && !deletedPosts.has(post.id));
    
    // Apply sub-tab filter
    if (activeSubTab === 'inbox') {
      filtered = filtered.filter(post => !archivedPosts.has(post.id));
    } else if (activeSubTab === 'not-rated') {
      filtered = filtered.filter(post => !archivedPosts.has(post.id) && !ratedPosts.has(post.id));
    } else if (activeSubTab === 'favorite') {
      filtered = filtered.filter(post => favoritePosts.has(post.id));
    } else if (activeSubTab === 'archive') {
      filtered = filtered.filter(post => archivedPosts.has(post.id));
    }
    
    // Apply topic filter
    if (topics.length > 0) {
      filtered = filtered.filter(post =>
        post.tags && post.tags.some(tag => topics.includes(tag))
      );
    }
    
    // Apply current category and platform filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post => post.category && selectedCategories.includes(post.category));
    }
    
    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter(post => {
        if (selectedPlatforms.includes('web')) {
          return selectedPlatforms.includes(post.platform) || 
                 (post.platform === 'web' || post.platform === 'article' || post.platform === 'blog');
        } else if (selectedPlatforms.includes('other')) {
          return selectedPlatforms.includes(post.platform) ||
                 !['linkedin', 'x', 'web', 'article', 'blog'].includes(post.platform);
        }
        return selectedPlatforms.includes(post.platform);
      });
    }
    
    return filtered.length;
  };

  // Get counts for sub-tabs
  const getInboxCount = () => {
    return sortedPosts.filter(post => 
      post.category && !deletedPosts.has(post.id) && !archivedPosts.has(post.id)
    ).length;
  };

  const getNotRatedCount = () => {
    return sortedPosts.filter(post => 
      post.category && !deletedPosts.has(post.id) && !archivedPosts.has(post.id) && !ratedPosts.has(post.id)
    ).length;
  };

  const getFavoriteCount = () => {
    return sortedPosts.filter(post => 
      post.category && !deletedPosts.has(post.id) && favoritePosts.has(post.id)
    ).length;
  };

  const getArchiveCount = () => {
    return sortedPosts.filter(post => 
      post.category && !deletedPosts.has(post.id) && archivedPosts.has(post.id)
    ).length;
  };

  return (
    <div className="space-y-6 relative">
      <div>
        <div className="mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Posts</h2>
                <p className="text-sm text-muted-foreground">Manage posts by AI analysis request</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-between">
              {/* Left: Topics and More Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => setTopicsModalOpen(true)}
                  className="border-slate-300"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Topics {selectedTopics.length > 0 && `(${selectedTopics.length})`}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setMoreFiltersModalOpen(true)}
                  className="border-slate-300"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters {(selectedCategories.length > 0 || selectedPlatforms.length > 0) && `(${selectedCategories.length + selectedPlatforms.length})`}
                </Button>
              </div>
              
              {/* Right: Sort */}
              <Select value={sortType} onValueChange={setSortType}>
                <SelectTrigger className="w-[180px] border border-slate-300">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time-newest">Newest to Oldest</SelectItem>
                  <SelectItem value="time-oldest">Oldest to Newest</SelectItem>
                  <SelectItem value="category">Sort by Category</SelectItem>
                  <SelectItem value="platform">Sort by Platform</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Selected Filters Pills */}
            {(selectedTopics.length > 0 || selectedCategories.length > 0 || selectedPlatforms.length > 0) && (
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedTopics([]);
                    setSelectedCategories([]);
                    setSelectedPlatforms([]);
                  }}
                  className="h-8 px-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  <span className="text-xs">Reset All</span>
                </Button>
                
                {/* Topics Pills */}
                {selectedTopics.map((topic) => (
                  <Badge
                    key={`topic-${topic}`}
                    variant="outline"
                    className="bg-slate-50 text-slate-700 border-slate-300 pl-3 pr-1 py-1"
                  >
                    <span className="mr-1">{topic}</span>
                    <button
                      onClick={() => setSelectedTopics(prev => prev.filter(t => t !== topic))}
                      className="ml-1 hover:bg-slate-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                
                {/* Category Pills */}
                {selectedCategories.map((category) => {
                  const categoryLabels: Record<string, string> = {
                    'web-search': 'Web Search',
                    'fact-check': 'Fact Check',
                    'remind': 'Remind',
                    'summarize': 'Summarize',
                    'explain': 'Explain Easier'
                  };
                  return (
                    <Badge
                      key={`category-${category}`}
                      variant="outline"
                      className="bg-slate-50 text-slate-700 border-slate-300 pl-3 pr-1 py-1"
                    >
                      <span className="mr-1">{categoryLabels[category] || category}</span>
                      <button
                        onClick={() => setSelectedCategories(prev => prev.filter(c => c !== category))}
                        className="ml-1 hover:bg-slate-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
                
                {/* Platform Pills */}
                {selectedPlatforms.map((platform) => {
                  const platformLabels: Record<string, string> = {
                    'linkedin': 'LinkedIn',
                    'x': 'X (Twitter)',
                    'web': 'Web',
                    'other': 'Other'
                  };
                  return (
                    <Badge
                      key={`platform-${platform}`}
                      variant="outline"
                      className="bg-slate-50 text-slate-700 border-slate-300 pl-3 pr-1 py-1"
                    >
                      <span className="mr-1">{platformLabels[platform] || platform}</span>
                      <button
                        onClick={() => setSelectedPlatforms(prev => prev.filter(p => p !== platform))}
                        className="ml-1 hover:bg-slate-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {paginatedPosts.map((post) => (
            <TaskPostCard 
              key={post.id} 
              post={post} 
              onArchive={() => handleArchivePost(post.id)} 
              onDelete={() => handleDeletePost(post.id)} 
              onPostClick={handlePostClick} 
              onOpenChat={onOpenChat}
              isFavorite={favoritePosts.has(post.id)}
              onToggleFavorite={() => handleToggleFavorite(post.id)}
              isArchived={archivedPosts.has(post.id)}
              onMarkAsRated={() => handleMarkAsRated(post.id)}
              isRead={readPosts.has(post.id)}
              labels={postLabels[post.id] || []}
              allLabels={allLabels}
              onCreateLabel={handleCreateLabel}
              onUpdateLabel={handleUpdateLabel}
              onDeleteLabel={handleDeleteLabel}
              onApplyLabels={handleApplyLabels}
              selectedLabels={selectedLabels}
              onToggleLabelSelection={onToggleLabelSelection}
              showAllLabels={showAllLabels}
              onToggleAllLabels={onToggleAllLabels}
            />
          ))}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p>No posts in this category.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
            {/* Left: Posts per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-700">Posts per page</span>
              <Select 
                value={itemsPerPage.toString()} 
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20 border border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Right: Pagination controls */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Topics Filter Modal */}
      <TopicsFilterModal
        open={topicsModalOpen}
        onOpenChange={setTopicsModalOpen}
        availableTopics={allTopics}
        selectedTopics={selectedTopics}
        onApply={setSelectedTopics}
        getFilteredCount={getTopicsFilteredCount}
      />

      {/* More Filters Modal */}
      <MoreFiltersModal
        open={moreFiltersModalOpen}
        onOpenChange={setMoreFiltersModalOpen}
        selectedCategories={selectedCategories}
        selectedPlatforms={selectedPlatforms}
        onApply={(categories, platforms) => {
          setSelectedCategories(categories);
          setSelectedPlatforms(platforms);
        }}
        categoryCount={getCategoryCount}
        getFilteredCount={(categories, platforms) => {
          let filtered = sortedPosts.filter(post => post.category && !deletedPosts.has(post.id));
          
          // Apply sub-tab filter
          if (activeSubTab === 'inbox') {
            filtered = filtered.filter(post => !archivedPosts.has(post.id));
          } else if (activeSubTab === 'not-rated') {
            filtered = filtered.filter(post => !archivedPosts.has(post.id) && !ratedPosts.has(post.id));
          } else if (activeSubTab === 'favorite') {
            filtered = filtered.filter(post => favoritePosts.has(post.id));
          } else if (activeSubTab === 'archive') {
            filtered = filtered.filter(post => archivedPosts.has(post.id));
          }
          
          // Apply current topic filter
          if (selectedTopics.length > 0) {
            filtered = filtered.filter(post =>
              post.tags && post.tags.some(tag => selectedTopics.includes(tag))
            );
          }
          
          // Apply category filter
          if (categories.length > 0) {
            filtered = filtered.filter(post => post.category && categories.includes(post.category));
          }
          
          // Apply platform filter
          if (platforms.length > 0) {
            filtered = filtered.filter(post => {
              if (platforms.includes('web')) {
                return platforms.includes(post.platform) || 
                       (post.platform === 'web' || post.platform === 'article' || post.platform === 'blog');
              } else if (platforms.includes('other')) {
                return platforms.includes(post.platform) ||
                       !['linkedin', 'x', 'web', 'article', 'blog'].includes(post.platform);
              }
              return platforms.includes(post.platform);
            });
          }
          
          return filtered.length;
        }}
      />
    </div>
  );
}

function TaskPostCard({ 
  post, 
  onArchive, 
  onDelete, 
  onPostClick, 
  onOpenChat,
  isFavorite,
  onToggleFavorite,
  isArchived,
  onMarkAsRated,
  isRead,
  labels,
  allLabels,
  onCreateLabel,
  onUpdateLabel,
  onDeleteLabel,
  onApplyLabels,
  selectedLabels,
  onToggleLabelSelection,
  showAllLabels,
  onToggleAllLabels
}: { 
  post: typeof mockPosts[0], 
  onArchive: () => void, 
  onDelete: () => void, 
  onPostClick: (postId: string) => void, 
  onOpenChat?: (postId: string) => void,
  isFavorite: boolean,
  onToggleFavorite: () => void,
  isArchived: boolean,
  onMarkAsRated: () => void,
  isRead: boolean,
  labels: string[],
  allLabels: Label[],
  onCreateLabel: (title: string) => void,
  onUpdateLabel: (id: string, title: string) => void,
  onDeleteLabel: (id: string) => void,
  onApplyLabels: (postId: string, labelIds: string[]) => void,
  selectedLabels?: string[],
  onToggleLabelSelection?: (labelId: string) => void,
  showAllLabels?: boolean,
  onToggleAllLabels?: () => void
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [memoText, setMemoText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [savedMemo, setSavedMemo] = useState<string>('');
  const [labelModalOpen, setLabelModalOpen] = useState(false);

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    onDelete();
    toast('Post has been deleted.', {
      duration: 3000,
    });
  };

  const handleSaveMemo = () => {
    if (memoText.trim()) {
      // Save the memo to state
      setSavedMemo(memoText);
      
      // Mark as rated
      onMarkAsRated();
      
      // Show success toast
      toast('Voice memo saved successfully! AI analysis is now in progress...', {
        duration: 4000,
      });
      
      // Reset input state
      setIsEditingMemo(false);
      setMemoText('');
      setIsRecording(false);
    }
  };

  const handleEditMemo = () => {
    // Load existing memo into edit field
    setMemoText(post.voiceMemo || savedMemo);
    setIsEditingMemo(true);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      toast('Recording stopped', {
        duration: 2000,
      });
    } else {
      // Start recording
      setIsRecording(true);
      toast('Recording started...', {
        duration: 2000,
      });
    }
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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <>
      <Card 
        className={`cursor-pointer transition-colors ${
          isRead 
            ? '!bg-slate-50 hover:!bg-slate-100' 
            : '!bg-white hover:!bg-slate-50'
        }`}
        onClick={() => onPostClick(post.id)}
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
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${['#2563EB', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][Math.abs(post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 5]}, ${['#1E40AF', '#6D28D9', '#BE185D', '#D97706', '#059669'][Math.abs(post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 5]})`
                        }}
                      >
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
                {!isArchived && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite();
                    }}
                    className={`h-8 w-8 p-0 ${isFavorite ? 'text-yellow-500' : ''}`}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                )}
                {!isArchived && (
                  <LabelContextMenu
                    availableLabels={allLabels}
                    selectedLabelIds={labels}
                    onToggleLabel={(labelId) => {
                      const newLabels = labels.includes(labelId)
                        ? labels.filter(id => id !== labelId)
                        : [...labels, labelId];
                      onApplyLabels(post.id, newLabels);
                    }}
                    onCreateLabel={onCreateLabel}
                    onUpdateLabel={onUpdateLabel}
                    onDeleteLabel={onDeleteLabel}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Manage labels"
                    >
                      <Tags className="w-4 h-4" />
                    </Button>
                  </LabelContextMenu>
                )}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!isArchived && (
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onArchive();
                        }}
                      >
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-2">
              {/* Applied Labels */}
              {labels.length > 0 && (
                <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                  {labels.map((labelId) => {
                    const label = allLabels.find(l => l.id === labelId);
                    return label ? (
                      <Badge
                        key={labelId}
                        variant="outline"
                        className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs"
                      >
                        <Tags className="w-3 h-3 mr-1" />
                        {label.title}
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}

              <p className="text-sm text-slate-900">
                {isExpanded ? post.content : truncateText(post.content, 100)}
              </p>

              {/* Voice Memo - Collapsed View (original or saved) with Edit button */}
              {(post.voiceMemo || savedMemo) && !isExpanded && !isEditingMemo && (
                <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <Mic className="w-4 h-4 mt-0.5 text-slate-500 flex-shrink-0" />
                  <p className="text-sm text-slate-700 flex-1">{truncateText(post.voiceMemo || savedMemo, 80)}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditMemo();
                    }}
                    className="h-6 px-2 flex-shrink-0"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              )}

              {/* Add Voice Memo Button - Shows when no memo exists */}
              {!post.voiceMemo && !savedMemo && !isEditingMemo && (
                <div 
                  className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingMemo(true);
                  }}
                >
                  <Mic className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-sm text-slate-500">Add your thought</span>
                </div>
              )}

              {/* Voice Memo Input Field */}
              {isEditingMemo && (
                <div 
                  className="space-y-2 p-3 rounded-lg border border-slate-300 bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Input
                    value={memoText}
                    onChange={(e) => setMemoText(e.target.value)}
                    placeholder="Type your thought or use voice recording..."
                    className="border-slate-300"
                    autoFocus
                  />
                  <div className="flex items-center justify-between gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleRecording();
                      }}
                      className={isRecording ? "border-red-500 text-red-600 hover:bg-red-50" : "border-slate-300"}
                    >
                      {isRecording ? (
                        <>
                          <Square className="w-4 h-4 mr-2 fill-current" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          Record
                        </>
                      )}
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditingMemo(false);
                          setMemoText('');
                          setIsRecording(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveMemo();
                        }}
                        className="bg-[#2563EB] hover:bg-[#1e40af]"
                        disabled={!memoText.trim()}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="space-y-3 pt-3 border-t">
                {/* Voice Memo - Expanded (original or saved) with Edit button */}
                {(post.voiceMemo || savedMemo) && !isEditingMemo && (
                  <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1">
                        <Mic className="w-4 h-4 mt-0.5 text-slate-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-slate-600 mb-1">Your Voice Memo:</p>
                          <p className="text-sm text-slate-900">{post.voiceMemo || savedMemo}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditMemo();
                        }}
                        className="h-8 px-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
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