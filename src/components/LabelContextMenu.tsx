import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
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

export interface Label {
  id: string;
  title: string;
  createdAt: Date;
}

interface LabelContextMenuProps {
  children: React.ReactNode;
  availableLabels: Label[];
  selectedLabelIds: string[];
  onToggleLabel: (labelId: string) => void;
  onCreateLabel: (title: string) => void;
  onUpdateLabel: (id: string, title: string) => void;
  onDeleteLabel: (id: string) => void;
}

export function LabelContextMenu({
  children,
  availableLabels,
  selectedLabelIds,
  onToggleLabel,
  onCreateLabel,
  onUpdateLabel,
  onDeleteLabel,
}: LabelContextMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newLabelTitle, setNewLabelTitle] = useState('');
  const [editingLabel, setEditingLabel] = useState<Label | null>(null);
  const [deletingLabel, setDeletingLabel] = useState<Label | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredLabels = availableLabels.filter(label =>
    label.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateLabel = () => {
    if (newLabelTitle.trim()) {
      onCreateLabel(newLabelTitle.trim());
      setNewLabelTitle('');
      setCreateDialogOpen(false);
      toast('Label created successfully');
    }
  };

  const handleEditLabel = () => {
    if (editingLabel && newLabelTitle.trim()) {
      onUpdateLabel(editingLabel.id, newLabelTitle.trim());
      setNewLabelTitle('');
      setEditingLabel(null);
      setEditDialogOpen(false);
      toast('Label updated successfully');
    }
  };

  const handleDeleteLabel = () => {
    if (deletingLabel) {
      onDeleteLabel(deletingLabel.id);
      setDeletingLabel(null);
      setDeleteDialogOpen(false);
      toast('Label deleted successfully');
    }
  };

  const openEditDialog = (label: Label, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingLabel(label);
    setNewLabelTitle(label.title);
    setEditDialogOpen(true);
    setDropdownOpen(false);
  };

  const openDeleteDialog = (label: Label, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeletingLabel(label);
    setDeleteDialogOpen(true);
    setDropdownOpen(false);
  };

  const handleOpenCreateDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCreateDialogOpen(true);
    setDropdownOpen(false);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-80"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search */}
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search labels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Label List */}
          <div className="max-h-[300px] overflow-y-auto">
            {filteredLabels.length === 0 ? (
              <div className="px-2 py-8 text-center text-slate-500 text-sm">
                {searchQuery ? 'No labels found' : 'No labels yet'}
              </div>
            ) : (
              filteredLabels.map((label) => (
                <div
                  key={label.id}
                  className="flex items-center justify-between px-2 py-2 hover:bg-slate-50 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLabel(label.id);
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Checkbox
                      checked={selectedLabelIds.includes(label.id)}
                      onCheckedChange={() => onToggleLabel(label.id)}
                      onClick={(e) => e.stopPropagation()}
                      id={`label-${label.id}`}
                    />
                    <label
                      htmlFor={`label-${label.id}`}
                      className="flex-1 cursor-pointer text-sm truncate"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {label.title}
                    </label>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={(e) => openEditDialog(label, e)}
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={(e) => openDeleteDialog(label, e)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <DropdownMenuSeparator />

          {/* Create Label Button */}
          <div className="p-2">
            <Button
              variant="outline"
              className="w-full border-dashed h-9"
              onClick={handleOpenCreateDialog}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Label
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Create Label Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-sm" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Create New Label</DialogTitle>
            <DialogDescription>
              Enter a name for your new label
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Label name..."
            value={newLabelTitle}
            onChange={(e) => setNewLabelTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCreateLabel();
              }
            }}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setCreateDialogOpen(false);
              setNewLabelTitle('');
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateLabel}
              disabled={!newLabelTitle.trim()}
              className="bg-[#2563EB] hover:bg-[#1e40af]"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Label Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-sm" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Edit Label</DialogTitle>
            <DialogDescription>
              Update the label name
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Label name..."
            value={newLabelTitle}
            onChange={(e) => setNewLabelTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEditLabel();
              }
            }}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setEditDialogOpen(false);
              setNewLabelTitle('');
              setEditingLabel(null);
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleEditLabel}
              disabled={!newLabelTitle.trim()}
              className="bg-[#2563EB] hover:bg-[#1e40af]"
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Label</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingLabel?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLabel} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
