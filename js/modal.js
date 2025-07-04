const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const modalCloseButton = document.getElementById('modal-close');

function handleTriggerCard3Click(e) {
    e.preventDefault();
    document.querySelector('.card:nth-of-type(3) .read-more-link').click();
}

function handleTriggerCard2Click(e) {
    e.preventDefault();
    document.querySelector('.card:nth-of-type(2) .read-more-link').click();
}

function attachDynamicLinkListeners() {
    document.querySelectorAll('.trigger-card-3').forEach(link => {
        link.removeEventListener('click', handleTriggerCard3Click);
    });
    document.querySelectorAll('.trigger-card-2').forEach(link => {
        link.removeEventListener('click', handleTriggerCard2Click);
    });

    document.querySelectorAll('.trigger-card-3').forEach(link => {
        link.addEventListener('click', handleTriggerCard3Click);
    });
    document.querySelectorAll('.trigger-card-2').forEach(link => {
        link.addEventListener('click', handleTriggerCard2Click);
    });
}

function initModal() {
    document.querySelectorAll('.read-more-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.card');
            const title = card.querySelector('h3').textContent;
            const fullDescriptionHtml = card.querySelector('.full-description').innerHTML;

            modalTitle.textContent = title;
            modalContent.innerHTML = fullDescriptionHtml;

            modalOverlay.classList.remove('hidden');
            attachDynamicLinkListeners();
        });
    });

    modalCloseButton.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add('hidden');
        }
    });

    attachDynamicLinkListeners(); // Initial attachment
}