import React, { useState, useEffect } from "react";

// Name
// symbol
// Type

function Currency() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [type, setType] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/currencies/all`)
      .then((data) => data.json())
      .then((res) => setCurrencyData(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (name && symbol && type) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [name, symbol, type]);

  const createCurrency = () => {
    fetch(`${process.env.REACT_APP_BACKEND}/currencies/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        symbol,
        type,
      }),
    });
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-6 offset-3">
          <h1 className="mt-4">Create Currency</h1>
          <div className="inputContainer form-group mt-5">
            <label htmlFor="name">Currency Name:</label>
            <input
              type="text"
              id="name"
              onChange={(event) => setName(event.target.value)}
              className="form-control mt-1"
              placeholder="Enter Name of the currency..."
            />
          </div>
          <div className="inputContainer form-group">
            <label htmlFor="symbol">Currency Symbol:</label>
            <input
              type="text"
              id="symbol"
              onChange={(event) => setSymbol(event.target.value)}
              className="form-control mt-1"
              placeholder="Enter Symbol of the currency..."
            />
          </div>
          <div className="inputContainer form-inline">
            <label className="my-1 mr-2" htmlFor="type">
              Type:&nbsp;&nbsp;
            </label>
            <select
              className="custom-select my-2 mr-sm-2"
              id="type"
              onChange={(event) => setType(event.target.value)}
            >
              <option value="">Choose...</option>
              <option value="btc">BTC</option>
              <option value="eth">ETH</option>
            </select>
          </div>
          <div className="inputContainer">
            <button
              type="submit"
              disabled={!btnActive}
              className="btn btn-primary my-1"
              onClick={createCurrency}
            >
              create
            </button>
          </div>
        </div>
        <div className="col-12 mt-3 d-flex flex-direction-row flex-wrap">
          {currencyData.map((item, index) => (
            <div key={index} className="currencyCard">
              <p>Name: {item.name}</p>
              <p>Symbol: {item.symbol}</p>
              <p>Type: {item.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Currency;
