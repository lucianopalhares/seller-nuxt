export default function({ store, redirect }) {
  const token = localStorage.getItem('token');
  if (!token) {
    // Se o token não existir, redireciona para a página de login
    return redirect('/login');
  }
}
