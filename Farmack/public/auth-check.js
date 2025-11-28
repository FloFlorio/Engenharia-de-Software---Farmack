// public/auth-check.js

/**
 * Verifica o status de autenticação e a role do usuário.
 * Redireciona para o login se não estiver autenticado.
 * @returns {Promise<Object|null>} - Retorna o objeto do usuário { id, email, role } ou null.
 */
async function checkAuthAndGetRole() {
  const token = localStorage.getItem('farmack_token');

  if (!token) {
    window.location.href = '/login.html';
    return null;
  }

  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.success) {
      return data.user; 
    } else {
      localStorage.removeItem('farmack_token');
      window.location.href = '/login.html';
      return null;
    }
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    localStorage.removeItem('farmack_token');
    window.location.href = '/login.html';
    return null;
  }
}

/**
 * Função de logout
 */
function logout() {
  localStorage.removeItem('farmack_token');
  localStorage.removeItem('farmack_email');
  window.location.href = '/login.html';
}

window.logout = logout;

