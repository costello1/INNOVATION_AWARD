const API_BASE_URL = 'https://api-7524dbiyoq-uc.a.run.app'; // Usa l'URL delle tue funzioni Firebase

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quizForm');
    const userId = 'user123'; // Sostituisci con un identificatore univoco per l'utente

    // Funzione per controllare se l'utente ha già risposto
    const checkUserSubmission = async () => {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        const data = await response.json();
        return data.hasSubmitted;
    };

    // Controlla se l'utente ha già risposto
    checkUserSubmission().then(hasSubmitted => {
        if (hasSubmitted) {
            window.location.href = "already-answered.html";
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const selectedAnswer = document.querySelector('input[name="answer"]:checked');

        if (selectedAnswer) {
            const answerValue = selectedAnswer.value;

            // Salva la risposta nel backend
            await fetch(`${API_BASE_URL}/answers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answer: answerValue })
            });

            // Aggiorna lo stato dell'utente nel backend
            await fetch(`${API_BASE_URL}/user/${userId}`, {
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
