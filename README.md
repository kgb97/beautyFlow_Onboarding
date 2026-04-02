<div align="center">

# 💅 BeautyFlow — Onboarding Portal

**El flujo de registro y activación de nuevos salones en la plataforma BeautyFlow.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Axios](https://img.shields.io/badge/Axios-1.14-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com)

</div>

---

## 📌 ¿Qué es este módulo?

El **Onboarding Portal** es la puerta de entrada al ecosistema BeautyFlow. Permite que los propietarios de nuevos salones de belleza se **registren, configuren su empresa y activen su cuenta** mediante un flujo guiado de 3 pasos, completamente desacoplado del Portal Administrativo.

Una vez completado el registro, el sistema genera automáticamente las credenciales del salón y habilita el acceso al Portal Admin y al Booking Público.

---

## 🗂️ Estructura del Proyecto

```
Onboarding/
├── src/
│   ├── pages/
│   │   ├── LandingPage.tsx          # Página de bienvenida y acceso
│   │   ├── RegistrationPage.tsx     # Wizard de registro (multi-step)
│   │   └── ConfirmationPage.tsx     # Confirmación y activación de cuenta
│   ├── services/                    # Servicios HTTP (Axios + interceptors)
│   ├── App.tsx                      # Router principal
│   ├── index.css                    # Sistema de diseño global
│   └── main.tsx
├── .env                             # Variables de entorno (API URL)
├── vite.config.ts
└── package.json
```

---

## ✨ Pantallas del Flujo

### 1. 🏠 Landing Page
Presentación del producto con propuesta de valor, características destacadas y CTA de registro. Diseño con gradientes rose-gold y tipografía elegante.

### 2. 📝 Registration Page (Wizard)
Formulario multi-paso con validación en tiempo real:
- **Paso 1** → Datos del negocio (nombre del salón, RUC/NIT, teléfono)
- **Paso 2** → Datos del administrador (nombre, email, contraseña)
- **Paso 3** → Confirmación y términos

### 3. ✅ Confirmation Page
Mensaje de éxito con instrucciones para acceder al Portal Admin. Incluye verificación de email y link de acceso directo.

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.development .env
# Editar VITE_API_URL con la URL del backend

# 3. Levantar servidor de desarrollo
npm run dev
```

> El servidor corre en `http://localhost:5174` por defecto.

---

## ⚙️ Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL base del API de BeautyFlow | `https://localhost:44383` |

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **React** | 19 | UI Framework |
| **TypeScript** | 5.9 | Tipado estático |
| **Vite** | 8 | Bundler y DevServer |
| **React Router** | 7 | Navegación SPA |
| **Axios** | 1.14 | Llamadas HTTP |
| **Lucide React** | latest | Iconografía |
| **JWT Decode** | 4 | Lectura de tokens |

---

## 🔗 Integración con el Ecosistema BeautyFlow

```
[Onboarding Portal]  ──POST /api/auth/register──►  [BeautyFlow API]
                                                          │
                                                          ▼
[Portal Admin]  ◄──── JWT Token + companyId ─────  [Auth Service]
                                                          │
                                                          ▼
                                                   [Booking Público]
```

Tras el registro exitoso, el Admin recibe credenciales JWT que le permiten acceder directamente al **Portal Administrativo**, donde completará la **Configuración Inicial Obligatoria** (Sucursales → Horarios → Servicios → Equipo).

---

## 📦 Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo con HMR
npm run build     # Build de producción (TypeScript + Vite)
npm run preview   # Preview del build de producción
npm run lint      # Linter (ESLint + TypeScript rules)
```

---

## 🎨 Sistema de Diseño

El portal usa la paleta **Femenina & Elegante** de BeautyFlow:

| Token | Color | Uso |
|-------|-------|-----|
| `--primary` | `#db2777` | Botones, CTAs, acentos |
| `--secondary` | `#9333ea` | Gradientes, badges |
| `--rose-gold` | `#c9a96e` | Decorativos premium |
| `--bg-light` | `#fdf2f8` | Fondos suaves |

---

<div align="center">

**BeautyFlow** · Portal de Onboarding · 2025

*Construido con ❤️ para empoderar salones de belleza*

</div>
