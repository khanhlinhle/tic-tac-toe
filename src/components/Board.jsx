import React, { Component } from 'react';
import Square from './Square';


export default class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            score: 0,
            items: [],
        }
    }
    renderSquare = (num) => {
        return <Square key={num} id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
    }

    startTime = 0;
    boxClick = (id) => {
        if (!this.state.isPlaying) {
            this.setState({ isPlaying: true });
            this.startTime = Date.now();
        }
        let squaresFromApp = this.props.squares;

        if (this.calculateWinner(squaresFromApp) || squaresFromApp[id]) {
            return;
        }


        let timeWalk = this.props.lastTimeWalk;
        let oldHistory = [...this.props.history];    // <~ lấy hết phần tử của mảng history để tạo thành mảng oldHistory
        if (timeWalk !== -1) {
            oldHistory = oldHistory.filter((his, index) => index <= timeWalk);
            timeWalk = -1;
        }

        squaresFromApp[id] = this.props.isXNext ? "X" : "O";

        this.props.setTheState({
            lastTimeWalk: timeWalk,
            squares: [...squaresFromApp],
            isXNext: !this.props.isXNext,
            history: [
                ...oldHistory,
                {
                    squares: [...squaresFromApp],
                    isXNext: !this.props.isXNext,
                }
            ], // <~ lấy hết phần tử của mảng oldHistory để tạo thành mảng history mới đồng thời push thêm những giá trị mới (đằng sau dấu ,)
        })

        let hasWinner = this.calculateWinner(squaresFromApp) != null;
        if (hasWinner && this.state.score == 0) {
            console.log("hasWinner");
            this.setState({
                score: Math.floor((Date.now() - this.startTime) / 1000),
            })
            console.log(this.state.score)
            this.postDataPlayer(this.state.score);
        }
    }

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[b] && squares[c] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    getDataPlayer = async () => {
        const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            json: true
        }).then(response => response.json())
            .then(data => {
                this.setState({ items: data.items });
                console.log(data)
            });


    }

    componentDidMount = () => {
        this.getDataPlayer();
    }

    postDataPlayer = async () => {
        let data = new URLSearchParams();
        data.append("player", this.props.userName);
        data.append("score", this.state.score);
        const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data.toString(),
            json: true
        });
    }

    render() {
        const winner = this.calculateWinner(this.props.squares);
        let status = "";
        if (winner) {
            status = `I should: ${this.props.isXNext ? " Go to sleep " : " Go to work "}`;
        } else {
            status = `What should I do  : ${this.props.isXNext ? " Go to work " : " Go to sleep "}`;
        }

        return (
            <div className="game-part">
                <div>
                    {
                        this.state.items.map(i => {
                            return (
                                <ul className="list-player">
                                    <li>{i.player} {i.score}</li>
                                </ul>
                            )
                        })
                    }
                </div>
                <div>
                    <h2 className="line-1 anim-typewriter">{status}</h2>
                    <div className="score-part">Score: {this.state.score}</div>
                    <div className="square-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="square-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="square-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
            </div>
        )
    }
}
