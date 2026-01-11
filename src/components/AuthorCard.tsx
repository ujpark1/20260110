import svgPathsCard from "../imports/svg-mbonb3q18j";
import svgPathsChart from "../imports/svg-0mo4j370qj";
import { Linkedin, Twitter, Mic, ChevronDown, ChevronUp } from 'lucide-react';
import { mockPosts } from '../lib/mockData';
import type { Author } from '../lib/mockData';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { HistoryPostCard } from './HistoryPostCard';
import { useState } from 'react';

interface AuthorCardProps {
  author: Author;
  onViewAllPosts: (handle: string) => void;
}

export function AuthorCard({ author, onViewAllPosts }: AuthorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const authorPosts = mockPosts.filter(p => p.authorHandle === author.handle);
  const recentPost = authorPosts.sort((a, b) => b.capturedAt.getTime() - a.capturedAt.getTime())[0];

  // Generate initials from author name
  const getInitials = () => {
    return author.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Calculate skill values for chart based on expertise
  const getSkillData = () => {
    const skills = ['Research', 'Finance', 'Technology', 'Information', 'AI', 'Healthcare'];
    return skills.map(skill => {
      const hasSkill = author.expertise.some(exp => 
        exp.toLowerCase().includes(skill.toLowerCase())
      );
      
      if (hasSkill) {
        // Strong skills: positive values (1 to 3)
        if (author.expertise[0]?.toLowerCase().includes(skill.toLowerCase())) {
          return { name: skill, value: 3, color: '#14B8A6' }; // Teal for positive values
        }
        return { name: skill, value: 2, color: '#14B8A6' };
      } else {
        // Weak/missing skills: negative values (-3 to -1)
        const index = skills.indexOf(skill);
        if (index % 3 === 0) {
          return { name: skill, value: -2.5, color: '#FF385C' }; // Red for negative values
        } else if (index % 3 === 1) {
          return { name: skill, value: -1.5, color: '#FF385C' };
        }
        return { name: skill, value: -1, color: '#FF385C' };
      }
    }).filter(skill => skill.value !== 0); // Remove items with 0 value
  };

  const skillData = getSkillData();

  return (
    <div 
      className="bg-white relative rounded-[14px] border border-[rgba(0,0,0,0.1)] cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="box-border content-stretch flex flex-col items-start pl-[25px] pr-[25px] py-[25px]">
        <div className="relative shrink-0 w-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[24px] items-center justify-center relative w-full">
            
            {/* Author Header */}
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
              {/* Left: Avatar & Name */}
              <div className="relative shrink-0">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] items-center relative">
                  {/* Avatar */}
                  {author.avatar ? (
                    <img 
                      src={author.avatar} 
                      alt={author.name}
                      className="rounded-full shrink-0 size-[64px] object-cover"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 relative rounded-full shrink-0 size-[64px] shadow-md">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[64px]">
                        <p className="font-['Inter'] font-normal leading-[28px] not-italic relative shrink-0 text-[20px] text-nowrap text-white tracking-[-0.4492px] whitespace-pre">
                          {getInitials()}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Name & Icon */}
                  <div className="relative">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start justify-center relative">
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                        <div className="relative shrink-0">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border relative">
                            <p className="font-['Inter'] font-semibold leading-[24px] not-italic text-[16px] text-neutral-950 text-nowrap tracking-[-0.3125px] whitespace-pre">
                              {author.name}
                            </p>
                          </div>
                        </div>
                        {author.platform === 'linkedin' && (
                          <div className="relative shrink-0">
                            <span className="text-xs font-medium text-[#45556C]">LinkedIn</span>
                          </div>
                        )}
                        {author.platform === 'x' && (
                          <div className="relative shrink-0">
                            <span className="text-xs font-medium text-[#45556C]">X</span>
                          </div>
                        )}
                      </div>
                      {/* Post count */}
                      <p className="font-['Inter'] font-normal leading-[20px] not-italic text-[14px] text-slate-600 tracking-[-0.1504px] mt-1">
                        {authorPosts.length} saved post{authorPosts.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Expand/Collapse Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-slate-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-600" />
                )}
              </button>
            </div>

            {/* Author Summary */}
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="h-[20px] relative shrink-0 w-full">
                <p className="font-['Inter'] font-bold leading-[20px] not-italic text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">
                  Author summary
                </p>
              </div>
              <div className="bg-slate-100 box-border content-stretch flex gap-[10px] items-center justify-center p-[16px] relative rounded-[10px] shrink-0 w-full">
                <p className="font-['Inter'] font-normal leading-[20px] not-italic relative text-[14px] text-neutral-950 tracking-[-0.1504px]">
                  Strong in {author.expertise.join(', ')}, backed by deep domain knowledge and data-driven analytical ability to clearly interpret complex issues.
                </p>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div 
                className="content-stretch flex flex-col gap-[24px] items-center justify-center relative w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Skills factor header */}
                <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full">
                  <p className="font-['Inter'] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">
                    Skills factor
                  </p>
                </div>

                {/* Horizontal Bar Chart */}
                <div className="relative w-full px-4 py-6" style={{ height: `${skillData.length * 60 + 80}px` }}>
                  {/* Chart Container */}
                  <div className="relative w-full h-full">
                    {/* Y-axis labels (left side) */}
                    <div className="absolute left-0 top-0 bottom-12 w-24 flex flex-col justify-between py-4">
                      {skillData.map((skill, idx) => (
                        <div key={idx} className="h-8 flex items-center justify-end pr-3">
                          <p className="text-sm text-[#2d2d2d] font-['Lato'] tracking-[0.5px]">
                            {skill.name}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Chart area */}
                    <div className="absolute left-24 right-0 top-0 bottom-12">
                      {/* Grid background */}
                      <div className="absolute inset-0 flex">
                        {/* Grid lines for each value from -3 to 3 */}
                        {[-3, -2, -1, 0, 1, 2, 3].map((val, idx) => {
                          const position = ((val + 3) / 6) * 100; // -3 to 3 is range of 6
                          const isCenter = val === 0;
                          
                          return (
                            <div
                              key={idx}
                              className="absolute top-0 bottom-0"
                              style={{ left: `${position}%` }}
                            >
                              {isCenter ? (
                                <div className="w-0.5 h-full bg-[#2d2d2d]" />
                              ) : (
                                <svg className="h-full w-px" preserveAspectRatio="none" viewBox="0 0 1 100">
                                  <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="#EBEBEB" strokeDasharray="3 3" />
                                </svg>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Bars */}
                      <div className="absolute inset-0 flex flex-col justify-between py-4">
                        {skillData.map((skill, idx) => {
                          // Calculate position: -3 to 3 range, center at 0
                          const centerPos = ((0 + 3) / 6) * 100; // Center position (50%)
                          const valuePos = ((skill.value + 3) / 6) * 100;
                          
                          const isNegative = skill.value < 0;
                          const barLeft = isNegative ? valuePos : centerPos;
                          const barWidth = Math.abs(valuePos - centerPos);
                          
                          return (
                            <div key={idx} className="h-8 relative flex items-center">
                              {/* Bar */}
                              <div
                                className="absolute h-2 rounded-full transition-all"
                                style={{
                                  left: `${barLeft}%`,
                                  width: `${barWidth}%`,
                                  backgroundColor: skill.color,
                                  opacity: 1
                                }}
                              />
                              {/* End dot */}
                              <div
                                className="absolute w-4 h-4 rounded-full border-[2px] border-white shadow-sm transition-all"
                                style={{
                                  left: `${valuePos}%`,
                                  backgroundColor: skill.color,
                                  transform: 'translate(-50%, 0)'
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* X-axis labels (bottom) */}
                    <div className="absolute left-24 right-0 bottom-0 h-12 flex items-center">
                      <div className="w-full relative">
                        {/* Bottom line */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-[#EBEBEB]" />
                        
                        {/* Labels */}
                        <div className="flex justify-between pt-2">
                          {[-3, -2, -1, 0, 1, 2, 3].map((val, idx) => (
                            <div
                              key={idx}
                              className="flex-1 text-center"
                              style={{ marginLeft: idx === 0 ? '0' : '-8px', marginRight: idx === 6 ? '0' : '-8px' }}
                            >
                              <p className="text-[13px] text-[#717171] font-['Inter']">
                                {val}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Captured Posts */}
                {recentPost && (
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    <div className="h-[20px] relative shrink-0 w-full">
                      <p className="font-['Inter'] font-bold leading-[20px] not-italic text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">
                        Recent Captured Posts:
                      </p>
                    </div>
                    <HistoryPostCard 
                      post={recentPost} 
                      showCheckbox={false}
                      onDelete={() => console.log('Delete post from author card')}
                    />
                  </div>
                )}

                {/* View All Posts Button */}
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                  <button
                    onClick={() => onViewAllPosts(author.handle)}
                    className="bg-white h-[32px] relative rounded-[8px] shrink-0 border border-[rgba(0,0,0,0.1)] hover:bg-slate-50 transition-colors"
                  >
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative">
                      <p className="font-['Inter'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">
                        View All Posts
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}