import React, { Component } from 'react';
import { render } from "react-dom";
import { Chart } from "react-google-charts";

const pieOptions = {
    title: "",
    pieHole: 0.6,
    slices: [
      {
        color: "#2BB673"
      },
      {
        color: "#d91e48"
      },
      {
        color: "#007fad"
      },
      {
        color: "#e9a227"
      }
    ],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 14
      }
    },
    tooltip: {
      showColorCode: true
    },
    chartArea: {
      left: 0,
      top: 0,
      width: "100%",
      height: "80%"
    },
    fontName: "Roboto"
  };
 
export default class BalanceChar extends Component {

   
  render() {
      let datos=[];
      datos.push(["Category", "Amount"]);
     this.props.balance.map(item =>
        datos.push([item.Category,item.Expenses])
       


    );

    console.log(datos);

    return (
        <div className="App">
        <Chart
          chartType="PieChart"
          data={datos}
          options={pieOptions}
          graph_id="PieChart"
          width={"100%"}
          height={"400px"}
          legend_toggle
        />
      </div>
    );
  }
}