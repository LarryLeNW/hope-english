import { create } from 'zustand';
import Cookies from 'js-cookie';
import { api } from '@/lib/api';

const useAuthStore = create((set) => ({
  user: null,
  accessToken: Cookies.get('access_token') || null,
  login: (user: any, access_token: string) => {
    set({ user, accessToken: access_token });
    Cookies.set('access_token', access_token);
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    if (response) {
      set({ user: response.data });
    }
    set({ user: null, accessToken: null });
    Cookies.remove('access_token');
  },
  refreshAccessToken: (accessToken: string) => {
    set({ accessToken });
    Cookies.set('access_token', accessToken);
  },
  fetchUser: async () => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await api.get('/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response) {
        set({ user: response.data });
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      set({ user: null });
    }
  },
}));

export default useAuthStore;
