import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router';
import { Sparkles, Sun, Moon, Droplet, ShieldCheck, Wind, Zap, Download, Share2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import { generateRoutineFromAssessment, saveRoutine, type AssessmentData, type RoutineData } from '../../services/databaseService';

interface ProductStep {
  icon: React.ReactNode;
  type: string;
  description: string;
  why: string;
}

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState<RoutineData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const assessmentId = location.state?.assessmentId;
  const assessmentAnswers = location.state?.assessmentAnswers;
  const analysisResult = location.state?.analysisResult;
  const imageData = location.state?.imageData;

  // Generate routine on mount
  useEffect(() => {
    const generateRoutine = async () => {
      if (!assessmentAnswers && !analysisResult) {
        toast.error('No assessment data found');
        navigate('/assessment');
        return;
      }

      setIsLoading(true);

      try {
        // Create a mock assessment object for routine generation
        const assessmentData: Partial<AssessmentData> = {
          id: assessmentId,
          skinType: analysisResult?.skinType || deriveSkinType(assessmentAnswers),
          skinConcerns: analysisResult?.detectedIssues || deriveConcerns(assessmentAnswers),
          userId: '', // Will be filled by the service
          step: 8,
          completedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const result = await generateRoutineFromAssessment(assessmentData as AssessmentData);

        if (result.success && result.data) {
          setRoutine(result.data);
          toast.success('Personalized routine generated!');
        } else {
          toast.error('Failed to generate routine');
        }
      } catch (error) {
        toast.error('An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    generateRoutine();
  }, []);

  // Derive skin type from assessment answers
  function deriveSkinType(answers: any): string {
    if (!answers) return 'Normal';
    const skinFeel = answers.skin_feel || '';
    if (skinFeel.includes('dry')) return 'Dry';
    if (skinFeel.includes('oily all over')) return 'Oily';
    if (skinFeel.includes('T-zone')) return 'Combination';
    if (skinFeel.includes('Sensitive')) return 'Sensitive';
    return 'Normal';
  }

  // Derive concerns from assessment answers
  function deriveConcerns(answers: any): string[] {
    const concerns: string[] = [];
    if (!answers) return concerns;

    if (answers.acne_frequency && !answers.acne_frequency.includes('Never')) {
      concerns.push('Acne');
    }
    if (answers.pores && answers.pores.includes('visible')) {
      concerns.push('Enlarged pores');
    }
    if (answers.dryness && !answers.dryness.includes('Never')) {
      concerns.push('Dryness');
    }
    if (answers.aging_concerns && !answers.aging_concerns.includes('No concerns')) {
      concerns.push('Fine lines');
    }
    if (answers.sensitivity && answers.sensitivity.includes('sensitive')) {
      concerns.push('Sensitivity');
    }

    return concerns.length > 0 ? concerns : ['General care'];
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdfbf8] via-[#f5e9e4] to-[#ffd4d4]/20 flex items-center justify-center">
        <Card className="border-border shadow-xl p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3>Generating your personalized routine...</h3>
            <p className="text-sm text-muted-foreground text-center">
              Our AI is analyzing your skin profile
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (!routine) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdfbf8] via-[#f5e9e4] to-[#ffd4d4]/20 flex items-center justify-center">
        <Card className="border-border shadow-xl p-8">
          <div className="text-center">
            <h3 className="mb-2">Unable to generate routine</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please complete the assessment first
            </p>
            <Button onClick={() => navigate('/assessment')}>
              Go to Assessment
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Mock analysis results (in real scenario these come from the routine)
  const skinType = routine.skinType;
  const confidence = analysisResult?.confidence ? Math.round(analysisResult.confidence * 100) : 92;
  const concerns = routine.concerns;

  const morningRoutine: ProductStep[] = routine.morningSteps.map((step, index) => ({
    icon: index === 0 ? <Droplet className="w-5 h-5" /> :
          index === 1 ? <Wind className="w-5 h-5" /> :
          index === 2 ? <Sparkles className="w-5 h-5" /> :
          index === 3 ? <Droplet className="w-5 h-5" /> :
          <ShieldCheck className="w-5 h-5" />,
    type: step.name,
    description: step.description,
    why: routine.products.find(p => p.id === step.productId)?.benefits.join(', ') || '',
  }));

  const nightRoutine: ProductStep[] = routine.eveningSteps.map((step, index) => ({
    icon: index === 0 ? <Droplet className="w-5 h-5" /> :
          index === 1 ? <Droplet className="w-5 h-5" /> :
          index === 2 ? <Zap className="w-5 h-5" /> :
          <Droplet className="w-5 h-5" />,
    type: step.name,
    description: step.description,
    why: routine.products.find(p => p.id === step.productId)?.benefits.join(', ') || '',
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf8] via-[#f5e9e4] to-[#ffd4d4]/20 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">Analysis Complete</span>
          </div>
          <h1 className="text-3xl md:text-4xl mb-4">Your Personalized Skincare Analysis</h1>
          <p className="text-lg text-muted-foreground">
            Based on your unique skin profile, here's your customized routine
          </p>
        </div>

        {/* Results Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-primary/20 bg-gradient-to-br from-white to-[#8b9a8d]/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Detected Skin Type</p>
                  <h3 className="text-xl">{skinType}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your skin shows characteristics of both oily and dry skin in different areas
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Confidence Level</p>
                  <p className="font-semibold text-primary">{confidence}%</p>
                </div>
                <Progress value={confidence} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Our AI is highly confident in this analysis based on your responses and image
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-3">Identified Concerns</p>
              <div className="flex flex-wrap gap-2">
                {concerns.map((concern, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#ffd4d4]/30 text-accent-foreground border-[#ffd4d4]/50"
                  >
                    {concern}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Morning Routine */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd4d4] to-[#f5c5c5] flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl">Morning Routine</h2>
              <p className="text-sm text-muted-foreground">Start your day with these essential steps</p>
            </div>
          </div>

          <div className="space-y-4">
            {morningRoutine.map((step, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b9a8d]/10 to-[#a8c4a8]/10 flex items-center justify-center text-primary">
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {index + 1}
                            </span>
                            <h4>{step.type}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-[#f5e9e4] rounded-lg">
                        <p className="text-sm">
                          <span className="font-medium text-foreground">Why this works: </span>
                          <span className="text-muted-foreground">{step.why}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Night Routine */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center">
              <Moon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl">Night Routine</h2>
              <p className="text-sm text-muted-foreground">Repair and rejuvenate while you sleep</p>
            </div>
          </div>

          <div className="space-y-4">
            {nightRoutine.map((step, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b9a8d]/10 to-[#a8c4a8]/10 flex items-center justify-center text-primary">
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {index + 1}
                            </span>
                            <h4>{step.type}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-[#f5e9e4] rounded-lg">
                        <p className="text-sm">
                          <span className="font-medium text-foreground">Why this works: </span>
                          <span className="text-muted-foreground">{step.why}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Tips */}
        <Card className="border-primary/20 bg-gradient-to-br from-[#8b9a8d]/5 to-white mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Additional Skincare Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Always apply products on damp skin for better absorption</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Wait 30 seconds between each product application</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Use retinol only at night and always follow with sunscreen during the day</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Introduce new products one at a time to monitor reactions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Stay consistent with your routine for at least 4-6 weeks to see results</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Download className="w-5 h-5 mr-2" />
            Download Routine
          </Button>
          <Button size="lg" variant="outline">
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>
          <Link to="/dashboard">
            <Button size="lg" variant="outline">
              View Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Disclaimer */}
        <Card className="border-[#ffd4d4]/30 bg-[#ffd4d4]/10">
          <CardContent className="p-6">
            <p className="text-sm text-center text-muted-foreground">
              <strong>Disclaimer:</strong> These recommendations are AI-generated and for informational purposes only. 
              For specific skin concerns or conditions, please consult a licensed dermatologist.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
