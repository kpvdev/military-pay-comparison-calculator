// This code selects our HTML elements for the "Career 1" section
const careerOneColumn = 1;
const careerOneCalendarYear = document.getElementById("career-one-calendar-year");
const careerOneRank = document.getElementById("career-one-rank");
const careerOneYearsOfService = document.getElementById("career-one-years-of-service");
const careerOneBAH = parseFloat(document.getElementById("career-one-bah-rate").value).toFixed(2);
const careerOneSDAP = document.getElementById("career-one-sdap-rate");
const careerOneCAIP = document.getElementById("career-one-caip-rate");
const careerOneCalculateButton = document.getElementById('career-one-calculate-button');
const careerOneClearButton = document.getElementById('career-one-clear-button');

// This code selects our HTML elements for the "Career 2" section
const careerTwoColumn = 2;
const careerTwoCalendarYear = document.getElementById("career-two-calendar-year");
const careerTwoRank = document.getElementById("career-two-rank");
const careerTwoYearsOfService = document.getElementById("career-two-years-of-service");
const careerTwoBAH = parseFloat(document.getElementById("career-two-bah-rate").value).toFixed(2);
const careerTwoSDAP = document.getElementById("career-two-sdap-rate");
const careerTwoCAIP = document.getElementById("career-two-caip-rate");
const careerTwoCalculateButton = document.getElementById('career-two-calculate-button');
const careerTwoClearButton = document.getElementById('career-two-clear-button');

// This code selects our HTML element for the loading spinner
const loadingSpinner = document.getElementById('loading-spinner');

// This code attaches event listeners to our buttons in the "Career 1" and "Career 2" sections
careerOneClearButton.addEventListener('click', clearCareerOneValues);
careerOneCalculateButton.addEventListener('click', function () {
    calculatePay(careerOneCalendarYear.value, careerOneRank.value, careerOneYearsOfService.value, careerOneBAH.value, careerOneSDAP.value, careerOneColumn);
});
careerTwoClearButton.addEventListener('click', clearCareerTwoValues);
careerTwoCalculateButton.addEventListener('click', function () {
    calculatePay(careerTwoCalendarYear.value, careerTwoRank.value, careerTwoYearsOfService.value, careerTwoBAH.value, careerTwoSDAP.value, careerTwoColumn);
});

// This function is called when one of the two "Calculate" buttons is clicked
function calculatePay(calendarYear, rank, yearsOfService, bahRate, SDAPCode, careerColumn) {
    if (calendarYear === '' || rank === '' || yearsOfService === '' || bahRate === '' || SDAPCode === '') {
        showErrorModal("Please provide ALL required information.");
        return;
    } else {
        lookupPayData(calendarYear, rank, yearsOfService, bahRate, SDAPCode, careerColumn);
    }
}

