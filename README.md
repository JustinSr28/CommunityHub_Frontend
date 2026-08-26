# CommunityHub - Frontend

Frontend de la plataforma **CommunityHub**, una aplicación web para la gestión y participación en actividades y eventos comunitarios.

El frontend permite a los usuarios registrarse, iniciar sesión, consultar actividades, inscribirse en eventos, administrar favoritos, consultar notificaciones y utilizar diferentes funcionalidades dependiendo de su rol dentro de la plataforma.

La aplicación fue desarrollada utilizando **Nuxt 4 y Vue 3**, implementando autenticación, autorización basada en roles, consumo de una API REST, almacenamiento de imágenes mediante Supabase y funcionalidades de Progressive Web App (PWA).

---

## Funcionalidad

El frontend implementa las principales funcionalidades de la plataforma:

* Registro e inicio de sesión.
* Autenticación de usuarios.
* Manejo de sesiones mediante JWT.
* Protección de rutas mediante middleware.
* Autorización según roles.
* Consulta de actividades.
* Creación de actividades.
* Edición de actividades.
* Eliminación de actividades.
* Inscripción a actividades.
* Cancelación de inscripciones.
* Gestión de actividades favoritas.
* Consulta de notificaciones.
* Perfil de usuario.
* Dashboards según el rol.
* Administración de usuarios.
* Administración de categorías.
* Búsqueda y filtrado de actividades.
* Carga de imágenes.
* Instalación como aplicación PWA.
* Funcionalidad offline mediante Service Worker y caché.

---

## Arquitectura

El frontend se comunica con el backend mediante una API REST.
---

##  Tecnologías implementadas

* **Nuxt 4**
* **Vue 3**
* **JavaScript**
* **Supabase**
* **REST API**
* **PWA**
* **Service Worker**
* **Vite**
* **Git / GitHub**

---

## Configuración

El frontend utiliza variables de entorno para configurar la comunicación con los servicios externos.

Ejemplo:

```env
NUXT_PUBLIC_API_BASE=http://localhost:3000/api

SUPABASE_URL=TU_SUPABASE_URL
SUPABASE_KEY=TU_SUPABASE_KEY
```
Se recomienda utilizar un archivo:

```text
.env.example
```

como referencia para configurar el proyecto.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/JustinSr28/CommunityHub_Frontend.git
```

Ingresar al proyecto:

```bash
cd CommunityHub_Frontend
```

Instalar las dependencias:

```bash
npm install
```

Configurar las variables de entorno:

```bash
.env
```

Finalmente, iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:3001
```

---

##  Consumo de la API

El frontend consume los servicios proporcionados por el backend mediante solicitudes HTTP.

Entre las operaciones principales se encuentran:

### Autenticación

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### Usuarios

```text
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

### Actividades

```text
GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

### Inscripciones

```text
POST   /api/events/:id/register
DELETE /api/events/:id/register
GET    /api/users/me/registrations
```

### Favoritos

```text
POST   /api/events/:id/favorite
DELETE /api/events/:id/favorite
GET    /api/users/me/favorites
```

---

##  Autenticación

La aplicación utiliza autenticación mediante **JWT** proporcionada por el backend.

Después de iniciar sesión, el frontend mantiene la información necesaria de la sesión y utiliza el token para realizar solicitudes protegidas.

El sistema diferencia entre usuarios autenticados y usuarios no autenticados.

Las rutas que requieren autenticación son protegidas mediante middleware.

---

##  Roles

CommunityHub implementa tres roles principales:

### Administrador

Puede acceder a funcionalidades administrativas como:

* Gestionar usuarios.
* Gestionar actividades.
* Gestionar categorías.

### Organizador

Puede:

* Crear actividades.
* Editar sus actividades.
* Cancelar actividades.
* Consultar participantes.
* Gestionar sus actividades.

### Usuario

Puede:

* Consultar actividades.
* Inscribirse.
* Cancelar inscripciones.
* Agregar actividades a favoritos.
* Consultar sus inscripciones.
* Consultar notificaciones.
---


## Supabase Storage

Supabase se utiliza para el almacenamiento de imágenes utilizadas por la aplicación.

Por ejemplo:

```text
Usuario
   │
   ▼
Selecciona imagen
   │
   ▼
Frontend Nuxt
   │
   ▼
Supabase Storage
   │
   ▼
URL de la imagen
   │
   ▼
Backend / MongoDB
```

Las imágenes pueden utilizarse principalmente para:

* Fotos de perfil.
* Imágenes de actividades.
* Imágenes relacionadas con el contenido de la plataforma.

---

## Progressive Web App

El proyecto implementa funcionalidades de **Progressive Web App (PWA)**.

La aplicación utiliza:

* Web App Manifest.
* Service Worker.
* Caché.
* Instalación desde el navegador.
* Recursos precargados.
* Funcionalidad offline.

La configuración PWA se implementa utilizando:

```text
@vite-pwa/nuxt
```

---

## Funcionamiento offline

La PWA permite utilizar determinadas funcionalidades cuando no existe conexión a Internet.

Por ejemplo, algunas categorías previamente consultadas pueden permanecer disponibles mediante el sistema de caché.

```text
Internet
   │
   ▼
Service Worker
   │
   ▼
Cache
   │
   ▼
Recursos previamente cargados
```

---

## Notificaciones

CommunityHub incorpora un sistema de notificaciones.

Las notificaciones son generadas por el backend y, para determinados procesos automáticos, mediante AWS Lambda.

## Búsqueda y filtros

El frontend permite consultar y filtrar actividades utilizando diferentes criterios.

Entre ellos:

* Categoría.
* Fecha.
* Ubicación.
* Disponibilidad.
* Organizador.

Los filtros son enviados al backend mediante parámetros de consulta.

Ejemplo:

```text
GET /api/events?category=technology&available=true
```

---

## Manejo de errores

El frontend maneja las respuestas de error provenientes de la API.

Se contemplan diferentes códigos HTTP:

```text
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
409 - Conflict
500 - Internal Server Error
```
---

## Seguridad

El frontend implementa buenas prácticas de seguridad, entre ellas:

* Autenticación mediante JWT.
* Protección de rutas.
* Middleware de autorización.
* Validación de formularios.
* Variables de entorno.
* No almacenar secretos en el repositorio.
* Uso de `.gitignore`.
* Comunicación mediante API REST.
* Control de acceso según roles.


---

## Scripts disponibles

Los principales comandos del proyecto son:

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Crear build de producción
npm run build

# Previsualizar build
npm run preview
```

---

## Dependencias principales

Entre las principales dependencias utilizadas se encuentran:

```text
Nuxt
Vue
@vite-pwa/nuxt
Supabase
```

---

##  Objetivo del frontend

El objetivo del frontend es proporcionar una interfaz web moderna, responsive e instalable que permita a los diferentes usuarios interactuar con la plataforma CommunityHub.

La aplicación integra:

* Frontend moderno con Nuxt y Vue.
* Backend mediante API REST.
* Autenticación y autorización.
* Base de datos MongoDB mediante el backend.
* Supabase Storage para imágenes.
* AWS Lambda para procesamiento serverless.
* Progressive Web App.
* Funcionalidad offline.

De esta manera, el frontend forma parte de una arquitectura completa **cliente-servidor**, separando la interfaz de usuario, la lógica del backend, la persistencia de datos y los servicios cloud.
