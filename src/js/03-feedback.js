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
            email: form.elements.email.value,
            message: form.elements.message.value
        }
        localStorage.setItem('feedback-form-state', JSON.stringify(inputedValues))
    } catch {}
    }, 500, {
        leading: true,
        trailing: true,
    })
)

form.addEventListener('submit', evt => {
    evt.preventDefault();
    const email = evt.currentTarget.elements.email.value.trim();
    const message = evt.currentTarget.elements.message.value.trim();
    
    if (email === '' || message === '') {
        alert('Please fill out empty fields');
    } else {
        console.log({ email, message });
        form.reset();
        localStorage.removeItem('feedback-form-state');
    }
})