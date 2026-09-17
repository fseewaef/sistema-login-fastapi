const registroForm = document.getElementById('registro-form') as HTMLFormElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const mensajeDiv = document.getElementById('mensaje') as HTMLDivElement;

registroForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  
  mensajeDiv.textContent = "Creando cuenta...";
  mensajeDiv.style.color = "gray";

  try {
    const response = await fetch('http://127.0.0.1:8000/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      mensajeDiv.textContent = "✅ " + data.mensaje;
      mensajeDiv.style.color = "green";
      
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      
    } else {
      mensajeDiv.textContent = "❌ Error: " + data.detail;
      mensajeDiv.style.color = "red";
    }
  } catch (error) {
    mensajeDiv.textContent = "❌ No se pudo conectar con el servidor.";
    mensajeDiv.style.color = "red";
  }
});