async function lookupPayData(calendarYear, rank, yearsOfService, bahRate, SDAPCode, careerColumn) {

    // Look up pay data based on rank and years of service
    const monthlyBasePay = await fetchBasePay(rank, calendarYear, yearsOfService);
    const annualBasePay = (monthlyBasePay * 12).toFixed(2);

    // Calculate BAS
    const monthlyBAS = await fetchBASRate(rank, calendarYear);
    const annualBAS = (monthlyBAS * 12).toFixed(2);

    // Calculate BAH
    const monthlyBAH = getBAHRate(careerColumn);
    const annualBAH = (monthlyBAH * 12).toFixed(2);

    // Calculate SDAP
    const monthlySDAP = await fetchSDAPRate(SDAPCode, calendarYear);
    const annualSDAP = (monthlySDAP * 12).toFixed(2);

    //Calculate gross income
    const monthlyGrossIncome = (parseFloat(monthlyBasePay) + parseFloat(monthlyBAS) + parseFloat(monthlyBAH) + parseFloat(monthlySDAP)).toFixed(2);
    const annualGrossIncome = (monthlyGrossIncome * 12).toFixed(2);
    const hourlyGrossIncome = ((monthlyGrossIncome / 4) / 40).toFixed(2);

    //Calculate net income
    const monthlyNetIncome = (monthlyGrossIncome - (monthlyGrossIncome * .15)).toFixed(2);
    const annualNetIncome = (monthlyNetIncome * 12).toFixed(2);
    const hourlyNetIncome = ((monthlyNetIncome / 4) / 40).toFixed(2);

    if (careerColumn === 1) {
        // Sets "Career 1" Monthly Entitlements section
        document.getElementById("career-one-monthly-base-pay").textContent = monthlyBasePay;
        document.getElementById("career-one-monthly-bas-pay").textContent = monthlyBAS;
        document.getElementById("career-one-monthly-bah-pay").textContent = monthlyBAH;
        document.getElementById("career-one-monthly-sdap-pay").textContent = monthlySDAP;

        // Sets "Career 1" Annual Entitlements section
        document.getElementById("career-one-annual-base-pay").textContent = annualBasePay;
        document.getElementById("career-one-annual-bas-pay").textContent = annualBAS;
        document.getElementById("career-one-annual-bah-pay").textContent = annualBAH;
        document.getElementById("career-one-annual-sdap-pay").textContent = annualSDAP;

        // Sets "Career 1" Totals section
        // Gross Income Totals
        document.getElementById("career-one-annual-gross-income").textContent = annualGrossIncome;
        document.getElementById("career-one-monthly-gross-income").textContent = monthlyGrossIncome;
        document.getElementById("career-one-hourly-gross-income").textContent = hourlyGrossIncome;
        // Net Income Totals
        document.getElementById("career-one-annual-net-income").textContent = annualNetIncome;
        document.getElementById("career-one-monthly-net-income").textContent = monthlyNetIncome;
        document.getElementById("career-one-hourly-net-income").textContent = hourlyNetIncome;
    } else if (careerColumn === 2) {
        // Sets "Career 2" Monthly Entitlements section
        document.getElementById("career-two-monthly-base-pay").textContent = monthlyBasePay;
        document.getElementById("career-two-monthly-bas-pay").textContent = monthlyBAS;
        document.getElementById("career-two-monthly-bah-pay").textContent = monthlyBAH
        document.getElementById("career-two-monthly-sdap-pay").textContent = monthlySDAP;

        // Sets "Career 2" Annual Entitlements section
        document.getElementById("career-two-annual-base-pay").textContent = annualBasePay;
        document.getElementById("career-two-annual-bas-pay").textContent = annualBAS;
        document.getElementById("career-two-annual-bah-pay").textContent = annualBAH;
        document.getElementById("career-two-annual-sdap-pay").textContent = annualSDAP;

        // Sets "Career 2" Totals section
        // Gross Income Totals
        document.getElementById("career-two-annual-gross-income").textContent = annualGrossIncome;
        document.getElementById("career-two-monthly-gross-income").textContent = monthlyGrossIncome;
        document.getElementById("career-two-hourly-gross-income").textContent = hourlyGrossIncome;
        // Net Income Totals
        document.getElementById("career-two-annual-net-income").textContent = annualNetIncome;
        document.getElementById("career-two-monthly-net-income").textContent = monthlyNetIncome;
        document.getElementById("career-two-hourly-net-income").textContent = hourlyNetIncome;
    } else {
        showErrorModal("Something went wrong :(");
        return;
    }
}

function getBAHRate(columnNumber) {
    if (columnNumber === 1) {
        return parseFloat(document.getElementById("career-one-bah-rate").value).toFixed(2);
    } else {
        return parseFloat(document.getElementById("career-two-bah-rate").value).toFixed(2);
    }
}

function clearCareerOneValues() {
    // Clears "Career 1" Required Information section
    document.getElementById("career-one-calendar-year").value = "";
    document.getElementById("career-one-rank").value = "";
    document.getElementById("career-one-years-of-service").value = "";
    document.getElementById("career-one-bah-rate").value = "";
    document.getElementById("career-one-sdap-rate").value = "";
    document.getElementById("career-one-caip-rate").value = "";

    // Clears "Career 1" Monthly Entitlements section
    document.getElementById("career-one-monthly-base-pay").textContent = "";
    document.getElementById("career-one-monthly-bas-pay").textContent = "";
    document.getElementById("career-one-monthly-bah-pay").textContent = "";
    document.getElementById("career-one-monthly-sdap-pay").textContent = "";

    // Clears "Career 1" Annual Entitlements section
    document.getElementById("career-one-annual-base-pay").textContent = "";
    document.getElementById("career-one-annual-bas-pay").textContent = "";
    document.getElementById("career-one-annual-bah-pay").textContent = "";
    document.getElementById("career-one-annual-sdap-pay").textContent = "";

    // Clears "Career 1" Totals section
    // Gross Income Totals
    document.getElementById("career-one-annual-gross-income").textContent = "";
    document.getElementById("career-one-monthly-gross-income").textContent = "";
    document.getElementById("career-one-hourly-gross-income").textContent = "";
    // Net Income Totals
    document.getElementById("career-one-annual-net-income").textContent = "";
    document.getElementById("career-one-monthly-net-income").textContent = "";
    document.getElementById("career-one-hourly-net-income").textContent = "";
}

