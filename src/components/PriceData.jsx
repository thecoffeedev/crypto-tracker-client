import React, { useState, useEffect } from "react";

function PriceData() {
  const [date, setDate] = useState(0);
  const [price, setPrice] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const [currencyData, setCurrencyData] = useState([]);
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/currencies/all`)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyData(data);
        setSymbol(data[0]._id);
      });
  }, []);

  useEffect(() => {
    if (symbol) {
      fetch(`${process.env.REACT_APP_BACKEND}/currency/data/${symbol}`)
        .then((res) => res.json())
        .then((data) => setPriceData(data));
    }
  }, [symbol]);

  useEffect(() => {
    if (symbol && date !== 0 && price !== 0) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [symbol, date, price]);

  const createPrice = () => {
    fetch(`${process.env.REACT_APP_BACKEND}/currency/add-price`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        currency: symbol,
        date,
        price,
      }),
    });
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-6 offset-3">
          <h1 className="mt-4">Create Price</h1>
          <div className="inputContainer form-inline mt-5">
            <label className="my-1 mr-2" htmlFor="symbol">
              Symbol:&nbsp;&nbsp;
            </label>
            <select
              className="custom-select my-2 mr-sm-2"
              id="symbol"
              onChange={(event) => setSymbol(event.target.value)}
            >
              {currencyData &&
                currencyData.map((itm, idx) => (
                  <option key={idx} value={itm._id}>
                    {itm.symbol}
                  </option>
                ))}
            </select>
          </div>
          <div className="inputContainer form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              onChange={(event) =>
                setDate(Date.parse(event.target.value.substring(0, 10)))
              }
              className="form-control mt-1"
              placeholder="Enter the date..."
            />
          </div>
          <div className="inputContainer form-group">
            <label htmlFor="price">Currency Price:</label>
            <input
              type="number"
              id="price"
              onChange={(event) => setPrice(event.target.value)}
              className="form-control mt-1"
              placeholder="Enter Symbol of the currency..."
            />
          </div>
          <div className="inputContainer">
            <button
              type="submit"
              disabled={!btnActive}
              className="btn btn-primary my-1"
              onClick={createPrice}
            >
              create
            </button>
          </div>
        </div>
        <div className="col-12 mt-3 d-flex flex-direction-row flex-wrap">
          {priceData.map((item, index) => (
            <div key={index} className="currencyCard">
              <p>
                Currency:{" "}
                {
                  currencyData.filter((itm) => itm._id === item.currency)[0]
                    .name
                }
              </p>
              <p>Date: {new Date(item.date).toString()}</p>
              <p>Price: {item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceData;
