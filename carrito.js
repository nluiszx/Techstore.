/* =========================
   BASE DE DATOS SIMULADA
========================= */

const productos = [
  { id: 1, nombre: "Intel Core i9-13900K", precio: 620 },
  { id: 2, nombre: "NVIDIA RTX 4070 Ti", precio: 799 },
  { id: 3, nombre: "Kingston Fury 32GB DDR5", precio: 150 },
  { id: 4, nombre: "Samsung 980 Pro 1TB", precio: 89 }
];

let carrito = {
  id_carrito: 1,
  id_cliente: 1
};

let detalleCarrito = [];
let contador = 0;


/* =========================
   CUANDO CARGA LA PÁGINA
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const botones = document.querySelectorAll(".btn-success, .btn-danger");
  const contadorCarrito = document.querySelector(".badge");
  const modalCarrito = document.getElementById("modalCarritoItems");
  const modalCount = document.getElementById("modalCartCount");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {

      const nombreProducto = boton
        .closest(".card")
        .querySelector(".card-title")?.innerText;

      if (!nombreProducto) return;

      const producto = productos.find(p => p.nombre === nombreProducto);

      if (producto) {
        detalleCarrito.push({
          id_detalle: detalleCarrito.length + 1,
          id_carrito: carrito.id_carrito,
          id_producto: producto.id
        });

        contador++;

        if (contadorCarrito) contadorCarrito.innerText = contador;
        if (modalCount) modalCount.innerText = contador;

        mostrarCarrito(modalCarrito);
      }
    });
  });

  function mostrarCarrito(modalCarrito) {
    if (!modalCarrito) return;

    if (detalleCarrito.length === 0) {
      modalCarrito.innerHTML = "Carrito vacío";
      return;
    }

    modalCarrito.innerHTML = "";

    detalleCarrito.forEach(item => {
      const producto = productos.find(p => p.id === item.id_producto);

      modalCarrito.innerHTML += `
        <p>🛒 ${producto.nombre} - $${producto.precio} USD</p>
      `;
    });
  }

  window.finalizarCompra = function () {
    if (detalleCarrito.length === 0) {
      alert("Tu carrito está vacío");
    } else {
      alert("Gracias por tu compra 🛍️");

      detalleCarrito = [];
      contador = 0;

      if (contadorCarrito) contadorCarrito.innerText = 0;
      if (modalCount) modalCount.innerText = 0;
      if (modalCarrito) modalCarrito.innerHTML = "Carrito vacío";
    }
  };

});