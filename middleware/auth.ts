export default defineNuxtRouteMiddleware((to, from) => {
  if (localStorage.refreshToken) {
    console.log(to.fullPath);
  } else {
    console.log("no refresh token");
    if (from.fullPath != '/login') {
      return navigateTo('/login');
    }
    return abortNavigation();
  }
})