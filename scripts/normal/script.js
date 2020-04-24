//////////////////////////////////////////////////////
// ****************** CONCESIONARIO ******************
// Función constructor de concesionario
class Concesionario {
    constructor(nombre, direccion) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.stockCoches = new Array();
        this.stockActivo = new Array();
    }
    // Obtiene el stock desde la base de datos mediante una llamada AJAX
    obtenerStock() {
        var stockCoches = [];
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Obtenemos el array de la base de datos
                stockCoches = this.responseText;
                Concesionario.prototype.guardarStock(stockCoches);
            }
        }

        xhttp.open("GET", "includes/cargar.inc.php", true);
        xhttp.send();
    }
    // Guarda el stock en el localstorage
    guardarStock(stockCoches) {
        // Guardamos el array en el localstorage
        localStorage.setItem("stockCoches", stockCoches);
    }
    // Carga el stock desde el localstorage
    cargarStock() {
        // Coge el array guardado en el localstorage
        var stockCoches = JSON.parse(localStorage.getItem("stockCoches"));

        // Convierte el array de objetos en un array de coches
        for (let i = 0; i < stockCoches.length; i++) {
            stockCoches[i] = new Coche(stockCoches[i].id, stockCoches[i].marca, stockCoches[i].modelo,
                stockCoches[i].kilometraje, stockCoches[i].precio, stockCoches[i].color,
                stockCoches[i].año, stockCoches[i].potencia, stockCoches[i].combustible);
        }

        // Lo establezco como la propiedad de la clase Concesionario
        this.stockCoches = stockCoches;
        this.stockActivo = stockCoches;
    }
    // Borra el stock
    borrarStock() {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Elimino el localstorage
                localStorage.removeItem("stockCoches");
                // Muestro el mensaje
                document.getElementById("formulario_mensajes").innerHTML = "<div class='msg msg__success' id='mensaje-eliminar'>" + this.responseText + "</div>";
            }
        }

        xhttp.open("POST", "includes/borrar.inc.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("borrar=1");
    }

    restablecerStock() {
        this.stockActivo = this.stockCoches.slice(0);
    }
}

/////////////////////////////////////////////////
// ****************** VEHÍCULO ******************
// Función constructor de vehículo
class Vehiculo {
    constructor(id, marca, modelo, kilometraje, precio) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.kilometraje = kilometraje;
        this.precio = precio;
    }
    precioSinIva(iva) {
        // Si no se le pasa el iva por parámetros, entonces cogerá la constantes IVA
        if (iva === undefined) {
            iva = IVA;
        }
        // Utilizo el método round de la clase Math para aproximar los números
        return Math.round(this.precio - (this.precio * iva / 100));
    }
}

///////////////////////////////////////////////
// ****************** COCHES ******************
// Función constructor de coche que hereda de vehículo
class Coche extends Vehiculo {
    constructor(id, marca, modelo, kilometraje, precio, color, año, potencia, combustible) {
        super(id, marca, modelo, kilometraje, precio);
        this.color = color;
        this.año = año;
        this.potencia = potencia;
        this.combustible = combustible;
    }
}

//////////////////////////////////////////////////
// ****************** CONSTANTES *****************

// Tabla de visualización
const TABLACOCHE = "tabla-coche";

// Tabla de búsqueda
const BUSQCOCHE = "busqueda-coche";

// Formulario de inserción
const FORMCOCHE = "formulario-coche";

// IVA
const IVA = 21;

//////////////////////////////////////////////////
// ****************** FUNCIONES ******************

////////////////////////////
/******* VISUALIZAR *******/

