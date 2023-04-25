// This code selects our HTML elements for the "Career 1" section
const careerOneColumn = 1;
const careerOneRank = document.getElementById("career-one-rank");
const careerOneYearsOfService = document.getElementById("career-one-years-of-service");
const careerOneBAH = parseFloat(document.getElementById("career-one-bah-rate").value).toFixed(2);
const careerOneSDAP = document.getElementById("career-one-sdap-rate");
const careerOneCAIP = document.getElementById("career-one-caip-rate");
const careerOneCalculateButton = document.getElementById('career-one-calculate-button');
const careerOneClearButton = document.getElementById('career-one-clear-button');

// This code selects our HTML elements for the "Career 2" section
const careerTwoColumn = 2;
const careerTwoRank = document.getElementById("career-two-rank");
const careerTwoYearsOfService = document.getElementById("career-two-years-of-service");
const careerTwoBAH = parseFloat(document.getElementById("career-two-bah-rate").value).toFixed(2);
const careerTwoSDAP = document.getElementById("career-two-sdap-rate");
const careerTwoCAIP = document.getElementById("career-two-caip-rate");
const careerTwoCalculateButton = document.getElementById('career-two-calculate-button');
const careerTwoClearButton = document.getElementById('career-two-clear-button');

// This code attaches event listeners to our buttons in the "Career 1" and "Career 2" sections
careerOneClearButton.addEventListener('click', clearCareerOneValues);
careerOneCalculateButton.addEventListener('click', function () {
    calculatePay(careerOneRank, careerOneYearsOfService, careerOneBAH, careerOneSDAP, careerOneColumn);
});
careerTwoClearButton.addEventListener('click', clearCareerTwoValues);
careerTwoCalculateButton.addEventListener('click', function () {
    calculatePay(careerTwoRank, careerTwoYearsOfService, careerTwoBAH, careerTwoSDAP, careerTwoColumn);
});

// This function is called when one of the two "Calculate" buttons is clicked
function calculatePay(rank, yearsOfService, bahRate, sdapRate, careerColumn) {
    if (rank.value === '' || yearsOfService.value === '' || bahRate.value === '' || sdapRate.value === '') {
        showErrorModal("Please provide ALL required information.");
        return;
    } else {
        lookupPayData(rank, yearsOfService, bahRate, sdapRate, careerColumn);
    }
}

