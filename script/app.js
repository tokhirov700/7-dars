const $exchangeForm = document.querySelector("#exchange-form");
const $updateForm = document.querySelector("#update-form");
const $usdInput = document.querySelector("#usd-amount");
const $eurInput = document.querySelector("#eur-amount");
const $sumInput = document.querySelector("#sum-amount");
const $baseCurrencyInput = document.querySelector("#base");
const $resultUpdate = document.querySelector("#result-update");
const $amountInput = document.querySelector("#amount");
const $fromSelect = document.querySelector("#from");
const $toSelect = document.querySelector("#to");
const $resultExchange = document.querySelector("#result-exchange");

let rates = {
    USD: {
        USD: 1,
        SUM: 12000,
        EUR: 0.87
    },
    EUR: {
        EUR: 1,
        SUM: 13000,
        USD: 1.17
    },
    SUM: {
        SUM: 1,
        USD: 0.00008,
        EUR: 0.00005
    }
}

localStorage.setItem("rates", JSON.stringify(rates));
const ratesInLS = JSON.parse(localStorage.getItem("rates"));

const exchangeCurrency = (e) => {
    e.preventDefault();
    let amount = +$amountInput.value;
    let from = $fromSelect.value;
    let to = $toSelect.value
    let result = (amount / ratesInLS[from][from]) * ratesInLS[from][to]
    $resultExchange.innerHTML = `
        ${amount} ${from} = ${result} ${to}
        <br>
        Buy: ${ratesInLS[from][to] - ratesInLS[from][to] * 0.05} ${to}
        <br>
        Sell: ${ratesInLS[from][to] + ratesInLS[from][to] * 0.05} ${to}
    `
}

const updateRates = (e) => {
    e.preventDefault();
    let usdAmount = $usdInput.value;
    let eurAmount = $eurInput.value;
    let sumAmount = $sumInput.value;
    let base = $baseCurrencyInput.value;
    ratesInLS[base]["USD"] = +usdAmount;
    ratesInLS[base]["EUR"] = +eurAmount;
    ratesInLS[base]["SUM"] = +sumAmount;
    localStorage.setItem("rates", JSON.stringify(ratesInLS));
}

$exchangeForm.addEventListener("submit", exchangeCurrency);
$updateForm.addEventListener("submit", updateRates);
$amountInput.addEventListener("input", () => {
    $amountInput.value = $amountInput.value.replace(/-/g, "")
})