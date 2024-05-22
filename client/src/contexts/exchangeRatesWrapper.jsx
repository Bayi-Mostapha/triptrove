import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ExchangeRateContext = createContext({
    selectedCurrency: 'MAD',
    setSelectedCurrency: () => { },
    loading: true,
    convert: () => { }
});

const ExchangeRateProvider = ({ children }) => {
    const [exchangeRates, setExchangeRates] = useState(1);
    const [selectedCurrency, setSelectedCurrency] = useState('MAD');
    const [loading, setLoading] = useState(true);

    const fetchExchangeRates = useCallback(async () => {
        if (selectedCurrency != 'MAD')
            try {
                const response = await axios
                    .get(`https://v6.exchangerate-api.com/v6/28cc78d068c2f63f4f0847ee/pair/MAD/${selectedCurrency}`);
                    console.log(response)
                setExchangeRates(response.data.conversion_rate);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
    }, [selectedCurrency]);

    useEffect(() => {
        fetchExchangeRates();
    }, [fetchExchangeRates]);

    function convert(ammount) {
        return ammount * exchangeRates;
    }

    return (
        <ExchangeRateContext.Provider value={{
            selectedCurrency,
            setSelectedCurrency,
            loading,
            convert
        }}>
            {children}
        </ExchangeRateContext.Provider>
    );
};

export { ExchangeRateProvider, ExchangeRateContext };
