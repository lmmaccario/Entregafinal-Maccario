// Nombre y apellido
let nombreIgresado = prompt('Ingrese su nombre')
let apellidoIngresado = prompt('Ingrese su apelido')

if ((nombreIgresado !== '') && (apellidoIngresado !== '')) {
    alert('Su nombre es: ' + nombreIgresado + ' y su apellido es: ' + apellidoIngresado)
} else {
    alert("error: no ingresaste su nombre y apellido")
    let nombreIgresado = prompt('Ingrese su nombre')
    let apellidoIngresado = prompt('Ingrese su apelido')
}


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



