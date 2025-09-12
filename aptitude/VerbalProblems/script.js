// Configuration
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";
const API_KEY = "AIzaSyCHRdbPzRTqaE2Q76-vpyEv7bSdWvjB_sM";

// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const submitBtn = document.getElementById('submit-answer');
const questionContainer = document.querySelector('.question-container');
const questionOutput = document.getElementById('question-output');
const answerSection = document.querySelector('.answer-section');
const feedbackContainer = document.getElementById('feedback-container');
const answerFeedback = document.getElementById('answer-feedback');
const explanationDiv = document.getElementById('explanation');
const errorContainer = document.getElementById('error-container');
const selectedTopicSpan = document.getElementById('selected-topic');
const selectedDifficultySpan = document.getElementById('selected-difficulty');

// State variables
let currentCorrectAnswer = "";
let currentExplanation = "";
let selectedOption = null;

// Initialize
updateSelectionDisplay();

// Event Listeners
generateBtn.addEventListener('click', generateQuestion);
submitBtn.addEventListener('click', checkAnswer);

document.querySelectorAll('.topic-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.topic-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        document.getElementById('topic').value = this.dataset.value;
        updateSelectionDisplay();
    });
});

document.querySelectorAll('.difficulty-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.difficulty-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        document.getElementById('difficulty').value = this.dataset.value;
        updateSelectionDisplay();
    });
});

// Functions
async function generateQuestion() {
    hideError();
    questionContainer.classList.add('hidden');
    answerSection.classList.add('hidden');
    feedbackContainer.classList.add('hidden');
    generateBtn.classList.add('loading');
    
    try {
        const topic = document.getElementById('topic').value;
        const difficulty = document.getElementById('difficulty').value;
        const prompt = createPrompt(topic, difficulty);
        const response = await callGeminiAPI(prompt);
        displayQuestion(response);
    } catch (error) {
        console.error("Error generating question:", error);
        showError("Failed to generate question. Please try again.");
    } finally {
        generateBtn.classList.remove('loading');
    }
}

function createPrompt(topic, difficulty) {
    const topicMap = {
        'synonyms': 'practice of synonyms and antonyms',
        'fill-blanks': 'fill in the blanks using appropriate words',
        'spot-errors': 'identify and correct grammatical errors',
        'comprehension': 'reading passages and answering questions',
        'sentence-correction': 'correct the structure and grammar of sentences',
        'para-jumbles': 'rearrange jumbled sentences into logical order',
        'vocabulary': 'improve and test vocabulary knowledge'
    };    
    
    return `    
    Generate a ${difficulty} difficulty question about ${topicMap[topic]} in number systems and basic arithmetic.
    The question should be multiple choice with 4 options (A-D).
    Format the response EXACTLY as follows:

    Question: [The question text here]

    Options:
    A) [Option A]
    B) [Option B]
    C) [Option C]
    D) [Option D]

    Correct Answer: [The correct option letter ONLY]

    Explanation: [Brief 2-3 sentence explanation of the solution]
    `.split('\n').map(line => line.trimStart()).join('\n');
}

async function callGeminiAPI(prompt) {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024
            }
        })
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

function displayQuestion(fullResponse) {
    const existingOptions = document.querySelector('.options-container');
    if (existingOptions) {
        existingOptions.remove();
    }

    selectedOption = null;

    const displayText = fullResponse.split('Correct Answer:')[0].trim();
    const questionParts = displayText.split('Options:');
    const questionText = questionParts[0].replace('Question:', '').trim();
    const optionsText = questionParts[1].trim();

    const options = [];
    const optionRegex = /^([A-D])\)\s*(.+)$/gm;
    let match;
    while ((match = optionRegex.exec(optionsText)) !== null) {
        options.push({
            letter: match[1],
            text: match[2].trim()
        });
    }

    const optionsHTML = options.map(opt => `
        <div class="option" data-value="${opt.letter}">
            <div class="option-letter">${opt.letter}</div>
            <div class="option-text">${opt.text}</div>
        </div>
    `).join('');

    questionOutput.innerHTML = `
        <div class="question-text">${formatMathText(questionText)}</div>
        <div class="options-container">${optionsHTML}</div>
    `;

    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedOption = this.dataset.value;
        });
    });

    const answerMatch = fullResponse.match(/Correct Answer:\s*([A-D])/i);
    if (answerMatch) currentCorrectAnswer = answerMatch[1].toUpperCase();

    const explanationMatch = fullResponse.match(/Explanation:\s*(.+)/is);
    if (explanationMatch) currentExplanation = explanationMatch[1].trim();

    questionContainer.classList.remove('hidden');
    answerSection.classList.remove('hidden');
    feedbackContainer.classList.add('hidden');
}

function checkAnswer() {
    if (!selectedOption) {
        showError("Please select an answer first!");
        return;
    }

    const isCorrect = selectedOption === currentCorrectAnswer;

    document.querySelectorAll('.option').forEach(option => {
        if (option.dataset.value === selectedOption) {
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        if (option.dataset.value === currentCorrectAnswer && !isCorrect) {
            option.classList.add('correct');
        }
    });

    explanationDiv.querySelector('.explanation-content').innerHTML = 
        currentExplanation ? formatMathText(currentExplanation) : 'No explanation available.';
    explanationDiv.classList.remove('hidden');

    feedbackContainer.classList.remove('hidden');
}

function formatMathText(text) {
    return text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\$(.*?)\$/g, '<span class="math">$1</span>');
}

function updateSelectionDisplay() {
    const topic = document.getElementById('topic').value;
    const difficulty = document.getElementById('difficulty').value;

    const topicNames = {
        'synonyms': 'Synonyms and Antonyms',
        'fill-blanks': 'Fill in the Blanks',
        'spot-errors': 'Spotting Errors',
        'comprehension': 'Reading Comprehension',
        'sentence-correction': 'Sentence Correction',
        'para-jumbles': 'Para Jumbles',
        'vocabulary': 'Vocabulary'
    };
    

    const difficultyNames = {
        'easy': 'Easy',
        'medium': 'Medium',
        'hard': 'Hard'
    };

    selectedTopicSpan.innerHTML = `<i class="fas fa-book"></i> ${topicNames[topic]}`;
    selectedDifficultySpan.innerHTML = `<i class="fas fa-bolt"></i> ${difficultyNames[difficulty]}`;
}

function showError(message) {
    errorContainer.querySelector('.error-message').textContent = message;
    errorContainer.classList.remove('hidden');
}

function hideError() {
    errorContainer.classList.add('hidden');
}
