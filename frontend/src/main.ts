const loginForm = document.getElementById('login-form') as HTMLFormElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const mensajeDiv = document.getElementById('mensaje') as HTMLDivElement;

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  
  mensajeDiv.textContent = "Verificando...";
  mensajeDiv.style.color = "gray";

  try {
    const response = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      mensajeDiv.textContent = "✅ " + data.mensaje;
      mensajeDiv.style.color = "green";
      
      // Guardamos el token en la memoria del navegador
      localStorage.setItem('token', data.token);
      
      // Esperamos medio segundo y redirigimos al Dashboard
      setTimeout(() => {
        window.location.href = '/dashboard.html';
      }, 500);
      
    } else {
      mensajeDiv.textContent = "❌ Error: " + data.detail;
      mensajeDiv.style.color = "red";
    }
  } catch (error) {
    mensajeDiv.textContent = "❌ No se pudo conectar con el servidor.";
    mensajeDiv.style.color = "red";
  }
});