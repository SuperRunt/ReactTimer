var AppDispatcher = require('../dispatcher/AppDispatcher');

var TimerActions = {
    // TODO: move to separate constants file
    types: {
        TIMER_CREATE: "ACTION_TYPE_CREATE",
        TIMER_DESTROY: "ACTION_TYPE_DESTROY",
        TIMER_TOGGLE_START_STOP: "ACTION_TYPE_START_STOP",
        TIMER_TOGGLE_START_STOP_ALL: "ACTION_TYPE_START_STOP_ALL"
    },

  createTimer: function(start) {
    AppDispatcher.dispatch({
      actionType: this.types.TIMER_CREATE,
      start: start
    });
  },

  toggleStartStop: function(timer, elapsed, newStart) {
    AppDispatcher.dispatch({
      actionType: this.types.TIMER_TOGGLE_START_STOP,
      id: timer.id,
      stopped: timer.stopped,
      elapsed: elapsed,
      newStart: newStart
    });
  },


  toggleStartStopAll: function() {
    AppDispatcher.dispatch({
      actionType: this.types.TIMER_TOGGLE_START_STOP_ALL
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: this.types.TIMER_DESTROY,
      id: id
    });
  },

  destroyAllStopped: function() {
    AppDispatcher.dispatch({
      actionType: this.types.TIMER_DESTROY_STOPPED
    });
  }

};

module.exports = TimerActions;
