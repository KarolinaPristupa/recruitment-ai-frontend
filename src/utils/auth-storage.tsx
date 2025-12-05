const triggerRoleChange = () => {
  window.dispatchEvent(new Event('userRoleChanged'));
  window.dispatchEvent(new Event('storage'));
};

export const authStorage = {
  setToken: (token: string) => {
    localStorage.setItem('accessToken', token);
  },

  setUserRole: (role: string) => {
    localStorage.setItem('userRole', role);
    triggerRoleChange();
  },

  setUserEmail: (email: string) => {
    localStorage.setItem('userEmail', email);
  },

  clearAuth: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    triggerRoleChange();
  },

  getRole: () => localStorage.getItem('userRole'),
  getToken: () => localStorage.getItem('accessToken'),
  getEmail: () => localStorage.getItem('userEmail'),
};
