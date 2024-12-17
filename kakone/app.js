document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("quiz-container");
    const submitBtn = document.getElementById("submit-btn");
    const resultContainer = document.getElementById("result");

    let quizData = [];

    // Fetch the questions.json file
    fetch("questions.json")
        .then((response) => {
            if (!response.ok) throw new Error("Failed to load questions.");
            return response.json();
        })
        .then((data) => {
            quizData = data;
            buildQuiz();
        })
        .catch((error) => console.error("Error loading questions:", error));

    // Function to build the quiz dynamically
    function buildQuiz() {
        quizData.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("mb-4");
            questionDiv.innerHTML = `
                <h5>${index + 1}. ${q.question}</h5>
                ${q.options
                    .map(
                        (option, i) => `
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="question${index}" value="${option}" id="q${index}o${i}">
                                <label class="form-check-label" for="q${index}o${i}">${option}</label>
                            </div>
                        `
                    )
                    .join("")}
            `;
            quizContainer.appendChild(questionDiv);
        });
    }

    // Function to check answers and display results
    submitBtn.addEventListener("click", function () {
        let score = 0;
        let unanswered = false;

        quizData.forEach((q, index) => {
            const options = document.getElementsByName(`question${index}`);
            let answered = false;

            options.forEach((option) => {
                if (option.checked) {
                    answered = true;
                    if (option.value === q.answer) {
                        score++;
                    }
                }
            });

            if (!answered) {
                unanswered = true;
            }
        });

        if (unanswered) {
            alert("Please answer all questions before submitting.");
        } else {
            const wrongAnswers = quizData.length - score;
            resultContainer.innerHTML = `
                <h4>You got ${score} correct and ${wrongAnswers} wrong.</h4>
            `;
        }
    });
});
