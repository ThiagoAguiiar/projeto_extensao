export default function handleResponse(status: number) {
  if (status == 401) {
    const auth = useAuth();
    auth.logout();
  }
}
