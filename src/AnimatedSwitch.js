/**
 * Created by Arnaud on 07/07/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {matchPath, withRouter} from 'react-router';

@withRouter
export class AnimatedSwitch extends React.Component {

    static childContextTypes = {
        updateTransitionStatus: PropTypes.func
    };

    getChildContext() {
        return {
            updateTransitionStatus: (data) => this.updateTransitionStatus(data)
        }
    }

    constructor(props, context) {
        super(props, context);

        this.activeChild = null;
        this.state = {
            status: ''
        }
    }

    updateTransitionStatus(data) {
        if(!(this.status == 'DID_LEAVE' && data == 'WILL_LEAVE'))
            this.status = data;

        this.setState({
            ...this.state,
            status: data
        });
    }

    render() {
        if(this.activeChild && this.status != 'DID_LEAVE') {
            // console.log('active: '+this.status)
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

        return children ? children[0] : null;
    }

}