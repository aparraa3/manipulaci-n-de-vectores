
"use strict";

// Vector global que almacena los números.
let vector = [];

// Función para obtener elementos HTML por su identificador.
const $ = id => document.getElementById(id);

// Obtiene la dimensión seleccionada.
const dimension = () =>
    Number($("select-dimension-arreglo").value);

// Muestra el resultado en el campo correspondiente.
const respuesta = mensaje => {
    $("id-txt-respuesta").value = mensaje;
};

// Dibuja los índices y valores del vector en la tabla.
function dibujarVector() {
    const n = dimension();

    $("encabezado-vector").colSpan = n;
    $("encabezado-vector").textContent =
        `Vector numérico de ${n} elementos`;

    const filaIndices = $("fila-indices");
    const filaValores = $("fila-valores");

    filaIndices.innerHTML = "";
    filaValores.innerHTML = "";

    for (let i = 0; i < n; i++) {
        const celdaIndice = document.createElement("td");
        celdaIndice.textContent = i;
        filaIndices.appendChild(celdaIndice);

        const celdaValor = document.createElement("td");
        celdaValor.textContent =
            vector.length === n ? vector[i] : 0;

        filaValores.appendChild(celdaValor);
    }
}

// Comprueba que el vector no esté vacío.
function validarVector() {
    if (vector.length === 0) {
        respuesta("Primero debe cargar el vector.");
        return false;
    }

    return true;
}

// Carga números aleatorios entre 1 y 99.
function cargarVector() {
    vector = [];

    for (let i = 0; i < dimension(); i++) {
        const numero = Math.floor(Math.random() * 99) + 1;
        vector.push(numero);
    }

    dibujarVector();

    respuesta(
        `Vector cargado: [${vector.join(", ")}]`
    );
}

// Vacía el vector.
function vaciarVector() {
    vector = [];
    dibujarVector();
    respuesta("El vector está vacío.");
}

// Busca todas las posiciones de un número.
function posicionesDe(valor) {
    const posiciones = [];

    for (let i = 0; i < vector.length; i++) {
        if (vector[i] === valor) {
            posiciones.push(i);
        }
    }

    return posiciones;
}

// Busca un valor ingresado por el usuario.
function buscarValor() {
    if (!validarVector()) return;

    const texto = $("id-valor-busqueda").value.trim();

    if (texto === "") {
        respuesta("Ingrese un número para buscar.");
        return;
    }

    const valor = Number(texto);
    const posiciones = posicionesDe(valor);

    if (posiciones.length > 0) {
        respuesta(
            `Valor encontrado: ${valor}. Posición(es): ${posiciones.join(", ")}.`
        );
    } else {
        respuesta(`El valor ${valor} no se encuentra en el vector.`);
    }
}

// Encuentra el número mayor o menor y sus posiciones.
function extremo(tipo) {
    if (!validarVector()) return;

    let valor;

    if (tipo === "mayor") {
        valor = Math.max(...vector);
    } else {
        valor = Math.min(...vector);
    }

    const posiciones = posicionesDe(valor);

    respuesta(
        `Valor ${tipo === "mayor" ? "máximo" : "mínimo"}: ${valor}. Posición(es): ${posiciones.join(", ")}.`
    );
}

// Suma todos los elementos del vector.
function sumarValores() {
    if (!validarVector()) return;

    let suma = 0;

    for (let i = 0; i < vector.length; i++) {
        suma += vector[i];
    }

    respuesta(`Suma total: ${suma}.`);
}

// Multiplica todos los elementos del vector.
function productoValores() {
    if (!validarVector()) return;

    let producto = 1n;

    for (let i = 0; i < vector.length; i++) {
        producto *= BigInt(vector[i]);
    }

    respuesta(`Producto total: ${producto.toString()}.`);
}

// Calcula la media aritmética.
function calcularMedia() {
    if (!validarVector()) return;

    let suma = 0;

    for (let i = 0; i < vector.length; i++) {
        suma += vector[i];
    }

    const media = suma / vector.length;

    respuesta(`Media aritmética: ${media.toFixed(2)}.`);
}

// Calcula la mediana del vector.
function calcularMediana() {
    if (!validarVector()) return;

    const ordenado = [...vector].sort((a, b) => a - b);
    const mitad = Math.floor(ordenado.length / 2);

    let mediana;

    if (ordenado.length % 2 === 0) {
        mediana =
            (ordenado[mitad - 1] + ordenado[mitad]) / 2;
    } else {
        mediana = ordenado[mitad];
    }

    respuesta(`Mediana: ${mediana}.`);
}

