let producto1 = {
    id: 1,
    nombre: 'ACCES WS EXC',
    image: '../assets/REACTION_HYBRID_RACE_750.jpg',
    precio: 20,
    cantidad: 10,
    talla: { 'S': 4, 'M': 3, 'L': 3 }
};

let producto2 = {
    id: 2,
    nombre: 'REACTION PRO',
    image: '../assets/REACTION_HYBRID_RACE_750.jpg',
    precio: 15,
    cantidad: 20,
    talla: {'S': 6, 'M': 8, 'L': 6}
};

let producto3 = {
    id: 3,
    nombre: 'REACTION HYBRID RACE',
    image: '../assets/REACTION_HYBRID_RACE_750.jpg',
    precio: 25,
    cantidad: 10,
    talla: {'S': 3, 'M': 3, 'L': 4}

};

let producto4 = {
    id: 4,
    nombre: 'STEREO HYBRID 160 HPC RACE',
    image: '../assets/REACTION_HYBRID_RACE_750.jpg',
    precio: 30,
    cantidad: 15,
    talla: {'S': 8, 'M': 4, 'L': 3}
};

let producto5 = {
    id: 5,
    nombre: 'AXIAL WS',
    image: '../assets/REACTION_HYBRID_RACE_750.jpg',
    precio: 15,
    cantidad: 8,
    inputId: 'quantity5',
    talla: {'S': 5, 'M': 5, 'L': 5}

};

let producto6 = {
    id: 6,
    nombre: 'AGREE RACE',
    image: '../assets/REACTION_HYBRID_RACE_750.jpg',
    precio: 35,
    cantidad: 8,
    inputId: 'quantity6',
    talla: {'S': 0, 'M': 4, 'L': 4}
};

const productos = [
    producto1,
    producto2,
    producto3,
    producto4,
    producto5,
    producto6,
];

function actualizarTallasDisponibles(producto) {
    let tallasDisponiblesElement = document.getElementById(`tallasDisponibles${producto.id}`);
    tallasDisponiblesElement.innerHTML = "Tallas disponibles: ";

    for (let talla in producto.talla) {
        if (producto.talla.hasOwnProperty(talla) && producto.talla[talla] > 0) {
            tallasDisponiblesElement.innerHTML += `${talla} (${producto.talla[talla]}), `;
        }
    }
}

window.onload = function () {
    productos.forEach(producto => {
        mostrarProducto(producto);
        // actualizarTallasDisponibles(producto);
    })
};

// {
//     nombre: string;
//     image: string;
//     precio: number;
//     cantidad: number;
//     inputId: string;
//     talla: { S: number; M: number; L: number}
// }
function mostrarProducto(producto) {
    const catalog = document.getElementsByClassName("catalog")[0];

    const htmlProducto = `
        <div class="product">
            <h3>${producto.nombre}</h3>
            <img src="${producto.image}" alt="">
            <p>Precio: €${producto.precio}</p>
            <div id="cantidad3">
                <label for="quantity">Cantidad:</label>
                <input type="number" id="quantity${producto.id}" name="quantity" value="1"> <br>
                <label for="tallaSelect${producto.id}">Talla:</label>
                <select id="tallaSelect${producto.id}">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>
            <button onclick="addToCart('${producto.nombre}', 'tallaSelect${producto.id}', ${producto.precio}, 'quantity${producto.id}')">Agregar al Carrito</button>
            </div>
            <div id="tallasDisponibles${producto.id}">
                
            </div>
        </div>
    `;

    catalog.innerHTML += htmlProducto;

    muestraTallasDisponibles(producto);
}

function muestraTallasDisponibles(producto) {
    const tallasContenedor = document.getElementById(`tallasDisponibles${producto.id}`)

    tallasContenedor.innerHTML = `
    <table>
        <thead>
            <tr><td>Talla</td> <td>Cantidad</td></tr>
        </thead>
        <tbody>
            <tr><td>S</td> <td>${producto.talla.S}</td> </tr>
            <tr><td>M</td> <td>${producto.talla.M}</td> </tr>
            <tr><td>L</td> <td>${producto.talla.L}</td> </tr>
        </tbody>
    </table>
    `;
}

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

        const productObject = productos.find((producto) => {return producto.nombre === productName});

        if (!productObject){
            alert('Producto no encontrado');
            return; 
        }

        if (quantity > productObject.talla[tallaSelected]) {
            alert('No hay suficiente stock disponible para la talla seleccionada.');
            return;
        }

    productObject.talla[tallaSelected] -= quantity;

    carrito.push({ name: productName, talla: tallaSelected, price: price, quantity: quantity, id: productObject.id });
    // Agrega el producto al carrito
    updateCart();
    // Actualiza el carrito
    muestraTallasDisponibles(productObject);
    
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
        console.log(item)

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
                <td><button onclick="removeFromCart(${index}, ${item.id}, '${item.talla}')">Eliminar</button></td>
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
    function removeFromCart(index, productoId, tallaSelected) {
        const productObject = productos.find((producto) => {return producto.id === productoId});
        productObject.talla[tallaSelected]++;
        muestraTallasDisponibles(productObject);

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
