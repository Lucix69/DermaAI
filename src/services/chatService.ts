/**
 * Chat Service
 * Handles AI chat assistant with conversation history persistence
 */

import { getCurrentUser } from './authService';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  userId: string;
  messages: ChatMessage[];
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  data?: any;
}

const STORAGE_KEY = 'dermaai_conversations';

// Helper function to generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get all conversations for current user
 */
export async function getConversations(): Promise<ChatResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const userConversations = allConversations.filter(
        (conv: Conversation) => conv.userId === user.id
      );

      resolve({
        success: true,
        data: userConversations,
      });
    }, 200);
  });
}

/**
 * Get current active conversation
 */
export async function getCurrentConversation(): Promise<ChatResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const userConversations = allConversations.filter(
        (conv: Conversation) => conv.userId === user.id
      );

      // Get most recent conversation or create new one
      const current = userConversations.length > 0
        ? userConversations[userConversations.length - 1]
        : null;

      resolve({
        success: true,
        data: current,
      });
    }, 200);
  });
}

/**
 * Create new conversation
 */
export async function createConversation(title: string = 'New Chat'): Promise<ChatResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

      const newConversation: Conversation = {
        id: generateId(),
        userId: user.id,
        messages: [],
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      allConversations.push(newConversation);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));

      resolve({
        success: true,
        data: newConversation,
      });
    }, 300);
  });
}

/**
 * Send message and get AI response
 */
export async function sendMessage(
  message: string,
  conversationId?: string
): Promise<ChatResponse> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      let allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      let conversation: Conversation;

      // Find or create conversation
      if (conversationId) {
        const index = allConversations.findIndex(
          (c: Conversation) => c.id === conversationId && c.userId === user.id
        );
        if (index === -1) {
          resolve({ success: false, message: 'Conversation not found' });
          return;
        }
        conversation = allConversations[index];
      } else {
        // Create new conversation
        const createResult = await createConversation();
        if (!createResult.success) {
          resolve(createResult);
          return;
        }
        conversation = createResult.data;
        allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      }

      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };
      conversation.messages.push(userMessage);

      // Generate AI response
      const aiResponse = generateAIResponse(message, conversation.messages);
      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };
      conversation.messages.push(assistantMessage);

      // Update conversation title if it's the first message
      if (conversation.messages.length === 2) {
        conversation.title = message.slice(0, 50) + (message.length > 50 ? '...' : '');
      }

      conversation.updatedAt = new Date().toISOString();

      // Save updated conversation
      const convIndex = allConversations.findIndex((c: Conversation) => c.id === conversation.id);
      allConversations[convIndex] = conversation;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));

      resolve({
        success: true,
        data: {
          conversation,
          userMessage,
          assistantMessage,
        },
      });
    }, 1000); // Simulate AI thinking time
  });
}

/**
 * Delete conversation
 */
export async function deleteConversation(conversationId: string): Promise<ChatResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const filtered = allConversations.filter(
        (c: Conversation) => !(c.id === conversationId && c.userId === user.id)
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

      resolve({
        success: true,
        message: 'Conversation deleted successfully',
      });
    }, 300);
  });
}

/**
 * Clear all conversations
 */
export async function clearAllConversations(): Promise<ChatResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const filtered = allConversations.filter((c: Conversation) => c.userId !== user.id);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

      resolve({
        success: true,
        message: 'All conversations cleared',
      });
    }, 300);
  });
}

/**
 * Generate AI response based on user message and conversation history
 * In production, this would call a real AI API
 */
