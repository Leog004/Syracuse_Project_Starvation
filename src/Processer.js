import React, { Component } from "react";
import "./css/Processor.css";

class Processer extends Component {
  render() {
    var BG = "unset";
    if (this.props.isActive) BG = "green";

    return (
      <div style={{ background: BG }} className="Processer">
        <h1>{this.props.process}</h1>
        <p>{this.props.priority}</p>
      </div>
    );
  }
}

export default Processer;
