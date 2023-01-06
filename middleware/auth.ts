export default defineNuxtRouteMiddleware((to, from) => {
  if (localStorage.refreshToken) {
  } else {
    if (from.fullPath != '/login') {
      return navigateTo('/login');
    }
    return abortNavigation();
  }
})