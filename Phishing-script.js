 function checkAnswer(button, isCorrect) {
            if (isCorrect) {
                button.style.backgroundColor = '#90EE90';
                alert('Correct! Well done.');
            } else {
                button.style.backgroundColor = '#FF6F61';
                alert('Incorrect. Remember to always be cautious with phishing scams.');
            }
        }
		// script.js
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('nav').classList.add('scrolled');
});