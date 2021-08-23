import axios from "axios";
import React, { useState, useEffect } from "react";

export default function App() {
  const [quotes, setQuotes] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://api.quotable.io/random?tags=technology,famous-quotes"
    );
    setQuotes((latest) => {
      const { dateAdded, content, author, _id } = response.data;
      console.log(latest.length);
      if (!latest.some((quote) => quote.content === content)) {
        return [...latest, { _id, dateAdded, content, author }];
      } else {
        return latest;
      }
    });
  };

  useEffect(() => {
    fetchData();
    const quoteFetchingInterval = setInterval(fetchData, 5000);
    return () => clearInterval(quoteFetchingInterval);
  }, []);

  return (
    <div className="App">
      <h1>Enis Quotes</h1>
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>
        <br />
      </div>

      {/* Display data from API */}
      <div className="quotes">
        {quotes &&
          quotes.map((quote, index) => {
            const cleanedDate = new Date(quote.dateAdded).toDateString();
            const { content, author } = quote;
            return (
              <div className="book" key={index}>
                <h3>Quote {index + 1}</h3>
                <h2>"{content}"</h2>
                <div className="details">
                  <p>author: {author}</p>
                  <p>date of creation: {cleanedDate}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
