// 1. SELECCIÓN DE ELEMENTOS DEL DOM (Parte 4 - 15 pts)
const btnCargar = document.getElementById('btnCargar');
const contenedor = document.getElementById('resultados');
const inputBusqueda = document.getElementById('inputBusqueda');

/**
 * 2. FUNCIÓN ASÍNCRONA PARA EL CONSUMO DE API (Parte 5 - 25 pts)
 * Realiza la petición a SWAPI y maneja los estados de la consulta.
 */
async function cargarDatos() {
    const busqueda = inputBusqueda.value.trim();
    
    // Mostrar mensaje de 'Cargando...' mientras se espera la respuesta (Punto 152)
    contenedor.innerHTML = '<p class="mensaje">Buscando en los archivos de la galaxia...</p>';

    // Construcción de la URL - Reto Final: Buscador (Punto 182)
    // Usamos HTTPS para evitar errores de conexión (Failed to fetch)
    let url = 'https://swapi.dev/api/people/';
    if (busqueda) {
        url = `https://swapi.dev/api/people/?search=${busqueda}`;
    }

    // Manejo de errores con try/catch (Punto 151)
    try {
        const response = await fetch(url);

        // Validar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('No se pudo conectar con el servidor de Star Wars');
        }

        // Convertir respuesta a JSON (Punto 150)
        const data = await response.json();
        const personajes = data.results;

        // Limpiar el contenedor antes de insertar nuevos datos (Punto 134)
        contenedor.innerHTML = '';

        // Validar si la API devolvió resultados
        if (personajes.length === 0) {
            contenedor.innerHTML = '<p class="mensaje">No se encontraron personajes con ese nombre.</p>';
            return;
        }

        /**
         * 3. MANIPULACIÓN DEL DOM (Parte 4 y 5)
         * Pintamos al menos 6 elementos si están disponibles (Punto 154)
         */
        personajes.forEach(personaje => {
            // Crear el elemento de la tarjeta (Punto 133)
            const card = document.createElement('div');
            card.className = 'card';

            // Insertar información usando Template Literals
            card.innerHTML = `
                <h3>${personaje.name}</h3>
                <div class="card-info">
                    <p><strong>Año de nacimiento:</strong> ${personaje.birth_year}</p>
                    <p><strong>Género:</strong> ${personaje.gender}</p>
                    <p><strong>Estatura:</strong> ${personaje.height} cm</p>
                    <p><strong>Color de ojos:</strong> ${personaje.eye_color}</p>
                </div>
            `;
            
            // Agregar al contenedor (Punto 133)
            contenedor.appendChild(card);
        });

    } catch (error) {
        // Mostrar mensaje claro si falla la petición (Punto 153)
        console.error("Error técnico:", error);
        contenedor.innerHTML = `
            <div class="error-mensaje">
                <p>⚠️ Ups, ocurrió un error: ${error.message}</p>
                <p>Por favor, revisa tu conexión e intenta de nuevo.</p>
            </div>
        `;
    }
}

// 4. EVENT LISTENERS (Parte 4)
// Escuchar el clic en el botón para disparar la función (Punto 132)
btnCargar.addEventListener('click', cargarDatos);

// Mejora de experiencia: Buscar también al presionar la tecla "Enter"
inputBusqueda.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        cargarDatos();
    }
});