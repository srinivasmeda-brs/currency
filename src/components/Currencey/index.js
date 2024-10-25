import { useEffect, useState } from "react";
import "./index.css"; // Import CSS file for styling

const Currency = () => {
    const [rates, setRates] = useState({});
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
            .then(response => response.json())
            .then(data => {
                setRates(data.rates);
                setConvertedAmount(data.rates[toCurrency] * amount); // Initial conversion
            });
    }, []);

    const convertCurrency = () => {
        if (rates[toCurrency]) {
            const result = (amount * rates[toCurrency] / rates[fromCurrency]).toFixed(2);
            setConvertedAmount(result);
        }
    };

    return (
        <div className="currency-converter">
            <h1>Currency Converter</h1>
            <div className="converter">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    {Object.keys(rates).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                <span> to </span>
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    {Object.keys(rates).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                <button onClick={convertCurrency}>Convert</button>
            </div>
            {convertedAmount > 0 && (
                <h2>
                    Converted Amount: {convertedAmount} {toCurrency}
                </h2>
            )}
        </div>
    );
};

export default Currency;
