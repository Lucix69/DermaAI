/**
 * Database Service
 * Handles data storage and retrieval using localStorage
 */

import { getCurrentUser } from './authService';

// Assessment Data Types
export interface AssessmentData {
  id: string;
  userId: string;
  step: number;
  skinType?: string;
  skinConcerns?: string[];
  ageRange?: string;
  currentProducts?: string[];
  allergies?: string;
  sunExposure?: string;
  lifestyle?: string[];
  goals?: string[];
  budget?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Skin Image Data
export interface SkinImageData {
  id: string;
  userId: string;
  assessmentId?: string;
  imageData: string; // base64 encoded image
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  analysisStatus?: 'pending' | 'analyzing' | 'completed' | 'failed';
  analysisResults?: {
    skinType?: string;
    detectedIssues?: string[];
    confidence?: number;
  };
}

// Skincare Routine Data
export interface RoutineData {
  id: string;
  userId: string;
  assessmentId?: string;
  name: string;
  description: string;
  skinType: string;
  concerns: string[];
  products: ProductRecommendation[];
  morningSteps: RoutineStep[];
  eveningSteps: RoutineStep[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  benefits: string[];
  howToUse: string;
  priceRange: string;
  imageUrl?: string;
}

export interface RoutineStep {
  order: number;
  name: string;
  description: string;
  productId?: string;
  timeOfDay: 'morning' | 'evening' | 'both';
}

// Response Type
export interface DbResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

const STORAGE_KEYS = {
  ASSESSMENTS: 'dermaai_assessments',
  IMAGES: 'dermaai_images',
  ROUTINES: 'dermaai_routines',
};

// Helper function to generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== ASSESSMENT METHODS ====================

/**
 * Save or update assessment data
 */
export async function saveAssessment(data: Partial<AssessmentData>): Promise<DbResponse<AssessmentData>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const assessments = JSON.parse(localStorage.getItem(STORAGE_KEYS.ASSESSMENTS) || '[]');

      // Find existing assessment or create new
      let assessment: AssessmentData;
      const existingIndex = data.id
        ? assessments.findIndex((a: AssessmentData) => a.id === data.id)
        : assessments.findIndex((a: AssessmentData) => a.userId === user.id && !a.completedAt);

      if (existingIndex !== -1) {
        // Update existing
        assessment = {
          ...assessments[existingIndex],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        assessments[existingIndex] = assessment;
      } else {
        // Create new
        assessment = {
          id: generateId(),
          userId: user.id,
          step: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...data,
        } as AssessmentData;
        assessments.push(assessment);
      }

      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));

      resolve({
        success: true,
        message: 'Assessment saved successfully',
        data: assessment,
      });
    }, 300);
  });
}

/**
 * Get user's assessments
 */
export async function getAssessments(): Promise<DbResponse<AssessmentData[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const assessments = JSON.parse(localStorage.getItem(STORAGE_KEYS.ASSESSMENTS) || '[]');
      const userAssessments = assessments.filter((a: AssessmentData) => a.userId === user.id);

      resolve({
        success: true,
        message: 'Assessments retrieved successfully',
        data: userAssessments,
      });
    }, 200);
  });
}

/**
 * Get current incomplete assessment
 */
export async function getCurrentAssessment(): Promise<DbResponse<AssessmentData>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const assessments = JSON.parse(localStorage.getItem(STORAGE_KEYS.ASSESSMENTS) || '[]');
      const currentAssessment = assessments.find(
        (a: AssessmentData) => a.userId === user.id && !a.completedAt
      );

      resolve({
        success: true,
        message: currentAssessment ? 'Assessment found' : 'No current assessment',
        data: currentAssessment || null,
      });
    }, 200);
  });
}

/**
 * Complete assessment
 */
export async function completeAssessment(assessmentId: string): Promise<DbResponse<AssessmentData>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const assessments = JSON.parse(localStorage.getItem(STORAGE_KEYS.ASSESSMENTS) || '[]');
      const index = assessments.findIndex((a: AssessmentData) => a.id === assessmentId && a.userId === user.id);

      if (index === -1) {
        resolve({ success: false, message: 'Assessment not found' });
        return;
      }

      assessments[index].completedAt = new Date().toISOString();
      assessments[index].updatedAt = new Date().toISOString();

      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));

      resolve({
        success: true,
        message: 'Assessment completed',
        data: assessments[index],
      });
    }, 300);
  });
}

