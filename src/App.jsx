import React, { Component } from 'react';
import Board from "./components/Board";
import "./App.css";

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      history: [],
    }
  }

  setTheState = (obj) => {
    this.setState(obj)
  }

timeTravel = (id) => {

}

  render() {
    return (
      <div>
        <h1>Tic Tac Toe!</h1>
        <div className="">
          <Board {...this.state} setTheState={this.setTheState} />
          <div>History: {this.state.history.map((item, index) => {
            return <button onClick={() => this.timeTravel(index)}>Move {index+1}</button>
          })}</div>
        </div>
      </div>
    )
  }
}
