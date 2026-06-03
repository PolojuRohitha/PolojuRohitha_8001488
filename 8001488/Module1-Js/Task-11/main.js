const registrationForm = document.querySelector('#registrationForm');
const successMessage = document.querySelector('#successMessage');

registrationForm.addEventListener('submit', event => {
    event.preventDefault();
    const { name, email, eventSelect } = registrationForm.elements;
    const formValues = {
        name: name.value.trim(),
        email: email.value.trim(),
        selectedEvent: eventSelect.value
    };
    clearErrors();
    const errors = validateForm(formValues);
    if (Object.keys(errors).length) {
        showErrors(errors);
        successMessage.style.display = 'none';
        return;
    }
    successMessage.textContent = `Registration complete! ${formValues.name} has been signed up for ${formValues.selectedEvent}.`;
    successMessage.style.display = 'block';
    registrationForm.reset();
});

const validateForm = ({ name = '', email = '', selectedEvent = '' } = {}) => {
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address';
    if (!selectedEvent) errors.eventSelect = 'Please choose an event';
    return errors;
};

const clearErrors = () => {
    document.querySelector('#nameError').textContent = '';
    document.querySelector('#emailError').textContent = '';
    document.querySelector('#eventError').textContent = '';
};

const showErrors = errors => {
    if (errors.name) document.querySelector('#nameError').textContent = errors.name;
    if (errors.email) document.querySelector('#emailError').textContent = errors.email;
    if (errors.eventSelect) document.querySelector('#eventError').textContent = errors.eventSelect;
};
