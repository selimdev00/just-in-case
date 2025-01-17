export default defineNuxtRouteMiddleware((to, from) => {
  const toast = useToast();
  if (!canAccess() && isRole("user") && to.path !== "/login") {
    useAuth().signOut();
    toast.add({
      severity: "error",
      summary: "Access denied",
      detail: "Your access is denied by admin.",
    });
    return navigateTo("/login");
  }
});
