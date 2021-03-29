import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ResourceDeadlock from "./ResourceDeadlock";
import ProcessTable from "./ProcessTable";
import Highlight from "react-highlight";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class ProgramDeadlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processors: [
        {
          priority: 4,
          process: "M1",
          semName: "sem1",
          output: "",
          semaphore: 1,
          active: false,
          main: false,
          blocked: false
        },
        {
          priority: 4,
          process: "M2",
          semName: "sem2",
          semaphore: 0,
          active: false,
          output: "",
          main: false,
          blocked: false
        }
      ],
      buttonText: "Start",
      buttonText2: "Start",
      btnCounter: 0,
      showBrokenCode: false,
      showFixedCode: false,
      runFixedCode: false,
      allowPass: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.activateProcessor = this.activateProcessor.bind(this);
    this.activateProcessor2 = this.activateProcessor2.bind(this);
    this.newProcess = this.newProcess.bind(this);
  }

  runM1(proc) {
    var localBtnText = "Blocked";

    while (proc[0].semaphore >= 0) {
      proc[0].semaphore -= 1;

      if (proc[0].semaphore >= 0 || this.state.allowPass) {
        proc[0].blocked = true;
        proc[0].output += `Hello from process 1\n`;
      }
    }

    if (this.state.runFixedCode) {
      proc[1].semaphore += 1;
      proc[1].blocked = false;
      proc[1].active = false;
      localBtnText = "Continue";
    }

    this.setState({
      processors: proc,
      buttonText: "Blocked",
      buttonText2: localBtnText
    });
  }

  runM2(proc) {
    var localBtn1Text = "Blocked";

    while (proc[1].semaphore >= 0) {
      proc[1].semaphore -= 1;

      if (proc[1].semaphore >= 0 || this.state.allowPass) {
        proc[1].blocked = true;
        proc[1].output += `Hello from process 2\n`;
      }

      if (proc[1].semaphore < 0) {
        proc[1].blocked = true;
      }
    }

    if (this.state.runFixedCode) {
      proc[0].semaphore += 1;
      proc[0].blocked = false;
      proc[0].active = false;
      localBtn1Text = "Continue";
    }

    this.setState({
      processors: proc,
      buttonText2: "Blocked",
      buttonText: localBtn1Text,
      allowPass: true
    });
  }

  activateProcessor(e) {
    e.preventDefault();

    this.setState({
      buttonText: "Continue",
      btnCounter: this.state.btnCounter + 1
    });

    let proc = [...this.state.processors]; // create the copy of state array
    proc[0].active = true;

    this.setState({ processors: proc });

    setTimeout(() => this.runM1(proc), 1000);

    // if (this.state.aging) alert("Aging has been selected");
  }

  activateProcessor2(e) {
    e.preventDefault();

    this.setState({
      buttonText2: "Continue",
      btnCounter: this.state.btnCounter + 1
    });

    let proc = [...this.state.processors]; // create the copy of state array
    proc[1].active = true;
    this.setState({ processors: proc });

    setTimeout(() => this.runM2(proc), 1000);

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
        <h1>Queue List</h1>
        <ProcessTable
          middle={"Semaphores"}
          processors={this.state.processors}
        />
        <br />
        <div className="checkbox_form">
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.showBrokenCode}
                  onClick={this.handleInputChange}
                  name="showBrokenCode"
                />
              }
              label="Show Deadlock Code"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={this.state.showFixedCode}
                  onClick={this.handleInputChange}
                  name="showFixedCode"
                />
              }
              label="Show Fixed Code"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={this.state.runFixedCode}
                  onClick={this.handleInputChange}
                  name="runFixedCode"
                />
              }
              label="Run with Fixed Code"
            />
          </FormGroup>
        </div>
        {this.state.showBrokenCode && (
          <Highlight language="c">{`/* /*  main.c  - main */

          #include <xinu.h>
          #include <stdio.h>
          
          
          void m1(); void m2(); // Two processors
          
          sid32 sem1, sem2; // our global semaphore
          
          pid32 m1pid, m2pid; // our processID
          
          void main(void) {
          
            sem1 = semcreate(0); // initializing sem value to 0
            sem2 = semcreate(1); // initializing sem value to 1
          
            m1pid = create(m1, 1024, 4, "m1", 0); // initializing m1pid 
            m2pid = create(m2, 1024, 4, "m2", 0);// initializing m2pid 
          
            resume(m1pid); // resuming process m1
            resume(m2pid); // resuming process m2
            
            
            return OK;
          }
          
          
          void m1() {
        
          
            while (1) {
          
              wait(sem2);
          
              kprintf("Hello from process1");
          
              //signal(sem1);
            }
          }
          
          void m2() {
          
            while (1) {
          
              wait(sem1); // un blocks
          
              kprintf("Hello from process2");
          
              signal(sem2);
            }
          }
          
          `}</Highlight>
        )}

        {this.state.showFixedCode && (
          <Highlight language="c">{`/* /*  main.c  - main */

          #include <xinu.h>
          #include <stdio.h>
          
          
          void m1(); void m2(); // Two processors
          
          sid32 sem1, sem2; // our global semaphore
          
          pid32 m1pid, m2pid; // our processID
          
          void main(void) {
          
            sem1 = semcreate(0); // initializing sem value to 0
            sem2 = semcreate(1); // initializing sem value to 1
          
            m1pid = create(m1, 1024, 4, "m1", 0); // initializing m1pid 
            m2pid = create(m2, 1024, 4, "m2", 0);// initializing m2pid 
          
            resume(m1pid); // resuming process m1
            resume(m2pid); // resuming process m2
            
            
            return OK;
          }
          
          
          void m1() {
          
            while (1) {
          
              wait(sem2);
          
              kprintf("Hello from process1");
          
              signal(sem1);
            }
          }
          
          void m2() {
          
            while (1) {
          
              wait(sem1);
          
              kprintf("Hello from process2");
          
              signal(sem2);
            }
          }
          
          `}</Highlight>
        )}

        <br />
        <h4>Order By Priority</h4>
        <ResourceDeadlock processors={this.state.processors} />
        <Button
          onClick={this.activateProcessor}
          variant="contained"
          color="primary"
          style={{ marginLeft: "23%", float: "left" }}
        >
          {this.state.buttonText}
        </Button>

        <Button
          onClick={this.activateProcessor2}
          variant="contained"
          color="primary"
          style={{ marginRight: "23%", float: "right" }}
        >
          {this.state.buttonText2}
        </Button>
      </div>
    );
  }
}

export default ProgramDeadlock;
