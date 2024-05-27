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
