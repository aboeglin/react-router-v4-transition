(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"), require("react-router"), require("react-transition-group"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types", "react-router", "react-transition-group"], factory);
	else if(typeof exports === 'object')
		exports["ReactRouterTransition"] = factory(require("react"), require("prop-types"), require("react-router"), require("react-transition-group"));
	else
		root["ReactRouterTransition"] = factory(root["react"], root["prop-types"], root["react-router"], root["react-transition-group"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnimatedSwitch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * Created by Arnaud on 07/07/2017.
                             */


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = __webpack_require__(3);

var _reactRouter = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedSwitch = exports.AnimatedSwitch = (0, _reactRouter.withRouter)(_class = (_temp = _class2 = function (_React$Component) {
    _inherits(AnimatedSwitch, _React$Component);

    _createClass(AnimatedSwitch, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _this2 = this;

            return {
                updateTransitionStatus: function updateTransitionStatus(data) {
                    return _this2.updateTransitionStatus(data);
                }
            };
        }

        //TODO: handle callbacks and switch, perhaps, add a property in TransitionRoute to force render or not

    }]);

    function AnimatedSwitch(props, context) {
        _classCallCheck(this, AnimatedSwitch);

        var _this = _possibleConstructorReturn(this, (AnimatedSwitch.__proto__ || Object.getPrototypeOf(AnimatedSwitch)).call(this, props, context));

        _this.activeChild = null;
        _this.status = '';

        _this.state = {
            status: ''
        };
        return _this;
    }

    _createClass(AnimatedSwitch, [{
        key: 'updateTransitionStatus',
        value: function updateTransitionStatus(data) {
            if (!(this.status == 'DID_LEAVE' && data == 'WILL_LEAVE')) this.status = data;
            if (status == 'DID_LEAVE') {
                // this.setState(this.state)
            }

            this.setState(_extends({}, this.state, {
                status: this.status
            }));
            console.log('status: ' + data);
        }

        //TODO: RENAME

    }, {
        key: 'onStateChange',
        value: function onStateChange(value) {
            console.log('change: ' + value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            console.log('tcho: ' + this.status);

            if (this.activeChild && this.status != 'DID_LEAVE') {
                console.log('active: ' + this.status);
                return this.activeChild ? this.activeChild[0] : null;
            } else {
                this.activeChild = null;
            }

            var found = false;

            var children = _react2.default.Children.map(this.props.children, function (child) {

                var match = (0, _reactRouter.matchPath)(_this3.props.location.pathname, {
                    path: child.props.path,
                    exact: child.props.exact,
                    strict: child.props.strict
                });

                if (!found && match) {
                    found = true;

                    var clone = _react2.default.cloneElement(child, {
                        onStateChange: function onStateChange(value) {
                            return _this3.onStateChange(value);
                        }
                    });

                    _this3.activeChild = child;

                    return clone;
                }
            });

            this.activeChild = children;

            // console.log(children[0])
            console.log(this.activeChild);

            return children ? children[0] : null;
        }
    }]);

    return AnimatedSwitch;
}(_react2.default.Component), _class2.childContextTypes = {
    updateTransitionStatus: _propTypes2.default.func //(data) => this.currentTransitionHasFinished(data)
}, _temp)) || _class;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TransitionRoute = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(2);

var _reactTransitionGroup = __webpack_require__(3);

var _TransitionTransmitter = __webpack_require__(6);

var _ChildMapping = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Arnaud on 04/07/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var TransitionRoute = exports.TransitionRoute = function (_React$Component) {
    _inherits(TransitionRoute, _React$Component);

    function TransitionRoute(props) {
        _classCallCheck(this, TransitionRoute);

        return _possibleConstructorReturn(this, (TransitionRoute.__proto__ || Object.getPrototypeOf(TransitionRoute)).call(this, props));
    }

    _createClass(TransitionRoute, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(_reactRouter.Route, _extends({}, this.props, { children: function children(_ref) {
                    var match = _ref.match,
                        location = _ref.location,
                        rest = _objectWithoutProperties(_ref, ['match', 'location']);

                    {/*console.log(location.key)*/}
                    return _react2.default.createElement(
                        PatchedTransitionGroup,
                        { component: firstChild },
                        match && _react2.default.createElement(
                            _TransitionTransmitter.TransitionTransmitter,
                            null,
                            _this2.props.children
                        )
                    );
                } }));
        }
    }]);

    return TransitionRoute;
}(_react2.default.Component);

var firstChild = function firstChild(props) {
    var childrenArray = _react2.default.Children.toArray(props.children);
    return childrenArray[0] || null;
};

