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
          priority: 1,
          process: "P1",
          semName: "sem1",
          semaphore: 1,
          active: false,
          main: false
        },
        {
          priority: 2,
          process: "P2",
          semName: "sem2",
          semaphore: 1,
          active: false,
          main: false
        }
      ],
      buttonText: "Start",
      btnCounter: 0,
      showBrokenCode: false,
      showFixedCode: false
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

    var proc = [...this.state.processors];

    var low = 21; // setting the lowest priority

    var lowIndex = 0;
    var mIndex = 0;

    for (var x = 0; x < proc.length; x++) {
      if (proc[x].priority < low && proc[x].active !== true) {
        low = proc[x].priority;
        lowIndex = x;
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
          </FormGroup>
        </div>
        {this.state.showBrokenCode && (
          <Highlight language="c">{`/*  main.c  - main */
 
 #include <xinu.h>
 #include <stdio.h>
  
  
 void m1(); void m2(); void m3();
  
 sid32 sem;
  
 pid32 m1pid, m2pid, m3pid;
 int32 flag = 0;
  
 void main(void) {
   sem = semcreate(0);
  
   m2pid = create(m2, 1024, 4, "m2", 0);
   m1pid = create(m1, 1024, 6, "m1", 0);
  
  
   resume(m1pid);
   resume(m2pid);
  
   return OK;
 }
  
  
 void m1() {
  
   while (1) {
  
     if (flag != 0) break;
  
     kprintf("In Process 1");
     wait(sem);
  
   }
  
   kprintf("Out of Process 1");
 }
  
 void m2() {
  
   kprintf("In Process 2");
   wait(sem); //Leaving this uncomment will cause a deadlock! Thus not allowing process m3 to run which in turn cause starvation
  
   m3pid = create(m3, 1024, 2, "m3", 0);
   resume(m3pid);
 }
  
 void m3() {
  
   ++flag;
  
   printf("NOW I AM RUNNING WHOOO!");
   signal(sem);
  
 }`}</Highlight>
        )}

        {this.state.showFixedCode && (
          <Highlight language="c">{`/*  main.c  - main */
 
 #include <xinu.h>
 #include <stdio.h>
  
  
 void m1(); void m2(); void m3();
  
 sid32 sem;
  
 pid32 m1pid, m2pid, m3pid;
 int32 flag = 0;
  
 void main(void) {
   sem = semcreate(0);
  
   m2pid = create(m2, 1024, 4, "m2", 0);
   m1pid = create(m1, 1024, 6, "m1", 0);
  
  
   resume(m1pid);
   resume(m2pid);
  
   return OK;
 }
  
  
 void m1() {
  
   while (1) {
  
     if (flag != 0) break;
  
     kprintf("In Process 1");
     wait(sem);
  
   }
  
   kprintf("Out of Process 1");
 }
  
 void m2() {
  
   kprintf("In Process 2");
   //wait(sem); //Leaving this uncomment will cause a deadlock! Thus not allowing process m3 to run which in turn cause starvation
  
   m3pid = create(m3, 1024, 2, "m3", 0);
   resume(m3pid);
 }
  
 void m3() {
  
   ++flag;
  
   printf("NOW I AM RUNNING WHOOO!");
   signal(sem);
  
 }`}</Highlight>
        )}

        <br />
        <h4>Order By Priority</h4>
        <ResourceDeadlock processors={this.state.processors} />
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

export default ProgramDeadlock;
