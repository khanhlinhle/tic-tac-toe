import React, { Component } from 'react';
import Board from "./components/Board";
import "./App.css";
import FacebookLogin from "react-facebook-login";


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      history: [],
      lastTimeWalk: -1, // dùng để xác định xem cỗ máy thời gian đang ở đâu. Nếu khác -1 thì có nghĩa đang đi quay về quá khứ.
      userName: "",
      avatar: "",
      isLogIn: false,
    }
  }

  responseFacebook = (response) => {
    console.log(response);
    this.setState({
      isLogIn: true,
      userName: response.name,
    })
  }

  setTheState = (obj) => {
    this.setState(obj)
  }

  timeTravel = (id) => {
    let timeMachine = this.state.history[id];

    this.setState({
      lastTimeWalk: id,
      squares: [...timeMachine.squares],
      isXNext: timeMachine.isXNext,
    });
  }

  render() {
    return (
      <div>
        <nav>
          <h1 className="title-text">Monday Morning !!!</h1>
        </nav>
        <div className="App">
          {
            this.state.isLogIn ?
              <div></div>
              :
              <FacebookLogin
                className="login-button"
                autoLoad={true}
                appId="2670114303094325"
                fields="name,email,picture"
                callback={(resp) => this.responseFacebook(resp)}
              />
          }
        </div>
        <div className="game-part">
          <Board {...this.state} setTheState={this.setTheState} />
          <div className="history-part">
            {
              this.state.history.map((item, index) => {
                return <button className="history-style" onClick={() => this.timeTravel(index)}>Move {index + 1}</button>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
