let landingUi = `
    <div class="landing">
        <div class="landing-titles">  
            <h1>Quiz configuration</h1>
            <p>Select Category</p>
        </div>

        <div class="option-grid">
            <div class="option">Programming</div>
            <div class="option">Geography</div>
            <div class="option">Mathematics</div>
            <div class="option">Entertainment</div>
        </div>

        <div class="question-amount-box">
            <p>No. of Questions</p>

            <div class="numbers-box">
                <div class="question-number">5</div>
                <div class="question-number">10</div>
                <div class="question-number">15</div>
                <div class="question-number">20</div>
                <div class="question-number">25</div>
            </div>
        </div>

        <div class="start-btn-container">
            <button class="start-btn" inactive>Start Quiz</button>
        </div>
    </div>
`;

// const quizUi = `
//     <div class="container">
//         <div id="root">
//         </div>
//     </div>
// `;

const appElement = document.querySelector('.app');

loadLandingPage();

function loadLandingPage() {
    appElement.innerHTML = landingUi;
}


let questions;
let random;
let idFetcher = 1;
let counterPassed = 0;
let counterFailed = 0;
let timer = 0;
let timerId;


function scramble() {
    const numbers = '123';

    random = numbers[Math.floor(Math.random() * numbers.length)]
}

function fetchData() {
    scramble()
    fetch(`./questions${random}.json`).then((response) => {
        return response.json()
    }).then((data) => {
        questions = data
        loadApp()
    });
}

function loadApp() {
    function GenerateQuestion() {
        const html = questions.find((question) => {
            return question.id === String(idFetcher)
        });

        GenerateHTML(html);
    }

    function GenerateHTML(param) {

        const html = `
            <div class="container">
                <div id="root">

                    <div class="title-container">

                        <div>

                            <h1>Quiz Application</h1>

                            <div class="timer-box">
                                <svg style="width: 18px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>

                                <div>
                                    <span class="timer">0</span>s
                                </div>
                            </div>
                        </div>
                        
                        <hr>

                    </div>
                        

                    <div class="quize-container">
                        <p>
                            <strong>${param.question}</strong>
                        </p>
                    
                        <div class="option-container">
                            ${GenerateOption(param.options, param.id)}
                        </div>

                        <div class="btn-flex">
                            <span>${param.id} of 10 Questions</span>

                            <div class="button-container">
                                ${param.id === "10" ? `<button class="next-btn finish-btn">Finish</button>`: `<button class="next-btn finish-btn">
                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                </button>`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        `;

        function GenerateOption(data, id) {
            let html = '';
            
            data.forEach((string) => {
                html += `
                    <div class="option-box" data-value="${string}" data-id="${id}">
                        <span id="option">${string}</span>

                        <svg class="icon-right icon-right-wrong green-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>

                        <svg class="icon-wrong icon-right-wrong red-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                    </div>
                `
            });

            return html
        }

        appElement.innerHTML = html
    }

    GenerateQuestion();


    let hasRun = false;
    const passElement = document.getElementById('passed');
    const failedElement = document.getElementById('failed');
    const xIcon = document.querySelectorAll('.icon-wrong');
    const checkIcon = document.querySelectorAll('.icon-right');

    const optionElement = Array.from(document.querySelectorAll('.option-box'));

    optionElement.forEach((option) => {
        option.addEventListener('click', () => {
            const {value, id} = option.dataset;

            if (!hasRun) {
                optionFunction(value, id, option);
            } else {
                return;
            }
        });
    });

    function optionFunction(value, id, option) {

        const data = questions.find((item) => {
            return item.id === id;
        })

        if (!hasRun) {
            if (value === data.answer || data.answer === true) {
                option.classList.add('correct');
                // counterPassed += 1;
                // passElement.innerText = counterPassed;

                checkIcon[optionElement.indexOf(option)].style.opacity = '1';
                xIcon[optionElement.indexOf(option)].style.display = 'none';
            } else {
                option.classList.add('not-correct')
                // counterFailed += 1
                // failedElement.innerHTML = counterFailed;

                xIcon[optionElement.indexOf(option)].style.opacity = '1';
                checkIcon[optionElement.indexOf(option)].style.display = 'none';
            }

            hasRun = true
        } else {
            return;
        }
    }

    const nextElement = document.querySelector('.next-btn');

    function nextAction(param) {
        if (param === 'responds') {
            if (hasRun) {
                try {
                    timer = 0;
                    clearInterval(timerId);
                    idFetcher += 1
                    loadApp()
                } catch (error) {
                    document.querySelector('.title-container')
                        .remove();
                    document.querySelector('.quize-container')
                        .classList.add('top');
                    
                    setTimeout(() => {
                        document.getElementById('root')
                        .innerHTML = `
                            <div class="feedback-container">
                                <strong>
                                    Thank you for Participating in the Quiz...
                                </strong>
                                <svg viewBox="0 0 512 512"><path fill="#74C0FC" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                            </div>
                            <button class="restart-btn">Menu</button>
                        `;
    
                        const svgHeart = document.querySelector('svg');
                        
                        svgHeart.style.setProperty('--playing', 'running');
    
                        document.querySelector('.restart-btn')
                            .addEventListener('click', () => {
                                idFetcher = 1;

                                svgHeart.style.setProperty('--playing', 'paused');
                                loadLandingPage();
                                runLandingCode();
                                // fetchData();
                            });
                    }, 900);
                }
            }
        } else {
            const optionSelected = Array.from(document.querySelectorAll('.option-box'));

            const hasClass = optionSelected.filter((option) => {
                return option.classList.contains('correct') || option.classList.contains('not-correct');
            });

            if (hasClass.length > 0) {
                timer = 0;
                clearInterval(timerId);

                idFetcher += 1
                loadApp();
                console.log('go to next question');
            } else {
                const data = questions.find((item) => {
                    return item.id === optionSelected[0].dataset.id;
                })

                const answerElement = optionSelected.filter((option) => {
                    // option.removeEventListener('click', optionFunction());
                    return option.dataset.value === data.answer;
                });

                answerElement[0].classList.add('correct');
                timer = 0;
                clearInterval(timerId);
                hasRun = true;
            }




        }
    }

    nextElement.addEventListener('click', () => {
        nextAction('responds');
    });


    timerId = setInterval(() => {
        if (timer < 20) {
            timer += 1;
            const timerElement = document.querySelector('.timer');

            timerElement.innerText = timer;
        
        }

        if (timer === 20) {
            nextAction('no responds');
        }
    }, 1000);
}