/***
 * Dirt fix to avoid this.setState when component is unmounted in the else :
 */

var PatchedTransitionGroup = function (_TransitionGroup) {
    _inherits(PatchedTransitionGroup, _TransitionGroup);

    function PatchedTransitionGroup() {
        var _ref2;

        var _temp, _this3, _ret;

        _classCallCheck(this, PatchedTransitionGroup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref2 = PatchedTransitionGroup.__proto__ || Object.getPrototypeOf(PatchedTransitionGroup)).call.apply(_ref2, [this].concat(args))), _this3), _this3._handleDoneLeaving = function (key, component) {

            delete _this3.currentlyTransitioningKeys[key];

            var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this3.props.children);

            if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
                // This entered again before it fully left. Add it again.
                _this3.keysToEnter.push(key);
            } else {
                _this3.setState(function (state) {
                    var newChildren = Object.assign({}, state.children);
                    delete newChildren[key];
                    return { children: newChildren };
                });
            }

            if (component.componentDidLeave) {
                component.componentDidLeave();
            }
        }, _temp), _possibleConstructorReturn(_this3, _ret);
    }

    return PatchedTransitionGroup;
}(_reactTransitionGroup.TransitionGroup);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TransitionTransmitter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by Arnaud on 07/07/2017.
                    */


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransitionTransmitter = exports.TransitionTransmitter = (_temp = _class = function (_React$Component) {
    _inherits(TransitionTransmitter, _React$Component);

    function TransitionTransmitter(props) {
        _classCallCheck(this, TransitionTransmitter);

        return _possibleConstructorReturn(this, (TransitionTransmitter.__proto__ || Object.getPrototypeOf(TransitionTransmitter)).call(this, props));
    }

    _createClass(TransitionTransmitter, [{
        key: 'componentWillAppear',
        value: function componentWillAppear(callback) {
            if (this.childRef && this.childRef.componentWillAppear) this.childRef.componentWillAppear(callback);else callback();
            this.context.updateTransitionStatus('WILL_APPEAR');
        }
    }, {
        key: 'componentDidAppear',
        value: function componentDidAppear() {
            if (this.childRef && this.childRef.componentDidAppear) this.childRef.componentDidAppear();
            this.context.updateTransitionStatus('DID_APPEAR');
        }
    }, {
        key: 'componentWillEnter',
        value: function componentWillEnter(callback) {
            if (this.childRef && this.childRef.componentWillEnter) this.childRef.componentWillEnter(callback);else callback();
            this.context.updateTransitionStatus('WILL_ENTER');
        }
    }, {
        key: 'componentDidEnter',
        value: function componentDidEnter() {
            if (this.childRef && this.childRef.componentDidEnter) this.childRef.componentDidEnter();
            this.context.updateTransitionStatus('DID_ENTER');
        }
    }, {
        key: 'componentWillLeave',
        value: function componentWillLeave(callback) {
            if (this.childRef && this.childRef.componentWillLeave) this.childRef.componentWillLeave(callback);else callback();
            this.context.updateTransitionStatus('WILL_LEAVE');
        }
    }, {
        key: 'componentDidLeave',
        value: function componentDidLeave() {
            if (this.childRef && this.childRef.componentDidLeave) this.childRef.componentDidLeave();
            this.context.updateTransitionStatus('DID_LEAVE');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var children = _react2.default.Children.map(this.props.children, function (child) {
                return _react2.default.cloneElement(child, {
                    ref: function ref(_ref) {
                        return _this2.childRef = _ref;
                    }
                });
            });

            if (children) children = children[0];

            return children;
        }
    }]);

    return TransitionTransmitter;
}(_react2.default.Component), _class.contextTypes = {
    updateTransitionStatus: _propTypes2.default.func //(data) => this.currentTransitionHasFinished(data)
}, _temp);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransitionRoute = exports.AnimatedSwitch = undefined;

var _AnimatedSwitch = __webpack_require__(4);

var _TransitionRoute = __webpack_require__(5);

/**
 * Created by Arnaud on 03/01/2017.
 */
exports.AnimatedSwitch = _AnimatedSwitch.AnimatedSwitch;
exports.TransitionRoute = _TransitionRoute.TransitionRoute;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = __webpack_require__(0);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children) {
  if (!children) {
    return children;
  }
  var result = {};
  _react.Children.map(children, function (child) {
    return child;
  }).forEach(function (child) {
    result[child.key] = child;
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    if (next.hasOwnProperty(key)) {
      return next[key];
    }

    return prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = {};

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (next.hasOwnProperty(prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending.hasOwnProperty(nextKey)) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/***/ })
/******/ ]);
});