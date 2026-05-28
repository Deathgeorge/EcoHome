# EcoHome Frontend

Aplicación frontend para el proyecto EcoHome, construida con React, TypeScript y Vite.

## Características

*   **Autenticación**: Inicio de sesión de usuarios.
*   **Gestión de Productos**: Listado y creación de productos consumiendo una API REST.
*   **Chat en Tiempo Real**: Comunicación en tiempo real utilizando WebSockets (`socket.io-client`).

## Tecnologías Utilizadas

*   React (v19)
*   TypeScript
*   Vite
*   React Router DOM para el enrutamiento.
*   Socket.io-client para WebSockets.

## Requisitos Previos

Asegúrate de tener instalado Node.js (versión 18 o superior recomendada).

## Instalación y Ejecución

1.  Instala las dependencias:
    ```bash
    npm install
    ```
2.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite por consola).

## Estructura de Rutas
*   `/`: Página de inicio de sesión (`LoginForm`).
*   `/productos`: Listado de productos (`ListProductPage`).
*   `/crear-producto`: Formulario para crear un nuevo producto (`CreateProductoPage`).
*   `/chat`: Sala de chat en tiempo real (`ChatPage`).
