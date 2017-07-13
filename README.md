# React Router Transition
[![Build Status](https://travis-ci.org/aboeglin/react-router-v4-transition.png?branch=master)](https://travis-ci.org/aboeglin/react-router-v4-transition) [![Coverage Status](https://coveralls.io/repos/github/aboeglin/react-router-v4-transition/badge.svg?branch=master)](https://coveralls.io/github/aboeglin/react-router-v4-transition?branch=master)

Transitions for React Router v4. The API is composed of a component, TransitionSwitch, that should be used as the Switch
component from react-router v4 to switch from a route to another one a transition.

## API Description

### 1) The component:
```javascript
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
```

TransitionSwitch allows to perform transitions on route change. Given its name, it works like the router v4 Switch. It
means that only one route will be visible at all times. Except if parallel is set to true, which means that the entering
transition won't wait for the leaving transition to be finished.
NB: parallel may be renamed in the next revision.

### 2) The transitions:
Like a switch, the children must be Route elements. The children of these route elements will be given hooks to perform
the transition. These hooks are :

```javascript
componentWillAppear(callback)

componentDidAppear()

componentWillEnter(callback)

componentDidEnter()

componentWillLeave(callback)

componentDidLeave()
```
The callbacks must be called after the transition is complete, in the case of animation, a good place is in the
onComplete. The interface is very much the same as react-trasition-group v1. Meaning that componentWillAppear is called
for the first time when the TransitionSwitch is mounted.

## Sample App

In case you want to quickly try it, there's a webpack setup and very rough sample app. 
In order to build it you should run :
```
npm run build:example
npm run start:server
```
The app will be running at localhost:8080, the build command watches for changes in case you want to play with it, the
sources are located in src/example.



In the next update: 
- improve the tests
- add warnings for uses that aren't allowed by the API.
- improve the example app
