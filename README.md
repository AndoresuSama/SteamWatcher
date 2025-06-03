# 🎮 Steam Watcher

**Steam Watcher** es una aplicación para visualizar, seguir y mantener actualizada una lista de juegos basada en información de Steam. Está dividida en un frontend y un backend que trabajan de forma coordinada.

---

## 📦 Estructura del proyecto

```
steam-watcher/
│
├── src/
│   ├── backend/                             # Servidor HTTP + Scrapping + Encriptación + Almacenamiento
│   │   ├── controllers/
|   |   |   ├── encrypt.js
│   │   │   ├── exampleThreads.js
│   │   │   ├── gamesController.js
│   │   │   └── steamFetcherController.js
│   │   ├── db/
│   │   │   ├── db.json                     
│   │   │   └── index.js
│   │   ├── routes/                         
│   │   └── index.js
│   │    
│   │
│   └── frontend/
│       ├── browser/                         # Frontend para navegador (HTML/CSS/JS)
│       └── electron/                        # Frontend para escritorio (Electron)
│
├── tests/                                   # Tests con Jest
│   ├── backend/
│   │   ├── deleteGame.test.js
│   │   ├── getGameInformation.test.js
│   │   └── searchBySteamName.test.js
│   └── frontend/
│       └── gamesManager.test.js
├── .env
├── .gitignore
├── jest.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 ¿Qué hace?

- 🔍 Permite buscar juegos (vía input), mostrando los resultados como tarjetas tipo Steam.
- ⏱ Actualiza automáticamente la información de cada juego cada minuto.
- 🧩 Detecta cambios (precio, reseñas, descuentos, etc.) y los resalta visualmente.
- 🟢 Muestra los descuentos de forma visual al estilo Steam: etiqueta, precio tachado y precio final.
- 🗑 Permite eliminar juegos del seguimiento.
- 🌐 Corre tanto en navegador como en escritorio con Electron.
- 🧠 Se sincroniza con un JSON expuesto por un servidor HTTP que actúa como "base de datos".

---

## 🔧 Cómo correr el proyecto

### 📁 Requisitos previos

- Node.js ≥ 18.x
- npm
- (opcional) Electron CLI si se desea usar en escritorio

### 📍 Instalación

```bash
git clone https://github.com/AndoresuSama/SteamWatcher.git
cd steam-watcher
npm install
````

---

## 🖥 Frontend (modo navegador)

### ▶️ Ejecutar en navegador

```bash
# Solo necesitas abrir el archivo
open src/frontend/browser/index.html
```

> Asegúrate de que el backend esté corriendo para que las peticiones al servidor funcionen correctamente.

---

## 🖥 Frontend (modo escritorio con Electron)

### 🧪 Estado: **en desarrollo** (estructura creada, pendiente integración final)

Si deseas usar Steam Watcher como una app de escritorio:

```bash
npm install --save-dev electron
```

Se va a iniciar una ventana de Electron apuntando al mismo HTML del navegador.

Y ejecútalo con:

```bash
npm run start:electron
```

---

## 🧠 Backend

### 🧪 Estado: **Finalizado**

Para levantar el servicio:

```bash
npm run start
```

Se iniciará el servicio en el puerto configurado en .env o en el 3000 por defecto.

---

## ✨ Backend Features

* Scrapping de información de juegos desde Steam.
* Encriptación de información
* Servidor HTTP que responde a:

  * `GET /games` → devuelve el JSON de juegos
  * `GET /games/updated` → actualiza el estado de los juegos en DB (consultando a Steam) y los retorna
  * `POST /games` → almacena un nuevo juego en DB (Body: { "name": "ExampleGame" })
  * `DELETE /games/:id` → elimina un juego por su id
* Almacenamiento de datos en un JSON local (`db.json`) que actúa como base de datos.
* Actualización de los datos y detección de cambios en los siguientes campos:
  
  * Fecha de lanzamiento
  * Reseñas
  * Precio
  * Imagen 

El frontend se conecta a este backend para mostrar y mantener los datos sincronizados tanto en navegador como en Electron.

---

## ✨ UI Features

* Mobile-first, responsiva y optimizada para escritorio.
* Tarjetas de juego con:

  * Nombre
  * Fecha de lanzamiento
  * Precio (con descuentos visuales si aplica)
  * Reseñas
  * Imagen
* Destacado visual de datos modificados.
* Transiciones suaves al actualizar información.
* Botón de eliminación de juegos.

---

## 📌 TODO (Frontend)

* [x] Finalizar integración con Electron.
* [ ] Persistencia en `localStorage` si backend no está disponible.
* [x] Tests de frontend con Jest + Testing Library.

---
## 🧪 Cómo ejecutar los tests

Para ejecutar los tests del proyecto, sigue estos pasos:

1. Asegúrate de tener instaladas todas las dependencias necesarias. Ejecuta:
  ```
  npm install
  ```

2. Ejecuta los tests con el siguiente comando:
  ```
  npm test
  ```

3. Para ver un reporte detallado o ejecutar tests en modo interactivo, consulta la documentación de la herramienta de Jest.

---

## 📝 Licencia

MIT – Puedes usar y modificar este proyecto libremente.

---
