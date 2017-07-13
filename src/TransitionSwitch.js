/**
 * Created by Arnaud on 07/07/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {matchPath, withRouter} from 'react-router';

/**
 * @class TransitionSwitch
 *
 * TransitionSwitch offers a way to get easy route transitions with
 * the router v4.
 */
@withRouter
export class TransitionSwitch extends React.Component {

    static propTypes = {
        parallel: PropTypes.bool,
        children: PropTypes.node,
        location: PropTypes.object
    };

    static defaultProps = {
        parallel: false
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

                //In case it's the current child we do nothing
                if(this.state.enteringRoute) {
                    if(this.state.enteringRoute.key == child.key)
                        return
                }

                //If it's not parallel, it would happen when a route change occurs while transitioning.
                //In that case we keep the original leaving element, and we just replace the entering element
                if(!this.state.leavingRoute || this.props.parallel)
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
                    leavingRoute: this.state.leavingRoute && !this.props.parallel ? this.state.leavingRoute : this.state.enteringRoute,
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
        if(this.enteringRouteChildRef && this.enteringRouteChildRef.componentWillAppear) {
            this.enteringRouteChildRef.componentWillAppear(() => this._enteringChildAppeared());
        }
        else {
            this._enteringChildAppeared();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.pathname == this.props.location.pathname && prevProps.match.isExact == this.props.match.isExact)
            return;

        if(this.enteringRouteChildRef.componentWillEnter) {
            if(this.props.parallel)
                this.enteringRouteChildRef.componentWillEnter(() => this._enteringChildEntered());
        }
        else {
            this._enteringChildEntered();
        }

        //If there's a ref and there wasn't a leaving route in the previous state
        if(this.leavingRouteChildRef.componentWillLeave) {
            if(this.leavingRouteChildRef && (!prevState.leavingRoute || this.props.parallel)) {
                this.leavingRouteChildRef.componentWillLeave(() => this._leavingChildLeaved());
            }
        }
        else {
            this._leavingChildLeaved();
        }

    }

    _enteringChildAppeared() {
        if(this.enteringRouteChildRef.componentDidAppear)
            this.enteringRouteChildRef.componentDidAppear();
    }

    _enteringChildEntered() {
        if(this.enteringRouteChildRef.componentDidEnter)
            this.enteringRouteChildRef.componentDidEnter();
    }

    _leavingChildLeaved() {
        if(this.leavingRouteChildRef && this.leavingRouteChildRef.componentDidLeave)
            this.leavingRouteChildRef.componentDidLeave();

        this.leavingRouteChildRef = null;
        this.setState({
            ...this.state,
            leavingRoute: null
        });

        //If it's not parallel, we start the entering transition when the leaving child has left.
        if(!this.props.parallel && this.enteringRouteChildRef && this.enteringRouteChildRef.componentWillEnter)
            this.enteringRouteChildRef.componentWillEnter(() => this._enteringChildEntered());
    }
}