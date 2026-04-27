// 1. Configuración de la API (Reemplaza con tus llaves de developer.marvel.com)
const PUBLIC_KEY = 'TU_LLAVE_PUBLICA';
const HASH = 'TU_HASH_GENERADO'; // Marvel requiere md5(ts + privateKey + publicKey)
const TS = '1'; 

// 2. Selección de elementos del DOM - Requisito Parte 4 [cite: 131]
const btnCargar = document.getElementById('btnCargar');
const contenedor = document.getElementById('resultados');
const inputBusqueda = document.getElementById('inputBusqueda');

// 3. Función asíncrona para obtener datos - Requisito Parte 5 [cite: 149]
async function cargarDatos() {
    const nombreHéroe = inputBusqueda.value.trim();
    
    // Limpiar contenedor y mostrar estado de carga [cite: 134, 152]
    contenedor.innerHTML = '<p class="mensaje">Buscando en el multiverso...</p>';

    // Construir URL (Funcionalidad extra: Buscador por nombre) [cite: 182]
    let url = `https://gateway.marvel.com/v1/public/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${HASH}&limit=12`;
    
    if (nombreHéroe) {
        url += `&nameStartsWith=${nombreHéroe}`;
    }

    try {
        const response = await fetch(url); [cite: 158]
        
        if (!response.ok) {
            throw new Error('No se pudo conectar con el servidor de Marvel'); [cite: 159]
        }

        const data = await response.json(); [cite: 160]
        const personajes = data.data.results;

        // Limpiar el mensaje de carga [cite: 161]
        contenedor.innerHTML = '';

        // Validar si hay resultados
        if (personajes.length === 0) {
            contenedor.innerHTML = '<p class="mensaje">No se encontraron héroes con ese nombre.</p>';
            return;
        }

        // 4. Pintar datos en pantalla - Requisito Parte 4 [cite: 133, 154]
        personajes.forEach(personaje => {
            const card = document.createElement('div');
            card.className = 'card';

            // Usamos Template Literals para la estructura de la tarjeta [cite: 133]
            card.innerHTML = `
                <img src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="${personaje.name}">
                <div class="card-info">
                    <h3>${personaje.name}</h3>
                    <p>${personaje.description || 'Sin descripción disponible.'}</p>
                </div>
            `;
            
            contenedor.appendChild(card); [cite: 170]
        });

    } catch (error) {
        // Manejo de errores visual - Requisito Parte 5 [cite: 151, 153]
        contenedor.innerHTML = `<p class="mensaje-error">Ups! Algo salió mal: ${error.message}</p>`;
    }
}

// 5. Event Listeners - Requisito Parte 4 [cite: 132, 175]
btnCargar.addEventListener('click', cargarDatos);

// Permitir búsqueda al presionar "Enter"
inputBusqueda.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        cargarDatos();
    }
});