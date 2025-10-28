import { useEffect, useState } from "react"
import { Link } from "react-router"
const API_KEY = import.meta.env.VITE_APP_API_KEY

function CoinInfo({ image, name, symbol }) {
  const [price, setPrice] = useState(null)

  useEffect(() => {
    async function getCoinPrice() {
      const res = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
      )
      const data = await res.json()
      setPrice(data)
    }
    getCoinPrice().catch(console.error)
  }, [symbol])

  return (
    <div>
      {price ? (
        <li className="main-list" key={symbol}>
          <Link style={{ color: "white", textDecoration: "none" }} to={`/coinDetails/${symbol}`}>
            <img
              className="icons"
              src={`https://www.cryptocompare.com${image}`}
              alt={`Small icon for ${name} crypto coin`}
            />
            <strong>{name}</strong>
            <span className="tab"></span>
            <span>${price.USD?.toLocaleString()} USD</span>
          </Link>
        </li>
      ) : null}
    </div>
  )
}

export default CoinInfo
