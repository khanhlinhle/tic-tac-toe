import React, { Component } from 'react'

export default class Square extends Component {
    render() {
        return (
            <div className="box" onClick={() => this.props.boxClick(this.props.id)}>
                <div className="value-text">
                    {
                        this.props.value === null ? "" : (
                            this.props.value === "X" ?
                                <img className="img-player" src="https://media.tenor.com/images/7f24da60ef53d2bfebfb5a30ce56c36c/tenor.gif" />
                                :
                                <img className="img-player" src="https://media.tenor.com/images/4dd2a49e02243d13a4c293ff402f57df/tenor.gif" />
                            )
                    } 
                </div>
            </div>
        )
    }
}
