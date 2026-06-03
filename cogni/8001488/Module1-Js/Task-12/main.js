const registrationForm = document.querySelector('#registrationForm');
const loadingSpinner = document.querySelector('#loadingSpinner');
const resultMessage = document.querySelector('#resultMessage');

registrationForm.addEventListener('submit', async event => {
    event.preventDefault();
    clearMessage();
    const { name, email, selectedEvent } = registrationForm.elements;
    const payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        event: selectedEvent.value
    };

    const validationErrors = validateForm(payload);
    if (validationErrors.length) {
        showMessage('Please fix the following errors:', 'error', validationErrors);
        return;
    }

    showSpinner(true);
    try {
        const response = await submitRegistration(payload);
        showMessage(`Success! Your registration ID is ${response.id}.`, 'success');
        registrationForm.reset();
    } catch (error) {
        showMessage(error.message || 'Registration failed.', 'error');
    } finally {
        showSpinner(false);
    }
});

const validateForm = ({ name = '', email = '', event = '' } = {}) => {
    const errors = [];
    if (!name) errors.push('Name is required.');
    if (!email) errors.push('Email is required.');
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Enter a valid email address.');
    if (!event) errors.push('Please select an event.');
    return errors;
};

const showSpinner = isVisible => {
    loadingSpinner.classList.toggle('show', isVisible);
};

const showMessage = (message, type, details = []) => {
    resultMessage.textContent = '';
    resultMessage.className = `message show ${type}`;
    if (details.length) {
        const list = document.createElement('ul');
        list.className = 'error-list';
        details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            list.appendChild(li);
        });
        resultMessage.textContent = message;
        resultMessage.appendChild(list);
    } else {
        resultMessage.textContent = message;
    }
};

const clearMessage = () => {
    resultMessage.textContent = '';
    resultMessage.className = 'message';
};

const submitRegistration = payload => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(new Error('Server error while submitting registration.'));
                }
            }, 1500);
        });
    });
};