function generateAIResponse(userMessage: string, conversationHistory: ChatMessage[]): string {
  const lowerMessage = userMessage.toLowerCase();

  // Skincare-related responses
  if (lowerMessage.includes('routine') || lowerMessage.includes('regimen')) {
    return "I'd be happy to help with your skincare routine! Based on your profile, I recommend following a consistent morning and evening routine. In the morning: cleanse, apply serum, moisturize, and always use SPF. In the evening: double cleanse, use treatment products, apply serum, and finish with a richer moisturizer. Would you like specific product recommendations?";
  }

  if (lowerMessage.includes('acne') || lowerMessage.includes('breakout') || lowerMessage.includes('pimple')) {
    return "For acne-prone skin, I recommend: 1) Use a gentle, non-comedogenic cleanser twice daily, 2) Incorporate salicylic acid or benzoyl peroxide treatments, 3) Apply a lightweight, oil-free moisturizer, 4) Always use non-comedogenic sunscreen, 5) Avoid touching your face and keep hair products away from your skin. Remember, consistency is key! If acne persists, consider consulting a dermatologist.";
  }

  if (lowerMessage.includes('dry') || lowerMessage.includes('dehydrat')) {
    return "For dry skin, focus on hydration and moisture retention: 1) Use a creamy, hydrating cleanser, 2) Apply hyaluronic acid serum on damp skin, 3) Use a rich moisturizer with ceramides, 4) Consider adding a facial oil in the evening, 5) Don't forget SPF during the day. Also, drink plenty of water and use a humidifier in dry environments!";
  }

  if (lowerMessage.includes('oily') || lowerMessage.includes('greasy')) {
    return "For oily skin management: 1) Cleanse twice daily with a gel-based cleanser, 2) Use a lightweight, oil-free moisturizer (yes, oily skin needs moisture!), 3) Incorporate niacinamide to help regulate oil production, 4) Use clay masks 1-2 times per week, 5) Always use a mattifying, oil-free sunscreen. Avoid over-cleansing as it can trigger more oil production!";
  }

  if (lowerMessage.includes('aging') || lowerMessage.includes('wrinkle') || lowerMessage.includes('anti-aging')) {
    return "For anti-aging concerns, here's my advice: 1) Sunscreen is your #1 anti-aging product - use it daily! 2) Incorporate retinol/retinoids in your evening routine, 3) Use vitamin C serum in the morning for antioxidant protection, 4) Stay hydrated with hyaluronic acid, 5) Consider peptides for collagen support. Start slowly with active ingredients and be consistent!";
  }

  if (lowerMessage.includes('sunscreen') || lowerMessage.includes('spf')) {
    return "Sunscreen is crucial for healthy skin! Use SPF 30 or higher daily, even on cloudy days. Apply about 1/4 teaspoon for your face and reapply every 2 hours if you're outdoors. Look for broad-spectrum protection against both UVA and UVB rays. Mineral sunscreens (zinc oxide, titanium dioxide) are great for sensitive skin, while chemical sunscreens tend to be more lightweight.";
  }

  if (lowerMessage.includes('sensitive') || lowerMessage.includes('irritat')) {
    return "For sensitive skin: 1) Patch test new products before full application, 2) Use fragrance-free, hypoallergenic products, 3) Avoid harsh exfoliants and hot water, 4) Look for soothing ingredients like centella asiatica, niacinamide, and ceramides, 5) Keep your routine simple with fewer products. Listen to your skin and discontinue any product that causes irritation.";
  }

  if (lowerMessage.includes('product') || lowerMessage.includes('recommend')) {
    return "I can recommend products based on your skin profile! Could you tell me more about your specific concerns? Are you looking for cleansers, serums, moisturizers, treatments, or sunscreen? Your skin type and concerns will help me suggest the most suitable products for you.";
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! 👋 I'm your AI skincare assistant. I'm here to help you with personalized skincare advice, product recommendations, and routine guidance. How can I assist you with your skincare journey today?";
  }

  if (lowerMessage.includes('thank')) {
    return "You're welcome! I'm always here to help with your skincare questions. Remember, consistency is key for great skin! Feel free to ask if you have any other questions. 😊";
  }

  // Default response
  return "I'm here to help with your skincare concerns! I can provide advice on skincare routines, product recommendations, and address specific skin issues like acne, dryness, aging, or sensitivity. What would you like to know more about?";
}

/**
 * Get conversation by ID
 */
export async function getConversationById(conversationId: string): Promise<ChatResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'Not authenticated' });
        return;
      }

      const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const conversation = allConversations.find(
        (c: Conversation) => c.id === conversationId && c.userId === user.id
      );

      if (!conversation) {
        resolve({ success: false, message: 'Conversation not found' });
        return;
      }

      resolve({
        success: true,
        data: conversation,
      });
    }, 200);
  });
}
