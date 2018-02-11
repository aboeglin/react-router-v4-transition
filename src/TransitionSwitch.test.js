/**
 * Created by Arnaud on 08/07/2017.
 */
import Enzyme, {mount} from 'enzyme';
import React from 'react';
import {MemoryRouter, Route} from 'react-router';
import {TransitionSwitch} from './';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

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

        spies.push(sinon.spy(InstantTransition.prototype, 'componentWillAppear'));
        spies.push(sinon.spy(InstantTransition.prototype, 'componentDidAppear'));
        spies.push(sinon.spy(InstantTransition.prototype, 'componentWillEnter'));
        spies.push(sinon.spy(InstantTransition.prototype, 'componentDidEnter'));
        spies.push(sinon.spy(InstantTransition.prototype, 'componentWillLeave'));
        spies.push(sinon.spy(InstantTransition.prototype, 'componentDidLeave'));
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
		wrapper.update();
        expect(Transition.prototype.componentDidAppear.calledOnce).toBe(true);
    });

    it('should call transition hooks', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestApp />);
        const routerWrapper = wrapper.find(MemoryRouter);

        //WILL APPEAR
        jest.runAllTimers();
        //DID APPEAR
        routerWrapper.instance().history.push('/otherPath');
        //WILL LEAVE
        jest.runAllTimers();
        //DID LEAVE
        //WILL ENTER
        jest.runAllTimers();
        //DID ENTER
        wrapper.update();

        expect(Transition.prototype.componentWillAppear.calledOnce).toBe(true);
        expect(Transition.prototype.componentDidAppear.calledOnce).toBe(true);
        expect(Transition.prototype.componentWillEnter.calledOnce).toBe(true);
        expect(Transition.prototype.componentDidEnter.calledOnce).toBe(true);
        expect(Transition.prototype.componentWillLeave.calledOnce).toBe(true);
        expect(Transition.prototype.componentDidLeave.calledOnce).toBe(true);
    });

    it('should switch even if no hook is defined', () => {
        jest.useFakeTimers();

        const wrapper = mount(<TestAppMountWithNoHook />);
        const routerWrapper = wrapper.find(MemoryRouter);

        expect(wrapper.find(TransitionWithoutHooks).length).toBe(1);

		routerWrapper.instance().history.push('/');
        routerWrapper.instance().history.push('/noHook');
        jest.runAllTimers(); //It runs the leaving transition of the route at path "/"
		wrapper.update();

        expect(wrapper.find(TransitionWithoutHooks).length).toBe(1);
    });

    it('should run the leaving transition and render null if the route is not found', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestAppMountWithNoHook />);
        const routerWrapper = wrapper.find(MemoryRouter);

        routerWrapper.instance().history.push('/'); //We go to "/"
        routerWrapper.instance().history.push('/404'); //We go to a non existing route
		wrapper.update();

        expect(wrapper.find(TransitionSwitch).instance().state.enteringRouteKey).toBe(null);
        expect(wrapper.find(TransitionSwitch).instance().state.leavingRouteKey).not.toBe(null);

        jest.runAllTimers(); //We run the leaving transition
		wrapper.update();
        expect(wrapper.find(TransitionSwitch).instance().state.leavingRouteKey).toBe(null);
    });

    it('should do nothing if there is no route change', () => {
        jest.useFakeTimers();

        const wrapper = mount(<TestApp />);
        const routerWrapper = wrapper.find(MemoryRouter);

        //WILL APPEAR
        jest.runAllTimers(); //It runs the appearing animation of "/"
        //DID APPEAR
        routerWrapper.instance().history.push('/'); //pushes the same route
		wrapper.update();

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
		wrapper.update();
        //DID APPEAR
        expect(wrapper.find(Transition).length).toBe(1);
        expect(Transition.prototype.componentWillAppear.calledOnce).toBe(true);
        expect(Transition.prototype.componentDidAppear.calledOnce).toBe(true);

        routerWrapper.instance().history.push('/otherPath');
		wrapper.update();
        //WILL LEAVE
        //WILL ENTER
        expect(Transition.prototype.componentWillLeave.calledOnce).toBe(true);
        expect(Transition.prototype.componentWillEnter.calledOnce).toBe(true);
        expect(wrapper.find(Transition).length).toBe(2);

        jest.runAllTimers();
		wrapper.update();
        //DID LEAVE
        //DID ENTER
        expect(Transition.prototype.componentDidLeave.calledOnce).toBe(true);
        expect(Transition.prototype.componentDidEnter.calledOnce).toBe(true);
        expect(wrapper.find(Transition).length).toBe(1);

    });

    it('should pass route props', () => {
        //Should have match, location, history
        const wrapper = mount(<TestApp />);

        let props = wrapper.find(Transition).props()
        expect(props.match).not.toBe(undefined);
        expect(props.location).not.toBe(undefined);
        expect(props.history).not.toBe(undefined);
    });

    it('should call hooks on instant transition', () => {

        const wrapper = mount(<TestAppWithInstantTransition />);
        const routerWrapper = wrapper.find(MemoryRouter);

        expect(InstantTransition.prototype.componentWillAppear.calledOnce).toBe(true);
        expect(InstantTransition.prototype.componentDidAppear.calledOnce).toBe(true);

        routerWrapper.instance().history.push('/otherPath');
		wrapper.update();

        expect(InstantTransition.prototype.componentWillLeave.calledOnce).toBe(true);
        expect(InstantTransition.prototype.componentDidLeave.calledOnce).toBe(true);
        expect(InstantTransition.prototype.componentWillEnter.calledOnce).toBe(true);
        expect(InstantTransition.prototype.componentDidEnter.calledOnce).toBe(true);

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

class TestAppWithInstantTransition extends React.Component {

    render() {
        return(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <TransitionSwitch parallel={false}>
                    <Route exact path="/">
                        <InstantTransition>root path</InstantTransition>
                    </Route>
                    <Route exact path="/otherPath">
                        <InstantTransition>other path</InstantTransition>
                    </Route>
                </TransitionSwitch>
            </MemoryRouter>
        );
    }
}

class TestAppMountWithNoHook extends React.Component {

    render() {
        return(
            <MemoryRouter initialEntries={['/noHook']} initialIndex={0}>
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

class InstantTransition extends React.Component {

    componentWillAppear(cb) {
        cb();
    }

    componentDidAppear() {
        //do stuff on appear
    }

    componentWillEnter(cb) {
        cb();
    }

    componentDidEnter() {
        //do stuff
    }

    componentWillLeave(cb) {
        cb();
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
