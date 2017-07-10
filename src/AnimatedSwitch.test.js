/**
 * Created by Arnaud on 08/07/2017.
 */
import {render, mount} from 'enzyme';
import React from 'react';
import {MemoryRouter} from 'react-router';
import {AnimatedSwitch, TransitionRoute} from './';
import PropTypes from 'prop-types';
import sinon from 'sinon';

describe('AnimatedSwitch', () => {
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

        // expect(Transition.prototype.componentDidAppear).toHaveBeenCalledTimes(0);
        expect(didAppearMock.mock.calls.length).toBe(0);
        jest.runAllTimers();
        expect(didAppearMock.mock.calls.length).toBe(1);
        // expect(Transition.prototype.componentDidAppear).toHaveBeenCalledTimes(1);
    });

    it('should update state.status of AnimatedSwitch', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestApp />);

        expect(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status).toBe('WILL_APPEAR');
        jest.runAllTimers();
        expect(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status).toBe('DID_APPEAR');

        //We change the current path to create the transition
        const routerWrapper = wrapper.find(MemoryRouter);
        routerWrapper.node.history.push('/otherPath');

        expect(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status).toBe('WILL_LEAVE');
        expect(wrapper.find(TransitionRoute).length).toBe(1);
        jest.runTimersToTime(1000);
        // console.log(wrapper.find(Transition).node.props.children)
        expect(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status).toBe('WILL_APPEAR');
        expect(wrapper.find(TransitionRoute).length).toBe(1);
        jest.runAllTimers();
        expect(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status).toBe('DID_APPEAR');


        // console.log(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status)

        // console.log(routerWrapper)
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
                <AnimatedSwitch>
                    <TransitionRoute exact path="/">
                        <Transition>root path</Transition>
                    </TransitionRoute>
                    <TransitionRoute exact path="/otherPath">
                        <Transition>other path</Transition>
                    </TransitionRoute>
                    <TransitionRoute path="/">
                        <Transition/>
                    </TransitionRoute>
                </AnimatedSwitch>
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