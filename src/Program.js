import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Resource from "./Resource";
import ProcessTable from "./ProcessTable";

class Program extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processors: [
        { priority: 18, process: "MP", burstTime: 10, active: false },
        { priority: 2, process: "db", burstTime: 10, active: false },
        { priority: 0, process: "de", burstTime: 10, active: false },
        { priority: 8, process: "1a", burstTime: 10, active: false }
      ],
      buttonText: "Start"
    };

    this.activateProcessor = this.activateProcessor.bind(this);
    this.newProcess = this.newProcess.bind(this);
  }

  activateProcessor(e) {
    e.preventDefault();

    this.setState({ buttonText: "Continue" });

    var counter = 0;
    var proc = [...this.state.processors];

    var low = proc[0].priority;
    var lowIndex = 0;

    for (var x = 0; x < proc.length; x++) {
      if (proc[x].priority < low && proc[x].active !== true) {
        low = proc[x].priority;
        lowIndex = x;
      }
    }

    let ids = [...this.state.processors]; // create the copy of state array
    ids[lowIndex].active = true; //new value
    this.setState({ processors: ids });
  }

  newProcess(e) {
    e.preventDefault();
    let randomCharacter = Math.random().toString(36).substring(7).charAt(1);
    let randomNumber = Math.floor(Math.random() * 20) + 1;

    var newP = {
      priority: randomNumber,
      process: `${randomCharacter}${randomNumber}`,
      burstTime: 10
    };

    this.setState((previousState) => ({
      processors: [...previousState.processors, newP]
    }));
  }

  render() {
    return (
      <div className="Program">
        <h1>Que List</h1>
        <ProcessTable processors={this.state.processors} />
        <br />
        <h4>Order By Priority</h4>
        <Resource processors={this.state.processors} />
        <Button
          onClick={this.activateProcessor}
          variant="contained"
          color="primary"
          style={{ marginRight: "5px" }}
        >
          {this.state.buttonText}
        </Button>
        <Button
          onClick={this.newProcess}
          variant="contained"
          color="secondary"
          style={{ marginLeft: "5px" }}
        >
          New Process
        </Button>
        {/* <a onClick={this.newProcess}>Start</a>*/}
        {/* <a onClick={this.newProcess}>New Process</a> */}
      </div>
    );
  }
}

export default Program;
