# Sistema de Autenticación Full-Stack

Este proyecto es un sistema completo de registro e inicio de sesión de usuarios con validación de tokens y rutas protegidas. Está diseñado con una arquitectura moderna y escalable.

## 🛠️ Tecnologías utilizadas
*   **Backend:** Python con FastAPI (Servidor asíncrono súper rápido).
*   **Frontend:** Vite + TypeScript + HTML/CSS (Interfaz limpia y tipado estricto).
*   **Base de Datos y Autenticación:** Supabase (BaaS con PostgreSQL).

## ✨ Funcionalidades
1.  **Registro de usuarios:** Creación de cuentas directamente en la base de datos de Supabase.
2.  **Inicio de sesión (Login):** Validación de credenciales y generación de Token de acceso seguro (JWT).
3.  **Manejo de Sesión:** Almacenamiento seguro del token en `localStorage`.
4.  **Rutas Protegidas:** El panel principal (`/perfil`) exige y valida el token con el backend antes de devolver información confidencial.

## 🚀 Cómo ejecutar el proyecto localmente

Para que este proyecto funcione en tu computadora, necesitas tener abiertas **dos terminales** simultáneamente.

### 1. Iniciar el Servidor Backend (Python)
1. Abre una terminal y navega a la raíz del proyecto.
2. Activa el entorno virtual (si aplica): `.\.venv\Scripts\activate`
3. Entra a la carpeta del backend: `cd backend`
4. Instala las dependencias (solo la primera vez): `pip install fastapi uvicorn supabase pydantic`
5. Arranca el servidor: `uvicorn main:app --reload`
*El servidor correrá en http://127.0.0.1:8000*

### 2. Iniciar el Frontend (Vite)
1. Abre una segunda terminal y navega a la raíz del proyecto.
2. Entra a la carpeta del frontend: `cd frontend`
3. Instala los paquetes de Node (solo la primera vez): `npm install`
4. Arranca la interfaz web: `npm run dev`
*La página estará disponible en http://localhost:5173*