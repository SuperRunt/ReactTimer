var Timer = require('./Timer.js'),
    TimerActions = require('../actions/TimerActions.js'),
    TimerStore = require('../stores/TimerStore.js');
    // var ReactPropTypes = React.PropTypes;

// Retrieve the current TODO data from the TimerStore
function getTimerState() {
    return {
        allTimers: TimerStore.getAll()
    };
}

var TimerApp = React.createClass({

    getInitialState: function() {
        return getTimerState();
    },

    componentDidMount: function() {
        TimerStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TimerStore.removeChangeListener(this._onChange);
    },

    render: function() {

        var allTimers = this.state.allTimers;
        var timers = [];

        for (var key in allTimers) {
            timers.push(<Timer timer={allTimers[key]} key={allTimers[key].id} />);
        }

        return (
            <section id="main">
                <h2>TIMERS</h2>
                <button onClick={this._addTimerToList}>Add Timer</button>
                <button onClick={this._deleteStopped}> Delete Stopped Timers</button>
                <ul id="timer-list">{timers}</ul>
            </section>
        );
    },

    _addTimerToList: function () {
        TimerActions.createTimer(new Date());
    },

    _deleteStopped: function () {
        TimerActions.destroyAllStopped();
    },

    // event handler for chnage event
    _onChange: function() {
        this.setState(getTimerState());
    }

});

module.exports = TimerApp;
