import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
      user: null,
      token: null
    }),
    getters: {
      isLoggedIn: (state) => !!state.token
    },
    actions: {
      setUser(user, token) {
        this.user = user;
        this.token = token;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      },
      clearUser() {
        this.user = null;
        this.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      },
      async login(username, password) {
        try {
          const response = await axios.post('http://localhost:3000/api/login', { username, password });
          this.setUser({ username }, response.data.token);
        } catch (error) {
          throw new Error(error);
        }
      },
      async register(username, password) {
        try {
          await axios.post('http://localhost:3000/api/register', { username, password });
        } catch (error) {
          throw new Error('Registration failed');
        }
      },
      loadUserFromStorage() {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (user && token) {
          this.user = user;
          this.token = token;
        }
      }
    }
});