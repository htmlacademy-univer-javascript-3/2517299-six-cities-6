export const useSignOut = () => {
  const signOut = () => {
    localStorage.removeItem('six-cities-token');
    window.location.reload();
  };
  return signOut;
};
