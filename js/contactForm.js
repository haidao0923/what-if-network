function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const statusMessage = document.getElementById('status-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            statusMessage.textContent = 'Sending...';
            statusMessage.className = 'mt-4 text-center text-blue-400 font-medium'; // Adjusted color for dark theme

            const templateParams = {
                name_from: contactForm.name.value,
                email_from: contactForm.email.value,
                message: contactForm.message.value
            };

            emailjs.send('service_atdncm5', 'template_i7ko30h', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    statusMessage.textContent = 'Message sent successfully!';
                    statusMessage.className = 'mt-4 text-center text-green-400 font-medium'; // Adjusted color
                    contactForm.reset(); // Clear the form
                }, function(error) {
                    console.log('FAILED...', error);
                    statusMessage.textContent = 'Failed to send message. Please try again.';
                    statusMessage.className = 'mt-4 text-center text-red-400 font-medium'; // Adjusted color
                });
        });
    } else {
        console.error("Contact form not found!");
    }
}