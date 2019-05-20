import React, {Component} from 'react';
import "./App.css"
import axios from "axios"
import logo from './logo.svg';
import _ from "lodash"

import './App.css';

export default class App extends Component {

  

  constructor(props) {

    super(props)


    this.state = {
      stocks: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    let stocks = []

    axios.get("https://www.worldtradingdata.com/api/v1/stock_search", {
      params: {
        api_token: "JGeuqec2Je4TWbUMKG6ktn1lhkI36JmPLVHTxGpEqDtRrahADlc8utBdUFjD",
        search_term: "AAPL"
      }
    }).then(res => {

      _.each(res.data.data, e => {
            axios.get("https://www.worldtradingdata.com/api/v1/stock", {
      params: {
        symbol: e.symbol,
        api_token: "JGeuqec2Je4TWbUMKG6ktn1lhkI36JmPLVHTxGpEqDtRrahADlc8utBdUFjD"
      }
    }).then(res2 => {

      console.log('res222222', res2)

      stocks.push({
        name: res2.data.data[0].name,
        symbol: res2.data.data[0].symbol,
        priceChange: res2.data.data[0].day_change
      })

      this.setState({stocks: stocks})
    })
      })
    })

    console.log('stocks finally', stocks)

  }


  render() {





    console.log('state', this.state.stocks)
    return (
    <div>

      <button onClick={() => this.handleClick()}>LOAD STOCKS</button>
      <div className="stock-container">
      {this.state.stocks.map(e => {
      return (
        <div className="stock-bubble">
          <div>
        Name: {e.name}
          </div>
          <div>
        Symbol: {e.symbol}
          </div>
          <div>
        Price Change: {e.priceChange}
          </div>
        </div>
      )
    })}
      </div>

    </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
