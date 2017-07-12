/**
 * Created by Arnaud on 07/07/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {matchPath, withRouter} from 'react-router';

@withRouter
export class TransitionSwitch extends React.Component {

    static propTypes = {
        parallel: PropTypes.bool,
        children: PropTypes.node,
        location: PropTypes.object
    };

    static contextTypes = {
        router: PropTypes.shape({
            route: PropTypes.object.isRequired
        }).isRequired
    };


    constructor(props, context) {
        super(props, context);

        this.enteringRouteChildRef = null;
        this.leavingRouteChildRef = null;

        this.state = {
            enteringRoute: null,
            leavingRoute: null
        }
    }

    componentWillMount() {
        //We need to initialize given route properties before we mount it
        this.updateChildren(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateChildren(nextProps)
    }

    updateChildren(props) {
        let found = false;

        React.Children.map(props.children, child => child).forEach(child => {
            let pathData = {
                path: child.props.path,
                exact: child.props.exact,
                strict: child.props.strict
            };

            let match = matchPath(props.location.pathname, pathData);

            if(!found && match) {
                found = true;
                console.log('found')

                if(this.state.enteringRoute) {
                    if(this.state.enteringRoute.key == child.key)
                        return
                }

                this.leavingRouteChildRef = this.enteringRouteChildRef;

                let enteringRoute = React.cloneElement(child, {
                    children: React.cloneElement(child.props.children, {
                        ref: ref => {
                            if(ref)
                                this.enteringRouteChildRef = ref
                        }
                    })
                });

                this.setState({
                    ...this.state,
                    leavingRoute: this.state.enteringRoute,
                    enteringRoute: enteringRoute
                });
            }
        });
    }

    render() {

        let enteringRoute = null;

        if(!this.props.parallel) {
            if(!this.state.leavingRoute)
                enteringRoute = this.state.enteringRoute;
        }
        else {
            enteringRoute = this.state.enteringRoute;
        }

        return (
            <div>
                {enteringRoute}
                {this.state.leavingRoute}
            </div>
        );
    }

    componentDidMount() {
        if(this.enteringRouteChildRef)
            this.enteringRouteChildRef.componentWillAppear(() => this._enteringChildAppeared());
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.pathname == this.props.location.pathname && prevProps.match.isExact == this.props.match.isExact)
            return;

        if(this.props.parallel)
            this.enteringRouteChildRef.componentWillEnter(() => this._enteringChildEntered());

        if(this.leavingRouteChildRef) {
            this.leavingRouteChildRef.componentWillLeave(() => this._leavingChildLeaved());
        }
    }

    _enteringChildAppeared() {
        console.log('appeared');
        this.enteringRouteChildRef.componentDidAppear();
    }

    _enteringChildEntered() {
        console.log('entered');
        this.enteringRouteChildRef.componentDidEnter();
    }

    _leavingChildLeaved() {
        console.log('leaved');
        if(this.leavingRouteChildRef)
            this.leavingRouteChildRef.componentDidLeave();

        this.leavingRouteChildRef = null;
        this.setState({
            ...this.state,
            leavingRoute: null
        });

        if(!this.props.parallel && this.enteringRouteChildRef)
            this.enteringRouteChildRef.componentWillEnter(() => this._enteringChildEntered());
    }

}