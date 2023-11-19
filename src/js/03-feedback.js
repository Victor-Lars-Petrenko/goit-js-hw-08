import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

try {
    const savedValues = JSON.parse(localStorage.getItem('feedback-form-state')) ?? {email: '', message: ''};
    form.elements.email.value = savedValues.email;
    form.elements.message.value = savedValues.message;
} catch {}

form.addEventListener('input', throttle(evt => {
    try {
        const inputedValues = {
            email: evt.currentTarget.elements.email.value,
            message: evt.currentTarget.elements.message.value
        }
        localStorage.setItem('feedback-form-state', JSON.stringify(inputedValues))
    } catch {}
    }, 500)
)

form.addEventListener('submit', evt => {
    evt.preventDefault()
    const email = evt.currentTarget.email.value.trim();
    const message = evt.currentTarget.message.value.trim();
    if (email === '' || message === '') {
        return
    }
    console.log({ email, message });
    form.reset();
    localStorage.removeItem('feedback-form-state');
})