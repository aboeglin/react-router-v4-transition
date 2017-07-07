/**
 * Created by Arnaud on 07/07/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {TransitionGroup} from 'react-transition-group';
import {matchPath, withRouter} from 'react-router';

@withRouter
export class AnimatedSwitch extends React.Component {

    //TODO: handle callbacks and switch, perhaps, add a property in TransitionRoute to force render or not
    static childContextTypes = {
        updateTransitionStatus: PropTypes.func//(data) => this.currentTransitionHasFinished(data)
    };

    getChildContext() {
        return {
            updateTransitionStatus: (data) => this.updateTransitionStatus(data)
        }
    }

    constructor(props, context) {
        super(props, context);

        this.activeChild = null;
        this.status = '';

        this.state = {
            status: ''
        }
    }

    updateTransitionStatus(data) {
        if(!(this.status == 'DID_LEAVE' && data == 'WILL_LEAVE'))
            this.status = data;
        if(status == 'DID_LEAVE') {
            // this.setState(this.state)
        }

        this.setState({
            ...this.state,
            status: this.status
        });
        console.log('status: '+data);
    }

    //TODO: RENAME
    onStateChange(value) {
        console.log('change: '+value)
    }

    render() {
        console.log('tcho: '+this.status)


        if(this.activeChild && this.status != 'DID_LEAVE') {
            console.log('active: '+this.status)
            return this.activeChild ? this.activeChild[0] : null;

        }
        else {
            this.activeChild = null;
        }


        let found = false;

        let children = React.Children.map(this.props.children, child => {

            let match = matchPath(this.props.location.pathname, {
                path: child.props.path,
                exact: child.props.exact,
                strict: child.props.strict
            });

            if(!found && match) {
                found = true;

                let clone = React.cloneElement(child, {
                    onStateChange: (value) => this.onStateChange(value)
                });

                this.activeChild = child;

                return clone;
            }
        });

        this.activeChild = children;

        // console.log(children[0])
        console.log(this.activeChild)

        return children ? children[0] : null;
    }

}