// Se encarga de gestionar la visualización dependiendo del tipo de vehículo, contenedor para visualizarlo y el objeto que se desea imprimir
function visualizarCoches(contenedor = TABLACOCHE) {
    var arr = concesionario.stockActivo;

    // Imprime una tabla en el área indicada, además de poder indicar un parámetro extra
    // en el que le pasamos el objeto a imprimir
    function tablaCoches(objeto) {
        var stockCoches = objeto;
        var tabla;

        // Función para poner la primera letra en mayúscula -> string.charAt(0).toUpperCase() + string.slice(1)
        // Si el array tiene elementos se prepara la tabla, en caso contrario se da un aviso para evitar pasar por el bucle
        if (stockCoches !== undefined && stockCoches.length > 0) {
            // Preparo la tabla como una cadena de texto
            tabla = "<table class='table table-bordered table-hover animated fadeIn'>" +
                "<thead class='thead-light text-center'><tr><th>Marca</th><th>Modelo</th><th>Color</th><th>Año</th><th>Potencia</th><th>Combustible</th><th>Kilometraje</th><th>Precio sin IVA</th><th>Precio</th></tr></thead>" +
                "<tbody class='text-center'>";
            for (var i = 0; i < stockCoches.length; i++) {
                tabla += "<tr class='coche' data-id='" + stockCoches[i].id + "'>";
                tabla += "<td>" + stockCoches[i].marca + "</td>";
                tabla += "<td>" + stockCoches[i].modelo + "</td>";
                tabla += "<td>" + stockCoches[i].color + "</td>";
                tabla += "<td>" + stockCoches[i].año + "</td>";
                tabla += "<td>" + stockCoches[i].potencia + "cv" + "</td>";
                tabla += "<td>" + stockCoches[i].combustible + "</td>";
                tabla += "<td>" + stockCoches[i].kilometraje + "km" + "</td>";
                tabla += "<td>" + stockCoches[i].precioSinIva(IVA) + "€" + "</td>";
                tabla += "<td>" + stockCoches[i].precio + "€" + "</td>";
                tabla += "</tr>";
            }
            tabla += "</tbody></table>";
        } else {
            tabla = "<div class='alert alert-warning animated flash delay-1s fade show p-4 mt-4' role='alert'>" +
                "<div class='text-center'><h4 class='alert-heading text-center'>No se han encontrado coches, puede introducirlos <a href='formulario.php' style='text-decoration:none; font-size:100%'>aquí</a></h4></div>" +
                "</div>";
        }
        // Devuelvo la tabla ya creada
        return tabla;
    }

    // Imprimo el contenido en el contenedor correspondiente
    document.getElementById(contenedor).innerHTML = tablaCoches(arr);

}

/////////////////////////
/******* ORDENAR *******/

// Ordena los elementos de un array de objetos por sus propiedades.
// Los cambios no son permanentes ya que se trabaja desde una copia del array y no desde
// el array original
function ordenarCoches(opcion) {
    var stockCoches = concesionario.stockActivo;

    if (stockCoches.length > 0) {
        // Según el valor pasado por el parámetro opcion, ordenará de una forma determinada
        switch (opcion) {
            // Si dos coches tienen el mismo precio entonces se ordenará por potencia
            case "precio-":
                stockCoches.sort(function (a, b) {
                    return b.precio - a.precio || b.potencia - a.potencia;
                });
                break;
            case "precio+":
                stockCoches.sort(function (a, b) {
                    return a.precio - b.precio || a.potencia - b.potencia;
                });
                break;
            // Si dos coches tienen el mismo kilometraje (algo bastante improbable) se ordernará por precio
            case "kilometraje-":
                stockCoches.sort(function (a, b) {
                    return b.kilometraje - a.kilometraje || b.precio - a.precio;
                });
                break;
            case "kilometraje+":
                stockCoches.sort(function (a, b) {
                    return a.kilometraje - b.kilometraje || a.precio - b.precio;
                });
                break;
            // Si dos coches tienen la misma potencia entonces se ordenará por precio
            case "potencia-":
                stockCoches.sort(function (a, b) {
                    return b.potencia - a.potencia || b.precio - a.precio;
                });
                break;
            case "potencia+":
                stockCoches.sort(function (a, b) {
                    return a.potencia - b.potencia || a.precio - b.precio;
                });
                break;
            // Si dos coches tienen el mismo año entonces se ordenará por precio
            case "año-":
                stockCoches.sort(function (a, b) {
                    return b.año - a.año || b.precio - a.precio;
                });
                break;
            case "año+":
                stockCoches.sort(function (a, b) {
                    return a.año - b.año || a.precio - b.precio;
                });
                break;
            // Si dos coches tienen el mismo combustible se ordernará por marca
            case "combustible":
                stockCoches.sort(function (a, b) {
                    var x = a.combustible.toLowerCase();
                    var y = b.combustible.toLowerCase();
                    var w = a.marca.toLowerCase();
                    var z = b.marca.toLowerCase();

                    return x < y ? -1 : x > y ? 1 : 0 || w < z ? -1 : w > z ? 1 : 0;
                });
                break;
            // Si dos coches tienen la misma marca entonces se ordenará por modelo
            case "marca":
                stockCoches.sort(function (a, b) {
                    var x = a.marca.toLowerCase();
                    var y = b.marca.toLowerCase();
                    var w = a.modelo.toLowerCase();
                    var z = b.modelo.toLowerCase();

                    return x < y ? -1 : x > y ? 1 : 0 || w < z ? -1 : w > z ? 1 : 0;
                });
                break;
            default:
                return false;
        }
    }

    // Establezco el stock activo
    concesionario.stockActivo = stockCoches;

    // Visualizo el array stockActivo
    visualizarCoches(TABLACOCHE);
}

