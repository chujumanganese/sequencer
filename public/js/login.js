const form = document.querySelector('#siForm');
const errorContainer = document.querySelector('#errors');

form.addEventListener('submit', e => {
    e.preventDefault();
    login();
});

async function login() {
   
    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.querySelector('#siEmail').value,
            password: document.querySelector('#siPass').value
        })
    });

    const data = await res.json();
    console.log(data);

    if (data.error) {
        errorContainer.style.display = 'block';
        errorContainer.innerText = `${data.error}`;
        setTimeout(() => {
            errorContainer.style.display = 'none';
        }, 5000);
    } else if (data.success) {
        window.location.href = '/dashboard';
    }
}