function clearCareerTwoValues() {
    // Clears "Career 2" Required Information section
    document.getElementById("career-two-calendar-year").value = "";
    document.getElementById("career-two-rank").value = "";
    document.getElementById("career-two-years-of-service").value = "";
    document.getElementById("career-two-bah-rate").value = "";
    document.getElementById("career-two-sdap-rate").value = "";
    document.getElementById("career-two-caip-rate").value = "";

    // Clears "Career 2" Monthly Entitlements section
    document.getElementById("career-two-monthly-base-pay").textContent = "";
    document.getElementById("career-two-monthly-bas-pay").textContent = "";
    document.getElementById("career-two-monthly-bah-pay").textContent = "";
    document.getElementById("career-two-monthly-sdap-pay").textContent = "";

    // Clears "Career 2" Annual Entitlements section
    document.getElementById("career-two-annual-base-pay").textContent = "";
    document.getElementById("career-two-annual-bas-pay").textContent = "";
    document.getElementById("career-two-annual-bah-pay").textContent = "";
    document.getElementById("career-two-annual-sdap-pay").textContent = "";

    // Clears "Career 2" Totals section
    // Gross Income Totals
    document.getElementById("career-two-annual-gross-income").textContent = "";
    document.getElementById("career-two-monthly-gross-income").textContent = "";
    document.getElementById("career-two-hourly-gross-income").textContent = "";
    // Net Income Totals
    document.getElementById("career-two-annual-net-income").textContent = "";
    document.getElementById("career-two-monthly-net-income").textContent = "";
    document.getElementById("career-two-hourly-net-income").textContent = "";
}

function formatCurrency() {
    let careerOneBAHRate = parseFloat(document.getElementById("career-one-bah-rate").value).toFixed(2)
    let careerTwoBAHRate = parseFloat(document.getElementById("career-two-bah-rate").value).toFixed(2)
    document.getElementById("career-one-bah-rate").value = careerOneBAHRate
    document.getElementById("career-two-bah-rate").value = careerTwoBAHRate
}

function showErrorModal(errorMessage) {
    const errorModal = document.getElementById('error-modal');
    const errorMessageElement = document.getElementById('error-message');
    const closeButton = document.getElementById('close-error-modal');

    // Set the error message
    errorMessageElement.textContent = errorMessage;

    // Show the error modal
    errorModal.style.display = 'block';

    // Close the error modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        errorModal.style.display = 'none';
    });
}

// TODO
// Scroll into view when the "Calculate Disparity" button is pressed.
// Once clicked, it unhides the summary element.
// A summarization of the pay disparity should be displayed.
// A "Start Over" button should appear at the bottom of the summarization.
// It should hide the summary and reset ALL the fields.

function fetchBasePay(payGrade, calendarYear, yearsOfService) {
    const jsonPath = `entitlements/${calendarYear}/${calendarYear}-Base-Pay.json`;
    loadingSpinner.style.display = "block";
    return fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            const basePay = data[payGrade][yearsOfService];
            // console.log(`The base pay for an ${payGrade} with ${yearsOfService} years of service, in ${calendarYear}, is $${basePay.toFixed(2)}.`);
            loadingSpinner.style.display = "none";
            return basePay.toFixed(2);
        })
        .catch(error => {
            loadingSpinner.style.display = "none";
            console.error(error);
        });
}

function fetchBASRate(payGrade, calendarYear) {
    const jsonPath = `entitlements/${calendarYear}/${calendarYear}-BAS-Rates.json`;
    loadingSpinner.style.display = "block";
    return fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            let BASRate;
            if (payGrade.match(/^E.*/)) {
                BASRate = data["enlisted"];
            } else if (payGrade.match(/^O.*/)) {
                BASRate = data["officer"];
            } else {
                BASRate = data["BASII"];
            }
            // console.log(`The BAS rate for ${payGrade} in ${calendarYear} is $${BASRate.toFixed(2)}.`);
            loadingSpinner.style.display = "none";
            return BASRate.toFixed(2);
        })
        .catch(error => {
            loadingSpinner.style.display = "none";
            console.error(error);
        });
}

function fetchSDAPRate(SDAPCode, calendarYear) {
    const jsonPath = `entitlements/${calendarYear}/${calendarYear}-SDAP-Rates.json`;
    loadingSpinner.style.display = "block";
    return fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            const SDAPRate = data[SDAPCode];
            // console.log(`The SDAP Rate for ${SDAPCode} in ${calendarYear} is $${SDAPRate.toFixed(2)}.`);
            loadingSpinner.style.display = "none";
            return SDAPRate.toFixed(2);
        })
        .catch(error => {
            loadingSpinner.style.display = "none";
            console.error(error);
        });
}