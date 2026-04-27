// 1. Selección de elementos del DOM
const btnCargar = document.getElementById('btnCargar');
const contenedor = document.getElementById('resultados');
const inputBusqueda = document.getElementById('inputBusqueda');

// 2. Función principal asíncrona (Requisito: Asincronía)
async function obtenerPersonajes() {
    // Obtener el valor del buscador
    const nombrePersona = inputBusqueda.value.trim();
    
    // Mostrar mensaje de carga al usuario
    contenedor.innerHTML = '<p class="mensaje">Buscando en el archivo de la Orden Jedi...</p>';

    // Construir la URL (Si hay búsqueda, usamos el parámetro ?search=)
    // Esto conecta la API con tu página
    let url = 'https://swapi.dev/api/people/';
    if (nombrePersona) {
        url = `https://swapi.dev/api/people/?search=${nombrePersona}`;
    }

    try {
        // Realizar la petición a la API
        const respuesta = await fetch(url);

        // Validar si la respuesta es correcta
        if (!respuesta.ok) {
            throw new Error('No se pudo establecer conexión con la galaxia.');
        }

        // Convertir la respuesta a JSON
        const datos = await respuesta.json();
        const personajes = datos.results;

        // Limpiar el contenedor antes de mostrar los nuevos resultados
        contenedor.innerHTML = '';

        // Validar si la API devolvió resultados
        if (personajes.length === 0) {
            contenedor.innerHTML = '<p class="mensaje">Ese personaje no existe en nuestros registros.</p>';
            return;
        }

        // 3. Renderizar (pintar) los datos en el HTML (Requisito: Manejo del DOM)
        personajes.forEach(personaje => {
            // Crear el elemento de la tarjeta
            const tarjeta = document.createElement('div');
            tarjeta.className = 'card';

            // Insertar el contenido dentro de la tarjeta
            tarjeta.innerHTML = `
                <h3>${personaje.name}</h3>
                <div class="info-detallada">
                    <p><strong>Año de Nacimiento:</strong> ${personaje.birth_year}</p>
                    <p><strong>Género:</strong> ${personaje.gender === 'male' ? 'Masculino' : personaje.gender === 'female' ? 'Femenino' : 'N/A'}</p>
                    <p><strong>Estatura:</strong> ${personaje.height} cm</p>
                    <p><strong>Color de ojos:</strong> ${personaje.eye_color}</p>
                </div>
            `;

            // Agregar la tarjeta al contenedor principal
            contenedor.appendChild(tarjeta);
        });

    } catch (error) {
        // Manejo de errores visual para el usuario
        contenedor.innerHTML = `<p class="mensaje-error">⚠️ Error: ${error.message}</p>`;
        console.error("Hubo un problema:", error);
    }
}

// 4. Event Listeners (Requisito: Interacción)
btnCargar.addEventListener('click', obtenerPersonajes);

// Permitir que funcione al presionar la tecla Enter en el buscador
inputBusqueda.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        obtenerPersonajes();
    }
});