var TimerActions = require('../actions/TimerActions.js');
// individual timer
var Timer = React.createClass({

    getInitialState: function() {
        // assigning to this.state
        return { elapsed: this.props.timer.elapsed, stopped: this.props.timer.stopped, start: new Date() };
    },

    componentDidMount: function() {
        // setting interval
        this.timer = setInterval(this.tickTock, 50);
    },

    componentWillUnmount: function() {
        // clear the interval
        clearInterval(this.timer);
    },

    tickTock: function() {
        // update and re-render component, unless it's stopped
        if ( this.state.stopped ) {
            return;
        }
        this.setState({elapsed: this.props.timer.elapsed + (new Date() - this.state.start)});
    },

    _startStop: function () {
        // don't really need to update the start state if stopping, but to avoid a logic step:
        this.setState({stopped: !this.state.stopped, start: new Date()});
        // update the store
        TimerActions.toggleStartStop(this.props.timer, this.state.elapsed);
    },

    render: function() {
        var elapsed = Math.round(this.state.elapsed / 100),
            seconds = (elapsed / 10).toFixed(1),
            buttonText = this.state.stopped ? "START" : "STOP";
        return <li>This timer was started <b>{seconds} seconds</b> ago. <button onClick={this._startStop}>{buttonText}</button></li>;
    }

});

module.exports = Timer;
