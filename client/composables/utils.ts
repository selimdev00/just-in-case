export const isAuthenticated = () => {
  const { status } = useAuth();

  return status.value === "authenticated";
};

export const isRole = (role: string) => {
  const { data } = useAuth();

  return data.value?.user.role === role;
};

export const canAccess = () => {
  const { data } = useAuth();

  return data.value?.user.can_access;
};
