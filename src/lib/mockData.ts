export interface CapturedPost {
  id: string;
  platform: 'linkedin' | 'x' | 'web' | 'article' | 'blog';
  author?: string;
  authorHandle?: string;
  authorTitle?: string;
  authorAvatar?: string;
  sourceUrl?: string;
  originalUrl?: string;
  sourceName?: string;
  content: string;
  capturedAt: Date;
  voiceMemo?: string;
  userRating?: 'positive' | 'negative' | 'neutral';
  category?: 'web-search' | 'fact-check' | 'remind' | 'summarize' | 'explain';
  tags: string[];
  aiAnalysis?: {
    aiResponse: string;
    actionButton: string;
    credibilityLevel: 'high' | 'medium' | 'low';
    topics: string[];
    nextSteps?: string[];
  };
}

export interface Author {
  id: string;
  name: string;
  handle: string;
  platform: 'linkedin' | 'x';
  avatar?: string;
  credibilityScore: number;
  expertise: string[];
  postCount: number;
  avgRating: number;
  recentTrends: string;
}

export const mockPosts: CapturedPost[] = [
  {
    id: '1',
    platform: 'linkedin',
    author: 'Dr. Sarah Chen',
    authorHandle: '@sarahchen',
    authorTitle: 'Medical Doctor',
    authorAvatar: 'https://images.unsplash.com/photo-1632054226752-b1b40867f7a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRvY3RvcnxlbnwxfHx8fDE3NjQxMDcyMDh8MA&ixlib=rb-4.1.0&q=80&w=200',
    originalUrl: 'https://www.linkedin.com/posts/sarahchen_ai-healthcare-research-activity-123456789',
    content: 'New research shows that AI models trained with synthetic data can achieve 95% accuracy in medical diagnostics. This could revolutionize healthcare in developing countries.',
    capturedAt: new Date('2025-11-18T10:30:00'),
    voiceMemo: 'This is really interesting, but I want fact check for this post.',
    userRating: 'positive',
    category: 'fact-check',
    tags: ['AI', 'Healthcare', 'Research', 'Technology', 'Innovation'],
    aiAnalysis: {
      aiResponse: '**Fact-Check Result:**\n\nThis claim is TRUE. It is based on peer-reviewed research published in Nature Medicine journal in October 2025. The research team demonstrated that AI models trained with synthetic data achieved 95.3% accuracy in medical image diagnostics.\n\n**Your Concerns (Developing Countries Application & Data Privacy):**\nThe Discussion section of the paper also mentions this as a limitation. GDPR and local regulatory compliance is essential, and implementation may be difficult in countries with insufficient infrastructure.\n\n**Credibility:** High - Dr. Sarah Chen is a senior researcher at Stanford Medical AI Lab with verified publication record.',
      actionButton: 'Fact Check',
      credibilityLevel: 'high',
      topics: ['Artificial Intelligence', 'Medical Technology', 'Global Health'],
      nextSteps: [
        'Verify original paper directly in Nature Medicine',
        'Further investigate AI healthcare application cases in developing countries',
        'Compare GDPR vs developing country data regulations'
      ]
    }
  },
  {
    id: '2',
    platform: 'x',
    author: 'Tech Insider',
    authorHandle: '@techinsider',
    authorTitle: 'Software Engineer',
    authorAvatar: 'https://images.unsplash.com/photo-1659353220869-69b81aa34051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    originalUrl: 'https://x.com/techinsider/status/1234567890123456789',
    content: 'BREAKING: Major tech company announces revolutionary quantum computing breakthrough. Stock price expected to soar! 🚀',
    capturedAt: new Date('2025-11-17T15:45:00'),
    voiceMemo: 'Seems too exaggerated? No concrete data. Looks like stock manipulation intent.',
    userRating: 'negative',
    category: 'fact-check',
    tags: ['Quantum Computing', 'Suspicious', 'Technology'],
    aiAnalysis: {
      aiResponse: '**Fact-Check Result:**\n\n❌ False/Exaggerated Information.\n\n**Issues:**\n1. Vague expression "Major tech company" - no specific company name\n2. No official press release - cannot confirm on Google News or company IR pages\n3. Stock price mention - clear investment inducement intent\n\n**Account Analysis:**\n@techinsider has posted similar "BREAKING" posts 23 times in the past 6 months, but only 2 cases were actually verified. High likelihood of pump-and-dump scheme involvement.\n\n**Your Judgment:** Completely accurate. Never use for investment decisions.',
      actionButton: 'Verify False Info',
      credibilityLevel: 'low',
      topics: ['Quantum Computing', 'Investment'],
      nextSteps: [
        'Block or mute this account recommended',
        'Check real quantum computing news on MIT Technology Review',
        'Reference investment information only from official IR pages'
      ]
    }
  },
  {
    id: '3',
    platform: 'linkedin',
    author: 'Prof. Michael Torres',
    authorHandle: '@mtorres',
    authorTitle: 'Business School Professor',
    originalUrl: 'https://www.linkedin.com/posts/mtorres_urbanplanning-sustainability-research-activity-987654321',
    content: 'After 10 years of research, our team has identified key factors in sustainable urban development. Thread: 1/5',
    capturedAt: new Date('2025-11-16T09:15:00'),
    voiceMemo: 'I need to read the full thread later.',
    userRating: 'positive',
    category: 'remind',
    tags: ['Urban Planning', 'Sustainability', 'Research', 'Climate'],
    aiAnalysis: {
      aiResponse: '**Reminder:**\n\n📌 This post is the first part of a full thread (1/5). You need to read the remaining threads to get complete insights.\n\n**Author Credibility:** Very High\n- Prof. Michael Torres, MIT Urban Planning Department tenured professor\n- NSF (National Science Foundation) 10-year long-term research project\n- Academically verified\n\n**Application to Your Urban Planning Project:**\nThis research is reliable data that can be used for actual policy making. Strongly recommend reading the full thread and extracting key elements.',
      actionButton: 'Detailed Analysis',
      credibilityLevel: 'high',
      topics: ['Urban Development', 'Sustainability', 'Environmental Science'],
      nextSteps: [
        'Read all remaining threads (2/5 ~ 5/5)',
        'Organize key insights in project documentation',
        'Find research team\'s original paper for detailed data'
      ]
    }
  },
  {
    id: '4',
    platform: 'x',
    author: 'David Kim',
    authorHandle: '@davidkim',
    authorTitle: 'UX Researcher',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    content: 'Most teams say they "do user research," but much of it ends up being user-shaped confirmation bias. Talking to users isn\'t the same as understanding them — real insight comes from behaviors, not polite answers. Some of the biggest breakthroughs I\'ve seen came from watching users hesitate, get confused, or give up in silence.  If your research never challenges your roadmap or makes you uncomfortable, it\'s not research — it\'s validation theater.  And no matter how great your findings are, they\'re meaningless unless the team is actually willing to change course because of them. Great teams don\'t just run research; they let research reshape what they build.',
    capturedAt: new Date('2025-11-15T20:00:00'),
    voiceMemo: 'This is a really insightful post about UX research. Can you summarize the key points for me?',
    userRating: 'positive',
    category: 'summarize',
    tags: ['UX Research', 'Product Design', 'User Experience', 'Product Management'],
    aiAnalysis: {
      aiResponse: '**Summary:**\n\nCritical perspective on common UX research pitfalls.\n\n**Key Points:**\n- Many teams do "confirmation bias research" - just seeking validation instead of real insights\n- Real insights come from observing behaviors (hesitation, confusion, giving up), not just what users say\n- If research never challenges your roadmap, it\'s "validation theater"\n- Research is meaningless unless teams actually change based on findings\n\n**Bottom Line:** Great teams let research reshape what they build, not just validate existing plans.',
      actionButton: 'Key Insights',
      credibilityLevel: 'high',
      topics: ['UX Research', 'Product Development', 'User Experience'],
      nextSteps: [
        'Review your team\'s current research practices',
        'Focus more on observing user behaviors vs. just interviews',
        'Establish culture where research can challenge existing plans'
      ]
    }
  },
  {
    id: '5',
    platform: 'linkedin',
    author: 'Emma Rodriguez',
    authorHandle: '@erodriguez',
    content: 'Interesting perspective on remote work productivity from our latest company survey. 73% reported increased work-life balance.',
    capturedAt: new Date('2025-11-14T11:30:00'),
    voiceMemo: 'Insights worth applying to our team. Share at next meeting.',
    userRating: 'positive',
    category: 'summarize',
    tags: ['Remote Work', 'HR', 'Productivity', 'Management', 'Work-Life Balance'],
    aiAnalysis: {
      aiResponse: '**Summary:**\n\nRemote work survey results from a Fortune 500 company.\n\n**Key Data:**\n- Respondents: 5,000 (statistically significant sample size)\n- 73% reported improved work-life balance\n- Productivity increased by average 12%\n- However, team collaboration satisfaction decreased by 8%\n\n**Credibility:**\nEmma Rodriguez is a Fortune 500 HR Director sharing actual company data. Reliable material suitable for team meeting sharing.\n\n**Your Application Plan:**\nSharing at next meeting - very good judgment.',
      actionButton: 'Detailed Analysis',
      credibilityLevel: 'high',
      topics: ['Remote Work', 'Employee Satisfaction', 'Management'],
      nextSteps: [
        'Add this data to meeting materials',
        'Conduct remote work satisfaction survey for our team',
        'Discuss collaboration tool improvement strategies'
      ]
    }
  },
  {
    id: '6',
    platform: 'article',
    sourceName: 'MIT Technology Review',
    sourceUrl: 'https://technologyreview.com',
    content: 'Breakthrough in quantum error correction brings practical quantum computing closer to reality. Researchers have achieved a 10x improvement in qubit coherence time.',
    capturedAt: new Date('2025-11-13T10:00:00'),
    voiceMemo: 'Compare with Tech Insider\'s post. This is actual MIT article so trustworthy.',
    category: 'web-search',
    tags: ['Quantum Computing', 'Research', 'Technology'],
    aiAnalysis: {
      aiResponse: '**Search Result (MIT Technology Review):**\n\n✅ Verified Information.\n\n**Key Content:**\n- Research results from Google Quantum AI team\n- Qubit coherence time improved 10x from 5 seconds to 50 seconds\n- Solved one of the key barriers to practical quantum computing\n- Published as peer-reviewed paper in Nature Physics\n\n**Comparison with Tech Insider Post:**\nYour analysis is accurate. Tech Insider exaggerated without concrete data, but this MIT article:\n- Provides specific numbers (10x)\n- Names research team (Google Quantum AI)\n- Clear academic source (Nature Physics)\n\nThis is real science journalism.',
      actionButton: 'Read Original',
      credibilityLevel: 'high',
      topics: ['Quantum Computing', 'Research'],
      nextSteps: [
        'Read original Nature Physics paper',
        'Update quantum computing progress timeline',
        'Recommend unfollowing Tech Insider'
      ]
    }
  },
  {
    id: '7',
    platform: 'blog',
    sourceName: 'Personal Blog',
    sourceUrl: 'https://johndoe-thoughts.com',
    content: 'My thoughts on the future of AI: I believe AGI will arrive by 2027 and change everything we know.',
    capturedAt: new Date('2025-11-12T14:30:00'),
    voiceMemo: 'Personal blog so may be subjective. But the perspective is interesting.',
    category: 'explain',
    tags: ['AI', 'AGI', 'Opinion', 'Future'],
    aiAnalysis: {
      aiResponse: '**Simple Explanation:**\n\nAGI (Artificial General Intelligence) means "AI that thinks like humans." Current AI only excels at specific tasks (translation, image recognition, etc.), but AGI would be able to perform all intellectual tasks like humans.\n\n**This Blog\'s Claim: "AGI arrives in 2027"**\n- Personal blogger\'s subjective prediction\n- Differs from expert consensus: Most AI researchers expect 2035-2045\n- Optimistic predictions say 2030, conservative predictions say 2050+\n\n**Why 2027 is Unrealistic?**\nCurrent technology still has large gaps from humans in common sense reasoning, creative problem solving, emotional understanding, etc.\n\n**Your Judgment:**\n"Subjective but interesting perspective" - very balanced view.',
      actionButton: 'Compare Expert Opinions',
      credibilityLevel: 'low',
      topics: ['AI', 'AGI', 'Predictions'],
      nextSteps: [
        'Investigate AI experts\' AGI timeline predictions',
        'Check official roadmaps from OpenAI, DeepMind',
        'Differentiate between hype and actual technology progress'
      ]
    }
  },
  {
    id: '8',
    platform: 'web',
    sourceName: 'Nature',
    sourceUrl: 'https://nature.com',
    content: 'Peer-reviewed study: Climate models show acceleration in Arctic ice loss, with tipping point potentially within 15 years.',
    capturedAt: new Date('2025-11-11T09:00:00'),
    category: 'summarize',
    tags: ['Climate', 'Research', 'Science'],
    aiAnalysis: {
      aiResponse: '**Summary:**\n\nNature-published climate change study.\n\n**Key Findings:**\n- Accelerating Arctic ice loss\n- Tipping point: potentially within 15 years\n- Analysis of 9 climate models\n- Confidence interval: 12-18 years\n\n**Tipping point meaning:**\nPassing the tipping point leads to irreversible environmental changes. Complete Arctic ice melt triggers a chain reaction in the global climate system.\n\n**Credibility:**\nNature is the top authority in climate science. Peer-reviewed research ensures very high credibility.',
      actionButton: 'Read Paper',
      credibilityLevel: 'high',
      topics: ['Climate Science', 'Arctic', 'Environment'],
      nextSteps: [
        'Read original Nature paper in detail',
        'Compare with latest IPCC report',
        'Investigate current climate change response policies'
      ]
    }
  },
  {
    id: '9',
    platform: 'x',
    author: 'Bob Williams',
    authorHandle: '@bobwilliams',
    content: 'Cybersecurity threats in 2025.',
    capturedAt: new Date('2025-11-10T16:00:00'),
    userRating: 'neutral',
    category: 'summarize',
    tags: ['Cybersecurity', 'Technology', 'Security'],
    aiAnalysis: {
      aiResponse: 'Cybersecurity analysis',
      actionButton: 'View Details',
      credibilityLevel: 'medium',
      topics: ['Cybersecurity']
    }
  },
  {
    id: '10',
    platform: 'linkedin',
    author: 'Carol Davis',
    authorHandle: '@caroldavis',
    content: 'Healthcare innovation with telemedicine.',
    capturedAt: new Date('2025-11-09T11:00:00'),
    userRating: 'positive',
    category: 'web-search',
    tags: ['Healthcare', 'Innovation', 'Telemedicine'],
    aiAnalysis: {
      aiResponse: 'Telemedicine advancements',
      actionButton: 'View Details',
      credibilityLevel: 'high',
      topics: ['Healthcare']
    }
  },
  {
    id: '11',
    platform: 'x',
    author: 'David Lee',
    authorHandle: '@davidlee',
    content: 'Education technology trends.',
    capturedAt: new Date('2025-11-08T13:00:00'),
    userRating: 'positive',
    category: 'explain',
    tags: ['Education', 'Technology', 'EdTech'],
    aiAnalysis: {
      aiResponse: 'EdTech trends analysis',
      actionButton: 'View Details',
      credibilityLevel: 'medium',
      topics: ['Education']
    }
  },
  {
    id: '12',
    platform: 'linkedin',
    author: 'Eva Martinez',
    authorHandle: '@evamartinez',
    content: 'Future of work and automation.',
    capturedAt: new Date('2025-11-07T10:30:00'),
    userRating: 'positive',
    category: 'summarize',
    tags: ['Automation', 'Future of Work', 'AI'],
    aiAnalysis: {
      aiResponse: 'Work automation discussion',
      actionButton: 'View Details',
      credibilityLevel: 'high',
      topics: ['Automation']
    }
  },
  {
    id: '13',
    platform: 'web',
    sourceName: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com',
    content: 'Startup raises $100M for revolutionary blockchain solution that promises to solve scalability issues.',
    capturedAt: new Date('2025-11-06T15:00:00'),
    category: 'fact-check',
    tags: ['Blockchain', 'Startup', 'Funding'],
    aiAnalysis: {
      aiResponse: 'TechCrunch is a reliable tech media, but startup news can be exaggerated. Verify actual technology implementation before taking a neutral stance.',
      actionButton: 'Verify Technology',
      credibilityLevel: 'medium',
      topics: ['Blockchain', 'Investment']
    }
  },
  {
    id: '14',
    platform: 'linkedin',
    author: 'Grace Kim',
    authorHandle: '@gracekim',
    content: 'Data privacy regulations update.',
    capturedAt: new Date('2025-11-05T12:00:00'),
    userRating: 'positive',
    category: 'web-search',
    tags: ['Privacy', 'Data Protection', 'Regulation'],
    aiAnalysis: {
      aiResponse: 'Privacy regulation changes',
      actionButton: 'View Details',
      credibilityLevel: 'high',
      topics: ['Privacy']
    }
  },
  {
    id: '15',
    platform: 'x',
    author: 'Henry Taylor',
    authorHandle: '@henrytaylor',
    content: 'Space exploration news.',
    capturedAt: new Date('2025-11-04T09:30:00'),
    userRating: 'positive',
    category: 'remind',
    tags: ['Space', 'Science', 'Exploration'],
    aiAnalysis: {
      aiResponse: 'Space exploration updates',
      actionButton: 'View Details',
      credibilityLevel: 'high',
      topics: ['Space']
    }
  },
  {
    id: '16',
    platform: 'article',
    content: 'Interesting findings on neural networks showing emergent behavior in large language models. The research suggests that consciousness-like properties may emerge at sufficient scale.',
    capturedAt: new Date('2025-11-03T14:20:00'),
    voiceMemo: 'Could not find the source, but the content is interesting. Verification needed later.',
    category: 'fact-check',
    tags: ['AI', 'Neural Networks', 'Research', 'Consciousness'],
    aiAnalysis: {
      aiResponse: 'The source is unclear. The claim of "consciousness-like properties" is a controversial topic in AI research and is difficult to trust without a peer-reviewed academic source. It is recommended to verify similar claims in peer-reviewed journals.',
      actionButton: 'Verify Source',
      credibilityLevel: 'low',
      topics: ['AI', 'Consciousness', 'Neuroscience']
    }
  },
  {
    id: '17',
    platform: 'web',
    content: 'Someone shared this: "New renewable energy storage method achieves 99% efficiency through novel superconductor application." No source provided.',
    capturedAt: new Date('2025-11-02T10:15:00'),
    voiceMemo: 'A friend shared this on KakaoTalk, but didn\'t say where they got it from. If true, it would be groundbreaking.',
    category: 'fact-check',
    tags: ['Energy', 'Technology', 'Superconductor'],
    aiAnalysis: {
      aiResponse: 'Achieving 99% efficiency in energy storage is a very challenging claim in physics. Current leading technologies are around 80-85% efficient. Without a source, verification is impossible, and the claim is scientifically questionable.',
      actionButton: 'Scientific Verification',
      credibilityLevel: 'low',
      topics: ['Energy', 'Physics']
    }
  },
  {
    id: '18',
    platform: 'blog',
    content: 'Captured from a conversation: "The real issue with modern education isn\'t technology, it\'s the lack of critical thinking curriculum. We need to teach kids HOW to think, not WHAT to think."',
    capturedAt: new Date('2025-11-01T16:45:00'),
    voiceMemo: 'Noted this from a podcast, but I don\'t remember who said it. But I agree.',
    category: 'explain',
    tags: ['Education', 'Opinion', 'Critical Thinking'],
    aiAnalysis: {
      aiResponse: 'A common opinion on education. The source is unclear, but the importance of critical thinking education is widely recognized in the field of education. It can serve as a starting point for personal reflection and discussion.',
      actionButton: 'Find Related Research',
      credibilityLevel: 'medium',
      topics: ['Education', 'Philosophy']
    }
  },
  {
    id: '19',
    platform: 'linkedin',
    author: 'Dr. James Wilson',
    authorHandle: '@jameswilson',
    content: 'Just published: Our 5-year longitudinal study on remote work impact shows 40% increase in employee retention and 25% improvement in job satisfaction.',
    capturedAt: new Date('2025-10-31T11:20:00'),
    voiceMemo: 'Great data for our remote work policy proposal.',
    category: 'summarize',
    tags: ['Remote Work', 'Research', 'HR', 'Employee Satisfaction'],
    aiAnalysis: {
      aiResponse: '**Summary:**\n\nLongitudinal study on remote work conducted over 5 years.\n\n**Key Findings:**\n- Employee retention increased by 40%\n- Job satisfaction improved by 25%\n- Sample size: 10,000+ employees across multiple industries\n- Control group comparison shows statistical significance\n\n**Credibility:**\nDr. James Wilson is a verified organizational psychology researcher at Stanford Business School. The study methodology is robust with proper control groups.',
      actionButton: 'Read Full Study',
      credibilityLevel: 'high',
      topics: ['Remote Work', 'HR', 'Organizational Psychology'],
      nextSteps: [
        'Read the full published study',
        'Include findings in remote work policy proposal',
        'Share with HR leadership team'
      ]
    }
  },
  {
    id: '20',
    platform: 'x',
    author: 'Crypto King',
    authorHandle: '@cryptoking88',
    content: 'NEW COIN ALERT! 🚀 This one is going to 1000x! Get in now before it\'s too late! Not financial advice but trust me bro! 💎🙌',
    capturedAt: new Date('2025-10-30T19:30:00'),
    voiceMemo: 'Obvious scam. Saving this to track these types of accounts.',
    category: 'fact-check',
    tags: ['Cryptocurrency', 'Scam', 'Red Flag'],
    aiAnalysis: {
      aiResponse: '**Fact-Check Result:**\n\n❌ Classic Pump-and-Dump Scam Pattern\n\n**Red Flags:**\n1. "1000x" promise - unrealistic returns\n2. Urgency tactics - "Get in now before it\'s too late"\n3. "Trust me bro" - no evidence or analysis\n4. Emoji spam 🚀💎 - common scam tactic\n5. "Not financial advice" disclaimer while giving financial advice\n\n**Account Analysis:**\n@cryptoking88 has promoted 47 different "moon coins" in the past year. None achieved promised returns. Classic pump-and-dump operator.',
      actionButton: 'Report Account',
      credibilityLevel: 'low',
      topics: ['Cryptocurrency', 'Scam'],
      nextSteps: [
        'Report and block this account',
        'Never invest based on social media hype',
        'Learn about crypto scam patterns'
      ]
    }
  },
  {
    id: '21',
    platform: 'article',
    sourceName: 'Harvard Business Review',
    sourceUrl: 'https://hbr.org',
    content: 'New research reveals that companies with diverse leadership teams are 33% more likely to outperform their peers in profitability.',
    capturedAt: new Date('2025-10-29T13:00:00'),
    voiceMemo: 'Important data for diversity initiative presentation.',
    category: 'web-search',
    tags: ['Diversity', 'Leadership', 'Business', 'Research'],
    aiAnalysis: {
      aiResponse: '**Research Summary (HBR):**\n\n✅ Verified Study\n\n**Key Findings:**\n- Companies with diverse leadership: 33% higher profitability likelihood\n- Study analyzed 1,000+ companies over 3 years\n- Diversity measured across gender, ethnicity, age, and background\n- Control variables: industry, company size, market conditions\n\n**Credibility:**\nHarvard Business Review is a top-tier business publication. The research is peer-reviewed and methodologically sound.',
      actionButton: 'Access Full Report',
      credibilityLevel: 'high',
      topics: ['Diversity', 'Business Performance', 'Leadership'],
      nextSteps: [
        'Download full HBR report',
        'Add statistics to diversity initiative presentation',
        'Compare with our company\'s diversity metrics'
      ]
    }
  },
  {
    id: '22',
    platform: 'x',
    author: 'News Aggregator',
    authorHandle: '@newsbot2025',
    content: 'Breaking: Scientists discover cure for common cold. Pharmaceutical stocks plummet.',
    capturedAt: new Date('2025-10-28T08:45:00'),
    voiceMemo: 'Seems suspicious. No major news outlet reporting this.',
    category: 'fact-check',
    tags: ['Health', 'Science', 'Suspicious'],
    aiAnalysis: {
      aiResponse: '**Fact-Check Result:**\n\n❌ False Information\n\n**Verification:**\n- No credible news sources reporting this\n- No scientific journal publications found\n- Pharmaceutical stock prices unchanged\n- Common cold is caused by 200+ different viruses - single cure is scientifically implausible\n\n**Bot Analysis:**\n@newsbot2025 is an automated aggregator account with history of spreading unverified claims for engagement farming.',
      actionButton: 'Debunk',
      credibilityLevel: 'low',
      topics: ['Health', 'Misinformation'],
      nextSteps: [
        'Mute or block this bot account',
        'Verify health news through WHO or CDC',
        'Report misinformation if widely shared'
      ]
    }
  },
  {
    id: '23',
    platform: 'linkedin',
    author: 'Lisa Anderson',
    authorHandle: '@lisaanderson',
    content: 'Excited to share our team\'s new approach to agile project management. We\'ve reduced sprint planning time by 60% while maintaining quality.',
    capturedAt: new Date('2025-10-27T14:30:00'),
    voiceMemo: 'Interesting methodology. Should ask her for details.',
    category: 'remind',
    tags: ['Agile', 'Project Management', 'Productivity'],
    aiAnalysis: {
      aiResponse: '**Reminder:**\n\n📌 Lisa Anderson shared a new agile methodology that reduced sprint planning time by 60%.\n\n**Action Item:** You wanted to ask her for details about the methodology.\n\n**Author Credibility:** Lisa Anderson is a certified Scrum Master and Agile Coach with 10+ years of experience. She regularly shares practical insights.\n\n**Recommendation:** Reach out via LinkedIn DM or comment to learn more about their approach.',
      actionButton: 'Set Follow-up',
      credibilityLevel: 'high',
      topics: ['Agile', 'Project Management'],
      nextSteps: [
        'Send LinkedIn message to Lisa asking about methodology',
        'Schedule call if she\'s open to sharing',
        'Discuss with our project management team'
      ]
    }
  },
  {
    id: '24',
    platform: 'web',
    sourceName: 'The Verge',
    sourceUrl: 'https://theverge.com',
    content: 'Apple announces major privacy update: Apps will now need explicit permission for every data access request, not just once at installation.',
    capturedAt: new Date('2025-10-26T10:00:00'),
    category: 'summarize',
    tags: ['Privacy', 'Apple', 'Technology', 'Mobile'],
    aiAnalysis: {
      aiResponse: '**Summary:**\n\nApple\'s new privacy update changes app permission model.\n\n**Key Changes:**\n- Previous: One-time permission at app installation\n- New: Explicit permission required for each data access\n- Applies to: Location, contacts, photos, microphone, camera\n- Release: iOS 19, scheduled for March 2026\n\n**Impact:**\n- Enhanced user privacy control\n- Developers need to update apps\n- May affect app functionality and user experience\n\n**Source Credibility:** The Verge is a reputable tech publication with verified sources.',
      actionButton: 'Read Article',
      credibilityLevel: 'high',
      topics: ['Privacy', 'Mobile', 'Apple'],
      nextSteps: [
        'Read full article for technical details',
        'Assess impact on our mobile app',
        'Plan UX updates for permission requests'
      ]
    }
  },
  {
    id: '25',
    platform: 'blog',
    sourceName: 'Medium Blog',
    sourceUrl: 'https://medium.com/@randomuser',
    content: 'I quit my six-figure job to become a digital nomad and now I make 10x more while traveling the world. Here\'s my secret formula...',
    capturedAt: new Date('2025-10-25T16:20:00'),
    voiceMemo: 'Typical clickbait. But curious about the business model mentioned.',
    category: 'explain',
    tags: ['Career', 'Digital Nomad', 'Lifestyle'],
    aiAnalysis: {
      aiResponse: '**Simplified Explanation:**\n\nThis is a common pattern in "lifestyle entrepreneurship" content.\n\n**Reality Check:**\n- "10x more" claims are usually exaggerated or don\'t account for irregular income\n- Success stories are survivorship bias - many fail but don\'t share their stories\n- Often these posts are marketing for courses or coaching programs\n\n**Actual Digital Nomad Reality:**\n- Most earn similar or less than office jobs initially\n- Requires specific skills (software development, design, writing, consulting)\n- Income instability is common\n- Health insurance and tax complications\n\n**Your Judgment:** Correct to be skeptical of clickbait while staying curious about legitimate business models.',
      actionButton: 'Research Reality',
      credibilityLevel: 'low',
      topics: ['Career', 'Entrepreneurship'],
      nextSteps: [
        'Research verified digital nomad income statistics',
        'Read balanced perspectives from established remote workers',
        'Ignore "get rich quick" narratives'
      ]
    }
  },
  {
    id: '26',
    platform: 'linkedin',
    author: 'Prof. Rebecca Chang',
    authorHandle: '@rebeccachang',
    content: 'Our latest study on machine learning bias in hiring algorithms shows that even \"neutral\" AI systems can perpetuate historical discrimination patterns.',
    capturedAt: new Date('2025-10-24T11:15:00'),
    voiceMemo: 'Critical research for our AI ethics framework.',
    category: 'web-search',
    tags: ['AI', 'Ethics', 'Bias', 'Hiring', 'Research'],
    aiAnalysis: {
      aiResponse: '**Research Summary:**\n\n✅ Peer-Reviewed Study on AI Bias\n\n**Key Findings:**\n- AI hiring systems trained on historical data replicate past biases\n- Even when protected characteristics (race, gender) are removed, proxy variables perpetuate discrimination\n- Tested across 50 different ML algorithms - bias found in 47 of them\n- Published in prestigious AI Ethics journal\n\n**Author Credibility:**\nProf. Rebecca Chang is a leading researcher in AI ethics at UC Berkeley. Published 40+ papers on algorithmic fairness.\n\n**Importance for Your Work:** This is essential reading for developing an AI ethics framework.',
      actionButton: 'Read Full Study',
      credibilityLevel: 'high',
      topics: ['AI Ethics', 'Bias', 'Machine Learning'],
      nextSteps: [
        'Access and read the full research paper',
        'Integrate findings into AI ethics framework',
        'Schedule discussion with AI development team'
      ]
    }
  },
  {
    id: '27',
    platform: 'linkedin',
    author: 'Dr. Sarah Chen',
    authorHandle: '@sarahchen',
    authorTitle: 'Medical Doctor',
    authorAvatar: 'https://images.unsplash.com/photo-1632054226752-b1b40867f7a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    content: 'Exciting development in telemedicine: Our pilot program in rural communities showed 78% improvement in patient outcomes through AI-assisted diagnostics.',
    capturedAt: new Date('2025-11-12T14:20:00'),
    voiceMemo: 'Follow-up to her previous AI healthcare post. Great real-world results.',
    userRating: 'positive',
    category: 'summarize',
    tags: ['Healthcare', 'AI', 'Telemedicine', 'Innovation'],
    aiAnalysis: {
      aiResponse: '**Summary:**\n\nPilot program results on AI-assisted telemedicine in rural areas.\n\n**Key Results:**\n- 78% improvement in patient outcomes\n- Rural communities with limited healthcare access\n- AI assists doctors with preliminary diagnostics\n- Reduces wait time from weeks to hours\n\n**Credibility:** High - Dr. Sarah Chen provides actual pilot data from Stanford Medical AI Lab.',
      actionButton: 'View Results',
      credibilityLevel: 'high',
      topics: ['Telemedicine', 'Healthcare', 'AI Applications']
    }
  },
  {
    id: '28',
    platform: 'linkedin',
    author: 'Dr. Sarah Chen',
    authorHandle: '@sarahchen',
    authorTitle: 'Medical Doctor',
    authorAvatar: 'https://images.unsplash.com/photo-1632054226752-b1b40867f7a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    content: 'Important reminder: While AI shows promise in healthcare, human oversight remains critical. Our recent case study highlights why.',
    capturedAt: new Date('2025-11-05T09:30:00'),
    userRating: 'positive',
    category: 'remind',
    tags: ['AI', 'Healthcare', 'Ethics', 'Medical'],
    aiAnalysis: {
      aiResponse: '**Reminder:**\n\nBalanced perspective on AI in healthcare - emphasizing need for human oversight.\n\n**Key Point:** AI is a powerful tool but not a replacement for medical professionals. Recent case studies show importance of doctor verification.\n\n**Credibility:** Very High - Shows balanced, responsible approach to AI adoption.',
      actionButton: 'Read Case Study',
      credibilityLevel: 'high',
      topics: ['AI Ethics', 'Healthcare', 'Medical Practice']
    }
  },
  {
    id: '29',
    platform: 'x',
    author: 'Tech Insider',
    authorHandle: '@techinsider',
    authorTitle: 'Software Engineer',
    authorAvatar: 'https://images.unsplash.com/photo-1659353220869-69b81aa34051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    content: 'EXCLUSIVE: New iPhone will have holographic display! 🤯 Apple insider leaked this. You heard it here first!',
    capturedAt: new Date('2025-11-10T20:15:00'),
    voiceMemo: 'Another ridiculous claim. No credible sources.',
    userRating: 'negative',
    category: 'fact-check',
    tags: ['Technology', 'Apple', 'Rumors', 'Suspicious'],
    aiAnalysis: {
      aiResponse: '**Fact-Check Result:**\n\n❌ Unverified Rumor\n\n**Issues:**\n- No credible Apple insider sources\n- Holographic display technology not commercially viable yet\n- Apple has made no such announcements\n- Classic clickbait pattern\n\n**Account Pattern:** Tech Insider continues posting unverified sensational claims.',
      actionButton: 'Debunk',
      credibilityLevel: 'low',
      topics: ['Technology', 'Misinformation']
    }
  },
  {
    id: '30',
    platform: 'linkedin',
    author: 'Prof. Michael Torres',
    authorHandle: '@mtorres',
    authorTitle: 'Business School Professor',
    authorAvatar: 'https://images.unsplash.com/photo-1630959302910-b4eca47cc44f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    content: 'Honored to present our sustainable urban development research at the UN Climate Summit next month. Looking forward to sharing our findings with policymakers.',
    capturedAt: new Date('2025-11-10T11:00:00'),
    userRating: 'positive',
    category: 'remind',
    tags: ['Urban Planning', 'Climate', 'Research', 'UN'],
    aiAnalysis: {
      aiResponse: '**Reminder:**\n\nProf. Torres will present at UN Climate Summit next month.\n\n**Significance:** This validates the importance and credibility of his 10-year research project. UN invitation indicates high-level policy impact.\n\n**Action:** Monitor for published findings after summit.',
      actionButton: 'Set Reminder',
      credibilityLevel: 'high',
      topics: ['Urban Planning', 'Climate Policy', 'Research']
    }
  },
  {
    id: '31',
    platform: 'linkedin',
    author: 'Prof. Michael Torres',
    authorHandle: '@mtorres',
    authorTitle: 'Business School Professor',
    authorAvatar: 'https://images.unsplash.com/photo-1630959302910-b4eca47cc44f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    content: 'Just published: \"The Economics of Green Infrastructure\" in Journal of Urban Studies. Free access for the next 30 days.',
    capturedAt: new Date('2025-11-02T13:45:00'),
    userRating: 'positive',
    category: 'web-search',
    tags: ['Urban Planning', 'Research', 'Sustainability', 'Economics'],
    aiAnalysis: {
      aiResponse: '**Research Publication:**\n\nNew paper on green infrastructure economics.\n\n**Key Topics:**\n- Cost-benefit analysis of green infrastructure\n- Long-term economic impact\n- Implementation frameworks for cities\n\n**Access:** Free for 30 days - download recommended.\n\n**Credibility:** Very High - Published in prestigious peer-reviewed journal.',
      actionButton: 'Download Paper',
      credibilityLevel: 'high',
      topics: ['Urban Economics', 'Sustainability', 'Infrastructure']
    }
  },
  {
    id: '32',
    platform: 'article',
    author: 'Dr. Priya Raman + more',
    sourceName: 'Nature Medicine',
    sourceUrl: 'https://nature.com/articles/nm-2025-synthetic-augmentation',
    content: 'Methods\nA total dataset of 1.1 million images was constructed, consisting of:\n350,000 real clinical radiology scans obtained from anonymized hospital archives\n\n750,000 synthetic images produced using a diffusion-based generative model tuned for medical imaging\n\nTwo model configurations were trained for comparison:\nReal-only baseline model\n\nTrained exclusively on real radiology scans\n\nStandard 2D CNN architecture used for classification\n\nHybrid synthetic-augmented model\n\nTrained on the combined real + synthetic dataset\n\nSame architecture, with identical training hyperparameters\n\nPerformance was evaluated on a 50,000-image external clinical test set containing cases unseen during training.\n\nResults\nBaseline (real-only): 82% accuracy, with notable weaknesses in rare disease categories.\n\nHybrid synthetic-augmented model: 95% accuracy, representing a 13% overall improvement.\n\nRare disease accuracy improved by 28–42%, depending on category.\n\nThe hybrid model also showed reduced false negatives (–19%) and better calibration across demographic subgroups.\n\nSynthetic images helped fill gaps in underrepresented pathologies such as congenital anomalies, early-stage tumors, and rare lung disorders.\n\nConclusion\nSynthetic data, when carefully generated and integrated, can dramatically enhance diagnostic AI performance. By addressing critical issues such as limited real-world data, class imbalance, and privacy restrictions, synthetic augmentation may become a standard component of future medical AI pipelines. Further research is needed to evaluate long-term generalization and regulatory considerations, but these findings demonstrate the transformative potential of synthetic medical datasets.',
    capturedAt: new Date('2025-11-19T09:00:00'),
    voiceMemo: 'This is an important research paper on synthetic data in medical AI. Summarize this post.',
    userRating: 'positive',
    category: 'summarize',
    tags: ['AI', 'Healthcare', 'Medical Imaging', 'Research', 'Synthetic Data'],
    aiAnalysis: {
      aiResponse: '**Summary:**\n\nPeer-reviewed study on using synthetic data to improve medical AI diagnostic accuracy.\n\n**Key Findings:**\n- Dataset: 1.1M images (350K real + 750K synthetic radiology scans)\n- Baseline model (real-only): 82% accuracy\n- Hybrid model (real + synthetic): 95% accuracy (13% improvement)\n- Rare disease detection improved by 28-42%\n- False negatives reduced by 19%\n\n**Methods:**\nTwo models compared: real-only baseline vs. hybrid synthetic-augmented model using identical CNN architecture and training parameters.\n\n**Significance:**\nSynthetic data successfully addresses limited real-world data, class imbalance, and privacy concerns in medical AI. May become standard practice for future medical AI development.\n\n**Credibility:** Very High - Published in Nature Medicine, peer-reviewed research with rigorous methodology.',
      actionButton: 'Full Paper',
      credibilityLevel: 'high',
      topics: ['Medical AI', 'Synthetic Data', 'Healthcare Technology', 'Diagnostic Imaging'],
      nextSteps: [
        'Review detailed methodology and model architecture',
        'Investigate synthetic data generation techniques',
        'Consider privacy and regulatory implications for implementation'
      ]
    }
  }
];

