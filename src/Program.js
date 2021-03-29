import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Resource from "./Resource";
import ProcessTable from "./ProcessTable";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class Program extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processors: [
        {
          priority: 18,
          process: "MP",
          burstTime: 10,
          active: false,
          main: true
        },
        {
          priority: 2,
          process: "db",
          burstTime: 10,
          active: false,
          main: false
        },
        {
          priority: 0,
          process: "de",
          burstTime: 10,
          active: false,
          main: false
        },
        {
          priority: 8,
          process: "1a",
          burstTime: 10,
          active: false,
          main: false
        }
      ],
      buttonText: "Start",
      btnCounter: 0,
      aging: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.activateProcessor = this.activateProcessor.bind(this);
    this.newProcess = this.newProcess.bind(this);
  }

  activateProcessor(e) {
    e.preventDefault();

    this.setState({
      buttonText: "Continue",
      btnCounter: this.state.btnCounter + 1
    });

    var counter = 0;
    var proc = [...this.state.processors];

    var low = 21; // setting the lowest priority

    var lowIndex = 0;
    var mIndex = 0;

    for (var x = 0; x < proc.length; x++) {
      if (proc[x].priority < low && proc[x].active !== true) {
        low = proc[x].priority;
        lowIndex = x;
      }

      // if (proc[x].priority === low && proc[x].active !== true) {
      //   low = proc[x].priority;
      //   lowIndex = x;
      // }

      if (proc[x].aging) {
        mIndex = x;
      }
    }

    let ids = [...this.state.processors]; // create the copy of state array
    ids[lowIndex].active = true; //new value

    if (this.state.aging && this.state.btnCounter % 2 === 0) {
      ids[mIndex].priority -= 1;
    }

    this.setState({ processors: ids });

    // if (this.state.aging) alert("Aging has been selected");
  }

  newProcess(e) {
    e.preventDefault();
    let randomCharacter = Math.random().toString(36).substring(7).charAt(1);
    let randomNumber = Math.floor(Math.random() * 20) + 1;

    var newP = {
      priority: randomNumber,
      process: `${randomCharacter}${randomNumber}`,
      burstTime: 10,
      active: false,
      main: false
    };

    this.setState((previousState) => ({
      processors: [...previousState.processors, newP]
    }));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="Program">
        <Button
          target="_blank"
          href="https://www.geeksforgeeks.org/starvation-and-aging-in-operating-systems/"
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: "25px" }}
        >
          What is starvation?
        </Button>

        <h1>
          Que List
          <span style={{ fontSize: "10px" }}>(Priority based scheduler)</span>
        </h1>

        <ProcessTable
          middle={"Burst Time"}
          processors={this.state.processors}
        />
        <br />
        <div className="checkbox_form">
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.aging}
                  onClick={this.handleInputChange}
                  name="aging"
                />
              }
              label="Deploy Aging"
            />
          </FormGroup>
          <Button
            target="_blank"
            href="https://www.youtube.com/watch?v=01DiVzZbRjY"
            variant="contained"
            color="primary"
            size="small"
            style={{ display: "block" }}
          >
            What is Aging?
          </Button>
        </div>
        <h4>Order By Priority</h4>
        <Resource processors={this.state.processors} />
        <Button
          onClick={this.activateProcessor}
          variant="contained"
          color="primary"
          style={{
            marginRight: "5px",
            marginTop: "20px",
            marginBottom: "80px"
          }}
        >
          {this.state.buttonText}
        </Button>
        <Button
          onClick={this.newProcess}
          variant="contained"
          color="secondary"
          style={{ marginLeft: "5px", marginTop: "20px", marginBottom: "80px" }}
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