//////////////////////////

/******* BÚSQUEDA *******/

// Busca por marca y modelo todos los vehículos que coinciden con los datos introducidos en el formulario de búsqueda
function busquedaCoche() {
    // Variables
    var resultado = [];
    var encontrado = false;
    var contenedor = BUSQCOCHE;
    var stock = concesionario.stockCoches;
    var boton = "<a href='busqueda.html'><button class='btn btn-secondary my-1'>Atrás</button></a>";

    // Obtengo los valores introducidos en los campos de texto
    var marca = document.forms["formulario-busqueda-coche"]["marca"].value;
    var modelo = document.forms["formulario-busqueda-coche"]["modelo"].value;

    // Hago las comprobaciones correspondientes
    // La expresión regular testea si la string está vacía o si tiene sólo espacios devolviendo false en caso de cumplirse -> /^(?!\s*$).+/.test(string)
    if (/^(?!\s*$).+/.test(marca) && modelo === "" || modelo === "*") {
        stock.forEach(element => {
            if (marca.toLowerCase() === element.marca.toLowerCase()) {
                resultado.push(element);
                encontrado = true;
            }
        });

        // Si se ha introducido marca y modelo
    } else if (/^(?!\s*$).+/.test(marca) && /^(?!\s*$).+/.test(modelo)) {
        stock.forEach(element => {
            if (marca.toLowerCase() === element.marca.toLowerCase()) {
                if (modelo.toLowerCase() === element.modelo.toLowerCase()) {
                    resultado.push(element);
                    encontrado = true;
                }
            }
        });
    } else {
        alert("¡Rellena al menos el campo marca para poder realizar la búsqueda!");
        return false;
    }

    // Establezco el stock activo
    concesionario.stockActivo = resultado.slice(0);

    // Visualiza la tabla con los objetos encontrados
    if (encontrado) {
        visualizarCoches(contenedor);
    } else {
        var mensajeAlerta = "<div class='alert alert-warning animated flash fade show p-4' role='alert'>" +
            "<div class='text-center'><h4>Advertencia</h4><h5 class='alert-heading'>No se han encontrado coincidencias, vuelva a intentarlo</h5></div>" +
            "</div>";
        document.getElementById(contenedor).innerHTML = mensajeAlerta;
    }

    // Imprime el botón de atrás correspondiente
    document.getElementById("boton-atras").innerHTML = boton;
}

////////////////////////////////////////
/******* MENÚ LATERAL INSERCIÓN *******/
function contarVehiculos() {
    numeroCoches = concesionario.stockCoches.length;
    var texto;

    if (numeroCoches == 0) {
        texto = "<h6>Ningún coche</h6>";
    } else if (numeroCoches == 1) {
        texto = "<h6>" + numeroCoches + " coche </h6>";
    } else {
        texto = "<h6>" + numeroCoches + " coches </h6>";
    }

    // Imprime en pantalla el número de vehículos
    document.getElementById("numero-vehiculos").innerHTML = texto;
}

// Borra el stock entero
function borrarTodo() {
    if (confirm("¿Estás seguro que desea vaciar el stock de vehículos?")) {
        // Elimina todo
        concesionario.borrarStock();
    } else {
        // No hace nada
    }
}

/////////////////////////
/******* FILTRAR *******/

// Establece los valores máximos y mínimos de los sliders del menú de filtrar coches
function establecerValoresCoche() {
    // Establezco los valores mínimos y máximos de los sliders

    // Precio
    var sliderPrecio = document.getElementById("filtro-coche-precio");
    let mayorPrecio = Math.max.apply(Math, concesionario.stockCoches.map(function (o) { return o.precio; }));
    let menorPrecio = Math.min.apply(Math, concesionario.stockCoches.map(function (o) { return o.precio; }));

    sliderPrecio.setAttribute("min", menorPrecio);
    sliderPrecio.setAttribute("max", mayorPrecio);
    sliderPrecio.setAttribute("value", (menorPrecio + mayorPrecio) / 2);

    // Kilometraje
    var sliderKilometraje = document.getElementById("filtro-coche-kilometraje");
    let mayorKilometraje = Math.max.apply(Math, concesionario.stockCoches.map(function (o) { return o.kilometraje; }));
    let menorKilometraje = Math.min.apply(Math, concesionario.stockCoches.map(function (o) { return o.kilometraje; }));

    sliderKilometraje.setAttribute("min", menorKilometraje);
    sliderKilometraje.setAttribute("max", mayorKilometraje);
    sliderKilometraje.setAttribute("value", (menorKilometraje + mayorKilometraje) / 2);

    // Potencia
    var sliderPotencia = document.getElementById("filtro-coche-potencia");
    let mayorPotencia = Math.max.apply(Math, concesionario.stockCoches.map(function (o) { return o.potencia; }));
    let menorPotencia = Math.min.apply(Math, concesionario.stockCoches.map(function (o) { return o.potencia; }));

    sliderPotencia.setAttribute("min", menorPotencia);
    sliderPotencia.setAttribute("max", mayorPotencia);
    sliderPotencia.setAttribute("value", (menorPotencia + mayorPotencia) / 2);

    // Mostramos todos los valores
    mostrarValoresSliderCoche();
}

