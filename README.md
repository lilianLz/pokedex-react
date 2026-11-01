# Pokédex React

Sitio web desarrollado para el Trabajo de Presentación del sitio Web de la materia **Programación Web II**.

La aplicación permite consultar Pokémon utilizando datos públicos de [PokéAPI](https://pokeapi.co/), mostrar una colección cargada localmente y enviar consultas desde un formulario de contacto.

## Sitio publicado

- Repositorio: [github.com/lilianLz/pokedex-react](https://github.com/lilianLz/pokedex-react)
- Página publicada: [lilianlz.github.io/pokedex-react](https://lilianlz.github.io/pokedex-react/)

## ¿Qué contiene el sitio?

### Página principal

La página principal consulta la API pública de PokéAPI y muestra los Pokémon en tarjetas. Cada tarjeta presenta información básica como:

- nombre;
- número de Pokédex;
- imagen oficial;
- tipos;
- altura y peso.

También incluye búsqueda por nombre o número, filtro por tipo y paginación. La lista completa se consulta una vez y los detalles se cargan por página para que la pantalla no tenga que mostrar todos los registros al mismo tiempo.

### Colección local

La segunda página utiliza un array de objetos guardado en `src/data/collection-data.js`. Cada objeto representa un Pokémon del equipo local e incluye su nombre, descripción, tipo e imagen.

Esta parte demuestra cómo trabajar con información propia de la aplicación sin depender de una API externa.

### Contacto

La tercera página contiene:

- formulario con nombre, correo, asunto y mensaje;
- validaciones básicas del navegador;
- envío mediante EmailJS;
- mensaje de confirmación o error;
- mapa embebido mediante un `iframe`.

El destinatario del mensaje se configura desde la plantilla de EmailJS. Las credenciales necesarias para el funcionamiento se encuentran en `lib/emailjs-config.js`.

## Tecnologías utilizadas

- React con JSX.
- Vite para iniciar, compilar y publicar el proyecto.
- React Router con `HashRouter` para la navegación entre páginas.
- PokéAPI para los datos de la página principal.
- EmailJS para el formulario de contacto.
- CSS propio para los estilos y el diseño adaptable.
- GitHub Pages para la publicación.

No se utiliza Next.js ni TypeScript. El proyecto está realizado con React y JavaScript, utilizando componentes simples y conceptos vistos en clase.

## Organización principal

```text
components/
├── contact-form.jsx       Formulario de contacto y envío con EmailJS
├── pokemon-browser.jsx    Carga, búsqueda, filtros y paginación
├── pokemon-card.jsx       Tarjeta individual de Pokémon
├── site-header.jsx        Encabezado y navegación
└── site-footer.jsx        Pie de página

src/pages/
├── HomePage.jsx           Página principal
├── CollectionPage.jsx     Colección local
└── ContactPage.jsx        Contacto y mapa

src/data/
└── collection-data.js     Array local de la colección

lib/
├── emailjs-config.js      Configuración del formulario
└── pokemon-config.js      URLs y constantes de PokéAPI

src/App.jsx                Rutas principales de la aplicación
src/main.jsx               Punto de entrada de React
src/styles.css             Estilos generales
```

## Conceptos de React utilizados

- Componentes reutilizables para separar cada parte de la interfaz.
- `useState` para controlar búsquedas, filtros, páginas, estados de carga y mensajes del formulario.
- `useEffect` para ejecutar las consultas a PokéAPI cuando se carga la página o cambia un filtro.
- Props para enviar información desde los componentes principales hacia las tarjetas.
- Destructuring para obtener datos de objetos y propiedades de los componentes.
- Renderizado de listas utilizando `map`.
- Renderizado condicional para mostrar cargas, errores y resultados.
- Formularios controlados mediante valores y eventos de React.

## Cómo ejecutar el proyecto localmente

Se necesita tener instalado Node.js y pnpm.

```bash
pnpm install
pnpm dev
```

Luego se puede abrir la dirección indicada por Vite, normalmente:

```text
http://localhost:3000
```

Si el puerto 3000 está ocupado, se puede iniciar con otro puerto:

```bash
pnpm exec vite --host 0.0.0.0 --port 3001
```

Para generar la versión de producción:

```bash
pnpm build
```

## Pruebas realizadas

Durante el desarrollo se verificó lo siguiente:

- carga de la página principal;
- consulta de datos desde PokéAPI;
- búsqueda por nombre, por ejemplo `Pikachu`;
- búsqueda por número de Pokédex;
- filtros por tipo;
- cambio entre páginas;
- visualización de imágenes;
- navegación hacia la colección local;
- carga de los datos del array local;
- navegación hacia la página de contacto;
- escritura en todos los campos del formulario;
- visualización del mapa;
- envío correcto de un mensaje mediante EmailJS;
- mensajes de éxito y error del formulario;
- compilación correcta con `pnpm build`;
- publicación y acceso desde GitHub Pages.

## Publicación

El proyecto utiliza un workflow de GitHub Actions ubicado en `.github/workflows/deploy.yml`.

Cada vez que se actualiza la rama `main`, el workflow instala las dependencias, ejecuta `pnpm build` y publica la carpeta generada por Vite en GitHub Pages.

Se utiliza `HashRouter` porque GitHub Pages es un hosting estático y esta configuración permite navegar entre las páginas sin problemas al actualizar el navegador.

## Funcionamiento resumido

1. React carga `src/main.jsx`.
2. `App.jsx` configura las rutas de la aplicación.
3. `HomePage.jsx` muestra la página principal y el buscador.
4. `PokemonBrowser` consulta PokéAPI y prepara los resultados.
5. `PokemonCard` muestra cada Pokémon recibido.
6. `CollectionPage.jsx` recorre el array local y muestra la colección.
7. `ContactPage.jsx` incorpora el formulario y el mapa.
8. `ContactForm` envía los datos mediante EmailJS.

## Trabajo práctico

El sitio cumple con las consignas principales: utiliza React, consume una API pública, presenta una segunda página con datos locales, incorpora una página de contacto con formulario y mapa, y se encuentra publicado en GitHub Pages.

