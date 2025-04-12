import { useAuth } from '@/contexts/AuthContext';

interface UpdateProfileData {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
  role?: string;
  phone?: string;
}

export const updateProfile = async (data: UpdateProfileData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Profile update failed');
    }

    return responseData;
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
}; 