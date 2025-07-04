// Initialize EmailJS with your Public Key
(function() {
    emailjs.init({
        publicKey: "Wj1wGSlJqR_HvHw2U", // Replace with your Public Key from EmailJS
    });
})();

window.onload = function() {
    // All other main JavaScript calls will be made from here
    // or through event listeners set up in other modules.
    
    // Initialize contact form handler
    initContactForm();

    // Initialize horizontal scroll
    initHorizontalScroll();

    // Initialize scroll to contact section
    initScrollToContact();

    // Initialize auto-scrolling adventure cards
    startAutoScroll();

    // Initialize modal logic
    initModal();
};