/**
 * Created by Arnaud on 04/07/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router';
import {TransitionGroup} from 'react-transition-group';

import {TransitionTransmitter} from './TransitionTransmitter';

export class TransitionRoute extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Route {...this.props} children={({match, location, ...rest}) => {
                {/*console.log(location.key)*/}
                return (
                     <PatchedTransitionGroup component={firstChild}>
                        {match &&
                        <TransitionTransmitter>
                            {this.props.children}
                        </TransitionTransmitter>}
                     </PatchedTransitionGroup>
                );
             }} />
        )
    }
}

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

/***
 * Dirt fix to avoid this.setState when component is unmounted in the else :
 */
import {getChildMapping} from 'react-transition-group/utils/ChildMapping'
class PatchedTransitionGroup extends TransitionGroup {
    _handleDoneLeaving = (key, component) => {


        delete this.currentlyTransitioningKeys[key];

        let currentChildMapping = getChildMapping(this.props.children);

        if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
            // This entered again before it fully left. Add it again.
            this.keysToEnter.push(key);
        } else {
            this.setState((state) => {
                let newChildren = Object.assign({}, state.children);
                delete newChildren[key];
                return {children: newChildren};
            });
        }

        if (component.componentDidLeave) {
            component.componentDidLeave();
        }
    }
}

