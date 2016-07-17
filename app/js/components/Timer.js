var TimerActions = require('../actions/TimerActions.js');
// individual timer
var Timer = React.createClass({

    getInitialState: function() {
        // assigning to this.state (accounting for theoretical case where we are getting stored timers here)
        return { elapsed: this.props.timer.elapsed, startingPoint: this.props.timer.elapsed, stopped: this.props.timer.stopped, start: this.props.timer.start };
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
        this.setState({elapsed: this.state.startingPoint + (new Date() - this.state.start)});
    },

    _startStop: function (e) {
        var _newStart;

        if ( !this.state.stopped ) {
            _newStart = new Date();
            this.setState({stopped: !this.state.stopped});
        } else {
            _newStart = this.state.start;
            this.setState({stopped: !this.state.stopped, start: new Date(), startingPoint: this.state.elapsed});
        }

        // update the store
        TimerActions.toggleStartStop(this.props.timer, this.state.elapsed, _newStart);
    },

    render: function() {
        var elapsed = Math.round(this.state.elapsed / 100),
            seconds = (elapsed / 10).toFixed(1),
            buttonText = this.state.stopped ? "START" : "STOP";
        return <li>This timer was started <b>{seconds} seconds</b> ago. <button onClick={this._startStop}>{buttonText}</button></li>;
    }

});

module.exports = Timer;
