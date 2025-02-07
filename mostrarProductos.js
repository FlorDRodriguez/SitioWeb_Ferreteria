const carrito = [];

const contenedorProductos = document.getElementById("contenedor-productos");

const categoriaSeleccionada = localStorage.getItem("categoriaSeleccionada");
const subcategoriaSeleccionada = localStorage.getItem("subcategoriaSeleccionada");

document.addEventListener("DOMContentLoaded", () => {
  const contenedorCategoria = document.getElementById("seleccionCategoria");

  if (contenedorCategoria) {
      contenedorCategoria.addEventListener("click", (e) => {
          const categoriaSeleccionada = e.target.id;
          localStorage.setItem("categoriaSeleccionada", categoriaSeleccionada);
      });
  }

  const headerCategoria = document.getElementById("seleccionCategoriaHeader");

  if (headerCategoria) {
      headerCategoria.addEventListener("click", (e) => {
          const categoriaSeleccionada = e.target.id;
          localStorage.setItem("categoriaSeleccionada", categoriaSeleccionada);
      });
  }

  const contenedorSubcategoria = document.getElementById("seleccionSubcategoria");
  
  if (contenedorSubcategoria) {
    contenedorSubcategoria.addEventListener("click", (e) => {
      const subcategoriaSeleccionada = e.target.id;
      localStorage.setItem("subcategoriaSeleccionada", subcategoriaSeleccionada);
    });
  }
});


const traerProductos = async () => {
  //Hago solicitud fetch para obtener los productos
  const respuesta = await fetch("/productos.json");
  //Convierto la respuesta en un objeto js
  const productos = await respuesta.json();
  return productos;
}

const filtrarProductos = (productos, categoria, subcategoria) => {
  const prodFiltrados = productos.filter(producto => producto.categoria === categoria && producto.subcategoria === subcategoria);
  return prodFiltrados;
};

const mostrarProductos = (productosFiltrados) => {
    
  if (contenedorProductos) {  
    
    contenedorProductos.innerHTML = "";

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
      contenedorProductos.appendChild(div);
    });
  } 
}

traerProductos().then(productos => {
  if (productos) {
    const productosFiltrados = filtrarProductos(productos, categoriaSeleccionada, subcategoriaSeleccionada);
    
    mostrarProductos(productosFiltrados);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  if (contenedorProductos) {
    //escucha el evento de click en el contenedor de productos
    contenedorProductos.addEventListener("click", (e) => {
      //Obtengo el atributo id del elemento que fue clicado y lo convierto a un número entero. 
      const productoId = parseInt(e.target.dataset.id);
      //Llamo a la función traerProductos que devuelve una promesa. Cuando la promesa se resuelve, se ejecuta la función de la flecha, recibiendo los productos como argumento.
      traerProductos().then(productos => {
        const producto = productos.find(p => p.id === productoId);
        if (producto) {
          validarProductoCarrito(producto);
        }
      });
    });
  };
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


