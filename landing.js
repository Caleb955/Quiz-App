runLandingCode();

function runLandingCode() {
    const selectOptions = Array.from(document.querySelectorAll('.option'));
    const numberOptions = Array.from(document.querySelectorAll('.question-number'));
    const startButton = document.querySelector('.start-btn');

    function recallOption(param, param2) {
        for(i= 0; i < param2.length; i++) {
            param2[i]
                .removeAttribute('active');
        }

        param.setAttribute('active', '');

        function checkOptions() {

            const selectOption = selectOptions.find((option) => {
                return option.hasAttribute('active');
            });

            const numberOption = numberOptions.find((option) => {
                return option.hasAttribute('active');
            });

            if (selectOption && numberOption) {
                startButton.removeAttribute('inactive');    

                startButton.addEventListener('click', () => {
                    RunQuote();
                });
            }
        }

        checkOptions();
    }

    selectOptions.forEach((option) => {
        option.addEventListener('click', () => {
            recallOption(option, selectOptions);
        });
    });


    numberOptions.forEach((option) => {
        option.addEventListener('click', () => {
            recallOption(option, numberOptions);
        });
    });

    function RunQuote() {
        document.querySelector('.landing')
            .remove();

        fetchData();
    }
}