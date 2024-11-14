export default function handleResponse(status: number | string) {
  const auth = useAuth();

  if (status == 401) {
    auth.logout();
  }
}
