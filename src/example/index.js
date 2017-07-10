/**
 * Created by Arnaud on 10/07/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link} from 'react-router-dom';
import {TweenLite} from 'gsap';

import {AnimatedSwitch, TransitionRoute} from '../';

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
                </nav>
                <div className="example-app__content">
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
                </div>
            </div>
        );
    }
}

class Transition extends React.Component {

    componentWillAppear(cb) {
        TweenLite.fromTo(ReactDOM.findDOMNode(this), .5, {x: -100, opacity: 0}, {x: 0, opacity:1, onComplete: () => cb()});
    }

    componentDidAppear() {
        //do stuff on appear
    }

    componentWillEnter(cb) {
        TweenLite.fromTo(ReactDOM.findDOMNode(this), .5, {x: -100, opacity: 0}, {x: 0, opacity:1, onComplete: () => cb()});
    }

    componentDidEnter() {
        //do stuff
    }

    componentWillLeave(cb) {
        TweenLite.fromTo(ReactDOM.findDOMNode(this), .5, {x: 0, opacity: 1}, {x: -100, opacity:0, onComplete: () => cb()});
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

ReactDOM.render(
    <BrowserRouter>
        <ExampleApp />
    </BrowserRouter>,
    document.getElementById('app')
);