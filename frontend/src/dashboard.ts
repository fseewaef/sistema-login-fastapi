const btnCerrar = document.getElementById('btn-cerrar') as HTMLButtonElement;
const statusText = document.getElementById('status-text') as HTMLParagraphElement;
const userEmailDiv = document.getElementById('user-email') as HTMLDivElement;

// 1. Buscamos el token secreto en la memoria del navegador
const token = localStorage.getItem('token');

if (!token) {
  // Si no hay token, lo expulsamos inmediatamente al login
  window.location.href = '/';
} else {
  // 2. Le enviamos el token a nuestra nueva ruta de Python
  fetch('http://127.0.0.1:8000/perfil', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}` // Así se envía de forma segura
    }
  })
  .then(async (response) => {
    const data = await response.json();
    
    if (response.ok) {
      // 3. ¡Identidad confirmada! Pintamos el correo en pantalla
      statusText.textContent = "✅ Identidad verificada";
      statusText.style.color = "green";
      userEmailDiv.textContent = data.email;
    } else {
      // 4. Si el servidor rechaza el token (ej. expirado o falso)
      localStorage.removeItem('token');
      alert("Tu sesión expiró o es inválida. Inicia sesión de nuevo.");
      window.location.href = '/';
    }
  })
  .catch((error) => {
    statusText.textContent = "❌ Error conectando con el servidor.";
    statusText.style.color = "red";
  });
}

// Lógica para cerrar sesión (borra el token y te regresa al login)
btnCerrar.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/';
});