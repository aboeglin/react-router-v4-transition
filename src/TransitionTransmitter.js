/**
 * Created by Arnaud on 07/07/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

export class TransitionTransmitter extends React.Component {

    static contextTypes = {
        updateTransitionStatus: PropTypes.func//(data) => this.currentTransitionHasFinished(data)
    };

    constructor(props) {
        super(props);
    }

    componentWillAppear(callback) {
        if(this.childRef && this.childRef.componentWillAppear)
            this.childRef.componentWillAppear(callback);
        else
            callback();
        this.context.updateTransitionStatus('WILL_APPEAR')
    }

    componentDidAppear() {
        if(this.childRef && this.childRef.componentDidAppear)
            this.childRef.componentDidAppear();
        this.context.updateTransitionStatus('DID_APPEAR')
    }

    componentWillEnter(callback) {
        if(this.childRef && this.childRef.componentWillEnter)
            this.childRef.componentWillEnter(callback);
        else
            callback();
        this.context.updateTransitionStatus('WILL_ENTER')
    }

    componentDidEnter() {
        if(this.childRef && this.childRef.componentDidEnter)
            this.childRef.componentDidEnter();
        this.context.updateTransitionStatus('DID_ENTER')
    }

    componentWillLeave(callback) {
        if(this.childRef && this.childRef.componentWillLeave)
            this.childRef.componentWillLeave(callback);
        else
            callback();
        this.context.updateTransitionStatus('WILL_LEAVE');
    }

    componentDidLeave() {
        if(this.childRef && this.childRef.componentDidLeave)
            this.childRef.componentDidLeave();
        this.context.updateTransitionStatus('DID_LEAVE');
    }

    render() {
        let children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                ref: ref => this.childRef = ref
            });
        });

        if(children)
            children = children[0];

        return children;
    }

}