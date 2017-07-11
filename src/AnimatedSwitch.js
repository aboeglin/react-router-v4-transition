/**
 * Created by Arnaud on 07/07/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {matchPath, withRouter} from 'react-router';

@withRouter
export class AnimatedSwitch extends React.Component {

    static propTypes = {
        parallel: PropTypes.bool
    };

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
            this.setState({
                ...this.state,
                status: data
            });
    }

    renderUnparallel() {
        if(this.activeChild && this.state.status != 'DID_LEAVE') {
            return this.activeChild ? this.activeChild : null;
        }
        else {
            this.activeChild = null;
        }

        React.Children.forEach(this.props.children, child => {

            let match = matchPath(this.props.location.pathname, {
                path: child.props.path,
                exact: child.props.exact,
                strict: child.props.strict
            });

            if(!this.activeChild && match) {
                this.activeChild = child;
            }
        });

        return this.activeChild ? this.activeChild : null
    }

    renderParallel() {

    }

    render() {
        return this.renderUnparallel();
    }

}