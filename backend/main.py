from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client

SUPABASE_URL = "https://aldotmwariarjskzqtkc.supabase.co"
SUPABASE_KEY = "sb_publishable_pg630HIBFj3pIk8cLiicJA_HDA641GK"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Usuario(BaseModel):
    email: str
    password: str

@app.get("/")
def bienvenida():
    return {"estado": "Servidor encendido"}

@app.post("/login")
def iniciar_sesion(usuario: Usuario):
    try:
        respuesta = supabase.auth.sign_in_with_password({
            "email": usuario.email,
            "password": usuario.password
        })
        return {
            "mensaje": "¡Login exitoso!",
            "token": respuesta.session.access_token
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error real de Supabase: {str(e)}")

@app.post("/registro")
def registrar_usuario(usuario: Usuario):
    try:
        respuesta = supabase.auth.sign_up({
            "email": usuario.email,
            "password": usuario.password
        })
        return {"mensaje": "¡Cuenta creada con éxito!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al registrar: {str(e)}")

# ==========================================
# NUEVO: RUTA PROTEGIDA
# ==========================================
@app.get("/perfil")
def obtener_perfil(authorization: str = Header(None)):
    # 1. Verificamos que sí nos hayan enviado un token
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Acceso denegado: Falta el token")
    
    # Extraemos solo el texto del token (quitamos la palabra "Bearer ")
    token = authorization.split(" ")[1]
    
    try:
        # 2. Le preguntamos a Supabase si este token es real y de quién es
        respuesta = supabase.auth.get_user(token)
        datos_usuario = respuesta.user
        
        # 3. Si todo sale bien, devolvemos los datos privados
        return {
            "mensaje": "Identidad confirmada",
            "email": datos_usuario.email,
            "id": datos_usuario.id
        }
    except Exception as e:
        # Si el token es inventado o ya expiró, marcamos error
        raise HTTPException(status_code=401, detail="Token inválido o expirado")