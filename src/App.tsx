import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { TimelineView } from './components/TimelineView';
import { TaskView } from './components/TaskView';
import { AuthorProfiles } from './components/AuthorProfiles';
import { Recommendations } from './components/Recommendations';
import { Account } from './components/Account';
import { InsightSummary } from './components/InsightSummary';
import { AIChatSidebar } from './components/AIChatSidebar';
import { PostDetail } from './components/PostDetail';
import { LearningInsightDetail } from './components/LearningInsightDetail';
import { NotificationView } from './components/NotificationView';
import { TopNavigation } from './components/TopNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Brain, MessageSquare, Clock, Users, TrendingUp, UserCircle, Lightbulb, Plus, CheckSquare, Menu, X, ChevronLeft, ChevronRight, Bell, FileText, Inbox, Star, Archive, ChevronDown, ChevronUp, AlertCircle, Tags, MoreVertical, Edit, Trash2, LayoutDashboard, Target, StopCircle, BookOpen } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { mockPosts } from './lib/mockData';
import { Label } from './components/LabelContextMenu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Checkbox } from './components/ui/checkbox';
import { Input } from './components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './components/ui/alert-dialog';
import { toast } from 'sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activePostSubTab, setActivePostSubTab] = useState<'inbox' | 'not-rated' | 'favorite' | 'archive'>('inbox');
  const [postsMenuExpanded, setPostsMenuExpanded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<'theme' | 'behavior' | 'bias' | 'reading' | null>(null);
  const [chatPostContext, setChatPostContext] = useState<typeof mockPosts[0] | null>(null);
  const [chatActivated, setChatActivated] = useState(false);
  const [sourceView, setSourceView] = useState<'task' | 'timeline' | null>(null);
  const [initialTopics, setInitialTopics] = useState<string[]>([]);
  const [captureActive, setCaptureActive] = useState(false);

  // Label management states
  const [allLabels, setAllLabels] = useState<Label[]>([
    { id: 'label-1', title: 'Important', createdAt: new Date() },
    { id: 'label-2', title: 'Follow-up', createdAt: new Date() },
    { id: 'label-3', title: 'Research', createdAt: new Date() },
  ]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [editingLabel, setEditingLabel] = useState<Label | null>(null);
  const [deletingLabel, setDeletingLabel] = useState<Label | null>(null);
  const [createLabelDialogOpen, setCreateLabelDialogOpen] = useState(false);
  const [editLabelDialogOpen, setEditLabelDialogOpen] = useState(false);
  const [deleteLabelDialogOpen, setDeleteLabelDialogOpen] = useState(false);
  const [newLabelTitle, setNewLabelTitle] = useState('');
  const [initialLabelFilters, setInitialLabelFilters] = useState<string[]>([]);
  const [showAllLabels, setShowAllLabels] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedPostId(null);
    setMobileMenuOpen(false); // Close mobile menu when tab is selected
    
    // Expand Posts menu if navigating to task tab
    if (tab === 'task') {
      setPostsMenuExpanded(true);
    }
  };

  const handlePostSubTabChange = (subTab: 'inbox' | 'not-rated' | 'favorite' | 'archive') => {
    setActivePostSubTab(subTab);
    setActiveTab('task');
    setSelectedPostId(null);
    setMobileMenuOpen(false);
  };

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    // Track which view the user is coming from
    if (activeTab === 'task') {
      setSourceView('task');
    } else if (activeTab === 'timeline') {
      setSourceView('timeline');
    }
    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      setChatPostContext(post);
      setChatOpen(true); // Open chat when viewing a post
      setChatActivated(false); // Reset to show empty state initially
    }
  };

  const handleBackFromDetail = () => {
    setSelectedPostId(null);
    setChatPostContext(null);
    setChatActivated(false);
    // Clear initial topics when going back normally
    setInitialTopics([]);
  };

  const handleTagClick = (tag: string) => {
    // Set the initial topic filter
    setInitialTopics([tag]);
    // Navigate back to the source view
    if (sourceView === 'task') {
      setActiveTab('task');
    } else if (sourceView === 'timeline') {
      setActiveTab('timeline');
    }
    // Close the post detail
    setSelectedPostId(null);
    setChatPostContext(null);
    setChatActivated(false);
  };

  const handleTopicClick = (topic: string) => {
    // Set the initial topic filter
    setInitialTopics([topic]);
    // Navigate to Tasks tab
    setActiveTab('task');
  };

  const handleInsightClick = (type: 'theme' | 'behavior' | 'bias' | 'reading') => {
    setSelectedInsight(type);
  };

  const handleBackFromInsight = () => {
    setSelectedInsight(null);
  };

  const handleOpenChatWithPost = (postId: string) => {
    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      setChatPostContext(post);
      setChatOpen(true);
      setChatActivated(true); // Activate chat when AI Chat button is clicked
    }
  };

  const handleClearPostContext = () => {
    setChatPostContext(null);
    setChatActivated(false);
  };

  // Label handlers
  const handleCreateLabel = () => {
    if (newLabelTitle.trim()) {
      const newLabel: Label = {
        id: `label-${Date.now()}`,
        title: newLabelTitle.trim(),
        createdAt: new Date(),
      };
      setAllLabels(prev => [...prev, newLabel]);
      setNewLabelTitle('');
      setCreateLabelDialogOpen(false);
      toast('Label created successfully');
    }
  };

  const handleEditLabel = () => {
    if (editingLabel && newLabelTitle.trim()) {
      setAllLabels(prev => prev.map(label =>
        label.id === editingLabel.id ? { ...label, title: newLabelTitle.trim() } : label
      ));
      setNewLabelTitle('');
      setEditingLabel(null);
      setEditLabelDialogOpen(false);
      toast('Label updated successfully');
    }
  };

  const handleDeleteLabel = () => {
    if (deletingLabel) {
      setAllLabels(prev => prev.filter(label => label.id !== deletingLabel.id));
      setSelectedLabels(prev => prev.filter(id => id !== deletingLabel.id));
      setDeletingLabel(null);
      setDeleteLabelDialogOpen(false);
      toast('Label deleted successfully');
    }
  };

  const handleToggleLabelSelection = (labelId: string) => {
    setSelectedLabels(prev =>
      prev.includes(labelId)
        ? prev.filter(id => id !== labelId)
        : [...prev, labelId]
    );
  };

  const handleLabelClick = (labelId: string) => {
    // Toggle label selection and navigate to labels tab
    handleToggleLabelSelection(labelId);
    setActiveTab('labels');
    setMobileMenuOpen(false);
  };

  const handleAllLabelsClick = () => {
    setShowAllLabels(true);
    setSelectedLabels([]);
    setActiveTab('labels');
    setMobileMenuOpen(false);
  };

  const handleToggleAllLabels = () => {
    setShowAllLabels(prev => !prev);
    if (!showAllLabels) {
      setSelectedLabels([]);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-40 h-16 flex items-center px-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="flex items-center gap-3 ml-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base">Insight Capture</h1>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Navigation */}
      <aside className={`
        w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 fixed h-full z-50 transition-all duration-300
        lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          {/* Header in Sidebar */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg">Insight Capture</h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">AI Assistant</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {/* Start/Stop Capture Button */}
            <Button
              onClick={() => {
                setCaptureActive(!captureActive);
                toast(captureActive ? 'Capture stopped' : 'Capture started');
              }}
              className={`w-full justify-center px-4 py-3 h-auto mb-4 ${
                captureActive
                  ? 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
                  : 'bg-[#2563EB] hover:bg-[#1e40af] text-white'
              }`}
            >
              {captureActive ? (
                <StopCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              ) : (
                <Target className="w-5 h-5 mr-3 flex-shrink-0" />
              )}
              <span className="font-medium">{captureActive ? 'Stop Capture' : 'Start Capture'}</span>
            </Button>

            <button
              onClick={() => handleTabChange('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
              <span>Dashboard</span>
            </button>

            {/* Posts with Sub-menu */}
            <div>
              <button
                onClick={() => {
                  setPostsMenuExpanded(!postsMenuExpanded);
                  if (!postsMenuExpanded) {
                    handleTabChange('task');
                  }
                }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'task'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 flex-shrink-0" />
                  <span>Posts</span>
                </div>
                {postsMenuExpanded ? (
                  <ChevronUp className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                )}
              </button>

              {/* Sub-menu */}
              {postsMenuExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {/* Label Filter Dropdown */}
                  <div className="mb-2 px-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between border-slate-300 hover:bg-slate-50 h-9 text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <Tags className="w-3.5 h-3.5" />
                            <span className="text-xs">
                              {showAllLabels 
                                ? 'All Labels' 
                                : selectedLabels.length === 0 
                                ? 'Select Labels'
                                : `${selectedLabels.length} Label${selectedLabels.length > 1 ? 's' : ''}`
                              }
                            </span>
                          </div>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        {/* Create New Label Button */}
                        <div className="p-2 border-b border-slate-200">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-[#2563EB] hover:text-[#1e40af] hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCreateLabelDialogOpen(true);
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create New Label
                          </Button>
                        </div>

                        {/* All Checkbox */}
                        <div className="p-2">
                          <div 
                            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-50 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleAllLabels();
                            }}
                          >
                            <Checkbox
                              checked={showAllLabels}
                              onCheckedChange={handleToggleAllLabels}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <span className="text-sm font-medium">All</span>
                          </div>
                        </div>

                        {/* Label List */}
                        <div className="max-h-64 overflow-y-auto">
                          {allLabels.length === 0 ? (
                            <div className="p-2">
                              <p className="text-xs text-slate-500 italic text-center py-2">
                                No labels yet
                              </p>
                            </div>
                          ) : (
                            allLabels.map((label) => (
                              <div
                                key={label.id}
                                className="px-2 py-1 hover:bg-slate-50 group"
                              >
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={selectedLabels.includes(label.id)}
                                    onCheckedChange={() => {
                                      handleToggleLabelSelection(label.id);
                                      setShowAllLabels(false);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <span 
                                    className="text-sm flex-1 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleLabelClick(label.id);
                                      setShowAllLabels(false);
                                    }}
                                  >
                                    {label.title}
                                  </span>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <MoreVertical className="w-3.5 h-3.5" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" side="right">
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingLabel(label);
                                          setNewLabelTitle(label.title);
                                          setEditLabelDialogOpen(true);
                                        }}
                                      >
                                        <Edit className="w-3.5 h-3.5 mr-2" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setDeletingLabel(label);
                                          setDeleteLabelDialogOpen(true);
                                        }}
                                        className="text-red-600"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <button
                    onClick={() => handlePostSubTabChange('inbox')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                      activeTab === 'task' && activePostSubTab === 'inbox'
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Inbox className="w-4 h-4 flex-shrink-0" />
                    <span>Inbox</span>
                  </button>

                  <button
                    onClick={() => handlePostSubTabChange('not-rated')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                      activeTab === 'task' && activePostSubTab === 'not-rated'
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Not rated</span>
                  </button>

                  <button
                    onClick={() => handlePostSubTabChange('favorite')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                      activeTab === 'task' && activePostSubTab === 'favorite'
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Star className="w-4 h-4 flex-shrink-0" />
                    <span>Favorite</span>
                  </button>

                  <button
                    onClick={() => handlePostSubTabChange('archive')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                      activeTab === 'task' && activePostSubTab === 'archive'
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Archive className="w-4 h-4 flex-shrink-0" />
                    <span>Archive</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleTabChange('authors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'authors'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              <span>Authors</span>
            </button>

            <button
              onClick={() => handleTabChange('recommendations')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'recommendations'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-5 h-5 flex-shrink-0" />
              <span>Recommendations</span>
            </button>

            <button
              onClick={() => handleTabChange('account')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'account'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <UserCircle className="w-5 h-5 flex-shrink-0" />
              <span>Account</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Top Navigation - Desktop Only */}
      <TopNavigation chatOpen={chatOpen} onToggleChat={() => setChatOpen(!chatOpen)} />

      {/* Main Content */}
      <main className={`flex-1 p-4 md:p-6 bg-slate-50 dark:bg-slate-950 lg:ml-64 ${chatOpen ? 'lg:mr-96' : 'lg:mr-0'} pt-20 lg:pt-22 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto">
          {selectedPostId ? (
            <PostDetail 
              postId={selectedPostId} 
              onBack={handleBackFromDetail} 
              onOpenChat={handleOpenChatWithPost}
              onTagClick={handleTagClick}
            />
          ) : selectedInsight ? (
            <LearningInsightDetail 
              type={selectedInsight} 
              onBack={handleBackFromInsight}
              onPostClick={handlePostClick}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && <Dashboard onNavigateToSummary={() => handleTabChange('summary')} onNavigateToTasks={() => handleTabChange('task')} onInsightClick={handleInsightClick} onPostClick={handlePostClick} onTopicClick={handleTopicClick} />}
              {activeTab === 'task' && <TaskView onPostClick={handlePostClick} onOpenChat={handleOpenChatWithPost} initialTopics={initialTopics} activeSubTab={activePostSubTab} initialLabelFilters={showAllLabels ? [] : selectedLabels} allLabels={allLabels} />}
              {activeTab === 'labels' && <TaskView onPostClick={handlePostClick} onOpenChat={handleOpenChatWithPost} initialTopics={[]} activeSubTab={'inbox'} initialLabelFilters={showAllLabels ? [] : selectedLabels} allLabels={allLabels} />}
              {activeTab === 'authors' && <AuthorProfiles />}
              {activeTab === 'recommendations' && <Recommendations />}
              {activeTab === 'account' && <Account darkMode={darkMode} setDarkMode={setDarkMode} />}
              {activeTab === 'summary' && <InsightSummary onBack={() => handleTabChange('dashboard')} />}
            </>
          )}
        </div>
      </main>
      
      {/* Right AI Chat Sidebar - Hidden on mobile, fixed on desktop */}
      {chatOpen && (
        <div className="hidden lg:block">
          <AIChatSidebar 
            onClose={() => setChatOpen(false)} 
            postContext={chatPostContext} 
            chatActivated={chatActivated}
            onClearContext={handleClearPostContext}
          />
        </div>
      )}
      
      {/* Create Label Dialog */}
      <Dialog open={createLabelDialogOpen} onOpenChange={setCreateLabelDialogOpen}>
        <DialogContent className="max-w-sm">
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
              setCreateLabelDialogOpen(false);
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
      <Dialog open={editLabelDialogOpen} onOpenChange={setEditLabelDialogOpen}>
        <DialogContent className="max-w-sm">
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
              setEditLabelDialogOpen(false);
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

      {/* Delete Label Dialog */}
      <AlertDialog open={deleteLabelDialogOpen} onOpenChange={setDeleteLabelDialogOpen}>
        <AlertDialogContent>
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

      <Toaster />
    </div>
  );
}