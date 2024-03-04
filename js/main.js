//Segunda entrega || JavaScript
//Nicolás Giusepetti


//---SIMULADOR DE UNA TIENDA DE SUPLEMENTOS DEPORTIVOS---



// Lista de productos 
const productos = [
    { nombre: "Proteína en Polvo", precio: 25000, inventario: 12 },
    { nombre: "Creatina", precio: 26220, inventario: 15 },
    { nombre: "BCAA", precio: 22999.99, inventario: 8 },
    { nombre: "Pre-entrenamiento", precio: 17170, inventario: 5 },
    { nombre: "Multivitamínico", precio: 12627, inventario: 20 },
    { nombre: "Glutamina", precio: 19999.99, inventario: 12 },
    { nombre: "Omega 3", precio: 18899.99, inventario: 9 },
    { nombre: "Electrolitos", precio: 19054.99, inventario: 20 },
    { nombre: "Colágeno Hidrolizado", precio: 19600, inventario: 12 }
];

// Carrito de compras
const carrito = [];


//CÓDIGO EJECUTABLE
// Inicio Código ejecutable

let opcion;
do {
    opcion = prompt(`¡Bienvenido a la Tienda de Suplementos Deportivos! 
        Seleccione una opción:
        1. Ver catálogo de productos
        2. Realizar una compra
        3. Salir de la tienda`);

    switch (opcion) {
        case '1':
            verCatalogo();
            break;
        case '2':
            realizarCompra();
            break;
        case '3':
            alert("Gracias por visitar nuestra tienda. ¡Hasta luego!");
            break;
        default:
            alert("Opción inválida. Por favor, seleccione una opción válida.");
    }
} while (opcion !== '3');

// Fin Código ejecutable


// FUNCIONES
// Función para mostrar el catálogo de productos
function verCatalogo() {
    let catalogo = "Catálogo de Productos Disponibles:\n";
    productos.forEach(producto => {
        catalogo += `${producto.nombre} - Precio: $${producto.precio} - Disponibles: ${producto.inventario}\n`;
    });
    alert(catalogo);
}

// Función para realizar una compra
function realizarCompra() {
    let opcion;
    do {
        opcion = prompt(`Seleccione una opción:
        1. Agregar producto al carrito
        2. Mostrar carrito
        3. Eliminar producto del carrito
        4. Cancelar compra (vaciar carrito)
        5. Finalizar compra`);

        switch (opcion) {
            case '1':
                agregarProducto();
                break;
            case '2':
                mostrarCarrito();
                break;
            case '3':
                eliminarProducto();
                break;
            case '4':
                restaurarInventario();
                alert("Compra cancelada. Se ha restaurado el inventario.");
                break;
            case '5':
                if (carrito.length > 0) {
                    alert(`Gracias por su compra. Total a pagar: $${calcularTotal().toFixed(2)}`);
                } else {
                    alert("El carrito está vacío. No se puede finalizar la compra. Se le redireccionará al menú principal");
                }
                break;
            default:
                alert("Opción inválida. Por favor, seleccione una opción válida.");
        }
    } while (opcion !== '5');
}

// Función para restaurar el inventario en caso de cancelación de la compra
function restaurarInventario() {
    carrito.forEach(item => {
        let producto = productos.find(producto => producto.nombre === item.producto.nombre);
        producto.inventario += item.cantidad;
    });
    carrito.splice(0);
}

// Función para agregar productos al carrito
function agregarProducto() {
    // Mostramos los productos disponibles para que el usuario elija
    let opciones = "";
    productos.forEach((producto, index) => {
        opciones += `${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Disponibles: ${producto.inventario}\n`;
    });

    let opcion = parseInt(prompt(`Seleccione el número del producto que desea agregar al carrito:\n${opciones}`)) - 1;

    if (opcion >= 0 && opcion < productos.length) {
        let cantidadProducto = parseInt(prompt("Ingrese la cantidad:"));

        // Verificamos si hay suficiente inventario
        if (cantidadProducto <= productos[opcion].inventario) {
            // Agregamos el producto al carrito
            let productoExistente = carrito.find(item => item.producto === productos[opcion]);
            if (productoExistente) {
                productoExistente.cantidad += cantidadProducto;
            } else {
                carrito.push({ producto: productos[opcion], cantidad: cantidadProducto });
            }

            // Actualizamos el inventario
            productos[opcion].inventario -= cantidadProducto;

            alert("Producto agregado al carrito.");
        } else {
            alert("No hay suficiente inventario disponible para agregar esa cantidad del producto.");
        }
    } else {
        alert("Opción inválida.");
    }
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    let contenido = "Carrito de Compras:\n";

    if (carrito.length === 0) {
        contenido += "El carrito está vacío.";
    } else {
        carrito.forEach(item => {
            contenido += `${item.producto.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${(item.producto.precio * item.cantidad).toFixed(2)}\n`;
        });
        contenido += `Total: $${calcularTotal().toFixed(2)}`;
    }

    alert(contenido);
}

// Función para calcular el total de la compra
function calcularTotal() {
    let total = 0;
    carrito.forEach(item => {
        total += item.producto.precio * item.cantidad;
    });
    return total;
}

// Función para eliminar productos del carrito
function eliminarProducto() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. No hay productos para eliminar.");
        return;
    }

    let opciones = "";
    carrito.forEach((item, index) => {
        opciones += `${index + 1}. ${item.producto.nombre} - Cantidad: ${item.cantidad}\n`;
    });

    let opcion = parseInt(prompt(`Seleccione el número del producto que desea eliminar del carrito:\n${opciones}`)) - 1;

    if (!isNaN(opcion) && opcion >= 0 && opcion < carrito.length) {
        // Restauramos el inventario antes de eliminar el producto del carrito
        productos.find(producto => producto.nombre === carrito[opcion].producto.nombre).inventario += carrito[opcion].cantidad;
        carrito.splice(opcion, 1);
        alert("Producto eliminado del carrito.");
    } else {
        alert("Opción inválida.");
    }
}


