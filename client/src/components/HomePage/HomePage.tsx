import  { useState, useEffect } from 'react';
import axios from 'axios';
import MarketNewsTable from './MarketNewsTable';


const HomePage = () => {
  const [marketNews, setMarketNews] = useState([])


  useEffect(()  => {
  async function getMarketNews(){
    try {
      const response = await axios.get('/api/marketNews')
      console.log(response.data)
      setMarketNews(response.data)
      
     
    } catch (error) {
      console.error(error)
    }
  
  }
  getMarketNews()
  },[])

  const marketNewsTable = marketNews.map(( news) => {
    return (
      <MarketNewsTable
        key={news['id']}
        news={news}
      />
    )
  })



  
  return (
    <>
    <div>HomePage</div>
    <div id="newsTable">{marketNewsTable}</div>
    </>
  )
}

export default HomePage