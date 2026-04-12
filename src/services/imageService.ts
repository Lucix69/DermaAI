/**
 * Image Service
 * Handles image upload, processing, and AI-based skin analysis
 */

import { saveImage, updateImageAnalysis, getImages, type SkinImageData } from './databaseService';

export interface ImageUploadResult {
  success: boolean;
  message: string;
  imageId?: string;
  imageData?: SkinImageData;
}

export interface AnalysisResult {
  skinType: string;
  detectedIssues: string[];
  confidence: number;
  recommendations: string[];
}

/**
 * Convert File to base64 string
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

/**
 * Validate image file
 */
function validateImage(file: File): { valid: boolean; error?: string } {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.',
    };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size too large. Please upload an image smaller than 5MB.',
    };
  }

  return { valid: true };
}

/**
 * Upload image and save to storage
 */
export async function uploadImage(
  file: File,
  assessmentId?: string
): Promise<ImageUploadResult> {
  try {
    // Validate image
    const validation = validateImage(file);
    if (!validation.valid) {
      return {
        success: false,
        message: validation.error!,
      };
    }

    // Convert to base64
    const imageData = await fileToBase64(file);

    // Save to database
    const result = await saveImage(imageData, file.name, file.size, assessmentId);

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    return {
      success: true,
      message: 'Image uploaded successfully',
      imageId: result.data?.id,
      imageData: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to upload image. Please try again.',
    };
  }
}

/**
 * Analyze skin image using mock AI
 * In production, this would call a real AI service
 */
export async function analyzeImage(imageId: string): Promise<AnalysisResult> {
  return new Promise((resolve) => {
    // Simulate AI processing time
    setTimeout(async () => {
      // Mock AI analysis results
      const mockResults: AnalysisResult = {
        skinType: ['Oily', 'Dry', 'Combination', 'Normal'][Math.floor(Math.random() * 4)],
        detectedIssues: generateRandomIssues(),
        confidence: 0.85 + Math.random() * 0.1, // 85-95% confidence
        recommendations: generateRecommendations(),
      };

      // Update image with analysis results
      await updateImageAnalysis(
        imageId,
        {
          skinType: mockResults.skinType,
          detectedIssues: mockResults.detectedIssues,
          confidence: mockResults.confidence,
        },
        'completed'
      );

      resolve(mockResults);
    }, 2000); // 2 second simulated processing
  });
}

/**
 * Get user's uploaded images
 */
export async function getUserImages(): Promise<SkinImageData[]> {
  const result = await getImages();
  return result.data || [];
}

/**
 * Delete image
 */
export async function deleteImage(imageId: string): Promise<boolean> {
  try {
    const images = await getUserImages();
    const filtered = images.filter(img => img.id !== imageId);
    localStorage.setItem('dermaai_images', JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

// Helper functions for generating mock analysis data

function generateRandomIssues(): string[] {
  const allIssues = [
    'Fine lines',
    'Dark circles',
    'Uneven skin tone',
    'Enlarged pores',
    'Redness',
    'Acne',
    'Dryness',
    'Excess oil',
    'Sun damage',
    'Hyperpigmentation',
  ];

  const numIssues = Math.floor(Math.random() * 3) + 2; // 2-4 issues
  const shuffled = [...allIssues].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numIssues);
}

function generateRecommendations(): string[] {
  return [
    'Use a gentle cleanser twice daily to maintain skin balance',
    'Apply sunscreen with at least SPF 30 every morning',
    'Incorporate a hydrating serum with hyaluronic acid',
    'Consider using a retinol product in your evening routine',
    'Stay hydrated by drinking at least 8 glasses of water daily',
    'Get adequate sleep (7-9 hours) for optimal skin regeneration',
  ];
}

/**
 * Compress image if needed (for better storage)
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1200,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
    };
  });
}

/**
 * Batch upload multiple images
 */
export async function uploadMultipleImages(
  files: File[],
  assessmentId?: string
): Promise<ImageUploadResult[]> {
  const results: ImageUploadResult[] = [];

  for (const file of files) {
    const result = await uploadImage(file, assessmentId);
    results.push(result);
  }

  return results;
}