// ==================== IMAGE METHODS ====================

/**
 * Save skin image
 */
export async function saveImage(
  imageData: string,
  fileName: string,
  fileSize: number,
  assessmentId?: string
): Promise<DbResponse<SkinImageData>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '[]');

      const newImage: SkinImageData = {
        id: generateId(),
        userId: user.id,
        assessmentId,
        imageData,
        fileName,
        fileSize,
        uploadedAt: new Date().toISOString(),
        analysisStatus: 'pending',
      };

      images.push(newImage);
      localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));

      resolve({
        success: true,
        message: 'Image saved successfully',
        data: newImage,
      });
    }, 500);
  });
}

/**
 * Get user's images
 */
export async function getImages(): Promise<DbResponse<SkinImageData[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '[]');
      const userImages = images.filter((img: SkinImageData) => img.userId === user.id);

      resolve({
        success: true,
        message: 'Images retrieved successfully',
        data: userImages,
      });
    }, 200);
  });
}

/**
 * Update image analysis results
 */
export async function updateImageAnalysis(
  imageId: string,
  analysisResults: SkinImageData['analysisResults'],
  status: SkinImageData['analysisStatus']
): Promise<DbResponse<SkinImageData>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '[]');
      const index = images.findIndex((img: SkinImageData) => img.id === imageId && img.userId === user.id);

      if (index === -1) {
        resolve({ success: false, message: 'Image not found' });
        return;
      }

      images[index].analysisResults = analysisResults;
      images[index].analysisStatus = status;

      localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));

      resolve({
        success: true,
        message: 'Analysis updated successfully',
        data: images[index],
      });
    }, 800);
  });
}

// ==================== ROUTINE METHODS ====================

/**
 * Save skincare routine
 */
export async function saveRoutine(data: Partial<RoutineData>): Promise<DbResponse<RoutineData>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const routines = JSON.parse(localStorage.getItem(STORAGE_KEYS.ROUTINES) || '[]');

      let routine: RoutineData;

      if (data.id) {
        // Update existing
        const index = routines.findIndex((r: RoutineData) => r.id === data.id && r.userId === user.id);
        if (index === -1) {
          resolve({ success: false, message: 'Routine not found' });
          return;
        }
        routine = {
          ...routines[index],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        routines[index] = routine;
      } else {
        // Create new
        routine = {
          id: generateId(),
          userId: user.id,
          name: data.name || 'My Skincare Routine',
          description: data.description || '',
          skinType: data.skinType || 'normal',
          concerns: data.concerns || [],
          products: data.products || [],
          morningSteps: data.morningSteps || [],
          eveningSteps: data.eveningSteps || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: data.isActive !== undefined ? data.isActive : true,
        } as RoutineData;
        routines.push(routine);
      }

      localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(routines));

      resolve({
        success: true,
        message: 'Routine saved successfully',
        data: routine,
      });
    }, 400);
  });
}

/**
 * Get user's routines
 */
export async function getRoutines(): Promise<DbResponse<RoutineData[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const routines = JSON.parse(localStorage.getItem(STORAGE_KEYS.ROUTINES) || '[]');
      const userRoutines = routines.filter((r: RoutineData) => r.userId === user.id);

      resolve({
        success: true,
        message: 'Routines retrieved successfully',
        data: userRoutines,
      });
    }, 200);
  });
}

/**
 * Get active routine
 */
export async function getActiveRoutine(): Promise<DbResponse<RoutineData>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const routines = JSON.parse(localStorage.getItem(STORAGE_KEYS.ROUTINES) || '[]');
      const activeRoutine = routines.find(
        (r: RoutineData) => r.userId === user.id && r.isActive
      );

      resolve({
        success: true,
        message: activeRoutine ? 'Active routine found' : 'No active routine',
        data: activeRoutine || null,
      });
    }, 200);
  });
}

/**
 * Delete routine
 */
export async function deleteRoutine(routineId: string): Promise<DbResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const routines = JSON.parse(localStorage.getItem(STORAGE_KEYS.ROUTINES) || '[]');
      const filtered = routines.filter(
        (r: RoutineData) => !(r.id === routineId && r.userId === user.id)
      );

      localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(filtered));

      resolve({
        success: true,
        message: 'Routine deleted successfully',
      });
    }, 300);
  });
}

