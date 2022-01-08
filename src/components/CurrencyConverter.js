import {useState} from 'react'
import ExchangeRate from "./ExchangeRate";
import axios from 'axios'

const CurrencyConverter = () => {
    const currencies = ['BTC','ETH', 'USD', 'XRP', 'LTC', 'ADA', 'BRL']
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BRL')
    const [amount, setAmount] = useState()
/*     const [exchangeRate, setExchangeRate] = useState(0) */
    const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState('BTC')
    const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('BRL')

    const [exchangedData, setExchangedData] = useState({
      primaryCurrency: 'BTC',
      secondaryCurrency: 'BRL',
      exchangeRate: 0
    })

    const [result, setResult] = useState(0)

    const convert = () =>{
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {to_currency: chosenSecondaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', from_currency: chosenPrimaryCurrency},
            headers: {
              'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
              'x-rapidapi-key': 'e3470193dfmsh901755f2c4fefdbp1605d2jsneb06bc3895eb'
            }
          }
          
          axios.request(options).then((response) => {
              console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
/*               setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']) */
              setResult (response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
/*               setPrimaryCurrencyExchanged(chosenPrimaryCurrency)
              setSecondaryCurrencyExchanged(chosenSecondaryCurrency) */
              setExchangedData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrancy: chosenSecondaryCurrency,
                exchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
              })
          }).catch((error) => {
              console.error(error)
          })
    }

    console.log(exchangedData)

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="input-box">
        <table>
          <tbody>
            <tr>
              <td>Primary Currency:</td>
              <td>
                <input 
                    type="number" 
                    name="currency-amount-1" 
                    value={amount}
                    nChange ={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <select
                  value={chosenPrimaryCurrency}
                  name="currency-option-1"
                  className="currency-options"
                  onChange={(e)=> setChosenPrimaryCurrency(e.target.value)}
                >
                 {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Secondary Currency:</td>
              <td>
                <input type="number" name="currency-amount-2" value={result} disabled={true} />
              </td>
              <td>
                <select
                  value={chosenSecondaryCurrency}
                  name="currency-option-2"
                  className="currency-options"
                  onChange={(e)=> setChosenSecondaryCurrency(e.target.value)}
                >
                  {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <button id="convert-button" onClick={convert}>Convert</button>
      </div>
      <ExchangeRate
        exchangedData = {exchangedData}
/*         chosenPrimaryCurrency={primaryCurrencyExchanged}
        chosenSecondaryCurrency={secondaryCurrencyExchanged} */
      />
    </div>
  );
};

export default CurrencyConverter;
