/**
 * Authentication Service
 * Handles user authentication using localStorage
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  skinType?: string;
  skinConcerns?: string[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

const STORAGE_KEYS = {
  USERS: 'dermaai_users',
  CURRENT_USER: 'dermaai_current_user',
  SESSION_TOKEN: 'dermaai_session_token',
};

// Helper function to generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to get all users
function getAllUsers(): User[] {
  const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
  return usersJson ? JSON.parse(usersJson) : [];
}

// Helper function to save users
function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

/**
 * Sign up a new user
 */
export async function signUp(
  email: string,
  password: string,
  name?: string
): Promise<AuthResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = getAllUsers();

      // Check if user already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        resolve({
          success: false,
          message: 'An account with this email already exists',
        });
        return;
      }

      // Create new user
      const newUser: User = {
        id: generateId(),
        email: email.toLowerCase(),
        name: name || email.split('@')[0],
        createdAt: new Date().toISOString(),
      };

      // Save password separately (in production, this would be hashed on backend)
      const passwords = JSON.parse(localStorage.getItem('dermaai_passwords') || '{}');
      passwords[newUser.id] = password;
      localStorage.setItem('dermaai_passwords', JSON.stringify(passwords));

      // Save user
      users.push(newUser);
      saveUsers(users);

      // Create session
      const sessionToken = generateId();
      localStorage.setItem(STORAGE_KEYS.SESSION_TOKEN, sessionToken);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));

      resolve({
        success: true,
        message: 'Account created successfully',
        user: newUser,
      });
    }, 800);
  });
}

/**
 * Sign in an existing user
 */
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = getAllUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        resolve({
          success: false,
          message: 'Invalid email or password',
        });
        return;
      }

      // Check password
      const passwords = JSON.parse(localStorage.getItem('dermaai_passwords') || '{}');
      if (passwords[user.id] !== password) {
        resolve({
          success: false,
          message: 'Invalid email or password',
        });
        return;
      }

      // Create session
      const sessionToken = generateId();
      localStorage.setItem(STORAGE_KEYS.SESSION_TOKEN, sessionToken);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));

      resolve({
        success: true,
        message: 'Signed in successfully',
        user,
      });
    }, 800);
  });
}

/**
 * Sign out current user
 */
export function signOut(): void {
  localStorage.removeItem(STORAGE_KEYS.SESSION_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!userJson) return null;

  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem(STORAGE_KEYS.SESSION_TOKEN);
}

/**
 * Update current user profile
 */
export async function updateUserProfile(updates: Partial<User>): Promise<AuthResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        resolve({
          success: false,
          message: 'Not authenticated',
        });
        return;
      }

      const users = getAllUsers();
      const userIndex = users.findIndex(u => u.id === currentUser.id);

      if (userIndex === -1) {
        resolve({
          success: false,
          message: 'User not found',
        });
        return;
      }

      // Update user
      const updatedUser = { ...users[userIndex], ...updates };
      users[userIndex] = updatedUser;
      saveUsers(users);

      // Update current session
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));

      resolve({
        success: true,
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    }, 500);
  });
}

/**
 * Change user password
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<AuthResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        resolve({
          success: false,
          message: 'Not authenticated',
        });
        return;
      }

      const passwords = JSON.parse(localStorage.getItem('dermaai_passwords') || '{}');

      // Verify current password
      if (passwords[currentUser.id] !== currentPassword) {
        resolve({
          success: false,
          message: 'Current password is incorrect',
        });
        return;
      }

      // Update password
      passwords[currentUser.id] = newPassword;
      localStorage.setItem('dermaai_passwords', JSON.stringify(passwords));

      resolve({
        success: true,
        message: 'Password changed successfully',
        user: currentUser,
      });
    }, 500);
  });
}
