document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const statusMessage = document.getElementById('formStatus');

    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    const showMessage = (message, isError = false) => {
        statusMessage.textContent = message;
        statusMessage.className = `form-message ${isError ? 'error' : 'success'}`;
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = 'form-message';
        }, 5000);
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous messages
        statusMessage.textContent = '';
        statusMessage.className = 'form-message';

        // Validate inputs
        const errors = [];
        if (nameInput.value.trim() === '') errors.push('Name is required');
        if (!isValidEmail(emailInput.value.trim())) errors.push('Valid email is required');
        if (messageInput.value.trim().length < 10) errors.push('Message must be at least 10 characters');

        if (errors.length > 0) {
            return showMessage(errors.join('. '), true);
        }

        try {
            const response = await fetch('https://example.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageInput.value.trim()
                })
            });

            if (!response.ok) throw new Error('Server error');
            
            showMessage('Message sent successfully!');
            contactForm.reset();
        } catch (error) {
            console.error('Submission error:', error);
            showMessage('Failed to send message. Please try again later.', true);
        }
    });
});