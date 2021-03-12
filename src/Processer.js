import React, { Component } from "react";
import "./css/Processor.css";

class Processer extends Component {
  getBackground() {
    if (this.props.isActive) return "green";
    if (this.props.main) return "orange";
    return "unset";
  }

  render() {
    //var BG = this.props.isActive ? "green" : "unset";
    var BG = this.getBackground();
    return (
      <div style={{ background: BG }} className="Processer">
        <h1>{this.props.process}</h1>
        <p>{this.props.priority}</p>
        <p>{this.props.main}</p>
      </div>
    );
  }
}

export default Processer;
