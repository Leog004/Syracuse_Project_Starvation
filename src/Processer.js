import React, { Component } from "react";
import "./css/Processor.css";

class Processer extends Component {
  getBackground() {
    if (this.props.isBlocked) return "red";
    if (this.props.isActive) return "green";
    if (this.props.main) return "orange";

    return "unset";
  }

  render() {
    //var BG = this.props.isActive ? "green" : "unset";
    var BG = this.getBackground();
    var sem =
      this.props.semCount && `${this.props.semName}: ${this.props.semCount}`;
    return (
      <div style={{ background: BG }} className="Processer">
        <h1>{this.props.process}</h1>
        <p>{this.props.priority}</p>
        <p>{sem}</p>
        <p>{this.props.output}</p>
      </div>
    );
  }
}

export default Processer;
