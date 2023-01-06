export default defineNuxtRouteMiddleware((to, from) => {
  if (localStorage.refreshToken) {
    console.log("no refresh token")
    return navigateTo(to);
  } else {
    return navigateTo('/login');
  }
})