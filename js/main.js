(() => {
  /* Selectores del DOM */
  const heroBackground = document.querySelector(".hero__background"); /* Fondo del hero para el efecto de movimiento */
  const menuToggle = document.querySelector("#menu-toggle"); /* Botón de menú hamburguesa */
  const siteNavigation = document.querySelector("#site-navigation"); /* Navegación principal */
  const navLinks = document.querySelectorAll(".site-header__nav-link"); /* Enlaces de navegación para cerrar el menú en móvil */

  /* Variables generales */
  let isMenuOpen = false; /* Estado del menú hamburguesa */

  /* Variables del movimiento del hero hecho con chatgpt*/
  let pointerX = 0; // Posición X del puntero 
  let pointerY = 0; // Posición Y del puntero 
  let currentX = 0; // Posición X actual del fondo del hero */
  let currentY = 0; // Posición Y actual del fondo del hero */

  /* Menú hamburguesa */
  const openMenu = () => {
    if (!menuToggle || !siteNavigation) return; // Verificar que los elementos existen antes de manipularlos

    isMenuOpen = true; // Actualizar el estado del menú
    /* Agregar clase para mostrar el menú, actualizar atributos ARIA para accesibilidad y bloquear el scroll del fondo */
    siteNavigation.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Cerrar menú");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => { // Verificar que los elementos existen antes de manipularlos
    /* Eliminar clase para ocultar el menú, actualizar atributos ARIA para accesibilidad y restaurar el scroll del fondo */
    if (!menuToggle || !siteNavigation) return;

    isMenuOpen = false;
    siteNavigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    document.body.style.overflow = "";
  };

  /* Función para alternar el estado del menú hamburguesa */
  const toggleMenuHandler = () => {
    isMenuOpen ? closeMenu() : openMenu();
  };
  /* Función para cerrar el menú automáticamente al redimensionar la ventana a un tamaño de escritorio */
  const closeMenuOnResizeHandler = () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  };

  /* Función para cerrar el menú automáticamente al hacer clic en un enlace de navegación en dispositivos móviles */
  const closeMenuOnLinkClickHandler = () => {
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  };

  /* Movimiento del hero */

  const pointerMoveHandler = (event) => {
    pointerX = (event.clientX - window.innerWidth / 2) / 2.2;
    pointerY = (event.clientY - window.innerHeight / 2) / 2.2;
  };

  const animateHeroBackground = () => {
    /* Verificar que el elemento del fondo del hero existe antes de intentar manipularlo. Si no existe, salir de la función para evitar errores. */
    if (!heroBackground) return;

    currentX += (pointerX - currentX) * 0.24;
    currentY += (pointerY - currentY) * 0.24;
    /* Calcular un valor de escala basado en la distancia del puntero desde el centro de la pantalla para crear un efecto de zoom dinámico */
    const scaleValue = 1 + Math.abs(currentX + currentY) / 180;

    heroBackground.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scaleValue})`;

    requestAnimationFrame(animateHeroBackground);
  };

  /* Eventos */
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenuHandler);
  } // Agregar un controlador de eventos a cada enlace de navegación para cerrar el menú en dispositivos móviles al hacer clic en un enlace

  if (navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenuOnLinkClickHandler);
    });
  }

  window.addEventListener("resize", closeMenuOnResizeHandler); // Agregar un controlador de eventos para cerrar el menú automáticamente al redimensionar la ventana a un tamaño de escritorio
  document.addEventListener("mousemove", pointerMoveHandler);

  if (heroBackground) {
    animateHeroBackground();
  }
})();

/* Slider proyectos destacados */
/*Permite navegar entre los proyectos utilizando flechas de navegación. 
El slider se mueve horizontalmente al hacer clic en las flechas, 
mostrando un proyecto a la vez. */
const pista = document.getElementById("slider-pista"); // Contenedor que contiene los proyectos dentro del slider
const btnPrev = document.querySelector(".slider-proyectos__flecha--anterior"); // Botón de flecha para navegar al proyecto anterior
const btnNext = document.querySelector(".slider-proyectos__flecha--siguiente"); // Botón de flecha para navegar al proyecto siguiente

if (pista && btnPrev && btnNext) { // Verificar que los elementos existen antes de manipularlos
  let index = 0; // Índice para rastrear el proyecto actualmente visible en el slider
  const totalSlides = pista.children.length; // Número total de proyectos en el slider, calculado a partir del número de elementos hijos dentro del contenedor del slider

  /* Función para actualizar la posición del slider, 
moviendo el contenedor del slider horizontalmente para mostrar el proyecto correspondiente 
al índice actual. El valor de translateX se calcula multiplicando el índice por 100%, lo que 
desplaza el contenedor del slider a la izquierda para mostrar el proyecto correcto. */
  const actualizarSlider = () => {
    pista.style.transform = `translateX(-${index * 100}%)`;
  };

  btnNext.addEventListener("click", () => { // Agregar un controlador de eventos al botón de flecha siguiente para avanzar al siguiente proyecto en el slider
    index = (index + 1) % totalSlides;
    actualizarSlider();
  });

  btnPrev.addEventListener("click", () => { // Agregar un controlador para retroceder al proyecto anterior en el slider
    index = (index - 1 + totalSlides) % totalSlides;
    actualizarSlider();
  });
}

/*sobre mí*/
/* Permite mostrar u ocultar la lista de valores personales al hacer clic en el botón correspondiente.*/
const boton = document.getElementById("botonValores");
const lista = document.getElementById("listaValores");

if (boton && lista) { 
  boton.addEventListener("click", () => { // mostrar u ocultar la lista de valores personales al hacer clic
    lista.classList.toggle("oculto");
  });
}

/*reveal*/
//efecto del main, aparece poco a poco al cargar la página
const main = document.querySelector("main.reveal");

window.addEventListener("load", () => {
  if (main) {
    main.classList.add("visible");
  }
});


/* filtro de proyectos */
/* Permite filtrar los proyectos mostrados en la sección de proyectos destacados al hacer clic en los botones de filtro correspondientes. 
Al hacer clic en un botón de filtro, se muestra solo los proyectos que pertenecen a la categoría seleccionada, ocultando los demás. 
El botón de filtro activo se resalta para indicar la categoría seleccionada. */
document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.filtro__btn');
  const posters = document.querySelectorAll('.poster__enlace');

  if (!botones.length || !posters.length) return;
/* Agregar un controlador de eventos a cada botón de filtro para mostrar solo los proyectos que pertenecen a la categoría seleccionada.*/
  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      const filtro = boton.dataset.filter;
/* Eliminar la clase 'activo' de todos los botones y agregarla solo al botón seleccionado para resaltar la categoría activa. */
      botones.forEach((b) => b.classList.remove('activo'));
      boton.classList.add('activo');
/* Mostrar solo los proyectos que pertenecen a la categoría seleccionada, ocultando los demás. 
Si se selecciona el filtro 'todo', se muestran todos los proyectos. */
      posters.forEach((poster) => {
        const article = poster.querySelector('.poster');
        const categorias = article.dataset.category.trim().split(/\s+/);

/* Verificar si el filtro seleccionado es 'todo' o si las categorías del proyecto incluyen la categoría seleccionada.*/
        if (filtro === 'todo' || categorias.includes(filtro)) {
          poster.classList.remove('oculto');
        } else {
          poster.classList.add('oculto');
        }
      });
    });
  });
});

/*lightbox*/
const galleryItems = document.querySelectorAll('.detalle-galeria__item'); // Seleccionar todos los elementos de la galería para agregar funcionalidad de lightbox
const lightbox = document.getElementById('lightbox'); // Contenedor del lightbox que se muestra al hacer clic en una imagen de la galería
const lightboxImage = document.getElementById('lightbox-image'); // Elemento de imagen dentro del lightbox donde se mostrará la imagen seleccionada de la galería
const closeButton = document.querySelector('.lightbox__cerrar'); // Botón para cerrar el lightbox, ubicado dentro del contenedor del lightbox, que permite al usuario cerrar la vista ampliada de la imagen y volver a la galería.
const prevButton = document.querySelector('.lightbox__nav--prev'); // Botón para navegar a la imagen anterior dentro del lightbox, ubicado dentro del contenedor del lightbox, que permite al usuario ver la imagen anterior en la galería sin cerrar el lightbox.
const nextButton = document.querySelector('.lightbox__nav--next'); // Botón para navegar a la imagen siguiente dentro del lightbox, ubicado dentro del contenedor del lightbox, que permite al usuario ver la imagen siguiente en la galería sin cerrar el lightbox.

const images = Array.from(galleryItems).map((item) => {
  const img = item.querySelector('img');
  return {
    src: item.getAttribute('href'),
    alt: img ? img.getAttribute('alt') : ''
  };
});

let currentIndex = 0;

function updateLightbox() {
  lightboxImage.src = images[currentIndex].src;
  lightboxImage.alt = images[currentIndex].alt;
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('activo');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('activo');
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    openLightbox(index);
  });
});

closeButton.addEventListener('click', closeLightbox);
nextButton.addEventListener('click', showNextImage);
prevButton.addEventListener('click', showPrevImage);

lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', function (e) {
  if (!lightbox.classList.contains('activo')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNextImage();
  if (e.key === 'ArrowLeft') showPrevImage();
});
