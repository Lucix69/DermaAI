import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import { saveAssessment, getCurrentAssessment, type AssessmentData } from '../../services/databaseService';

interface Question {
  id: string;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 'skin_feel',
    question: 'How does your skin feel after washing your face?',
    options: ['Tight and dry', 'Comfortable', 'Oily in T-zone', 'Very oily all over', 'Sensitive and irritated'],
  },
  {
    id: 'acne_frequency',
    question: 'Do you experience acne or breakouts frequently?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
  },
  {
    id: 'tzone_oily',
    question: 'Is your skin oily in the T-zone (forehead, nose, chin)?',
    options: ['Not at all', 'Slightly', 'Moderately', 'Very oily', 'Extremely oily'],
  },
  {
    id: 'dryness',
    question: 'Do you experience dryness or flaking?',
    options: ['Never', 'Rarely', 'Sometimes in winter', 'Frequently', 'Always'],
  },
  {
    id: 'sensitivity',
    question: 'How would you rate your skin sensitivity level?',
    options: ['Not sensitive', 'Slightly sensitive', 'Moderately sensitive', 'Very sensitive', 'Extremely sensitive'],
  },
  {
    id: 'pores',
    question: 'How visible are your pores?',
    options: ['Not visible', 'Slightly visible', 'Moderately visible', 'Very visible', 'Extremely visible'],
  },
  {
    id: 'aging_concerns',
    question: 'Do you have concerns about fine lines or wrinkles?',
    options: ['No concerns', 'Minor concerns', 'Moderate concerns', 'Major concerns', 'Severe concerns'],
  },
  {
    id: 'sun_exposure',
    question: 'How often do you use sunscreen?',
    options: ['Daily', 'Most days', 'Sometimes', 'Rarely', 'Never'],
  },
];

export function AssessmentPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastQuestion = currentStep === questions.length - 1;

  // Load existing assessment on mount
  useEffect(() => {
    const loadAssessment = async () => {
      const result = await getCurrentAssessment();
      if (result.success && result.data) {
        const assessment = result.data as AssessmentData;
        setAssessmentId(assessment.id);
        setCurrentStep(assessment.step || 0);
        // Load saved answers if any
        if (assessment.skinType) {
          setAnswers((prev) => ({ ...prev, skin_feel: assessment.skinType || '' }));
        }
      }
    };
    loadAssessment();
  }, []);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const saveProgress = async () => {
    const assessmentData: Partial<AssessmentData> = {
      id: assessmentId || undefined,
      step: currentStep,
      ...answers,
    };

    const result = await saveAssessment(assessmentData);
    if (result.success && result.data) {
      setAssessmentId(result.data.id);
    }
  };

  const handleNext = async () => {
    if (!answers[currentQuestion.id]) return;

    setIsLoading(true);

    // Save progress
    await saveProgress();

    if (isLastQuestion) {
      // Complete assessment and navigate to upload page
      try {
        const { completeAssessment } = await import('../../services/databaseService');
        if (assessmentId) {
          await completeAssessment(assessmentId);
        }
        toast.success('Assessment completed!');
        navigate('/upload', { state: { assessmentId, assessmentAnswers: answers } });
      } catch (error) {
        toast.error('Failed to complete assessment');
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }

    setIsLoading(false);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf8] via-[#f5e9e4] to-[#ffd4d4]/20 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">Skin Assessment</span>
          </div>
          <h1 className="text-3xl md:text-4xl mb-2">Discover Your Skin Profile</h1>
          <p className="text-muted-foreground">
            Answer a few questions to help us understand your skin better
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="border-border shadow-xl mb-8">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] text-white mb-4">
                  <span className="text-xl font-semibold">{currentStep + 1}</span>
                </div>
                <h2 className="text-2xl mb-2">{currentQuestion.question}</h2>
                <p className="text-sm text-muted-foreground">Select the option that best describes your skin</p>
              </div>

              <RadioGroup
                value={answers[currentQuestion.id] || ''}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center space-x-3 rounded-xl border-2 p-4 cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/5 ${
                      answers[currentQuestion.id] === option
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="min-w-32"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={!answers[currentQuestion.id] || isLoading}
            className="min-w-32 bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              'Saving...'
            ) : isLastQuestion ? (
              <>
                Submit
                <Sparkles className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Tips */}
        <Card className="mt-8 border-[#8b9a8d]/20 bg-[#8b9a8d]/5">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="mb-1">Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Be as honest as possible with your answers. The more accurate your responses, 
                  the better we can personalize your skincare routine.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
