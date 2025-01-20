const carrito = [];
const contenedor = document.getElementById("contenedor-productos");

const categoriaSeleccionada = localStorage.getItem("categoriaSeleccionada");
const subcategoriaSeleccionada = localStorage.getItem("subcategoriaSeleccionada");

const filtrarProductos = (categoria, subcategoria) => {
  prodFiltrados = productos.filter(producto => producto.categoria === categoria && producto.subcategoria === subcategoria);
  console.log(prodFiltrados);
  return prodFiltrados;
};
const productosFiltrados = filtrarProductos(categoriaSeleccionada, subcategoriaSeleccionada);

const mostrarProductos = () => {
  
  productosFiltrados.forEach(producto => {
    const div = document.createElement("div");
    div.className = "card divCardProductos";
    div.innerHTML += `
      <img src="${producto.img}" class="card-img-top" alt="producto">
      <div class="card-body">
        <h6 class="card-title">${producto.nombre}</h6>
        <p class="card-text">${producto.desc}</p>
        <p class="card-text">$ ${producto.precio}</p>
        <button class="btn btn-outline-success btn-sm add-to-cart" data-id="${producto.id}">Agregar</button>
      </div>
    `;
    contenedor.appendChild(div);
  });
};
mostrarProductos();

//escucha el evento de click en el contenedor de productos
contenedor.addEventListener("click", (e) => {
  const productoId = parseInt(e.target.dataset.id);
  const producto = productos.find(p => p.id === productoId);

    if (producto) {
      validarProductoCarrito(producto);
    }
});

const validarProductoCarrito = (producto) => {
  const estaRepetido = carrito.some(p => p.id === producto.id);
  if (estaRepetido) {
    const prodCarrito = carrito.find(p => p.id === producto.id);
    prodCarrito.cant += 1;
  } else {
    producto.cant = 1;
    carrito.push(producto);
  }
  guardarCarrito();
  notificacion(producto);
};

const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const notificacion = (producto) => {
  Swal.fire({
    title: "Producto añadido correctamente",
    text: `Has añadido "${producto.nombre}" al carrito.`,
    icon: "success",
    confirmButtonText: "Aceptar",
    timer: 3000,
    position: "top",
    customClass: {
      popup: 'small-swal'
    }
  });
};


