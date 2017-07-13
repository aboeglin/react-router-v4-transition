/**
 * Created by Arnaud on 08/07/2017.
 */
import {mount} from 'enzyme';
import React from 'react';
import {MemoryRouter, Route} from 'react-router';
import {TransitionSwitch} from './';
import PropTypes from 'prop-types';
import sinon from 'sinon';

describe('TransitionSwitch', () => {
    const spies = [];

    beforeAll(() => {
        /**
         * We're gonna spy on hooks a lot, so let's set'em up once
         */
        spies.push(sinon.spy(Transition.prototype, 'componentWillAppear'));
        spies.push(sinon.spy(Transition.prototype, 'componentDidAppear'));
        spies.push(sinon.spy(Transition.prototype, 'componentWillEnter'));
        spies.push(sinon.spy(Transition.prototype, 'componentDidEnter'));
        spies.push(sinon.spy(Transition.prototype, 'componentWillLeave'));
        spies.push(sinon.spy(Transition.prototype, 'componentDidLeave'));
    });

    beforeEach(() => {
        //We need to reset the spies before each test
        spies.forEach(spy => spy.reset())
    });

    it('should only mount the first matching element', () => {
        const wrapper = mount(<TestApp />);

        expect(wrapper.find(Transition).length).toBe(1);
    });

    it('should call componentDidAppear after transition', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestApp />);

        expect(Transition.prototype.componentDidAppear.called).toBe(false);
        jest.runAllTimers();
        expect(Transition.prototype.componentDidAppear.calledOnce).toBe(true);
    });

    it('should call transition hooks', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestApp />);
        const routerWrapper = wrapper.find(MemoryRouter);

        // expect(wrapper.find(AnimatedSwitch.WrappedComponent).node.state.status).toBe('WILL_APPEAR');

        //WILL APPEAR
        jest.runAllTimers();
        //DID APPEAR
        routerWrapper.node.history.push('/otherPath');
        //WILL LEAVE
        jest.runAllTimers();
        //DID LEAVE
        //WILL ENTER
        jest.runAllTimers();
        //DID ENTER

        expect(Transition.prototype.componentWillAppear.calledOnce).toBe(true);
        expect(Transition.prototype.componentDidAppear.calledOnce).toBe(true);
        expect(Transition.prototype.componentWillEnter.calledOnce).toBe(true);
        expect(Transition.prototype.componentDidEnter.calledOnce).toBe(true);
        expect(Transition.prototype.componentWillLeave.calledOnce).toBe(true);
        expect(Transition.prototype.componentDidLeave.calledOnce).toBe(true);
    });

    it('should switch even if no hook is defined', () => {
        jest.useFakeTimers();

        const wrapper = mount(<TestApp />);
        const routerWrapper = wrapper.find(MemoryRouter);

        routerWrapper.node.history.push('/noHook');
        jest.runAllTimers(); //It runs the leaving animation of the route at path "/"

        expect(wrapper.find(TransitionWithoutHooks).length).toBe(1);
    });

    it('should do nothing if there\'s no route change', () => {
        jest.useFakeTimers();

        const wrapper = mount(<TestApp />);
        const routerWrapper = wrapper.find(MemoryRouter);

        //WILL APPEAR
        jest.runAllTimers(); //It runs the appearing animation of "/"
        //DID APPEAR
        routerWrapper.node.history.push('/'); //pushes the same route

        expect(Transition.prototype.componentWillAppear.calledOnce).toBe(true);
        expect(Transition.prototype.componentDidAppear.calledOnce).toBe(true);
        expect(Transition.prototype.componentWillLeave.notCalled).toBe(true);
        expect(Transition.prototype.componentWillEnter.notCalled).toBe(true);
    });

    it('should run parallel transitions', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestAppParallel />);
        const routerWrapper = wrapper.find(MemoryRouter);

        //WILL APPEAR
        jest.runAllTimers(); //It runs the appearing animation of "/"
        //DID APPEAR
        expect(wrapper.find(Transition).length).toBe(1);
        expect(Transition.prototype.componentWillAppear.calledOnce).toBe(true);
        expect(Transition.prototype.componentDidAppear.calledOnce).toBe(true);

        routerWrapper.node.history.push('/otherPath');
        //WILL LEAVE
        //WILL ENTER
        expect(Transition.prototype.componentWillLeave.calledOnce).toBe(true);
        expect(Transition.prototype.componentWillEnter.calledOnce).toBe(true);
        expect(wrapper.find(Transition).length).toBe(2);

        jest.runAllTimers();
        //DID LEAVE
        //DID ENTER
        expect(Transition.prototype.componentDidLeave.calledOnce).toBe(true);
        expect(Transition.prototype.componentDidEnter.calledOnce).toBe(true);
        expect(wrapper.find(Transition).length).toBe(1);

    });

});

class TestAppParallel extends React.Component {

    render() {
        return(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <TransitionSwitch parallel={true}>
                    <Route exact path="/">
                        <Transition>root path</Transition>
                    </Route>
                    <Route exact path="/otherPath">
                        <Transition>other path</Transition>
                    </Route>
                    <Route path="/noHook">
                        <TransitionWithoutHooks/>
                    </Route>
                    <Route path="/">
                        <Transition/>
                    </Route>
                </TransitionSwitch>
            </MemoryRouter>
        );
    }
}
class TestApp extends React.Component {

    render() {
        return(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <TransitionSwitch parallel={false}>
                    <Route exact path="/">
                        <Transition>root path</Transition>
                    </Route>
                    <Route exact path="/otherPath">
                        <Transition>other path</Transition>
                    </Route>
                    <Route path="/noHook">
                        <TransitionWithoutHooks/>
                    </Route>
                    <Route path="/">
                        <Transition/>
                    </Route>
                </TransitionSwitch>
            </MemoryRouter>
        );
    }
}

class TransitionWithoutHooks extends React.Component {
    render() {
        return (
            <div>{this.props.children}</div>
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