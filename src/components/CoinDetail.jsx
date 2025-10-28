import { useParams } from "react-router"
import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY

function CoinDetail() {
  const { symbol } = useParams()
  const [details, setDetails] = useState(null)

  useEffect(() => {
    async function fetchCoinDetails() {
      const res = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`
      )
      const allCoins = await res.json()
      const coin = allCoins.Data[symbol]
      if (!coin) return

      const priceRes = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
      )
      const priceData = await priceRes.json()
      const priceInfo = priceData.RAW[symbol]?.USD || {}

      setDetails({
        ...coin,
        priceInfo,
      })
    }

    fetchCoinDetails().catch(console.error)
  }, [symbol])

  if (!details) return <p className="loading">Loading details...</p>

  return (
    <div className="coin-detail">
      <h1>{details.FullName}</h1>
      <img
        className="detail-icon"
        src={`https://www.cryptocompare.com${details.ImageUrl}`}
        alt={`${details.FullName} logo`}
      />
      <p className="description">
        {details.Description
          ? details.Description
          : "No description available for this currency."}
      </p>

      <table className="detail-table">
        <tbody>
          <tr>
            <td>Algorithm</td>
            <td>{details.Algorithm || "N/A"}</td>
          </tr>
          <tr>
            <td>Proof Type</td>
            <td>{details.ProofType || "N/A"}</td>
          </tr>
          <tr>
            <td>Market Cap</td>
            <td>${details.priceInfo.MKTCAP?.toLocaleString() || "N/A"}</td>
          </tr>
          <tr>
            <td>Volume (24h)</td>
            <td>${details.priceInfo.TOTALVOLUME24H?.toLocaleString() || "N/A"}</td>
          </tr>
          <tr>
            <td>Open Day</td>
            <td>${details.priceInfo.OPENDAY || "N/A"}</td>
          </tr>
          <tr>
            <td>High Day</td>
            <td>${details.priceInfo.HIGHDAY || "N/A"}</td>
          </tr>
          <tr>
            <td>Low Day</td>
            <td>${details.priceInfo.LOWDAY || "N/A"}</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>
              {details.AssetWebsiteUrl ? (
                <a href={details.AssetWebsiteUrl} target="_blank">
                  Visit Site
                </a>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CoinDetail
