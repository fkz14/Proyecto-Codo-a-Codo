document.addEventListener('DOMContentLoaded', () => {
    async function fetchPokemonList() {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=150';
        const response = await fetch(url);
        const data = await response.json();
        const pokemonList = data.results;

        return pokemonList;
    }

    async function fetchPokemonDetails(pokemonUrl) {
        const response = await fetch(pokemonUrl);
        const pokemon = await response.json();
        const name = pokemon.name;
        const types = pokemon.types.map(typeInfo => typeInfo.type.name);
        const imageUrl = pokemon.sprites.front_default;

        return { name, types, imageUrl };
    }

    async function fetchAllTypes() {
        const url = 'https://pokeapi.co/api/v2/type';
        const response = await fetch(url);
        const data = await response.json();
        const types = data.results.map(type => type.name);
        return types;
    }

    async function displayTypes() {
        const types = await fetchAllTypes();
        const typeFilter = document.getElementById('typeFilter');
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            typeFilter.appendChild(option);
        });
    }

    async function displayPokemon(filterType = '') {
        const pokemonContainer = document.getElementById('pokemonContainer');
        pokemonContainer.innerHTML = ''; // Clear previous results
        const pokemonList = await fetchPokemonList();

        for (const pokemon of pokemonList) {
            const pokemonDetails = await fetchPokemonDetails(pokemon.url);
            if (filterType && !pokemonDetails.types.includes(filterType)) {
                continue;
            }

            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');

            pokemonCard.innerHTML = `
                <img src="${pokemonDetails.imageUrl}" alt="${pokemonDetails.name}">
                <h3>${pokemonDetails.name}</h3>
                <p>${pokemonDetails.types.join(', ')}</p>
            `;

            pokemonContainer.appendChild(pokemonCard);
        }
    }

    window.filterPokemon = () => {
        const filterType = document.getElementById('typeFilter').value;
        displayPokemon(filterType);
    };

    displayTypes();
    displayPokemon();
});


function validarFormulario(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var emailField = document.getElementById('email');
    var passwordField = document.getElementById('password');
    var emailError = document.getElementById('email-error');
    var passwordError = document.getElementById('password-error');

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var isValid = true;

    // Resetear los estados de error
    emailField.classList.remove('error');
    passwordField.classList.remove('error');
    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    // Validar email
    if (email === '') {
        emailField.classList.add('error');
        emailError.style.display = 'block';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        emailField.classList.add('error');
        isValid = false;
    }

    // Validar contraseña
    if (password === '') {
        passwordField.classList.add('error');
        passwordError.style.display = 'block';
        isValid = false;
    } else if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        passwordField.classList.add('error');
        isValid = false;
    }

    // Si todos los campos son válidos, redirigir
    if (isValid) {
        window.location.replace('./html/menu.html');
    }
}

// Agregar eventos para quitar el mensaje de error cuando el usuario completa el campo
document.getElementById('email').addEventListener('input', function() {
    if (this.value !== '') {
        this.classList.remove('error');
        document.getElementById('email-error').style.display = 'none';
    }
});

document.getElementById('password').addEventListener('input', function() {
    if (this.value !== '') {
        this.classList.remove('error');
        document.getElementById('password-error').style.display = 'none';
    }
});