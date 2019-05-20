const express = require('express')
    bodyParser = require('body-parser')
    cors = require('cors')
    massive = require('massive')
    const stockdata = require('stock-data.js');



    const app = express();
    app.use(express.static(__dirname + '/client/build'));
    app.use(bodyParser.json());

    app.use(cors({
      origin: 'http://localhost:3001',
      credentials: true
    }));

    stockdata.realtime({
      symbols: 'AAPL',
      API_TOKEN: "JGeuqec2Je4TWbUMKG6ktn1lhkI36JmPLVHTxGpEqDtRrahADlc8utBdUFjD",
    })
    .then(response => {
      console.log('response', response)
    })
    .catch(error => {
      console.log('error', error)
    });





  // ===== Listen ===============
app.listen(process.env.PORT || 3001, () => {
  console.log('I like to listen. I have learned a great deal from listening carefully. Most people never listen. Im listening on port: ', process.env.PORT || 3001);
})