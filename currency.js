const BASE_URL = "https://api.apilayer.com/fixer/latest";
const API_KEY = "eASO1QaKQ0pTsYu98vUjowaZlu14cexm";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExhnageRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = 1;
    }

    const URL = `${BASE_URL}?base=${fromCurr.value}&symbols=${toCurr.value}`;
    let response = await fetch(URL, {
        method: 'GET',
        headers: {
            'apikey': API_KEY
        }
    });

    if (response.ok) {
        let data = await response.json();
        let rate = data.rates[toCurr.value];
        let finalAmount = amtval * rate;
        msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } else {
        msg.innerText = "Failed to fetch exchange rate.";
    }
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExhnageRate();
});

window.addEventListener("load", () => {
    updateExhnageRate();
});
