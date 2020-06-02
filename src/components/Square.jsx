import React, { Component } from 'react'

export default class Square extends Component {
    render() {
        return (
            <div className="box" onClick={() => this.props.boxClick(this.props.id)}>
                <div className="value-text">{this.props.value}</div>
            </div>
        )
    }
}
