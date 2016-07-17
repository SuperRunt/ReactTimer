var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    TimerActions = require('../actions/TimerActions.js'),
    assign = require('object-assign');

var CHANGE_EVENT = 'change',
    _timers = {};

// create timer
function create(start) {
    // Using timestamp and random number instead of id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _timers[id] = {
        id: id,
        stopped: false,
        elapsed: 0,
        start: start
    };
}

// update timer
function update(id, updates) {
    _timers[id] = assign({}, _timers[id], updates);
}

// update all timers
function updateAll(updates) {
    for (var id in _timers) {
        update(id, updates);
    }
}

// update timer
function stop(id) {
    _timers[id].stopped = true;
}

function stopAll() {
    for (var id in _timers) {
        update(id, {stopped: true});
    }
}

// delete a timer
function destroy(id) {
    delete _timers[id];
}

// delete all stopped timers
function destroyStopped() {
    for (var id in _timers) {
        if (_timers[id].stopped) {
            destroy(id);
        }
    }
}

var TimerStore = assign({}, EventEmitter.prototype, {

    // get al timers
    getAll: function() {
        return _timers;
    },

    areAllStopped: function() {
        for (var id in _timers) {
            if (!_timers[id].stopped) {
                return false;
            }
        }
        return true;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var text;

    switch(action.actionType) {
        case TimerActions.types.TIMER_CREATE:
            create(action.start);
            TimerStore.emitChange();
        break;

        case TimerActions.types.TIMER_TOGGLE_START_STOP:
            update(action.id, {stopped: !action.stopped, elapsed: action.elapsed, start: action.newStart});
            TimerStore.emitChange();
        break;

        case TimerActions.types.TIMER_DESTROY:
            destroy(action.id);
            TimerStore.emitChange();
        break;

        case TimerActions.types.TIMER_DESTROY_ALL_STOPPED:
            destroyStopped();
            TimerStore.emitChange();
        break;

        default:
        // nada
    }
});

module.exports = TimerStore;
