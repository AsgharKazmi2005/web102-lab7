import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY

function CryptoNews() {
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    async function fetchNews() {
      const res = await fetch(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`
      )
      const data = await res.json()
      setNewsList(data.Data.slice(0, 10))
    }

    fetchNews().catch(console.error)
  }, [])

  return (
    <ul className="news-list">
      {newsList.length > 0 ? (
        newsList.map((article) => (
          <li key={article.id}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))
      ) : (
        <p>Loading news...</p>
      )}
    </ul>
  )
}

export default CryptoNews
