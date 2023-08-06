const productosURL = '../producto.json/productos2.json';
const listadoProductos = document.getElementById('listadoProductos');
let carrito = [];

function cargarProductos() {
    return fetch(productosURL)
        .then((response) => response.json())
        .then((data) => {
            productos = data;
            cargarImagenes().then(() => mostrarProductos());
        })
        .catch((error) => {
            console.error('Error al cargar los productos:', error);
        });
}

function cargarImagenes() {
    return new Promise((resolve, reject) => {
        const images = productos.map((product) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = product.stockUrl;
                img.onload = () => resolve();
                img.onerror = () => reject();
            });
        });

        Promise.all(images)
            .then(() => resolve())
            .catch(() => reject());
    });
}

function cargarCarritoDesdeLocalStorage() {
    return new Promise((resolve) => {
        const storedCarrito = localStorage.getItem('carrito');
        if (storedCarrito) {
            carrito = JSON.parse(storedCarrito);
        }
        resolve();
    });
}

function agregarAlCarrito(productId) {
    const productoSeleccionado = productos.find((product) => product.id === productId);
    if (productoSeleccionado) {
        const existentProduct = carrito.find((item) => item.id === productId);

        if (existentProduct) {
            existentProduct.cantidad += 1;
        } else {
            productoSeleccionado.cantidad = 1;
            carrito.push(productoSeleccionado);
        }

        guardarCarritoEnLocalStorage();

        Swal.fire({
            title: 'Producto agregado al carrito',
            icon: 'success',
            confirmButtonText: 'Continuar',
            customClass: {
                confirmButton: 'btn btn-success',
            },
        });
    }
}

function mostrarProductos() {
    listadoProductos.innerHTML = '';

    const divRow = document.createElement('div');
    divRow.classList.add('row', 'w-100');

    for (const product of productos) {
        const { stockUrl, nombre, categoria, stock, precio } = product;

        const divCard = document.createElement('div');
        divCard.classList.add('card', 'col-4');
        divCard.innerHTML = `
            <div class="card-body">
                <img src='${stockUrl}' class='card-img-top' >
                <h3>Nombre: ${nombre}</h3>
                <h3>Categoria: ${categoria}</h3>
                <p>Stock: ${stock}</p>
                <p>Precio: ${precio}</p>
            </div>
            <div class='card-footer'>
                <button class='btn btn-outline-dark w-100' onclick='agregarAlCarrito(${product.id})'>Agregar al carrito</button>
            </div>
        `;
        divRow.appendChild(divCard);
    }

    listadoProductos.appendChild(divRow);
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar productos al carrito
function agregarAlCarrito(productId) {
const productoSeleccionado = productos.find((product) => product.id === productId);
if (productoSeleccionado) {
const existentProduct = carrito.find((item) => item.id === productId);

    if (existentProduct) {
        existentProduct.cantidad += 1;
    } else {
        productoSeleccionado.cantidad = 1;
        carrito.push(productoSeleccionado);
    }

    guardarCarritoEnLocalStorage();

    swal.fire({
        title: 'Producto agregado al carrito',
        icon: 'success',
        confirmButtonText: 'Continuar',
        customClass: {
            confirmButton: 'btn btn-success',
        },
    })
}
}


// Mostrar el contenido del carrito
function mostrarCarrito() {
const carritoDiv = document.getElementById('carrito');
carritoDiv.innerHTML = '';

if (!carrito?.length) {
    carritoDiv.textContent = 'El carrito está vacío.';
    return;
}

let total = 0;
const carritoHtml = document.createElement('div');

for (const product of carrito) {
    total += product.precio * product.cantidad;
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
    <p>Producto: ${product.nombre}</p>
    <p>Cantidad: ${product.cantidad}</p>
    <button onclick='eliminarDelCarrito(${product.id})'>Eliminar</button>
    <button onclick='actualizarCantidad(${product.id})'>Actualizar Cantidad</button>
    `;
    carritoHtml.appendChild(productDiv);
}

carritoHtml.innerHTML += `<p>Total a pagar: ${total}</p>`;
carritoDiv.appendChild(carritoHtml);
}

// Eliminar un producto del carrito
function eliminarDelCarrito(productId) {
const index = carrito.findIndex((product) => product.id === productId);
if (index !== -1) {
    carrito.splice(index, 1);
    guardarCarritoEnLocalStorage();
    Swal.fire({
    title: 'Producto eliminado del carrito',
    icon: 'success',
    confirmButtonText: 'Continuar',
    customClass: {
    confirmButton: 'btn btn-success',
    },
});
mostrarCarrito();
}
}

// Actualizar la cantidad de un producto en el carrito
function actualizarCantidad(productId) {
const existentProduct = carrito.find((product) => product.id === productId);
if (existentProduct) {
    const newQuantity = parseInt(prompt('Ingrese la nueva cantidad:'));
    if (!isNaN(newQuantity) && newQuantity >= 0) {
    existentProduct.cantidad = newQuantity;
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
    } else {
    alert('Por favor, ingrese una cantidad válida.');
    }
}
}

cargarProductos()
    .then(() => cargarCarritoDesdeLocalStorage())
    .catch(() => {
        console.error('Error al cargar productos o carrito desde LocalStorage');
    });

document.getElementById('mostrarCarrito')?.addEventListener('click', mostrarCarrito);