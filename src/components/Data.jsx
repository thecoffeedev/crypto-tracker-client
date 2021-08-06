import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import moment from "moment";

function Data() {
  const [symbol, setSymbol] = useState("");
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

  const dateFormatter = (date) => {
    return moment(date).format("DD/MMMM");
  };

  useEffect(() => console.log(priceData), [priceData]);
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-6 offset-3">
          <h1 className="mt-4">Crypto Currency Visualizer</h1>
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
        </div>
        <div className="graphContainer mt-5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={priceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                domain={["dataMin", "dataMax + 200"]}
                tickFormatter={dateFormatter}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Data;
