import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Program from "./Program";
import ProgramDeadlock from "./ProgramDeadlock";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starvation: false,
      deadlock: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
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
    var Sprogram = this.state.starvation && <Program />;
    var Dprogram = this.state.deadlock && <ProgramDeadlock />;

    return (
      <div className="App">
        <div className="checkbox_form">
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.starvation}
                  onClick={this.handleInputChange}
                  name="starvation"
                />
              }
              label="Starvation"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.deadlock}
                  onClick={this.handleInputChange}
                  name="deadlock"
                />
              }
              label="deadlock"
            />
          </FormGroup>
        </div>
        {Sprogram}
        {Dprogram}
      </div>
    );
  }
}

export default App;
