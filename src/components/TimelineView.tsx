import { HistoryPostCard } from './HistoryPostCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockPosts } from '../lib/mockData';
import { Trash2, Tag, X, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
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
import { TopicsFilterModal } from './TopicsFilterModal';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface TimelineViewProps {
  onPostClick: (postId: string) => void;
  onOpenChat?: (postId: string) => void;
  initialTopics?: string[];
}

export function TimelineView({ onPostClick, onOpenChat, initialTopics = [] }: TimelineViewProps) {
  const sortedPosts = [...mockPosts].sort((a, b) => b.capturedAt.getTime() - a.capturedAt.getTime());
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [sortType, setSortType] = useState<string>('time-newest');
  const [deletedPosts, setDeletedPosts] = useState<Set<string>>(new Set());
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [topicsModalOpen, setTopicsModalOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(initialTopics);

  // Get all unique topics from posts
  const allTopics = Array.from(
    new Set(
      mockPosts
        .filter(post => !deletedPosts.has(post.id))
        .flatMap(post => post.tags || [])
    )
  ).sort();

  const handleDeletePost = (postId: string) => {
    setDeletedPosts(prev => new Set(prev).add(postId));
  };

  const handleTogglePostSelection = (postId: string) => {
    setSelectedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleBulkDelete = () => {
    selectedPosts.forEach(postId => {
      setDeletedPosts(prev => new Set(prev).add(postId));
    });
    setSelectedPosts(new Set());
    setBulkDeleteDialogOpen(false);
    toast(`${selectedPosts.size} post(s) have been deleted.`, {
      duration: 3000,
    });
  };

  // Get filtered count for Topics modal
  const getTopicsFilteredCount = (topics: string[]) => {
    let filtered = sortedPosts.filter(post => !deletedPosts.has(post.id));
    
    // Apply topic filter
    if (topics.length > 0) {
      filtered = filtered.filter(post =>
        post.tags && post.tags.some(tag => topics.includes(tag))
      );
    }
    
    // Apply current platform filter
    if (platformFilter !== 'all') {
      if (platformFilter === 'web') {
        filtered = filtered.filter(p => ['web', 'article', 'blog'].includes(p.platform));
      } else if (platformFilter === 'other') {
        filtered = filtered.filter(p => !['linkedin', 'x', 'web', 'article', 'blog'].includes(p.platform));
      } else {
        filtered = filtered.filter(p => p.platform === platformFilter);
      }
    }
    
    return filtered.length;
  };

  const getFilteredPosts = () => {
    let filtered = sortedPosts.filter(post => !deletedPosts.has(post.id));
    
    // Apply topic filter
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(post =>
        post.tags && post.tags.some(tag => selectedTopics.includes(tag))
      );
    }
    
    if (platformFilter !== 'all') {
      if (platformFilter === 'web') {
        filtered = filtered.filter(p => ['web', 'article', 'blog'].includes(p.platform));
      } else if (platformFilter === 'other') {
        filtered = filtered.filter(p => !['linkedin', 'x', 'web', 'article', 'blog'].includes(p.platform));
      } else {
        filtered = filtered.filter(p => p.platform === platformFilter);
      }
    }
    
    // Apply sorting
    if (sortType === 'time-newest') {
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
  }, [platformFilter, sortType]);

  // Update selectedTopics when initialTopics changes
  useEffect(() => {
    if (initialTopics.length > 0) {
      setSelectedTopics(initialTopics);
    }
  }, [initialTopics]);

  return (
    <div className="space-y-6 relative">
      <div>
        <div className="mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">History</h2>
                <p className="text-sm text-muted-foreground">View saved posts</p>
              </div>
              {selectedPosts.size > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setBulkDeleteDialogOpen(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete ({selectedPosts.size})
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Select value={sortType} onValueChange={setSortType}>
                <SelectTrigger className="w-[180px] border border-slate-300">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time-newest">Newest to Oldest</SelectItem>
                  <SelectItem value="time-oldest">Oldest to Newest</SelectItem>
                  <SelectItem value="platform">Sort by Platform</SelectItem>
                </SelectContent>
              </Select>
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-40 border border-slate-300">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="x">X</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setTopicsModalOpen(true)}
                className="border-slate-300"
              >
                <Tag className="w-4 h-4 mr-2" />
                Topics {selectedTopics.length > 0 && `(${selectedTopics.length})`}
              </Button>
            </div>

            {/* Selected Topics Pills */}
            {selectedTopics.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTopics([])}
                  className="h-8 px-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  <span className="text-xs">Reset Topics</span>
                </Button>
                {selectedTopics.map((topic) => (
                  <Badge
                    key={topic}
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 pl-3 pr-1 py-1"
                  >
                    <span className="mr-1">{topic}</span>
                    <button
                      onClick={() => setSelectedTopics(prev => prev.filter(t => t !== topic))}
                      className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {paginatedPosts.map((post) => (
            <HistoryPostCard 
              key={post.id} 
              post={post} 
              onDelete={() => handleDeletePost(post.id)}
              isSelected={selectedPosts.has(post.id)}
              onToggleSelect={() => handleTogglePostSelection(post.id)}
              onPostClick={onPostClick}
              onOpenChat={onOpenChat}
              onOpenChat={onOpenChat}
            />
          ))}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p>No posts to display.</p>
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

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Selected Posts</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedPosts.size} post(s)? Deleted posts cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Topics Filter Modal */}
      <TopicsFilterModal
        open={topicsModalOpen}
        onOpenChange={setTopicsModalOpen}
        availableTopics={allTopics}
        selectedTopics={selectedTopics}
        onApply={setSelectedTopics}
        getFilteredCount={getTopicsFilteredCount}
      />
    </div>
  );
}