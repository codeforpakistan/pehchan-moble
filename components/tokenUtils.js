import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL; 
const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID; 
const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI; 

export async function exchangeAuthCodeForTokens(authCode) {
  try {
    // Exchange authorization code for tokens
    const response = await fetch(`${API_URL}/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: authCode,
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange token');
    }

    const tokens = await response.json();

    // Store tokens in AsyncStorage
    await AsyncStorage.setItem('access_token', tokens.access_token);
    if (tokens.id_token) {
      await AsyncStorage.setItem('id_token', tokens.id_token);
    }

    return tokens;
  } catch (error) {
    console.error('Error exchanging auth code:', error);
    throw error;
  }
}

export async function fetchUserInfo(accessToken) {
  try {
    // Fetch user info using the access token
    const response = await fetch(`${API_URL}/api/auth/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userInfo = await response.json();
    await AsyncStorage.setItem('user_info', JSON.stringify(userInfo));
    return userInfo;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
}
