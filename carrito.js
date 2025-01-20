const IVA = 0.21;
let totalCompra = 0;

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorIniciarCompra = document.getElementById("iniciar-compra");

const mostrarCarrito = () => {
  const contenedor = document.getElementById("productos-carrito");

  if (!contenedor) {
    console.error("El contenedor del carrito no se encontró");
    return;
  }

  //limpio el contenedor antes de agregar los productos
  contenedor.innerHTML = "";

  carrito.forEach((producto, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>${producto.cant}</td>
      <td>$${(producto.precio * producto.cant).toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm remove-from-cart" data-index="${i}">Eliminar</button>
      </td>
    `;
    contenedor.appendChild(row);
  });

  actualizarTotal();
};

// Eliminar producto del carrito
document.addEventListener("click", (e) => {
  const i = parseInt(e.target.dataset.index);
  eliminarDelCarrito(i);
});

function eliminarDelCarrito(i) {
  const producto = carrito[i];
  totalCompra -= producto.precio * producto.cant;
  //splice(index, 1) elimina un solo elemento en la posición i
  carrito.splice(i, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function actualizarTotal() {
  const totalContenedor = document.getElementById("total-compra");
  //reduce recorre todos los elementos del carrito y acumula el valor
  const subtotal = carrito.reduce((ac, producto) => ac + producto.precio * producto.cant, 0);
  const totalConIVA = subtotal + ( subtotal * IVA );
  //cambio el texto que se muestra en el elemento del DOM
  totalContenedor.textContent = `$ ${totalConIVA.toFixed(2)}`;
  guardarTotal(totalConIVA);
}

const guardarTotal = (total) => {
  localStorage.setItem("totalCompra", JSON.stringify(total));
};

//p' mostrar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
});

//p que al hacer click redirija a pago
contenedorIniciarCompra.addEventListener("click", () => {
  window.location.href = "pago.html";
});