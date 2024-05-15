document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quizForm');

    // Controlla se l'utente ha già risposto
    if (document.cookie.includes("hasSubmitted=true")) {
        window.location.href = "already-answered.html";
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const selectedAnswer = document.querySelector('input[name="answer"]:checked');

        if (selectedAnswer) {
            const answerValue = selectedAnswer.value;
            document.cookie = "hasSubmitted=true; max-age=" + (60 * 60 * 24); // 1 giorno

            // Salva la risposta nel local storage
            const answers = JSON.parse(localStorage.getItem('answers')) || {};
            answers[answerValue] = answers[answerValue] ? answers[answerValue] + 1 : 1;
            localStorage.setItem('answers', JSON.stringify(answers));

            window.location.href = "thankyou.html";
        } else {
            alert("Seleziona una risposta prima di inviare.");
        }
    });

    // Funzione per cancellare un cookie specifico
    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }

    // Aggiungi un listener per un pulsante di ripulitura cookie, se esiste
    const clearCookiesButton = document.getElementById('clearCookies');
    if (clearCookiesButton) {
        clearCookiesButton.addEventListener('click', () => {
            deleteCookie('hasSubmitted');
            alert('Tutti i cookie delle risposte sono stati ripuliti.');
        });
    }
});
