// Definiciones iniciales
var N = 10;
var w = window.innerWidth;
var h = window.innerHeight;
window.onresize = function () {
  w = window.innerWidth;
  h = window.innerHeight;
};

// Clase para la imagen
function ImageObj(id, x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  var el = this.element = new Image();
  el.src = id + '.png'; // Suponiendo que las imágenes se nombran 'flower1.png' y 'flower2.png'
  el.style.position = 'absolute';
  this.setTransforms();
  document.body.appendChild(el);
}

ImageObj.prototype.setTransforms = function () {
  this.element.style.left = this.x + 'px';
  this.element.style.top = this.y + 'px';
};

// Crear objetos de imagen
var images = [];
for (var i = 0; i < N; i++) {
  images.push(new ImageObj('flower1', Math.random() * w, Math.random() * h, (Math.random() * 5) - 2, (Math.random() * 5) - 2));
  images.push(new ImageObj('flower2', Math.random() * w, Math.random() * h, (Math.random() * 5) - 2, (Math.random() * 5) - 2));
}

// Función de animación
(function animate(t) {
  images.forEach(function(img) {
    img.x += img.dx;
    img.y += img.dy;
    if (img.x > w + 200) img.x -= w + 400;
    if (img.x < -200) img.x += w + 400;
    if (img.y > h + 200) img.y -= h + 400;
    if (img.y < -200) img.y += h + 400;
    img.setTransforms();
  });

  requestAnimationFrame(animate);
})(0);
