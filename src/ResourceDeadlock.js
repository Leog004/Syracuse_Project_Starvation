import React, { Component } from "react";
import Processer from "./Processer";
import "./css/Resource.css";

class ResourceDeadlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProcess: [...this.props.processors]
    };

    this.dynamicSort = this.dynamicSort.bind(this);
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  render() {
    var proc = [...this.props.processors];
    proc.sort(this.dynamicSort("priority"));

    return (
      <div className="resource">
        <div className="container">
          {proc.map((p) => (
            <Processer
              isActive={p.active}
              key={p.process}
              process={p.process}
              priority={p.priority}
              main={p.main}
              semCount={p.semaphore}
              semName={p.semName}
              isBlocked={p.blocked}
              output={p.output}
            />
          ))}
        </div>
      </div>
    );
  }

  // componentDidMount() {
  //   var proc = [...this.props.processors];
  //   var low = proc[0].priority;
  //   var lowIndex = 0;

  //   for (var x = 0; x < proc.length; x++) {
  //     if (proc[x].priority < low) {
  //       low = proc[x].priority;
  //       lowIndex = x;
  //     }
  //   }

  //   //alert(low);
  // }
}

export default ResourceDeadlock;
