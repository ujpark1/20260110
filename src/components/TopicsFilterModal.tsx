import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

interface TopicsFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableTopics: string[];
  selectedTopics: string[];
  onApply: (topics: string[]) => void;
  getFilteredCount: (topics: string[]) => number;
}

export function TopicsFilterModal({
  open,
  onOpenChange,
  availableTopics,
  selectedTopics,
  onApply,
  getFilteredCount,
}: TopicsFilterModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSelectedTopics, setTempSelectedTopics] = useState<string[]>(selectedTopics);
  const [showAll, setShowAll] = useState(false);

  const handleTopicToggle = (topic: string) => {
    setTempSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleApply = () => {
    onApply(tempSelectedTopics);
    onOpenChange(false);
  };

  const handleReset = () => {
    setTempSelectedTopics([]);
  };

  const filteredTopics = availableTopics.filter((topic) =>
    topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show first 20 topics unless searching or showAll is true
  const displayTopics = searchQuery || showAll ? filteredTopics : filteredTopics.slice(0, 20);
  const hasMore = !searchQuery && filteredTopics.length > 20;

  const filteredCount = getFilteredCount(tempSelectedTopics);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Topics</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="relative px-1 pt-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
            <Input
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-slate-300"
            />
          </div>

          {/* Topics Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Available Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {displayTopics.length > 0 ? (
                  displayTopics.map((topic) => {
                    const isSelected = tempSelectedTopics.includes(topic);
                    return (
                      <Badge
                        key={topic}
                        variant="outline"
                        className={`cursor-pointer transition-colors py-2 px-3 min-h-[32px] flex items-center ${
                          isSelected
                            ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        onClick={() => handleTopicToggle(topic)}
                      >
                        {topic}
                      </Badge>
                    );
                  })
                ) : (
                  <p className="text-sm text-slate-500">No topics found</p>
                )}
              </div>
              {hasMore && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? 'Show Less' : 'Show More'}
                </Button>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              onClick={handleApply}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Apply ({filteredCount})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}