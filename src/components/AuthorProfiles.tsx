import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { mockAuthors, mockPosts } from '../lib/mockData';
import { TrendingUp, TrendingDown, Star, AlertTriangle, CheckCircle2, Linkedin, Twitter, ArrowLeft, Mic } from 'lucide-react';
import { useState } from 'react';
import { AuthorCard } from './AuthorCard';
import { HistoryPostCard } from './HistoryPostCard';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function AuthorProfiles() {
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const getCredibilityLabel = (score: number) => {
    if (score >= 8) return 'High Credibility';
    if (score >= 5) return 'Medium Credibility';
    return 'Low Credibility';
  };

  // If author is selected, show their posts
  if (selectedAuthor) {
    const author = mockAuthors.find(a => a.handle === selectedAuthor);
    const authorPosts = mockPosts.filter(p => p.authorHandle === selectedAuthor);

    if (!author) return null;

    // Pagination for author posts
    const totalPages = Math.ceil(authorPosts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPosts = authorPosts.slice(startIndex, endIndex);

    return (
      <div className="space-y-6">
        {/* Back Button & Author Header */}
        <Card>
          <CardContent className="pt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedAuthor(null);
                setCurrentPage(1);
              }}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Authors
            </Button>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {author.avatar ? (
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl shadow-md">
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl">{author.name}</h3>
                    {author.platform === 'linkedin' ? (
                      <span className="text-sm font-medium text-slate-600">LinkedIn</span>
                    ) : (
                      <span className="text-sm font-medium text-slate-600">X</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{author.handle}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {author.expertise.map((exp, idx) => (
                      <Badge key={idx} variant="outline">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  {author.credibilityScore >= 8 ? (
                    <CheckCircle2 className="w-6 h-6 text-slate-900" />
                  ) : author.credibilityScore >= 5 ? (
                    <AlertTriangle className="w-6 h-6 text-slate-600" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-slate-400" />
                  )}
                  <span className={`text-xl ${
                    author.credibilityScore >= 8 ? 'text-slate-900' :
                    author.credibilityScore >= 5 ? 'text-slate-600' :
                    'text-slate-400'
                  }`}>
                    {getCredibilityLabel(author.credibilityScore)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Posts */}
        <div className="space-y-4">
          {authorPosts.length === 0 ? (
            <Card>
              <CardContent className="p-8">
                <p className="text-center text-muted-foreground">
                  No saved posts
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {paginatedPosts.map((post) => (
                <HistoryPostCard 
                  key={post.id} 
                  post={post} 
                  showCheckbox={false}
                  onDelete={() => console.log('Delete post from author posts view')}
                />
              ))}

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
            </>
          )}
        </div>
      </div>
    );
  }

  // Default view: show all authors with pagination
  const totalPages = Math.ceil(mockAuthors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAuthors = mockAuthors.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Author Credibility Profiles</CardTitle>
          <CardDescription>Credibility analysis of saved post authors</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {paginatedAuthors.map((author) => (
          <AuthorCard 
            key={author.id}
            author={author}
            onViewAllPosts={setSelectedAuthor}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
          {/* Left: Authors per page selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">Authors per page</span>
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
  );
}