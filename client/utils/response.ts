export default async function handleResponse(status: number | string) {
  const auth = useAuth();

  if (status == 401) {
    await auth.logout();
  }
}
