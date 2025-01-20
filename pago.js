const contenedorMetodo = document.getElementById('metodo-pago');

let total = JSON.parse(localStorage.getItem("totalCompra"));

const porcentajeDescuento = 0.15;
const porcentaje3Cuotas = 0.10;
const porcentaje6Cuotas = 0.25;

contenedorMetodo.addEventListener('change', (e) => {
    //obtengo el valor de la opción seleccionada
    const metodoPago = contenedorMetodo.value;
    //selecciono todos los elementos que tengan esa clase
    const opcionesPago = document.querySelectorAll('.opciones-pago');
    
    //oculto todas las opciones cambiando la prop CSS display a none
    opcionesPago.forEach(opcion => opcion.style.display = 'none');
    
    //muestro la opción seleccionada
    if (metodoPago) {
        //selecciono el elemento cuyo id coincide con el valor de la variable metodoPago
        //cambio la prop CSS display a block p que sea visible
        document.getElementById(metodoPago).style.display = 'block';

        iniciarPago(metodoPago);
        mostrarBoton(metodoPago);
    }
});

const mostrarBoton = (metodoPago) => {
    const contenedorBoton = document.getElementById('boton-pago');
    const button = document.createElement("button");

    //verifico si ya existe el botón
    if (!contenedorBoton.querySelector("button")) {
        button.className = "btn btn-primary";
        button.type = "submit"
        button.innerHTML += `Pagar`;
        contenedorBoton.appendChild(button);        
    }

    if (metodoPago === "transferencia") {
        button.addEventListener("click", (e) => {
            e.preventDefault(); //previene que el formulario se envíe
            console.log("Redirigiendo a Mercado Pago...");
            // window.location.href = "https://link.mercadopago.com.ar/jumase";
            window.open("https://link.mercadopago.com.ar/jumase", "_blank"); //lo abre en una nueva ventana
        });
    }
};

const iniciarPago = (metodoPago) => {
    switch (metodoPago) {
        case "debito":
            const contenedorMontoDebito = document.getElementById('monto-debito');
            //limpio el contenido del contenedor antes de agregar el nuevo monto
            contenedorMontoDebito.innerHTML = "";
            const h5Debito = document.createElement("h5");
            h5Debito.className = "";
            h5Debito.innerHTML += `Monto a pagar: $${total.toFixed(2)}`;
            contenedorMontoDebito.appendChild(h5Debito);
            break;
        case "credito":
            PagoCredito(total);
            break;
        case "transferencia":
            const contenedorMontoTranf = document.getElementById('monto-transferencia');

            const descuento = total - (total * porcentajeDescuento);        

            //limpio el contenido del contenedor antes de agregar el nuevo monto
            contenedorMontoTranf.innerHTML = "";

            const h5Transferencia = document.createElement("h5");
            h5Transferencia.className = "";
            h5Transferencia.innerHTML += `Monto a pagar: $${descuento.toFixed(2)}`;

            const h6 = document.createElement("h6");
            h5Transferencia.className = "";
            h6.innerHTML += `Usted será redirigido a Mercado Pago...`;
            
            contenedorMontoTranf.appendChild(h5Transferencia);
            contenedorMontoTranf.appendChild(h6);

            break;
    }
};

const PagoCredito = (total) => {
    const contenedorCuotas = document.getElementById('cuotas');
    contenedorCuotas.addEventListener("change", () => {
        const cuotasSelecc = contenedorCuotas.value;
        console.log(cuotasSelecc);
        switch (cuotasSelecc) {
            case "1cuota":
                mostrarMonto(total);
                break;
            case "3cuotas":
                const recargo3 = total + (total * porcentaje3Cuotas);       
                mostrarMonto(recargo3);
                break;
            case "6cuotas":
                const recargo6 = total + (total * porcentaje6Cuotas);
                mostrarMonto(recargo6);
                break;
        };
    });
};

const mostrarMonto = (total) => {
    const contenedorMonto = document.getElementById('monto-credito');
    //limpio el contenido del contenedor antes de agregar el nuevo monto
    contenedorMonto.innerHTML = "";
    const h5 = document.createElement("h5");
    h5.className = "";
    h5.innerHTML += `Monto a pagar: $${total.toFixed(2)}`;
    contenedorMonto.appendChild(h5);
};