//Finite state machine
//options:
//is an object whose each property is a state object, first property is initial state
//each state is an object also it has to have 3 properties:
//enter: function(){} // is called when fsm enter this state
//event: function(event){} // is called at every event sent to fsm instance
//exit: function(){} // is called when fsm exits this state
//if enter or event returns string value which is the name of other state, fsm transits to those state;


//events:


//methods:
//event(event)
//event: any value known by event functions of states, but string is preferable
//
//transition(state)
//state: string name of particular state

const EventEmitter = require('events');

class FSM {
    constructor(options){

        this.options = options;

        this.transition(Object.keys(options)[0]);
    }

    transition(state){
        if(this.state === state) return; //do nothing, if current state equal to desired state
        if(typeof this.options[state] === 'object'){ //desired state exists
            if(this.state !== undefined && typeof this.options[this.state].exit === 'function'){
                this.options[this.state].exit();
            }
            this.state = state;
            if(typeof this.options[state].enter === 'function'){
                let newState = this.options[state].enter();
                if(newState !== undefined){
                    this.transition(newState);
                }
            }
        }
    }

    event(event){
        if(typeof this.options[this.state].event === 'function'){
            let newState = this.options[this.state].event(event);
            if(newState !== undefined){
                this.transition(newState);
            }
        }
        return this.state;
    }
}

module.exports = FSM;