/**
 * Generate AI-powered routine based on assessment
 */
export async function generateRoutineFromAssessment(
  assessment: AssessmentData
): Promise<DbResponse<RoutineData>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock AI-generated routine based on assessment data
      const routine: Partial<RoutineData> = {
        name: 'Personalized Skincare Routine',
        description: `Customized routine for ${assessment.skinType} skin with focus on ${assessment.skinConcerns?.join(', ')}`,
        skinType: assessment.skinType || 'normal',
        concerns: assessment.skinConcerns || [],
        assessmentId: assessment.id,
        products: generateMockProducts(assessment),
        morningSteps: generateMockMorningSteps(assessment),
        eveningSteps: generateMockEveningSteps(assessment),
        isActive: true,
      };

      // Save the routine
      saveRoutine(routine).then(resolve);
    }, 1500);
  });
}

// Helper functions for generating mock data
function generateMockProducts(assessment: AssessmentData): ProductRecommendation[] {
  const baseProducts: ProductRecommendation[] = [
    {
      id: 'prod-1',
      name: 'Gentle Hydrating Cleanser',
      brand: 'CeraVe',
      category: 'Cleanser',
      description: 'A gentle, non-foaming cleanser that removes dirt and makeup without stripping skin',
      benefits: ['Hydrating', 'Non-irritating', 'pH-balanced'],
      howToUse: 'Apply to damp skin, massage gently, and rinse with lukewarm water',
      priceRange: '$10-15',
    },
    {
      id: 'prod-2',
      name: 'Hyaluronic Acid Serum',
      brand: 'The Ordinary',
      category: 'Serum',
      description: 'Multi-depth hydration serum with 3 molecular weights of HA',
      benefits: ['Deep hydration', 'Plumping effect', 'Affordable'],
      howToUse: 'Apply to damp skin before moisturizer, AM and PM',
      priceRange: '$7-10',
    },
    {
      id: 'prod-3',
      name: 'Daily Moisturizer SPF 30',
      brand: 'Neutrogena',
      category: 'Moisturizer + SPF',
      description: 'Lightweight daily moisturizer with broad-spectrum sun protection',
      benefits: ['UV protection', 'Non-greasy', 'Suitable for daily use'],
      howToUse: 'Apply every morning as the last step of your routine',
      priceRange: '$15-20',
    },
    {
      id: 'prod-4',
      name: 'Niacinamide Serum',
      brand: 'Paula\'s Choice',
      category: 'Serum',
      description: '10% Niacinamide serum to reduce pore appearance and even skin tone',
      benefits: ['Minimizes pores', 'Brightening', 'Oil control'],
      howToUse: 'Apply after cleansing, before moisturizer',
      priceRange: '$45-50',
    },
  ];

  return baseProducts;
}

function generateMockMorningSteps(assessment: AssessmentData): RoutineStep[] {
  return [
    {
      order: 1,
      name: 'Cleanse',
      description: 'Gently wash your face with lukewarm water',
      productId: 'prod-1',
      timeOfDay: 'morning',
    },
    {
      order: 2,
      name: 'Apply Serum',
      description: 'Apply hydrating serum to damp skin',
      productId: 'prod-2',
      timeOfDay: 'morning',
    },
    {
      order: 3,
      name: 'Moisturize & Protect',
      description: 'Apply moisturizer with SPF',
      productId: 'prod-3',
      timeOfDay: 'morning',
    },
  ];
}

function generateMockEveningSteps(assessment: AssessmentData): RoutineStep[] {
  return [
    {
      order: 1,
      name: 'Double Cleanse',
      description: 'Remove makeup and sunscreen thoroughly',
      productId: 'prod-1',
      timeOfDay: 'evening',
    },
    {
      order: 2,
      name: 'Treatment Serum',
      description: 'Apply targeted treatment serum',
      productId: 'prod-4',
      timeOfDay: 'evening',
    },
    {
      order: 3,
      name: 'Hydrate',
      description: 'Lock in moisture with hydrating serum',
      productId: 'prod-2',
      timeOfDay: 'evening',
    },
    {
      order: 4,
      name: 'Night Cream',
      description: 'Apply richer night moisturizer',
      timeOfDay: 'evening',
    },
  ];
}
