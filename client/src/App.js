import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
      process: '-1',
      key: '',
      value: '',
      data: null
  }


  getProcessJson = (process) => {
    if(process == '-1'){
       return false;
    }
    fetch(` http://localhost:3001/getEnvironment/${process}`)
      .then((data) => data.json())
      .then((res) => this.setState({ data: res }));
  };

  updateProcessJson = (process,key,value) => {
    if(process == '-1'){
      return false;
   }
    fetch(`http://localhost:3001/setEnvironment/${process}/${key}/${value}`)
      .then((data) => data.json())
      .then((res) => this.setState({ data: res }));
  };


  render() {
    let {data, process, key, value} = this.state;
    return (
        <div>
        <ul>
          {data && Object.keys(data).map((dat) => (
                <li style={{ padding: '10px' }} key={dat}>
                  <span style={{ color: 'gray' }}> Key: </span> {dat} <br />
                  <span style={{ color: 'gray' }}> Value: </span>
                  {(data)[dat]}
                </li>
              ))}
        </ul>
        <div style={{ padding: '10px' }}>
         <select value={process} onChange={()=> this.setState({process: event.target.value})}>
            <option value="-1">Select process</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
          <button onClick={() => this.getProcessJson(process)}>
            GET PROCESS DATA
          </button>
        </div>
        <div style={{ padding: '10px' }}>
        <select value={process} onChange={()=> this.setState({process: event.target.value})}>
            <option value="-1">Select process</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
          <input
            type="text"
            value={key}
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ key: e.target.value })}
            placeholder="New key to update here"
          />
          <input
            type="text"
            value={value}
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ value: e.target.value })}
            placeholder="New value to update here"
          />
          <button
            onClick={() =>
              this.updateProcessJson(process, key, value)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default App;