// Calcula la moda del vector.
function calcularModa() {
    if (!validarVector()) return;

    const frecuencias = {};

    for (let i = 0; i < vector.length; i++) {
        const numero = vector[i];
        frecuencias[numero] = (frecuencias[numero] || 0) + 1;
    }

    let frecuenciaMaxima = 0;

    for (const numero in frecuencias) {
        if (frecuencias[numero] > frecuenciaMaxima) {
            frecuenciaMaxima = frecuencias[numero];
        }
    }

    if (frecuenciaMaxima === 1) {
        respuesta("No hay moda: ningún número se repite.");
        return;
    }

    const modas = [];

    for (const numero in frecuencias) {
        if (frecuencias[numero] === frecuenciaMaxima) {
            modas.push(Number(numero));
        }
    }

    respuesta(
        `Moda(s): ${modas.join(", ")}. Frecuencia: ${frecuenciaMaxima}.`
    );
}

// Calcula la desviación estándar poblacional.
function calcularDesviacion() {
    if (!validarVector()) return;

    let suma = 0;

    for (let i = 0; i < vector.length; i++) {
        suma += vector[i];
    }

    const media = suma / vector.length;
    let sumaCuadrados = 0;

    for (let i = 0; i < vector.length; i++) {
        sumaCuadrados += (vector[i] - media) ** 2;
    }

    const varianza = sumaCuadrados / vector.length;
    const desviacion = Math.sqrt(varianza);

    respuesta(
        `Desviación estándar poblacional: ${desviacion.toFixed(2)}.`
    );
}

// Encuentra el segundo mayor o menor distinto.
function segundoExtremo(tipo) {
    if (!validarVector()) return;

    const valoresUnicos = [...new Set(vector)]
        .sort((a, b) => a - b);

    if (valoresUnicos.length < 2) {
        respuesta("No existen dos valores distintos.");
        return;
    }

    let valor;

    if (tipo === "mayor") {
        valor = valoresUnicos[valoresUnicos.length - 2];
    } else {
        valor = valoresUnicos[1];
    }

    respuesta(`Segundo ${tipo} distinto: ${valor}.`);
}

// Ordena los elementos mediante el método de selección.
function ordenarSeleccion() {
    if (!validarVector()) return;

    const ascendente = $("select-orden").value === "asc";
    const arr = [...vector];

    for (let i = 0; i < arr.length - 1; i++) {
        let posicion = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (
                ascendente
                    ? arr[j] < arr[posicion]
                    : arr[j] > arr[posicion]
            ) {
                posicion = j;
            }
        }

        const temporal = arr[i];
        arr[i] = arr[posicion];
        arr[posicion] = temporal;
    }

    vector = arr;
    dibujarVector();

    respuesta(
        `Ordenado por selección (${ascendente ? "ascendente" : "descendente"}): [${vector.join(", ")}].`
    );
}

// Ordena los elementos mediante el método burbuja.
function ordenarBurbuja() {
    if (!validarVector()) return;

    const ascendente = $("select-orden").value === "asc";
    const arr = [...vector];

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            const debeIntercambiar = ascendente
                ? arr[j] > arr[j + 1]
                : arr[j] < arr[j + 1];

            if (debeIntercambiar) {
                const temporal = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temporal;
            }
        }
    }

    vector = arr;
    dibujarVector();

    respuesta(
        `Ordenado por burbuja (${ascendente ? "ascendente" : "descendente"}): [${vector.join(", ")}].`
    );
}

// Conecta los botones con sus respectivas funciones.
$("btn-cargar-vector").addEventListener("click", cargarVector);
$("btn-vaciar-vector").addEventListener("click", vaciarVector);
$("btn-buscar-valor").addEventListener("click", buscarValor);

$("btn-numero-mayor").addEventListener(
    "click", () => extremo("mayor")
);

$("btn-numero-menor").addEventListener(
    "click", () => extremo("menor")
);

$("btn-sumar-valores").addEventListener("click", sumarValores);
$("btn-producto-vector").addEventListener("click", productoValores);
$("btn-calcular-moda").addEventListener("click", calcularModa);
$("btn-calcular-media").addEventListener("click", calcularMedia);
$("btn-calcular-mediana").addEventListener("click", calcularMediana);

$("btn-desviacion").addEventListener(
    "click", calcularDesviacion
);

$("btn-segundo-mayor").addEventListener(
    "click", () => segundoExtremo("mayor")
);

$("btn-segundo-menor").addEventListener(
    "click", () => segundoExtremo("menor")
);

$("btn-seleccion").addEventListener(
    "click", ordenarSeleccion
);

$("btn-burbuja").addEventListener(
    "click", ordenarBurbuja
);

// Reinicia el vector cuando se cambia su dimensión.
$("select-dimension-arreglo").addEventListener("change", () => {
    vector = [];
    dibujarVector();
    respuesta("Dimensión cambiada. Cargue nuevamente el vector.");
});

// Dibuja la tabla al iniciar la página.
dibujarVector();
