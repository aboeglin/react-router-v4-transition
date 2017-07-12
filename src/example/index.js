/**
 * Created by Arnaud on 10/07/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import {TweenLite} from 'gsap';

import {TransitionSwitch, TransitionRoute} from '../';

/**
 * Example App to showcase the use of react-router-v4-transition.
 *
 * It uses gsap to animate the elements, but any other library could be used in place.
 * TODO: add some styling and examples using other libraries
 */
class ExampleApp extends React.Component {

    render() {
        return(
            <div className="example-app">
                <nav className="example-app__menu">
                    <Link to="/">Home</Link>
                    <Link to="/otherPath">Other Path</Link>
                    <Link to="/anotherPath">Another Path</Link>
                </nav>
                <div className="example-app__content">
                    <TransitionSwitch parallel={false}>
                        <Route exact path="/">
                            <Transition>home path</Transition>
                        </Route>
                        <Route path="/otherPath">
                            <Transition>other path</Transition>
                        </Route>
                        <Route path="/">
                            <Transition>other home</Transition>
                        </Route>
                        <Route path="/anotherPath">
                            <Transition>another path</Transition>
                        </Route>
                    </TransitionSwitch>
                </div>
            </div>
        );
    }
}

let d = 1;
class Transition extends React.Component {

    constructor(props) {
        super(props);

        this.mounted = false;
    }

    componentWillMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentWillAppear(cb) {
        TweenLite.fromTo(ReactDOM.findDOMNode(this), d, {x: -100, opacity: 0}, {x: 0, opacity:1, onComplete: () => cb()});
    }

    componentDidAppear() {
        //do stuff on appear
    }

    componentWillEnter(cb) {
        TweenLite.fromTo(ReactDOM.findDOMNode(this), d, {x: 100, opacity: 0}, {x: 0, opacity:1, onComplete: () => cb()});
    }

    componentDidEnter() {
        //do stuff
    }

    componentWillLeave(cb) {
        // if(this.mounted)
            TweenLite.fromTo(ReactDOM.findDOMNode(this), d, {x: 0, opacity: 1}, {x: -100, opacity:0, onComplete: () => cb()});
    }

    componentDidLeave() {
        //do stuff
    }

    render() {
        return (
            <div style={{
                position: 'absolute'
            }}>{this.props.children}</div>
        );
    }

}

ReactDOM.render(
    <BrowserRouter>
        <ExampleApp />
    </BrowserRouter>,
    document.getElementById('app')
);