

//este seria el modelo de producto, podremos copiar pegar para crear mas 
// Objeto del producto 1
let producto1 = {
    nombre: 'Producto 1',
    precio: 20,
    cantidad: 1,
    inputId: 'quantity1'
};

// Objeto del producto 2
let producto2 = {
    nombre: 'Producto 2',
    precio: 15,
    cantidad: 1,
    inputId: 'quantity2'
};

// Objeto del producto 3
let producto3 = {
    nombre: 'Producto 3',
    precio: 25,
    cantidad: 1,
    inputId: 'quantity3'
};

// Objeto del producto 4
let producto4 = {
    nombre: 'Producto 4',
    precio: 30,
    cantidad: 1,
    inputId: 'quantity4'
};

// Array para almacenar productos en el carrito
let carrito = [];

// Función para mostrar el producto en el DOM, tener en cuenta que los productos ya estan en el 
//html de forma estatica por lo que esta funcion no seria necesaria en principio
/* function mostrarProducto(producto) {
    let productoContainer = document.getElementsByClassName("catalog");

    let productoHTML = `
    <div class="product">
      <h2>${producto.nombre}</h2>
      <p>quantity: ${producto.cantidad}</p>
      <p>Precio: $${producto.precio}</p>
      <button onclick="addToCart('${producto.nombre}', ${producto.precio}, '${producto.inputId}')">Agregar al Carrito</button>
    </div>
  `;
    // Agrega el HTML del producto al contenedor
    productoContainer.innerHTML += productoHTML;

    
} */


// Función para agregar un producto al carrito
function addToCart(productName, price, inputId) {
    let quantity = parseInt(document.getElementById(inputId).value);
    // Obtiene la cantidad del input
    if (quantity <= 0) {
        // Verifica si la cantidad es válida
        alert("La cantidad debe ser mayor que cero.");
        return;
    }
    carrito.push({ name: productName, price: price, quantity: quantity });
    // Agrega el producto al carrito la funcion la tenemos mas abajo
    updateCart();
    // Actualiza el carrito la funcion la tenemos mas abajo
    updateProductQuantity(inputId);
    // Actualiza la cantidad restante del producto la funcion la tenemos mas abajo
}

// Función para actualizar el carrito
function updateCart() {
    let cartItems = document.getElementById("cart");
    // Selecciona el elemento donde se mostrarán los productos en el carrito
    cartItems.innerHTML = "";
    // Limpia el contenido actual del carrito
    let total = 0;
    // Inicializa el total del carrito
    carrito.forEach(item => {
        // Itera sobre los productos en el carrito
        let subtotal = item.price * item.quantity;
        // Calcula el subtotal del producto
        total += subtotal;
        // Actualiza el total del carrito
        cartItems.innerHTML += `
                    <tr>
                        <td>${item.name}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>${item.quantity}</td>
                        <td>$${subtotal.toFixed(2)}</td>
                    </tr>
                `;
        // Agrega una fila para mostrar el producto en el carrito
    });
    document.getElementById("total").textContent = "$" + total.toFixed(2);
    // Actualiza el total del carrito en la página
}

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
function actualizarInterfaz() {
    let numProductosEnCarrito = carrito.length;
    let carritoElement = document.getElementById('total');

    // Actualizar la visualización del carrito
    carritoElement.textContent = `cart (${numProductosEnCarrito})`;
}

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