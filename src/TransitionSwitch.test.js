/**
 * Created by Arnaud on 08/07/2017.
 */
import {render, mount} from 'enzyme';
import React from 'react';
import {MemoryRouter} from 'react-router';
import {TransitionSwitch, TransitionRoute} from './';
import {TransitionTransmitter} from './TransitionTransmitter';
import PropTypes from 'prop-types';
import sinon from 'sinon';

describe('TransitionSwitch', () => {
    beforeAll(() => {
        fixContext();

    });

    beforeEach(() => {

    });

    it('should only mount the first matching element', () => {
        const wrapper = mount(<TestApp />);

        expect(wrapper.find(TransitionRoute).length).toBe(1);
    });

    it('should call componentDidAppear after transition', () => {
        jest.useFakeTimers();
        const didAppearMock = Transition.prototype.componentDidAppear = jest.fn();

        const wrapper = mount(<TestApp />);

        const transition = wrapper.find(Transition);

        expect(didAppearMock.mock.calls.length).toBe(0);
        jest.runAllTimers();
        expect(didAppearMock.mock.calls.length).toBe(1);
    });

    it('should update state.status of AnimatedSwitch', () => {
        jest.useFakeTimers();
        sinon.spy(TransitionTransmitter.prototype, 'componentDidLeave');
        sinon.spy(TransitionTransmitter.prototype, 'componentWillEnter');
        const wrapper = mount(<TestApp />);
        const routerWrapper = wrapper.find(MemoryRouter);

        expect(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status).toBe('WILL_APPEAR');
        jest.runAllTimers();
        expect(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status).toBe('DID_APPEAR');

        //We change the current path to create the transition
        routerWrapper.node.history.push('/otherPath');

        expect(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status).toBe('WILL_LEAVE');
        expect(wrapper.find(TransitionRoute).length).toBe(1);
        jest.runTimersToTime(1000);
        expect(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status).toBe('WILL_ENTER');
        expect(wrapper.find(TransitionRoute).length).toBe(1);
        jest.runAllTimers();
        expect(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status).toBe('DID_ENTER');

        //Since DID_LEAVE of the previous component and WILL_APPEAR of the next one are triggered together,
        //it's easier to just check it's been called once in the transition process.
        expect(TransitionTransmitter.prototype.componentDidLeave.calledOnce).toBe(true);
    });

});

const fixContext = () => {
    delete AnimatedSwitch.childContextTypes;
    AnimatedSwitch.WrappedComponent.childContextTypes = {
        updateTransitionStatus: PropTypes.func
    };
};

class TestApp extends React.Component {

    render() {
        return(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <TransitionSwitch>
                    <TransitionRoute exact path="/">
                        <Transition>root path</Transition>
                    </TransitionRoute>
                    <TransitionRoute exact path="/otherPath">
                        <Transition>other path</Transition>
                    </TransitionRoute>
                    <TransitionRoute path="/">
                        <Transition/>
                    </TransitionRoute>
                </TransitionSwitch>
            </MemoryRouter>
        );
    }
}

class Transition extends React.Component {

    componentWillAppear(cb) {
        setTimeout(() => {
            cb();
        }, 2000);
    }

    componentDidAppear() {
        //do stuff on appear
    }

    componentWillEnter(cb) {
        setTimeout(() => {
            cb();
        }, 1000);
    }

    componentDidEnter() {
        //do stuff
    }

    componentWillLeave(cb) {
        setTimeout(() => {
            cb();
        }, 1000);
    }

    componentDidLeave() {
        //do stuff
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }

}