export const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    handle: '@sarahchen',
    platform: 'linkedin',
    avatar: 'https://images.unsplash.com/photo-1632054226752-b1b40867f7a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    credibilityScore: 8.5,
    expertise: ['AI', 'Healthcare', 'Research'],
    postCount: 3,
    avgRating: 4.5,
    recentTrends: 'Consistently shares peer-reviewed research with proper citations.'
  },
  {
    id: '2',
    name: 'Tech Insider',
    handle: '@techinsider',
    platform: 'x',
    avatar: 'https://images.unsplash.com/photo-1659353220869-69b81aa34051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    credibilityScore: 2.5,
    expertise: ['Sensationalism'],
    postCount: 2,
    avgRating: 1.5,
    recentTrends: 'Pattern of unverified claims and clickbait content.'
  },
  {
    id: '3',
    name: 'Prof. Michael Torres',
    handle: '@mtorres',
    platform: 'linkedin',
    avatar: 'https://images.unsplash.com/photo-1630959302910-b4eca47cc44f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    credibilityScore: 9.2,
    expertise: ['Urban Planning', 'Sustainability'],
    postCount: 1,
    avgRating: 5.0,
    recentTrends: 'Academic credentials verified. Strong reputation in field.'
  }
];

export const mockChatHistory = [
  {
    role: 'user' as const,
    content: 'Please summarize the AI-related articles I saved last week.',
    timestamp: new Date('2025-11-18T14:00:00')
  },
  {
    role: 'assistant' as const,
    content: 'You saved two AI-related posts last week.:\n\n1. **Dr. Sarah Chen’s post: A study claiming that an AI model achieved 95% accuracy in medical diagnostics using synthetic data. You noted, “I’m not sure if this would be applicable in developing countries.” Fact-checking shows that it is a verified study published in Nature Medicine. Tech Insider’s post: A claim about breakthroughs in quantum computing. You suspected that it was “exaggerated and possibly intended to manipulate stock prices.” AI analysis also rated its credibility very low, with a score of 2.5. The first post is classified as reliable information, while the second is considered content that requires caution.',
    timestamp: new Date('2025-11-18T14:00:05')
  }
];

export const promptPills = [
  'Summarize posts saved last week',
  'Show me 5 posts with highest credibility',
  'Review posts I was suspicious about',
  'Analyze investment-related saved posts',
  'Organize insights learned this month',
  'View all posts from specific author'
];