import axios from 'axios'
import React, { useEffect, useState } from 'react'

export function App() {
  const [currencyBase, setCurrencyBase] = useState('USD')
  const [currencyAmount, setCurrencyAmount] = useState(1)
  const [currencies, setCurrencies] = useState({})

  useEffect(async () => {
    const response = await axios.get(
      `https://api.ratesapi.io/api/latest?base=${currencyBase}`
    )
    setCurrencies(response.data.rates)
  }, [currencyBase])

  return (
    <div>
      <header>
        <h1>Currency Conversion Calculator</h1>
      </header>
      <main>
        <form>
          <input
            list="currencySelector"
            value=""
            onChange={(event) => {
              setCurrencyBase(event.target.value)
            }}
          />
          <datalist id="currencySelector">
            {Object.keys(currencies).map((currency, index) => (
              <option key={index} value={currency} />
            ))}
          </datalist>
          <section>
            <h3>{currencyBase} Amount: </h3>
            <input
              type="text"
              value={currencyAmount}
              onChange={(event) => {
                const currencyAmountAsNumber = Number.parseFloat(
                  event.target.value
                )
                if (
                  Number.isNaN(currencyAmountAsNumber) ||
                  currencyAmountAsNumber < 0.009
                ) {
                  setCurrencyAmount(1)
                  return
                }
                setCurrencyAmount(currencyAmountAsNumber)
              }}
            />
          </section>
        </form>
        <ul>
          {Object.keys(currencies).map((currency, index) => (
            <li key={index}>
              {currency}:{' '}
              {Number.parseFloat(currencies[currency] * currencyAmount).toFixed(
                2
              )}
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <h2>Created by Jerid Fenderson</h2>
      </footer>
    </div>
  )
}
