import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { User, Calendar, TrendingUp, FileText, Camera, BarChart3, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getCurrentUser, type User as UserType } from '../../services/authService';
import { getAssessments, getActiveRoutine, type AssessmentData, type RoutineData } from '../../services/databaseService';
import { getUserImages, type SkinImageData } from '../../services/imageService';

const mockProgressData = [
  { date: 'Jan', score: 65 },
  { date: 'Feb', score: 68 },
  { date: 'Mar', score: 72 },
  { date: 'Apr', score: 75 },
  { date: 'May', score: 78 },
  { date: 'Jun', score: 82 },
];

const mockHistory = [
  {
    id: 1,
    date: 'June 15, 2026',
    skinType: 'Combination',
    concerns: ['Mild Acne', 'Enlarged Pores'],
    confidence: 94,
  },
  {
    id: 2,
    date: 'May 1, 2026',
    skinType: 'Combination',
    concerns: ['Moderate Acne', 'Oily T-zone'],
    confidence: 91,
  },
  {
    id: 3,
    date: 'March 20, 2026',
    skinType: 'Oily',
    concerns: ['Acne', 'Large Pores', 'Blackheads'],
    confidence: 89,
  },
];

export function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [activeRoutine, setActiveRoutine] = useState<RoutineData | null>(null);
  const [images, setImages] = useState<SkinImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);

      // Get current user
      const currentUser = getCurrentUser();
      setUser(currentUser);

      // Load assessments
      const assessmentsResult = await getAssessments();
      if (assessmentsResult.success && assessmentsResult.data) {
        setAssessments(assessmentsResult.data);
      }

      // Load active routine
      const routineResult = await getActiveRoutine();
      if (routineResult.success && routineResult.data) {
        setActiveRoutine(routineResult.data);
      }

      // Load images
      const userImages = await getUserImages();
      setImages(userImages);

      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdfbf8] to-white py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center animate-pulse mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const userInitials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U';

  const completedAssessments = assessments.filter((a) => a.completedAt);
  const latestAssessment = completedAssessments[completedAssessments.length - 1];

  // Mock progress data (in real app, this would be calculated from historical data)
  const mockProgressData = [
    { date: 'Week 1', score: 65 },
    { date: 'Week 2', score: 68 },
    { date: 'Week 3', score: 72 },
    { date: 'Week 4', score: 75 },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf8] to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Track your skincare journey and progress</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Overview */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  <Avatar className="w-20 h-20 border-4 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] text-white text-2xl">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="mb-1">{user?.name || 'User'}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Skin Type</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            {activeRoutine?.skinType || latestAssessment?.skinType || 'Not assessed'}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="mt-1">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                          }) : 'Recently joined'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Analysis */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Latest Analysis Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4>Combination Skin Analysis</h4>
                        <p className="text-sm text-muted-foreground">June 15, 2026</p>
                      </div>
                    </div>
                    <Link to="/results">
                      <Button variant="outline" size="sm">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Identified Concerns</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-[#ffd4d4]/30 text-accent-foreground">
                        Mild Acne
                      </Badge>
                      <Badge variant="secondary" className="bg-[#ffd4d4]/30 text-accent-foreground">
                        Enlarged Pores
                      </Badge>
                      <Badge variant="secondary" className="bg-[#ffd4d4]/30 text-accent-foreground">
                        Occasional Dryness
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-[#f5e9e4] rounded-xl">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Your personalized routine is ready!</p>
                        <p className="text-muted-foreground">
                          Follow the recommended morning and night skincare steps for optimal results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Chart */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Skin Health Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockProgressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8e3dd" />
                      <XAxis
                        dataKey="date"
                        stroke="#757575"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis
                        stroke="#757575"
                        style={{ fontSize: '12px' }}
                        domain={[60, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e8e3dd',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#8b9a8d"
                        strokeWidth={3}
                        dot={{ fill: '#8b9a8d', r: 5 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Your skin health score has improved by 26% over the last 6 months
                </p>
              </CardContent>
            </Card>

            {/* Analysis History */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Analysis History
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Compare Results
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHistory.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8b9a8d]/10 to-[#a8c4a8]/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="mb-1">{record.skinType} Skin</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {record.date}
                            </p>
                          </div>
                          <Badge variant="outline" className="border-primary/20 text-primary">
                            {record.confidence}%
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {record.concerns.map((concern, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-[#f5e9e4] text-secondary-foreground"
                            >
                              {concern}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/assessment" className="block">
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">New Assessment</p>
                        <p className="text-xs text-muted-foreground">Take questionnaire</p>
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link to="/upload" className="block">
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#ffd4d4]/30 flex items-center justify-center">
                        <Camera className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Upload Photo</p>
                        <p className="text-xs text-muted-foreground">AI image analysis</p>
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link to="/results" className="block">
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#a8c4a8]/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">View Routine</p>
                        <p className="text-xs text-muted-foreground">Latest results</p>
                      </div>
                    </div>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="border-border bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] text-white">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-white/80 text-sm">Total Analyses</p>
                    <p className="text-3xl font-semibold">12</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Current Streak</p>
                    <p className="text-3xl font-semibold">45 days</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Improvement</p>
                    <p className="text-3xl font-semibold">+26%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-primary/20 bg-[#f5e9e4]/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Daily Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Remember to drink at least 8 glasses of water daily to keep your skin hydrated from within. 
                  Proper hydration is key to maintaining healthy, glowing skin!
                </p>
              </CardContent>
            </Card>

            {/* Reminder Card */}
            <Card className="border-[#ffd4d4]/30 bg-[#ffd4d4]/10">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Calendar className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Next Check-in</p>
                    <p className="text-muted-foreground">
                      Your next analysis is recommended in 30 days to track your progress.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
