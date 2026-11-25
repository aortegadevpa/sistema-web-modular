# TaskFlow Modular — Sistema Web Colaborativo

Aplicación web de gestión ágil tipo Kanban estructurada bajo una **arquitectura frontend multi-archivo**, diseñada para demostrar separación de responsabilidades y flujo de trabajo colaborativo con Git y GitHub.

🔗 **Demo en vivo:** <https://aortegadevpa.github.io/sistema-web-modular/>  
👤 **Portafolio Principal:** <https://aortegadevpa.github.io/>

## 📂 Arquitectura Modular del Proyecto

```
├── index.html          # Estructura semántica HTML5 y puntos de montaje
├── css/
│   └── styles.css      # Variables CSS, tokens visuales y componentes glassmorphism
├── js/
│   ├── store.js        # Módulo de estado, CRUD, filtros y persistencia LocalStorage
│   └── ui.js           # Módulo de renderizado DOM, tarjetas y notificaciones Toast
└── README.md           # Documentación del proyecto
```

## ✨ Funcionalidades

* **Tablero Kanban de 3 Etapas:** Flujo de trabajo entre *Por Hacer (Backlog)*, *En Desarrollo* y *Merged / Listo*.
* **Asignación por Módulos y Ramas Git:** Cada tarea identifica el módulo técnico (`UI / CSS`, `Core JS`, `API & Datos`, `Git / QA`) y su rama asociada (`feat/...`).
* **Indicadores de Progreso en Tiempo Real:** Cálculo automático de tareas totales, en progreso y porcentaje de avance del sprint.
* **Persistencia Local:** Almacenamiento automático en `localStorage` con opción de restaurar los datos iniciales (`Reset Demo`).

## 🛠️ Tecnologías

* **HTML5 Semántico**
* **CSS3 Modular + Tailwind CSS**
* **JavaScript ES6+ (Patrón Módulo / IIFE)**
* **Git & GitHub Pages**