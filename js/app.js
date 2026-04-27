const btnCargar = document.getElementById('btnCargar');
const contenedor = document.getElementById('resultados');
const inputBusqueda = document.getElementById('inputBusqueda');

async function buscarPersonajes() {
    const busqueda = inputBusqueda.value.trim();
    contenedor.innerHTML = '<p>Buscando en una galaxia muy lejana...</p>';

    // SWAPI usa el parámetro ?search= para buscar
    const url = `https://swapi.dev/api/people/?search=${busqueda}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la conexión');
        
        const data = await response.json();
        const personajes = data.results;

        contenedor.innerHTML = ''; // Limpiar carga

        if (personajes.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron personajes.</p>';
            return;
        }

        personajes.forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${p.name}</h3>
                <p><strong>Año nacimiento:</strong> ${p.birth_year}</p>
                <p><strong>Género:</strong> ${p.gender}</p>
                <p><strong>Color de ojos:</strong> ${p.eye_color}</p>
            `;
            contenedor.appendChild(card);
        });

    } catch (error) {
        contenedor.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

btnCargar.addEventListener('click', buscarPersonajes);