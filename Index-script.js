// Function to shuffle an array (used to randomize answer order)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to check the answers for the quiz
function checkAnswer(button, isCorrect) {
    if (isCorrect) {
        button.classList.add('correct');
        button.classList.remove('incorrect');
        alert('Correct! Great job.');
    } else {
        button.classList.add('incorrect');
        button.classList.remove('correct');
        alert('Incorrect. Try again.');
    }

    // Disable all buttons in the current quiz question after one is clicked
    const buttons = button.parentElement.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed'; // Change cursor to indicate disabled state
    });
}

// Function to initialize the quiz
function initializeQuiz() {
    document.querySelectorAll('.quiz-question').forEach(question => {
        const buttons = Array.from(question.querySelectorAll('button'));
        const correctIndex = parseInt(question.getAttribute('data-correct-answer'), 10);
        const correctButton = buttons[correctIndex];
        
        // Randomize button order
        shuffleArray(buttons);

        // Append shuffled buttons to the question
        buttons.forEach(button => {
            question.appendChild(button);
            button.addEventListener('click', () => {
                const isCorrect = button === correctButton;
                checkAnswer(button, isCorrect);
            });
        });
    });
}

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', initializeQuiz);

// JavaScript for opening the Quizizz quiz in an iframe
const quizizzPlayButton = document.getElementById('quizizz-play-button');
const quizizzPreview = document.getElementById('quizizz-preview');
const quizIframeContainer = document.getElementById('quiz-iframe-container');

quizizzPlayButton.addEventListener('click', function() {
    handleIframeToggle(quizIframeContainer, quizizzPreview, 'https://quizizz.com/embed/quiz/6704b09ecb352e4284c44aa2');
});

// JavaScript for opening the Scratch project in an iframe
const scratchPlayButton = document.getElementById('scratch-play-button');
const scratchPreview = document.getElementById('scratch-preview');
const scratchIframeContainer = document.getElementById('scratch-iframe-container');

scratchPlayButton.addEventListener('click', function() {
    handleIframeToggle(scratchIframeContainer, scratchPreview, 'https://scratch.mit.edu/projects/1072472496/embed');
});

// Function to handle iframe toggle
function handleIframeToggle(container, previewImage, url) {
    if (container.firstChild) {
        container.firstChild.classList.add('fade-out');
        setTimeout(() => {
            container.removeChild(container.firstChild);
            previewImage.classList.add('hidden'); // Hide the preview image
            createNewIframe(container, previewImage, url);
        }, 500);
    } else {
        previewImage.classList.add('hidden');
        createNewIframe(container, previewImage, url);
    }
}

// Function to create a new iframe
function createNewIframe(container, previewImage, url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.classList.add('quiz-iframe');
    container.appendChild(iframe);

    // Add close button to iframe container
    const closeButton = document.createElement('img');
    closeButton.src = 'Close Button.png'; // Close Button image
    closeButton.alt = 'Close Iframe';
    closeButton.classList.add('close-iframe-button');
    closeButton.addEventListener('click', function() {
        container.removeChild(iframe);
        container.removeChild(closeButton);
        previewImage.classList.remove('hidden'); // Show the preview again
    });
    container.appendChild(closeButton);
}

// JavaScript for opening the quizzes in new tabs
const quizizzTabButton = document.getElementById('quizizz-tab-button');
quizizzTabButton.addEventListener('click', function() {
    window.open('https://quizizz.com/embed/quiz/6704b09ecb352e4284c44aa2', '_blank');
});

const scratchTabButton = document.getElementById('scratch-tab-button');
scratchTabButton.addEventListener('click', function() {
    window.open('https://scratch.mit.edu/projects/1072472496/', '_blank');
});

// "What's This?" button functionality
document.querySelectorAll('.whats-this-button').forEach(button => {
    button.addEventListener('click', function() {
        const isQuizizz = button.closest('.quizizz-section') !== null;
        const alertMessage = isQuizizz 
            ? "Quizizz is an interactive platform for quizzes. Click 'Play Now' to take the quiz embedded here."
            : "This is a Scratch project! Scratch is a visual programming platform. Click 'Play Now' to interact with the project.";
        alert(alertMessage);
    });
});

// JavaScript for opening and closing the modal
document.getElementById('preview-button').addEventListener('click', function() {
    document.getElementById('preview-modal').style.display = 'flex'; // Show modal
});

document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('preview-modal').style.display = 'none'; // Hide modal
});

// Close modal if clicking outside the modal content
window.addEventListener('click', function(event) {
    const modal = document.getElementById('preview-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function showAlert(message) {
 alert(message);
}