// Establece los valores del slider en el menú de filtrar coches
function mostrarValoresSliderCoche() {
    // Precio
    var outputPrecio = document.getElementById("valor-filtro-coche-precio");
    var sliderPrecio = document.getElementById("filtro-coche-precio");
    outputPrecio.innerHTML = sliderPrecio.value + "€";

    // Kilometraje
    var outputKilometraje = document.getElementById("valor-filtro-coche-kilometraje");
    var sliderKilometraje = document.getElementById("filtro-coche-kilometraje");
    outputKilometraje.innerHTML = sliderKilometraje.value + "km";

    // Potencia
    var outputPotencia = document.getElementById("valor-filtro-coche-potencia");
    var sliderPotencia = document.getElementById("filtro-coche-potencia");
    outputPotencia.innerHTML = sliderPotencia.value + "cv";
}

// Filtra los coches que cumplan con los requisitos
function filtradoCoches() {
    var resultado = [];

    // Obtenemos los valores de los sliders
    var precioMax = parseInt(document.getElementById("filtro-coche-precio").value);
    var kilometrajeMax = parseInt(document.getElementById("filtro-coche-kilometraje").value);
    var potenciaMax = parseInt(document.getElementById("filtro-coche-potencia").value);
    var combustible = document.querySelector('input[name="combustible"]:checked').value;

    // Si cumple los requisitos recogidos en el filtro entonces se guarda en el array resultado
    concesionario.stockCoches.forEach(coche => {
        if (combustible === "*") {
            if (coche.precio <= precioMax && coche.kilometraje <= kilometrajeMax && coche.potencia <= potenciaMax) {
                resultado.push(coche);
            }
        } else {
            if (coche.precio <= precioMax && coche.kilometraje <= kilometrajeMax && coche.potencia <= potenciaMax && coche.combustible === combustible) {
                resultado.push(coche);
            }
        }
    });

    // Establezco el stock activo
    concesionario.stockActivo = resultado.slice(0);

    // Se visualiza el array stockActivo
    visualizarCoches(TABLACOCHE);
}

// Restablecer eliminando filtros
function restablecer() {
    // Restablezco el array activo
    concesionario.restablecerStock();
    // Visualizo el resultado
    visualizarCoches(TABLACOCHE);
}

//////////////////////////////////////////////////////
// ****************** INSTANCIACIÓN ******************

// Instancia de la clase Concesionario por defecto
var concesionario = new Concesionario("Sport motors", "Avenida del Alisal, 89, Palencia (España)");

// Carga los coches
concesionario.obtenerStock();
concesionario.cargarStock();

// Instancias de la clase Coche
var coche1 = new Coche("Audi", "S3", "Gris/plata", 2018, 300, "Gasolina", 56039, 55275);
var coche2 = new Coche("Ford", "Fiesta ST", "Azul", 2019, 200, "Gasolina", 25980, 23590);
var coche3 = new Coche("Hyundai", "i30N", "Blanco", 2019, 250, "Gasolina", 23560, 33950);
var coche4 = new Coche("Renault", "Megane RS", "Amarillo", 2019, 280, "Gasolina", 27970, 32520);
var coche5 = new Coche("Peugeot", "508", "Rojo", 2018, 131, "Diésel", 34510, 27450);


/////////////////////////////////////////////
// ****************** IIFE ******************

// Expresión de función ejecutada inmediatamente (IIFE) que pone los datos del concesionario actual en el pie de página
(function (nombre, direccion) {
    document.getElementById("info-concesionario").textContent = nombre + " | " + direccion;
})(concesionario.nombre, concesionario.direccion);

// Expresión de función ejecutada inmediatamente (IIFE) que pone el año actual en el pie de página
(function () {
    var date = new Date();
    document.getElementById("year").textContent = date.getFullYear();
})();