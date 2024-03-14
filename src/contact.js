document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    form.addEventListener('submit', function (event) {
        // Evitar que el formulario se envíe
        event.preventDefault();

        // Mostrar el mensaje de confirmación
        confirmationMessage.style.display = 'block';

        // Opcional: Deshabilitar el botón de enviar después de enviar el formulario
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
    });
});
