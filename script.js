const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// buscar tipos de cambio y actualizar el DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://v6.exchangerate-api.com/v6/eafe19239253ca2c3fa6aaa0/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      window.localStorage.setItem('rates_all', JSON.stringify(data.conversion_rates));
      const rate = data.conversion_rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
    if (amountEl_one.value <= 0){
        alert("La cantidad seleccionada es 0");
    }
    return 
    
}
function calculate_from (){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
   const rates_all = JSON.parse(window.localStorage.getItem('rates_all'));
   const rate = rates_all[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
      if (amountEl_one.value <= 0){
        alert("La cantidad seleccionada es 0");
    }
    return 
   
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate_from);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();