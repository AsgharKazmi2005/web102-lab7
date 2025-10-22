import { useEffect, useState } from "react"
import CoinInfo from "./components/CoinInfo"
import SideNav from "./components/SideNav"

const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    async function fetchAllCoinData() {
      const res = await fetch(
        `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=30&tsym=USD&api_key=${API_KEY}`
      )
      const data = await res.json()
      setList(data)
    }

    fetchAllCoinData().catch(console.error)
  }, [])

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchValue !== "") {
      const filteredData = list?.Data.filter((item) =>
        Object.values(item.CoinInfo)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(list?.Data || [])
    }
  }

  return (
    <div className="whole-page">
      <SideNav />
      <div className="main-content">
        <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <ul>
          {list ? (
            (searchInput.length > 0 ? filteredResults : list.Data)
              .filter(
                (coinData) =>
                  coinData.CoinInfo.Algorithm !== "N/A" &&
                  coinData.CoinInfo.ProofType !== "N/A"
              )
              .map((coinData) => (
                <CoinInfo
                  key={coinData.CoinInfo.Id}
                  image={coinData.CoinInfo.ImageUrl}
                  name={coinData.CoinInfo.FullName}
                  symbol={coinData.CoinInfo.Name}
                />
              ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
