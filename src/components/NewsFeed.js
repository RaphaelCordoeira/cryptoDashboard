import { useEffect, useState } from 'react';
import axios from 'axios'

const NewsFeed = () => {

    const [articles, setArticles] = useState(null)

    useEffect(()=> {

          const options = {
            method: 'GET',
            url: 'https://crypto-news-live.p.rapidapi.com/news',
            headers: {
              'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
              'x-rapidapi-key': 'e3470193dfmsh901755f2c4fefdbp1605d2jsneb06bc3895eb'
            }
          };

          axios.request(options).then((response)=> {
            console.log(response.data)
            setArticles(response.data)

          }).catch((error) => {
            console.error(error)
          })
    }, [])

    console.log(articles)

    const first7Articles = articles?.slice(0,7)

    return (
      <div className="news-feed">
        <h2>News Feed</h2>
         {first7Articles?.map((article, _index) => (<div key={_index}>
               <a href={article.url} target="_blank"><p>{article.title}</p></a>
          </div>))}
      </div>
    )
  }

  export default NewsFeed