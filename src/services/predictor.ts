import { useToast } from '@/components/ui/use-toast';

export interface FlightData {
  Flight_ID: string;
  Altitude_AGL_ft: number;
  Vertical_Speed_fpm: number;
  Touchdown_Velocity_fps: number;
  G_Force: number;
  Wind_Speed_kts: number;
  Crosswind_Component_kts: number;
  Visibility_miles: number;
  Runway_Condition: string;
  Throttle_Input: number;
  Brake_Force_pct: number;
  Flaps_Position_deg: number;
  Rudder_Deflection_deg: number;
  Aileron_Deflection_deg: number;
  Landing_Gear_Force_N: number;
  Spoiler_Deployment_pct: number;
  Reverse_Thrust_pct: number;
}

export interface PredictionResponse {
  prediction: string;
  probability: string;
  shap_contributions: Record<string, number>;
  message?: string;
  corrective_measures?: string[];
}

export interface PredictionHistory {
  id: string;
  flightId: string;
  prediction: string;
  probability: string;
  timestamp: string;
  inputData: FlightData;
  shapContributions: Record<string, number>;
  correctiveMeasures?: string[];
}

export interface PaginationInfo {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface PredictionHistoryResponse {
  predictions: PredictionHistory[];
  pagination: PaginationInfo;
}

export interface PredictionHistoryParams {
  page?: number;
  limit?: number;
  search?: string;
  outcome?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const fetchFlightData = async (flightId: string): Promise<FlightData> => {
  try {
    // Get the auth token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found in localStorage');
      throw new Error('Authentication required. Please login first.');
    }

    console.log('Fetching flight data with token:', token.substring(0, 10) + '...');
    console.log('Making request to:', '/api/predictor/flight-data');
    console.log('Request headers:', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const response = await fetch('/api/predictor/flight-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ Flight_ID: flightId }),
    });

    console.log('Flight data response status:', response.status);
    console.log('Flight data response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const error = await response.json();
      console.error('Flight data error:', error);
      if (response.status === 401) {
        // Token might be invalid or expired
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.error || 'Failed to fetch flight data');
    }

    const data = await response.json();
    console.log('Flight data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};

export const predictLanding = async (data: FlightData): Promise<PredictionResponse> => {
  try {
    // Get the auth token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found in localStorage');
      throw new Error('Authentication required. Please login first.');
    }

    console.log('Making prediction with token:', token.substring(0, 10) + '...');

    const response = await fetch('/api/predictor/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    console.log('Prediction response status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('Prediction error:', error);
      if (response.status === 401) {
        // Token might be invalid or expired
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.error || 'Failed to make prediction');
    }

    const result = await response.json();
    console.log('Prediction result:', result);
    return result;
  } catch (error) {
    console.error('Error making prediction:', error);
    throw error;
  }
};

export const fetchPredictionHistory = async (params: PredictionHistoryParams = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.outcome) queryParams.append('outcome', params.outcome);
  if (params.startDate) queryParams.append('startDate', params.startDate);
  if (params.endDate) queryParams.append('endDate', params.endDate);

  const response = await fetch(`/api/predictions/history?${queryParams.toString()}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Cache-Control': 'no-cache'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch prediction history');
  }

  return response.json();
}; 