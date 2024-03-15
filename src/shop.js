let producto1 = {
    id: 1,
    nombre: 'ACCES WS EXC',
    image: '../assets/ACCES_WS_EXC.jpg',
    precio: 525.90,
    cantidad: 10,
    talla: { 'S': 4, 'M': 3, 'L': 3 }
};

let producto2 = {
    id: 2,
    nombre: 'REACTION PRO',
    image: '../assets/REACTION_PRO.jpg',
    precio: 615.50,
    cantidad: 20,
    talla: {'S': 6, 'M': 8, 'L': 6}
};

let producto3 = {
    id: 3,
    nombre: 'REACTION HYBRID RACE',
    image: '../assets/REACTION_HYBRID_RACE_750.jpg',
    precio: 625.30,
    cantidad: 10,
    talla: {'S': 3, 'M': 3, 'L': 4}

};

let producto4 = {
    id: 4,
    nombre: 'STEREO HYBRID 160 HPC',
    image: '../assets/STEREO_HYBRID_160_HPC_RACE.jpg',
    precio: 630.90,
    cantidad: 15,
    talla: {'S': 8, 'M': 4, 'L': 3}
};

let producto5 = {
    id: 5,
    nombre: 'AXIAL WS',
    image: '../assets/AXIAL_WS.jpg',
    precio: 715.90,
    cantidad: 8,
    inputId: 'quantity5',
    talla: {'S': 5, 'M': 5, 'L': 5}

};

let producto6 = {
    id: 6,
    nombre: 'AGREE RACE',
    image: '../assets/AGREE_RACE.jpg',
    precio: 735.5,
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
    })
};

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
            <button onclick="addToCart('${producto.nombre}', 'tallaSelect${producto.id}', ${producto.precio}, 'quantity${producto.id}')">Añadir</button>
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

let carrito = [];


function addToCart(productName, tallaSelectID, price, inputId) {
    let quantity = parseInt(document.getElementById(inputId).value);
    let tallaSelect = document.getElementById(tallaSelectID);
    let tallaSelected = tallaSelect.options[tallaSelect.selectedIndex].value;
   
    if (quantity <= 0) {
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
    updateCart();
    muestraTallasDisponibles(productObject);
    
}
function updateCart() {
    let cartItems = document.getElementById("cart");
    let cartTotal = document.getElementById("totalcarrito");
    cartItems.innerHTML = "";
    let total = 0;


    carrito.forEach((item, index) => {
        console.log(item)

        let subtotal = item.price * item.quantity;
        total += subtotal;

        let cantidadId = `cantidad${index}`;

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
    
function updateProductQuantity(inputId) {
    let quantityInput = document.getElementById(inputId);
    let remainingQuantity = parseInt(quantityInput.value);
    if (remainingQuantity > 0) {
        remainingQuantity--;
        quantityInput.value = remainingQuantity;
    }
}
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
 