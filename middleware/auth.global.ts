const protectedRoutes = ['/resumes', '/resumes/*']

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch)
  if (!session.value) {
    if (protectedRoutes.includes(to.path)) {
      return navigateTo('/auth')
    }
  }
  else {
    if (to.path === '/auth') {
      return navigateTo('/resumes')
    }
  }
})
