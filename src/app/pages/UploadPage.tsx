import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Upload, Image as ImageIcon, X, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { uploadImage, analyzeImage } from '../../services/imageService';

export function UploadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const assessmentId = location.state?.assessmentId;
  const assessmentAnswers = location.state?.assessmentAnswers;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    // Store the file for later upload
    setUploadedFile(file);

    // Read and display the image
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const fakeEvent = {
        target: { files: [file] },
      } as any;
      handleFileSelect(fakeEvent);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setFileName('');
    setError('');
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toast.error('No image selected');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Upload image to storage
      const uploadResult = await uploadImage(uploadedFile, assessmentId);

      if (!uploadResult.success) {
        toast.error(uploadResult.message);
        setIsAnalyzing(false);
        return;
      }

      const imageId = uploadResult.imageId!;
      toast.success('Image uploaded successfully');

      // Analyze the image
      const analysisResult = await analyzeImage(imageId);

      toast.success('Analysis complete!');

      // Navigate to results with analysis data
      navigate('/results', {
        state: {
          assessmentId,
          assessmentAnswers,
          imageId,
          imageData: uploadResult.imageData,
          analysisResult,
        },
      });
    } catch (error) {
      toast.error('Failed to analyze image. Please try again.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf8] via-[#f5e9e4] to-[#ffd4d4]/20 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">AI Image Analysis</span>
          </div>
          <h1 className="text-3xl md:text-4xl mb-4">Upload Your Skin Photo</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a clear, well-lit photo of your face for AI-powered skin analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="border-border shadow-xl">
              <CardContent className="p-8">
                {!uploadedImage ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-border rounded-2xl p-8 text-center space-y-4 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center">
                        <Upload className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2">Drag & Drop Your Photo Here</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        or click to browse from your device
                      </p>
                      <Button variant="outline" type="button">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: JPG, PNG • Max size: 10MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={uploadedImage}
                        alt="Uploaded skin"
                        className="w-full h-auto object-cover"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-foreground" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground truncate">{fileName}</span>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {error && (
                  <div className="mt-4 flex items-start gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {uploadedImage && !error && (
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full mt-6 bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing Image...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {isAnalyzing && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                      <h4>Analyzing your skin...</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>✓ Detecting skin type</p>
                      <p>✓ Identifying concerns</p>
                      <p>✓ Generating recommendations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Guidelines Section */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3>Photo Guidelines</h3>
                </div>

                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Use natural lighting for the best results</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Take a front-facing photo of your clean face</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Avoid heavy makeup or filters</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Ensure your face is clearly visible</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Keep hair away from your face</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#ffd4d4]/30 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3>What We Analyze</h3>
                </div>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Skin type (oily, dry, combination, normal)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Acne and blemishes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Pigmentation and dark spots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Fine lines and wrinkles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Skin texture and pore size</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Redness and sensitivity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#8b9a8d]/20 bg-[#8b9a8d]/5">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <h4 className="mb-1">Privacy Notice</h4>
                    <p className="text-muted-foreground">
                      Your photos are processed securely and are never stored or shared. 
                      All analysis happens in real-time and your data is deleted immediately after.
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