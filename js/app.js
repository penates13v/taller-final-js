// 1. Selección de elementos del DOM
const btnCargar = document.getElementById('btnCargar');
const contenedor = document.getElementById('resultados');
const inputBusqueda = document.getElementById('inputBusqueda');

// 2. Función principal asíncrona
async function obtenerPersonajes() {
    const nombrePersona = inputBusqueda.value.trim();
    
    // Estado de carga - Requisito Parte 5
    contenedor.innerHTML = '<p class="mensaje">Buscando en los archivos de la Antigua República...</p>';

    // IMPORTANTE: Usar siempre HTTPS para evitar el error "Failed to fetch"
    let url = 'https://swapi.dev/api/people/';
    
    // Funcionalidad extra: Buscador - Requisito Reto Final
    if (nombrePersona) {
        url = `https://swapi.dev/api/people/?search=${nombrePersona}`;
    }

    try {
        const respuesta = await fetch(url);

        // Si la respuesta no es 200-299, lanzamos error - Requisito Parte 5
        if (!respuesta.ok) {
            throw new Error(`Error de servidor: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        const personajes = datos.results;

        contenedor.innerHTML = ''; // Limpiar contenedor - Requisito Parte 4

        if (personajes.length === 0) {
            contenedor.innerHTML = '<p class="mensaje">No se encontraron registros de ese personaje.</p>';
            return;
        }

        // 3. Pintar resultados en pantalla (Mínimo 6 elementos) - Requisito Parte 5
        personajes.forEach(personaje => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'card';
            tarjeta.innerHTML = `
                <h3>${personaje.name}</h3>
                <div class="info-detallada">
                    <p><strong>Especie:</strong> Humanoide</p>
                    <p><strong>Año nacimiento:</strong> ${personaje.birth_year}</p>
                    <p><strong>Género:</strong> ${personaje.gender}</p>
                    <p><strong>Estatura:</strong> ${personaje.height} cm</p>
                </div>
            `;
            contenedor.appendChild(tarjeta);
        });

    } catch (error) {
        // Manejo de errores visual corregido - Requisito Parte 5
        console.error("Detalle del error:", error);
        contenedor.innerHTML = `
            <div class="error-container">
                <p>⚠️ Ups, ocurrió un error galáctico: ${error.message}</p>
                <p>Verifica tu conexión a internet e intenta de nuevo.</p>
            </div>
        `;
    }
}

// 4. Event Listeners
btnCargar.addEventListener('click', obtenerPersonajes);

inputBusqueda.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') obtenerPersonajes();
});