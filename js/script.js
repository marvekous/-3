const rateEl = document.getElementById("rate");
const swapEl = document.getElementById("swap");
const currencyOneEl = document.getElementById("currency-one");
const currencyTwoEl = document.getElementById("currency-two");
const amountOneEl = document.getElementById("amount-one");
const amountTwoEl = document.getElementById("amount-two");

let dataFromBack = {};

const getData = () => {
    const currencyOne = currencyOneEl.value;
    const currencyTwo = currencyTwoEl.value;

    fetch(`https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const { conversion_rates } = data;
        dataFromBack = {...conversion_rates};
        calculateRates(currencyTwo,conversion_rates);
        rateEl.innerText = `1 ${currencyOne} = ${conversion_rates[currencyTwo]} ${currencyTwo}`

    });
};


const calculateRates = (currencyTwo, data) => {
    const rate = data[currencyTwo];
    amountTwoEl.value = (+amountOneEl.value * rate).toFixed(2);
};

const runCalculate = () => calculateRates(currencyTwoEl.value, dataFromBack);


getData()

const swap = () => {
    const currencyOne = currencyOneEl.value;
    const currencyTwo = currencyTwoEl.value ;
    const calculateRates = (currencyTwo, data) => {
        const rate = data[currencyTwo];
        amountTwoEl.value = (+amountOneEl.value * rate).toFixed(2);
    };
    currencyOneEl.value = currencyTwo
    currencyTwoEl.value = currencyOne
}
swapEl.addEventListener('click', function(){
    swap()
    runCalculate()
    getData()
});

amountOneEl.addEventListener("input", runCalculate);
currencyOneEl.addEventListener("change", getData);
currencyTwoEl.addEventListener("change", runCalculate);
