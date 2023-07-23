const productos = [
    {
    id: 1,
    nombre: 'Caña de pesca',
    precio: 19000,
    categoria: 'Cañas',
    stock: 580,
    stockUrl: 'https://mlstaticquic-a.akamaihd.net/cana-de-pescar-shimano-2-tramos-deporte-pesca-mvd-sport-D_NQ_NP_623823-MLU31478531453_072019-F.jpg'
    },
    {
    id: 2,
    nombre: 'Reel de pesca',
    precio: 3000,
    categoria: 'Elementos para pescar',
    stock: 100,
    stockUrl: 'https://th.bing.com/th/id/R.c0573c6abf4e00bd87ed16bcb189692b?rik=fnxAMTc7P2WK6g&pid=ImgRaw&r=0'
    },
    {
        id: 3,
        nombre: 'Señuelo',
        precio: 5000,
        categoria: 'Accesorios',
        stock: 200,
        stockUrl: 'https://th.bing.com/th/id/R.3719117dc67e83c2c3a5ed915d80fc4d?rik=ZsUBphqIzf6kRQ&riu=http%3a%2f%2f2.bp.blogspot.com%2f-rX5r_660H6c%2fUKgmKyKF59I%2fAAAAAAAAB58%2fX3Oq2xD24r4%2fs1600%2fSe%c3%b1uelos%2bde%2bpesca%2bonline%2bpara%2bpescar%2blubina.jpg&ehk=Rn%2b0zm1yLuMDVAvDI0jKWHGQZBxqno8dMcZAosq3y0k%3d&risl=&pid=ImgRaw&r=0'
    },
    {
        id: 4,
        nombre: 'Anzuelos',
        precio: 10000,
        categoria: 'kit 7 anzuelos',
        stock: 1000,
        stockUrl: 'https://th.bing.com/th/id/OIP.5TBCrbpRuvpP47Qmm8Fr3gHaFj?pid=ImgDet&w=1600&h=1200&rs=1'
    },
    {
        id: 5,
        nombre: 'Tanza',
        precio: 5000,
        categoria: 'Accesorios',
        stock: 100,
        stockUrl: 'https://th.bing.com/th/id/OIP.1meSoSHjujt7Xkw3_slmLAAAAA?pid=ImgDet&rs=1'
    },
    {
        id: 6,
        nombre: 'Caja de pesca',
        precio: 10000,
        categoria: 'Elementos de Pesca',
        stock: 60,
        stockUrl: 'https://th.bing.com/th/id/OIP.hpFVH_Cl-wsj3oNVodDQjQHaHa?pid=ImgDet&rs=1'
    },
];


const listadoProductos = document.getElementById('listadoProductos');
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarProductos() {
listadoProductos.innerHTML = '';

const divRow = document.createElement('div');
divRow.classList.add('row', 'w-100');

for (const product of productos) {
    const divCard = document.createElement('div');
    divCard.classList.add('card', 'col-4');
    divCard.innerHTML = `
    <div class="card-body">
        <img src='${product.stockUrl}' class='card-img-top' >
        <h3>Nombre: ${product.nombre}</h3>
        <h3>Categoria: ${product.categoria}</h3>
        <p>Stock: ${product.stock}</p>
        <p>Precio: ${product.precio}</p>
    </div>
    <div class='card-footer'>
        <button class='btn btn-outline-dark w-100' onclick='agregarAlCarrito(${product.id})'>Agregar al carrito</button>
    </div>
    `;
    divRow.appendChild(divCard);
}

listadoProductos.appendChild(divRow);
}

mostrarProductos();

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
    alert(`Producto "${productoSeleccionado.nombre}" agregado al carrito.`);
}
}

// Mostrar el contenido del carrito
function mostrarCarrito() {
const carritoDiv = document.getElementById('carrito');
carritoDiv.innerHTML = '';

if (carrito.length === 0) {
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
    alert('Producto eliminado del carrito.');
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

// Mostrar el contenido del carrito 
document.getElementById('mostrarCarrito').addEventListener('click', mostrarCarrito);