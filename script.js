const apiUrl = 'https://open.er-api.com/v6/latest/USD';

document.addEventListener('DOMContentLoaded', function() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const currencyKeys = Object.keys(data.rates);
                const fromCurrencySelect = document.getElementById('fromCurrency');
                const toCurrencySelect = document.getElementById('toCurrency');

                // Cargar las opciones de moneda en los selectores
                currencyKeys.forEach(currency => {
                    let option1 = document.createElement('option');
                    option1.value = currency;
                    option1.textContent = currency;
                    fromCurrencySelect.appendChild(option1);

                    let option2 = document.createElement('option');
                    option2.value = currency;
                    option2.textContent = currency;
                    toCurrencySelect.appendChild(option2);
                });

                document.getElementById('convertButton').addEventListener('click', function() {
                    const amount = document.getElementById('amount').value;
                    const fromCurrency = document.getElementById('fromCurrency').value;
                    const toCurrency = document.getElementById('toCurrency').value;

                    if (amount === '') {
                        alert('Por favor, ingresa una cantidad.');
                        return;
                    }

                    const fromRate = data.rates[fromCurrency];
                    const toRate = data.rates[toCurrency];
                    const result = (amount / fromRate) * toRate;

                    document.getElementById('result').innerText = `${amount} ${fromCurrency} equivale a ${result.toFixed(2)} ${toCurrency}`;
                });
            } else {
                alert('Error al obtener las tasas de cambio.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al obtener las tasas de cambio.');
        });
});
