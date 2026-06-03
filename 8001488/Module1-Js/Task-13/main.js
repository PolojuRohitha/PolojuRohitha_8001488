const form = document.querySelector('#debugForm');
const statusMessage = document.querySelector('#statusMessage');

form.addEventListener('submit', async event => {
    event.preventDefault();
    console.group('Form Submission');
    console.log('submit event fired');

    const { name, email, eventSelect } = form.elements;
    const payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        event: eventSelect.value
    };

    console.log('Captured form.elements:', { name: name.value, email: email.value, event: eventSelect.value });
    console.table(payload);

    const errors = validate(payload);
    if (errors.length) {
        console.warn('Validation failed:', errors);
        showStatus('error', `Validation failed: ${errors.join(' ')}`);
        console.groupEnd();
        return;
    }

    showStatus('info', 'Sending registration');
    try {
        const response = await sendRegistration(payload);
        console.log('Fetch response received:', response);
        showStatus('success', `Registration successful! ID: ${response.id}`);
    } catch (error) {
        console.error('Submit failed:', error);
        showStatus('error', `Submission error: ${error.message}`);
    } finally {
        console.groupEnd();
    }
});

function validate({ name = '', email = '', event = '' } = {}) {
    const errors = [];
    if (!name) errors.push('Name is required.');
    if (!email) errors.push('Email is required.');
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Invalid email format.');
    if (!event) errors.push('Event selection is required.');
    return errors;
}

function showStatus(type, message) {
    statusMessage.style.display = 'block';
    statusMessage.className = `message ${type}`;
    statusMessage.textContent = message;
}

function sendRegistration(payload) {
    console.log('Preparing fetch payload:', payload);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Parsed JSON response:', data);
                resolve(data);
            })
            .catch(reject);
        }, 1200);
    });
}
