const btnCargar = document.getElementById('btnCargar');
const contenedor = document.getElementById('resultados');
const inputBusqueda = document.getElementById('inputBusqueda');

async function buscarPokemon() {
    const nombre = inputBusqueda.value.toLowerCase().trim();
    
    // Estado de carga
    contenedor.innerHTML = '<p class="mensaje">Buscando en la hierba alta...</p>';

    // La URL cambia según si el usuario escribe algo o no
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    if (nombre) {
        url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
    } else {
        // Si no hay nombre, traemos los primeros 12 por defecto
        url = 'https://pokeapi.co/api/v2/pokemon?limit=12';
    }

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('¡Ese Pokémon no fue encontrado!');
        }

        const data = await response.json();
        contenedor.innerHTML = ''; // Limpiar contenedor antes de cargar

        // La PokeAPI devuelve datos diferentes si es un solo pokemon o una lista
        if (nombre) {
            crearTarjeta(data);
        } else {
            // Si es una lista, necesitamos obtener el detalle de cada uno
            for (let p of data.results) {
                const resIndividual = await fetch(p.url);
                const dataIndividual = await resIndividual.json();
                crearTarjeta(dataIndividual);
            }
        }

    } catch (error) {
        contenedor.innerHTML = `<p class="mensaje-error">⚠️ Error: ${error.message}</p>`;
    }
}

function crearTarjeta(pokemon) {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Usamos Template Literals para insertar los datos (Nombre, Imagen, Tipo)
    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p><strong>ID:</strong> #${pokemon.id}</p>
        <span class="tipo">${pokemon.types[0].type.name}</span>
    `;
    
    contenedor.appendChild(card);
}

btnCargar.addEventListener('click', buscarPokemon);