import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      color: "red",
      quoteApi:
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
      quotes: [],
    };
    this.setRandomQuote = this.setRandomQuote.bind(this);
    this.setColor = this.setColor.bind(this);
  }
  componentDidMount() {
    let quoteList = [];
    fetch(this.state.quoteApi)
      .then((response) => response.json())
      .then((data) => {
        quoteList = [...quoteList, ...data.quotes];
      })
      .finally(() => {
        this.setState({ quotes: quoteList });
        this.setRandomQuote();
      });
  }

  setColor() {
    let colorArr = [
      "red",
      "blue",
      "green",
      "purple",
      "brown",
      "orange",
      "pink",
      "black",
      "gray",
    ];
    let randIdx = Math.floor(Math.random() * colorArr.length);
    this.setState({ color: colorArr[randIdx] });
  }

  setRandomQuote() {
    //Select a random quote
    let randIdx = Math.floor(Math.random() * this.state.quotes.length);
    let randQuote = this.state.quotes[randIdx];

    //Set the new quote into state
    this.setState({
      quote: randQuote.quote,
      author: randQuote.author,
    });

    //Set the color for the next quote
    this.setColor();
  }

  render() {
    return (
      <div id="quote-body" style={{ backgroundColor: this.state.color }}>
        <div id="quote-box" style={{ color: this.state.color }}>
          <div id="text">
            <span class="quoteSymbol">&ldquo;</span>
            {this.state.quote}
          </div>
          <div id="author">{this.state.author}</div>
          <div id="control-panel">
            <a
              href="https://www.twitter.com/intent/tweet"
              target="_blank"
              id="tweet-quote"
              style={{ backgroundColor: this.state.color }}
              class="linkBtn"
              rel="noreferrer"
            >
              <i class="fa-brands fa-twitter"></i>
            </a>
            <button
              id="new-quote"
              onClick={this.setRandomQuote}
              style={{ backgroundColor: this.state.color }}
              class="linkBtn"
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
