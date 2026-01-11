import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';

interface MoreFiltersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  selectedPlatforms: string[];
  onApply: (categories: string[], platforms: string[]) => void;
  categoryCount: (category: string) => number;
  getFilteredCount: (categories: string[], platforms: string[]) => number;
}

const CATEGORIES = [
  { value: 'web-search', label: 'Web Search', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
  { value: 'fact-check', label: 'Fact Check', color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
  { value: 'remind', label: 'Remind', color: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100' },
  { value: 'summarize', label: 'Summarize', color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
  { value: 'explain', label: 'Explain Easier', color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
];

const PLATFORMS = [
  { value: 'linkedin', label: 'LinkedIn', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
  { value: 'x', label: 'X (Twitter)', color: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100' },
  { value: 'web', label: 'Web', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
  { value: 'other', label: 'Other', color: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100' },
];

export function MoreFiltersModal({
  open,
  onOpenChange,
  selectedCategories,
  selectedPlatforms,
  onApply,
  categoryCount,
  getFilteredCount,
}: MoreFiltersModalProps) {
  const [localCategories, setLocalCategories] = useState<string[]>(selectedCategories);
  const [localPlatforms, setLocalPlatforms] = useState<string[]>(selectedPlatforms);

  useEffect(() => {
    if (open) {
      setLocalCategories(selectedCategories);
      setLocalPlatforms(selectedPlatforms);
    }
  }, [open, selectedCategories, selectedPlatforms]);

  const toggleCategory = (category: string) => {
    setLocalCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const togglePlatform = (platform: string) => {
    setLocalPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleApply = () => {
    onApply(localCategories, localPlatforms);
    onOpenChange(false);
  };

  const handleReset = () => {
    setLocalCategories([]);
    setLocalPlatforms([]);
  };

  const filteredCount = getFilteredCount(localCategories, localPlatforms);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>More Filters</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Task Categories Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Task Category</h3>
              {localCategories.length > 0 && (
                <span className="text-xs text-slate-500">
                  {localCategories.length} selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const isSelected = localCategories.includes(category.value);
                
                return (
                  <Badge
                    key={category.value}
                    variant="outline"
                    className={`cursor-pointer transition-colors py-2 px-3 min-h-[32px] flex items-center ${
                      isSelected
                        ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => toggleCategory(category.value)}
                  >
                    {category.label}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Platforms Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Platform</h3>
              {localPlatforms.length > 0 && (
                <span className="text-xs text-slate-500">
                  {localPlatforms.length} selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((platform) => {
                const isSelected = localPlatforms.includes(platform.value);
                
                return (
                  <Badge
                    key={platform.value}
                    variant="outline"
                    className={`cursor-pointer transition-colors py-2 px-3 min-h-[32px] flex items-center ${
                      isSelected
                        ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => togglePlatform(platform.value)}
                  >
                    {platform.label}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={handleReset}>
            Reset All
          </Button>
          <Button onClick={handleApply} className="bg-[#2563EB] hover:bg-[#1e40af]">
            Apply ({filteredCount})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}