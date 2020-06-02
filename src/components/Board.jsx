import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {

    renderSquare = (num) => {
        return <Square key={num} id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
    }

    boxClick = (id) => {
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

        squaresFromApp[id] = this.props.isXNext ?

            <img className="img-player" src="https://media.tenor.com/images/7f24da60ef53d2bfebfb5a30ce56c36c/tenor.gif" />
            :
            <img className="img-player" src="https://media.tenor.com/images/4dd2a49e02243d13a4c293ff402f57df/tenor.gif" />;

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
            if (squares[a] && squares[b] && squares[c] && squares[a].src === squares[b].src && squares[a].src === squares[c].src) {
                return squares[a];
            }
        }
        return null;
    }

    render() {
        const winner = this.calculateWinner(this.props.squares);
        let status = "";
        if (winner) {
            console.log(winner)
            status = `I should: ${this.props.isXNext ? " Go to sleep " : " Go to work "}`;
        } else {
            status = `What should I do  : ${this.props.isXNext ? " Go to work " : " Go to sleep "}`;
        }
        return (
            <div>
                <h2>{status}</h2>
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
        )
    }
}
