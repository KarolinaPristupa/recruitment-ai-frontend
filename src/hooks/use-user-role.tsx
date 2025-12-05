import { useEffect, useState } from 'react';

export const useUserRole = (): string | null => {
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('userRole'));

  useEffect(() => {
    const handleChange = () => {
      setUserRole(localStorage.getItem('userRole'));
    };

    window.addEventListener('userRoleChanged', handleChange);
    window.addEventListener('storage', handleChange);

    return () => {
      window.removeEventListener('userRoleChanged', handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  return userRole;
};
