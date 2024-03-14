
let producto1 = {
    nombre: 'ACCES WS EXC',
    precio: 20,
    cantidad: 10,
    inputId: 'quantity1',
    talla: { 'S': 4, 'M': 3, 'L': 3 }

};

let producto2 = {
    nombre: 'REACTION PRO',
    precio: 15,
    cantidad: 20,
    inputId: 'quantity2',
    talla: {'S': 6, 'M': 8, 'L': 6}

};

let producto3 = {
    nombre: 'REACTION HYBRID RACE',
    precio: 25,
    cantidad: 10,
    inputId: 'quantity3',
    talla: {'S': 3, 'M': 3, 'L': 4}

};

let producto4 = {
    nombre: 'STEREO HYBRID 160 HPC RACE',
    precio: 30,
    cantidad: 15,
    inputId: 'quantity4',
    talla: {'S': 8, 'M': 4, 'L': 3}

};

let producto5 = {
    nombre: 'AXIAL WS',
    precio: 15,
    cantidad: 8,
    inputId: 'quantity5',
    talla: {'S': 5, 'M': 5, 'L': 5}

};

let producto6 = {
    nombre: 'AGREE RACE',
    precio: 35,
    cantidad: 8,
    inputId: 'quantity6',
    talla: {'S': 0, 'M': 4, 'L': 4}

};

// Array para almacenar productos en el carrito
let carrito = [];


// Función para agregar un producto al carrito. Verificamos talla y stock
function addToCart(productName, tallaSelectID, price, inputId) {
    let quantity = parseInt(document.getElementById(inputId).value);
    let tallaSelect = document.getElementById(tallaSelectID);
    let tallaSelected = tallaSelect.options[tallaSelect.selectedIndex].value;
   
    // Obtiene la cantidad del input
    if (quantity <= 0) {
        // Verifica si la cantidad es válida
        alert("La cantidad debe ser mayor que cero.");   
        return;
    }
        let productObject;
        switch (productName) {
            case 'ACCES WS EXC':
                productObject = producto1;
                break;
            case 'REACTION PRO':
                productObject = producto2;
                break;
            case 'REACTION HYBRID RACE':
                productObject = producto3;
                break;
            case 'STEREO HYBRID 160 HPC RACE':
                productObject = producto4;
                break;
            case 'AXIAL WS':
                productObject = producto5;
                break;
            case 'AGREE RACE':
                productObject = producto6;
                break;
            default:
                alert('Producto no encontrado');
                return;
        }

        if (quantity > productObject.talla[tallaSelected]) {
            alert('No hay suficiente stock disponible para la talla seleccionada.');
            return;
        }

    productObject.talla[tallaSelected] -= quantity;

    carrito.push({ name: productName, talla: tallaSelected, price: price, quantity: quantity });
    // Agrega el producto al carrito
    updateCart();
    // Actualiza el carrito
    updateProductQuantity(inputId);
    
}
// Función para actualizar el carrito
function updateCart() {
    let cartItems = document.getElementById("cart");
    let cartTotal = document.getElementById("totalcarrito");
    // Selecciona el elemento donde se mostrarán los productos en el carrito
    cartItems.innerHTML = "";
    // Limpia el contenido actual del carrito
    let total = 0;


    carrito.forEach((item, index) => {
        // Itera sobre los productos en el carrito
        let subtotal = item.price * item.quantity;
        // Calcula el subtotal del producto
        total += subtotal;

        let cantidadId = `cantidad${index}`;

        // Actualiza el total del carrito
        cartItems.innerHTML +=
            `<tr>
                <td>${item.name}</td>
                <td>${item.talla}</td>
                <td>${item.price.toFixed(2)} €</td>
                <td id="${cantidadId}">${item.quantity}</td>
                <td>${subtotal.toFixed(2)} €</td>
                <td><button onclick="removeFromCart(${index})">Eliminar</button></td>
            </tr>`
            ;
    });

    cartTotal.innerHTML = 'Total: €' + total.toFixed(2);
    console.log(total);
}
    
    // Actualiza el total del carrito en la página

// Función para actualizar la cantidad restante del producto
// Esta función toma como argumento el ID del input donde se ingresa la cantidad del producto.
function updateProductQuantity(inputId) {
    let quantityInput = document.getElementById(inputId);
    let remainingQuantity = parseInt(quantityInput.value);
    if (remainingQuantity > 0) {
        remainingQuantity--;
        quantityInput.value = remainingQuantity;
    }
}
// Función para actualizar la interfaz de usuario
/* function actualizarInterfaz() {
    let numProductosEnCarrito = carrito.length;
    let carritoElement = document.getElementById('total'); */

    // Actualizar la visualización del carrito
/*     carritoElement.textContent = `cart (${numProductosEnCarrito})`;
} */

// Llama a la función para mostrar el producto cuando se cargue la página
/* window.onload = function () {
    mostrarProducto(producto1);
    mostrarProducto(producto2);
    mostrarProducto(producto3);
    mostrarProducto(producto4);
};
 */

//funcion para que el boton home te lleve de nuevo a la landing page
/* document.addEventListener("DOMContentLoaded", function () {
    // Código que interactúa con los elementos del DOM
    document.getElementById("button-home").addEventListener("click", function () {
        window.location.href = "landing_page.html"; // Cambia "landing_page.html" con tu URL de la landing page
    });
}); */


// Función para eliminar un producto del carrito
    function removeFromCart(index) {
        carrito[index].quantity--;

        let cantidadId = `cantidad${index}`;

        updateProductQuantity(cantidadId);

        if (carrito[index].quantity === 0) {
            carrito.splice(index, 1);
        }

        updateCart();
    }
    // Elimina el producto del carrito en la posición del índice especificado
/*     carrito.splice(index, 1);
 */    // Actualiza el carrito después de eliminar el producto
