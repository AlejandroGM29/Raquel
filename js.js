// Variables globales
let N = 20; // Total de gatos
let groupSize = 3; // Tamaño del grupo que caerá a la vez
let delayBetweenGroups = 1000; // Retardo entre grupos en milisegundos (1 segundo)
let currentKitties = 0; // Contador para saber cuántos gatos se han inicializado
let kitties = []; // Array para almacenar los objetos Kitty

// Definiciones de espacios de nombres y dimensiones iniciales
let w3 = "http://www.w3.org/";
let svgNS = w3 + "2000/svg";
let xlinkNS = w3 + "1999/xlink";
let w = window.innerWidth;
let h = window.innerHeight;

// Función constructora para Kitty
function Kitty(x, y, r, dx, dy) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  let el = (this.element = document.createElementNS(svgNS, "use"));
  this.setTransforms();
  el.setAttributeNS(xlinkNS, "href", "#kitty"); // Asegúrate de tener un elemento SVG con id="kitty"
  document.querySelector('svg').appendChild(el);
}

// Método para establecer las transformaciones de un Kitty
Kitty.prototype.setTransforms = function() {
  this.element.setAttribute("transform", "translate(" + this.x + "," + this.y + ") rotate(" + this.r + ")");
};

// Función para inicializar grupos de gatos
function initializeKittyGroup() {
  for (let i = 0; i < groupSize && currentKitties < N; i++) {
    let kitty = new Kitty((w * Math.random()) | 0, -50, 360 * Math.random(), ((Math.random() * 5) | 0) - 2, 1 + Math.random() * 2);
    kitties.push(kitty);
    currentKitties++;
  }
  if (currentKitties < N) {
    setTimeout(initializeKittyGroup, delayBetweenGroups);
  }
}

// Función de animación para los gatos
function animateKitties() {
  kitties.forEach(kitty => {
    kitty.y += kitty.dy;
    if (kitty.y > h + 50) { // Si el gato sale del área visible por abajo
      kitty.y = -50; // Lo reinicia por arriba
      kitty.x = (w * Math.random()) | 0; // En una posición x aleatoria
    }
    kitty.setTransforms();
  });

  requestAnimationFrame(animateKitties);
}

// Iniciar la animación
/* initializeKittyGroup(); */
/* requestAnimationFrame(animateKitties); */

// Manejador de evento para ajustar las dimensiones cuando la ventana se redimensiona
window.onresize = function() {
  w = window.innerWidth;
  h = window.innerHeight;
  document.querySelector('svg').setAttribute("viewBox", "0 0 " + w + " " + h);
};

function startAnimation() {
  document.querySelectorAll('svg').forEach(svg => svg.style.display = 'block');
  initializeKittyGroup(); // Inicia la creación de grupos de gatos
  requestAnimationFrame(animateKitties); // Inicia la animación de los gatos
}

// Vincula el evento de clic del botón para iniciar la animación
document.getElementById('startAnimation').addEventListener('click', function() {
  startAnimation();
});