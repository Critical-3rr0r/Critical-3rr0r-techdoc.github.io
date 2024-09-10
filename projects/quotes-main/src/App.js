import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { useEffect } from "react";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
let twitterLink = "";
const getQuote = async () => {
    const response = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes");
    const data = await response.json();
    return data[0];
}
function App() {
    const [quote, setQuote] = useState({})
    const onClickHandler = async () => {
        const quoteObj = await getQuote();
        setQuote(quoteObj);
        if (quote.quote && quote.character) {
            let text = quoteObj.quote;
            text = text.split(" ");
            text.push("%0A");
            text = text.join("%20");
            let author = quoteObj.character;
            author = author.split(" ");
            author.unshift("-");
            author = author.join("%20");
            twitterLink = "https://twitter.com/intent/tweet?text=" + text + author;
        }
    }
    useEffect(() => {
        onClickHandler();
    }, [])
  return (
    <div className="App">
          <header className="App-header">
            <h1 id="title">The <span>Simpsons</span> Quote Generator</h1>
             <div id="quote-box">
                  <span id="text">{quote.quote}</span>
                  <span id="author">-{quote.character}</span>
                  <img src={quote.image} id="img"></img>
                  <div id="buttons">
                      <a id="tweet-quote" href={twitterLink} target="_blank"><FontAwesomeIcon icon={faXTwitter} /></a>
                      <button className="btn btn-dark" id="new-quote" onClick={onClickHandler}>Get Quote</button>
                  </div>
              </div>
          </header>       
      </div>
  );
}

export default App;
