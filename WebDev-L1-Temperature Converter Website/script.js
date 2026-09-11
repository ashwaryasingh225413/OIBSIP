// =====================================
// GET HTML ELEMENTS
// =====================================

const temperatureInput =
    document.getElementById("temperature");

const unitSelect =
    document.getElementById("unit");

const convertButton =
    document.getElementById("convertBtn");

const resetButton =
    document.getElementById("resetBtn");

const errorMessage =
    document.getElementById("error-message");

const celsiusResult =
    document.getElementById("celsiusResult");

const fahrenheitResult =
    document.getElementById("fahrenheitResult");

const kelvinResult =
    document.getElementById("kelvinResult");


// =====================================
// CONVERSION FUNCTION
// =====================================

function convertTemperature() {

    const inputValue =
        temperatureInput.value.trim();

    const selectedUnit =
        unitSelect.value;


    // ---------------------------------
    // Check Empty Input
    // ---------------------------------

    if (inputValue === "") {

        showError("Please enter a temperature value.");

        clearResults();

        return;
    }


    // ---------------------------------
    // Check Numeric Input
    // ---------------------------------

    const temperature =
        Number(inputValue);


    if (!Number.isFinite(temperature)) {

        showError(
            "Please enter a valid numeric temperature."
        );

        clearResults();

        return;
    }


    // ---------------------------------
    // Absolute Zero Validation
    // ---------------------------------

    if (
        selectedUnit === "celsius" &&
        temperature < -273.15
    ) {

        showError(
            "Temperature cannot be below absolute zero (-273.15 °C)."
        );

        clearResults();

        return;
    }


    if (
        selectedUnit === "fahrenheit" &&
        temperature < -459.67
    ) {

        showError(
            "Temperature cannot be below absolute zero (-459.67 °F)."
        );

        clearResults();

        return;
    }


    if (
        selectedUnit === "kelvin" &&
        temperature < 0
    ) {

        showError(
            "Kelvin temperature cannot be below 0 K."
        );

        clearResults();

        return;
    }


    // ---------------------------------
    // Remove Previous Error
    // ---------------------------------

    clearError();


    // ---------------------------------
    // Convert Everything to Celsius
    // ---------------------------------

    let celsius;


    if (selectedUnit === "celsius") {

        celsius = temperature;

    }
    else if (selectedUnit === "fahrenheit") {

        celsius =
            (temperature - 32) * 5 / 9;

    }
    else if (selectedUnit === "kelvin") {

        celsius =
            temperature - 273.15;

    }


    // ---------------------------------
    // Convert Celsius to Other Units
    // ---------------------------------

    const fahrenheit =
        (celsius * 9 / 5) + 32;

    const kelvin =
        celsius + 273.15;


    // ---------------------------------
    // Display Results
    // ---------------------------------

    celsiusResult.textContent =
        `${formatNumber(celsius)} °C`;

    fahrenheitResult.textContent =
        `${formatNumber(fahrenheit)} °F`;

    kelvinResult.textContent =
        `${formatNumber(kelvin)} K`;
}


// =====================================
// NUMBER FORMATTING
// =====================================

function formatNumber(value) {

    return Number(value.toFixed(2));

}


// =====================================
// SHOW ERROR
// =====================================

function showError(message) {

    errorMessage.textContent = message;

    temperatureInput.classList.add("invalid");

}


// =====================================
// CLEAR ERROR
// =====================================

function clearError() {

    errorMessage.textContent = "";

    temperatureInput.classList.remove("invalid");

}


// =====================================
// CLEAR RESULTS
// =====================================

function clearResults() {

    celsiusResult.textContent = "—";

    fahrenheitResult.textContent = "—";

    kelvinResult.textContent = "—";

}


// =====================================
// RESET FUNCTION
// =====================================

function resetConverter() {

    temperatureInput.value = "";

    unitSelect.value = "celsius";

    clearError();

    clearResults();

    temperatureInput.focus();

}


// =====================================
// BUTTON EVENTS
// =====================================

convertButton.addEventListener(
    "click",
    convertTemperature
);


resetButton.addEventListener(
    "click",
    resetConverter
);


// =====================================
// REAL-TIME VALIDATION
// =====================================

temperatureInput.addEventListener(
    "input",
    function () {

        const value =
            temperatureInput.value.trim();


        // Empty input
        if (value === "") {

            clearError();

            clearResults();

            return;
        }


        // Check non-numeric value
        if (!Number.isFinite(Number(value))) {

            showError(
                "Only numeric values are allowed."
            );

            return;
        }


        // Check absolute zero
        const number =
            Number(value);

        const unit =
            unitSelect.value;


        if (
            unit === "celsius" &&
            number < -273.15
        ) {

            showError(
                "Value is below absolute zero."
            );

            return;
        }


        if (
            unit === "fahrenheit" &&
            number < -459.67
        ) {

            showError(
                "Value is below absolute zero."
            );

            return;
        }


        if (
            unit === "kelvin" &&
            number < 0
        ) {

            showError(
                "Kelvin cannot be below 0."
            );

            return;
        }


        clearError();

    }
);


// =====================================
// VALIDATION WHEN UNIT CHANGES
// =====================================

unitSelect.addEventListener(
    "change",
    function () {

        const value =
            temperatureInput.value.trim();


        if (value !== "") {

            const number =
                Number(value);


            if (!Number.isFinite(number)) {

                showError(
                    "Please enter a valid number."
                );

                return;
            }


            if (
                unitSelect.value === "celsius" &&
                number < -273.15
            ) {

                showError(
                    "Value is below absolute zero."
                );

                return;
            }


            if (
                unitSelect.value === "fahrenheit" &&
                number < -459.67
            ) {

                showError(
                    "Value is below absolute zero."
                );

                return;
            }


            if (
                unitSelect.value === "kelvin" &&
                number < 0
            ) {

                showError(
                    "Kelvin cannot be below 0."
                );

                return;
            }

        }


        clearError();

    }
);