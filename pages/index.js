//PRIMERA ENTREGA DEL PROYECTO FINAL
// Nombre y apellido

let nombreIgresado = prompt("Ingrese su nombre").trim();
let apellidoIngresado = prompt("Ingrese su apelido").trim();

while (nombreIgresado === "" || apellidoIngresado === "") {
  alert("error: no ingresaste su nombre y apellido correctamente");
  nombreIgresado = prompt("Ingrese su nombre").trim();
  apellidoIngresado = prompt("Ingrese su apellido").trim();
}

alert("Su nombre es: " + nombreIgresado + " y su apellido es: " + apellidoIngresado);


// Edad
let condition = true
let edad = Number(prompt('Ingrese su edad: '))

while (condition) {
    if (edad >= 18) {
        alert('Bienvenido!')
        condition = false
    } else {
        alert('No puede ver esta pagina')
        edad = Number(prompt('Ingrese su edad nuevamente: '))
    }
}




//calculadora
function calculadora(numero1, numero2, operacion){
    switch(operacion){
        case '+':
            return numero1 + numero2
            break
        case '-':
            return numero1 - numero2
            break
        case '*':
            return numero1 * numero2
            break
        case '/':
            if (numero2 === 0) {
                return 'no se puede dividir por cero'
            }
            return numero1 / numero2
            break
            default:
                return 'Debe definir una operación correcta + - * / '
    }
}

let resultado = calculadora(10, 5, '*')
console.log(resultado)

//Calcular Iva

const CalcularIva = valorProducto => valorProducto * 0.21
const CalcularValorProducto = valor => {
    return valor + CalcularIva(valor)
}

console.log(CalcularValorProducto(100))



//SEGUNDA ENTREGA DEL PROYECTO FINAL

class ProductoPesca {
    constructor(nombre, tipo, precio, stock) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.precio = precio;
    this.stock = stock;
    }

    mostrarInformacion() {
    console.log("Nombre: " + this.nombre);
    console.log("Tipo: " + this.tipo);
    console.log("Precio: $" + this.precio);
    console.log("Stock disponible: " + this.stock);
    }

    calcularPrecioConIVA() {
      const precioConIVA = this.precio * 1.4;
    return precioConIVA;
    }
}

  // Creación de objetos 
let productos = [
    new ProductoPesca("Caña de pescar", "Cañas", 1500, 10),
    new ProductoPesca("Reel de pesca", "Reel", 1200, 5),
    new ProductoPesca("Señuelos", "Accesorios", 500, 20),
    new ProductoPesca("Anzuelos", "Anzuelos", 100, 50),
    new ProductoPesca("Tanza", "Accesorio de reel", 150, 40),
    new ProductoPesca("Caja de pesca", "Caja", 1500, 25),
    new ProductoPesca("Lineas variadas", "Linea", 200, 100),
];


let nombreProductoBuscado = prompt("Ingrese el nombre del producto a buscar:");

  // Buscar el producto en la lista de productos
let productoEncontrado = null;
for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre.toLowerCase() === nombreProductoBuscado.toLowerCase()) {
    productoEncontrado = productos[i];
    break;
    }
}


if (productoEncontrado !== null) {
    console.log("Producto encontrado:");
    productoEncontrado.mostrarInformacion();

    // Calcular el precio con IVA
    const precioConIVA = productoEncontrado.calcularPrecioConIVA();
    console.log("Precio con IVA: $" + precioConIVA.toFixed(2));
} else {
    console.log("Producto no encontrado.");
}