function lookupPayData(rank, yearsOfService, bahRate, sdapRate, careerColumn) {

    // SDAP Rates
    const sdapData = {
        'SD-0': 0,
        'SD-1': 75.00,
        'SD-2': 150.00,
        'SD-3': 225.00,
        'SD-4': 300.00,
        'SD-5': 375.00,
        'SD-6': 450.00
    };

    // Define pay data for each rank and years of service
    const payData = {
        'E1': {
            '0': 1917.60,
            '2': 1917.60,
            '3': 1917.60,
            '4': 1917.60,
            '6': 1917.60,
            '8': 1917.60,
            '10': 1917.60,
            '12': 1917.60,
            '14': 1917.60,
            '16': 1917.60,
            '18': 1917.60,
            '20': 1917.60,
            '22': 1917.60,
            '24': 1917.60,
            '26': 1917.60,
            '28': 1917.60,
            '30': 1917.60,
            '32': 1917.60,
            '34': 1917.60,
            '36': 1917.60,
            '38': 1917.60,
            '40': 1917.60
        },
        'E2': {
            '0': 2149.20,
            '2': 2149.20,
            '3': 2149.20,
            '4': 2149.20,
            '6': 2149.20,
            '8': 2149.20,
            '10': 2149.20,
            '12': 2149.20,
            '14': 2149.20,
            '16': 2149.20,
            '18': 2149.20,
            '20': 2149.20,
            '22': 2149.20,
            '24': 2149.20,
            '26': 2149.20,
            '28': 2149.20,
            '30': 2149.20,
            '32': 2149.20,
            '34': 2149.20,
            '36': 2149.20,
            '38': 2149.20,
            '40': 2149.20
        },
        'E3': {
            '0': 2259.90,
            '2': 2402.10,
            '3': 2547.60,
            '4': 2547.60,
            '6': 2547.60,
            '8': 2547.60,
            '10': 2547.60,
            '12': 2547.60,
            '14': 2547.60,
            '16': 2547.60,
            '18': 2547.60,
            '20': 2547.60,
            '22': 2547.60,
            '24': 2547.60,
            '26': 2547.60,
            '28': 2547.60,
            '30': 2547.60,
            '32': 2547.60,
            '34': 2547.60,
            '36': 2547.60,
            '38': 2547.60,
            '40': 2547.60
        },
        'E4': {
            '0': 2503.50,
            '2': 2631.60,
            '3': 2774.10,
            '4': 2914.80,
            '6': 3039.30,
            '8': 3039.30,
            '10': 3039.30,
            '12': 3039.30,
            '14': 3039.30,
            '16': 3039.30,
            '18': 3039.30,
            '20': 3039.30,
            '22': 3039.30,
            '24': 3039.30,
            '26': 3039.30,
            '28': 3039.30,
            '30': 3039.30,
            '32': 3039.30,
            '34': 3039.30,
            '36': 3039.30,
            '38': 3039.30,
            '40': 3039.30
        },
        'E5': {
            '0': 2730.30,
            '2': 2914.20,
            '3': 3055.20,
            '4': 3199.20,
            '6': 3423.90,
            '8': 3658.50,
            '10': 3851.70,
            '12': 3874.80,
            '14': 3874.80,
            '16': 3874.80,
            '18': 3874.80,
            '20': 3874.80,
            '22': 3874.80,
            '24': 3874.80,
            '26': 3874.80,
            '28': 3874.80,
            '30': 3874.80,
            '32': 3874.80,
            '34': 3874.80,
            '36': 3874.80,
            '38': 3874.80,
            '40': 3874.80
        },
        'E6': {
            '0': 2980.50,
            '2': 3279.90,
            '3': 3424.80,
            '4': 3565.50,
            '6': 3711.90,
            '8': 4042.20,
            '10': 4170.90,
            '12': 4419.90,
            '14': 4496.10,
            '16': 4551.30,
            '18': 4616.40,
            '20': 4616.40,
            '22': 4616.40,
            '24': 4616.40,
            '26': 4616.40,
            '28': 4616.40,
            '30': 4616.40,
            '32': 4616.40,
            '34': 4616.40,
            '36': 4616.40,
            '38': 4616.40,
            '40': 4616.40
        },
        'E7': {
            '0': 3445.80,
            '2': 3760.80,
            '3': 3905.10,
            '4': 4095.30,
            '6': 4244.70,
            '8': 4500.60,
            '10': 4644.90,
            '12': 4900.50,
            '14': 5113.50,
            '16': 5258.70,
            '18': 5413.50,
            '20': 5473.20,
            '22': 5674.50,
            '24': 5782.50,
            '26': 6193.50,
            '28': 6193.50,
            '30': 6193.50,
            '32': 6193.50,
            '34': 6193.50,
            '36': 6193.50,
            '38': 6193.50,
            '40': 6193.50
        },
        'E8': {
            '0': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '6': 0,
            '8': 4957.20,
            '10': 5176.50,
            '12': 5312.10,
            '14': 5474.70,
            '16': 5650.80,
            '18': 5968.80,
            '20': 6130.20,
            '22': 6404.40,
            '24': 6556.50,
            '26': 6930.90,
            '28': 6930.90,
            '30': 7069.80,
            '32': 7069.80,
            '34': 7069.80,
            '36': 7069.80,
            '38': 7069.80,
            '40': 7069.80
        },
        'E9': {
            '0': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '6': 0,
            '8': 0,
            '10': 6055.50,
            '12': 6192.90,
            '14': 6365.70,
            '16': 6568.80,
            '18': 6774.90,
            '20': 7102.80,
            '22': 7381.50,
            '24': 7673.70,
            '26': 8121.60,
            '28': 8121.60,
            '30': 8526.90,
            '32': 8526.90,
            '34': 8953.80,
            '36': 8953.80,
            '38': 9402.30,
            '40': 9402.30
        },
        'O1E': {
            '0': 0,
            '2': 0,
            '3': 0,
            '4': 4576.80,
            '6': 4887.00,
            '8': 5067.90,
            '10': 5252.70,
            '12': 5433.90,
            '14': 5682.60,
            '16': 5682.60,
            '18': 5682.60,
            '20': 5682.60,
            '22': 5682.60,
            '24': 5682.60,
            '26': 5682.60,
            '28': 5682.60,
            '30': 5682.60,
            '32': 5682.60,
            '34': 5682.60,
            '36': 5682.60,
            '38': 5682.60,
            '40': 5682.60
        },
        'O2E': {
            '0': 0,
            '2': 0,
            '3': 0,
            '4': 5682.60,
            '6': 5799.30,
            '8': 5983.80,
            '10': 6295.50,
            '12': 6536.70,
            '14': 6715.80,
            '16': 6715.80,
            '18': 6715.80,
            '20': 6715.80,
            '22': 6715.80,
            '24': 6715.80,
            '26': 6715.80,
            '28': 6715.80,
            '30': 6715.80,
            '32': 6715.80,
            '34': 6715.80,
            '36': 6715.80,
            '38': 6715.80,
            '40': 6715.80
        },
        'O3E': {
            '0': 0,
            '2': 0,
            '3': 0,
            '4': 6469.80,
            '6': 6780.30,
            '8': 7120.50,
            '10': 7340.10,
            '12': 7701.60,
            '14': 8007.00,
            '16': 8182.50,
            '18': 8421.00,
            '20': 8421.00,
            '22': 8421.00,
            '24': 8421.00,
            '26': 8421.00,
            '28': 8421.00,
            '30': 8421.00,
            '32': 8421.00,
            '34': 8421.00,
            '36': 8421.00,
            '38': 8421.00,
            '40': 8421.00
        },
        // Define pay data for other ranks and years of service
    };

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