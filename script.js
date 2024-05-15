const API_BASE_URL = 'https://api-7524dbiyoq-uc.a.run.app'; // Usa l'URL delle tue funzioni Firebase

// Funzione per ottenere il valore di un cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Funzione per impostare un cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quizForm');
    const userId = getCookie('userId'); // Ottieni l'ID utente dal cookie

    // Controlla se l'utente ha già risposto
    const checkUserSubmission = async () => {
        const response = await fetch(`https://api-7524dbiyoq-uc.a.run.app/user/${userId}`);
        const data = await response.json();
        return data.hasSubmitted;
    };

    if (userId) {
        checkUserSubmission().then(hasSubmitted => {
            if (hasSubmitted) {
                window.location.href = "already-answered.html";
            }
        });
    } else {
        const newUserId = `user-${Math.random().toString(36).substr(2, 9)}`;
        setCookie('userId', newUserId, 365);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        const userId = getCookie('userId');

        if (selectedAnswer) {
            const answerValue = selectedAnswer.value;

            // Salva la risposta nel backend
            await fetch(`https://api-7524dbiyoq-uc.a.run.app/answers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answer: answerValue })
            });

            // Aggiorna lo stato dell'utente nel backend
            await fetch(`https://api-7524dbiyoq-uc.a.run.app/user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hasSubmitted: true })
            });

            window.location.href = "thankyou.html";
        } else {
            alert("Seleziona una risposta prima di inviare.");
        }
    });
});
