import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      elapsedTime: 0,
    };
    this.timerId = null;

    this.updateTimer = this.updateTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isRunning && !prevState.isRunning) {
      const startTime = Date.now() - this.state.elapsedTime;
      this.timerId = requestAnimationFrame(this.updateTimer(startTime));
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.timerId);
  }

  updateTimer(startTime) {
    var _this = this;
    return function () {
      _this.setState({ elapsedTime: Date.now() - startTime }, function () {
        _this.timerId = requestAnimationFrame(_this.updateTimer(startTime));
      });
    };
  }

  startTimer() {
    this.setState({ isRunning: true });
  }

  stopTimer() {
    cancelAnimationFrame(this.timerId);
    this.setState({ isRunning: false });
  }

  formatTime(time) {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor(time / 3600000);
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  render() {
    const { isRunning, elapsedTime } = this.state;
    return (
      <span className="description">
        <button onClick={this.startTimer} disabled={isRunning} className="icon icon-play"></button>
        <button onClick={this.stopTimer} disabled={!isRunning} className="icon icon-pause"></button>
        <span>{this.formatTime(elapsedTime)}</span>
      </span>
    );
  }
}

export default TodoItem;
