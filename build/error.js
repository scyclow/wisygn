/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _resizeWindow = __webpack_require__(1);
	
	var _createNoise = __webpack_require__(2);
	
	var _createNoise2 = _interopRequireDefault(_createNoise);
	
	var _onMouseMove = __webpack_require__(3);
	
	var _random = __webpack_require__(61);
	
	var _random2 = _interopRequireDefault(_random);
	
	var _dynamicInterval = __webpack_require__(62);
	
	var _colors = __webpack_require__(63);
	
	var _colors2 = _interopRequireDefault(_colors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var btwnLinear = function btwnLinear(max, min, n) {
	  return min + (max - min) * n;
	}; //todo, make utility
	var setHsvOnHex = _colors2.default.setHsvOnHex;
	var applyToHex = _colors2.default.applyToHex; // ytf do i need to do this?
	
	var canvas = document.getElementById('canvas');
	
	var _window = window;
	var innerWidth = _window.innerWidth;
	var innerHeight = _window.innerHeight;
	
	
	var centerX = innerWidth / 2;
	var centerY = innerHeight / 2;
	
	var baseSize = 1200 * 800;
	var baseMinLines = 250;
	var baseMaxLines = 1500;
	var minLines = baseMinLines;
	var maxLines = baseMaxLines;
	
	var centerDist = 1;
	var maxDist = Math.round((0, _onMouseMove.distance)([centerX, centerY], [innerWidth, innerHeight]));
	
	var distancePortion = (maxDist - centerDist) / (maxDist + 1);
	
	var baseColor = applyToHex('#ff0000', { v: -0.2 });
	var currentColor = baseColor;
	setInterval(function () {
	  return currentColor = applyToHex(currentColor, { h: 1 });
	}, 100);
	
	(0, _resizeWindow.onResize)((0, _resizeWindow.setHeight)(canvas), function (w, h) {
	  var _ref;
	
	  return _ref = [w, h], innerWidth = _ref[0], innerHeight = _ref[1], _ref;
	}, function (w, h) {
	  var _ref2;
	
	  return _ref2 = [w / 2, h / 2], centerX = _ref2[0], centerY = _ref2[1], _ref2;
	}, function (w, h) {
	  return maxDist = Math.round((0, _onMouseMove.distance)([centerX, centerY], [w, h]));
	}, function (w, h) {
	  var totalSize = w * h;
	  var adjustment = totalSize / baseSize;
	
	  maxLines = baseMaxLines * adjustment;
	  minLines = baseMinLines * adjustment;
	});
	
	var cursorVisable = void 0;
	(0, _onMouseMove.onMouseMove)(function (x, y) {
	  centerDist = Math.round((0, _onMouseMove.distance)([centerX, centerY], [x, y])) + 1;
	  distancePortion = (maxDist - centerDist) / (maxDist + 1);
	}, function () {
	  var hueChange = 10;
	  // const h = random(-hueChange, hueChange);
	  var s = btwnLinear(1, 0.2, distancePortion);
	  currentColor = setHsvOnHex(currentColor, { s: s });
	},
	// hide mouse if it's not moving
	function () {
	  if (cursorVisable) clearTimeout(cursorVisable);
	  document.body.style.cursor = '';
	  cursorVisable = setTimeout(function () {
	    document.body.style.cursor = 'none';
	  }, 100);
	});
	
	function drawLines(ctx) {
	  var numOfLines = btwnLinear(maxLines, minLines, distancePortion);
	
	  for (var i = 0; i <= numOfLines; i++) {
	    ctx.bezierCurveTo((0, _random2.default)(innerWidth), (0, _random2.default)(innerHeight), (0, _random2.default)(innerWidth), (0, _random2.default)(innerHeight), (0, _random2.default)(innerWidth), (0, _random2.default)(innerHeight));
	  }
	}
	
	function frame(ctx) {
	  ctx.lineWidth = 1;
	  ctx.strokeStyle = currentColor;
	
	  ctx.beginPath();
	  ctx.moveTo((0, _random2.default)(innerWidth), (0, _random2.default)(innerHeight));
	
	  drawLines(ctx);
	
	  ctx.stroke();
	}
	
	function withFrame(fn) {
	  var fastFR = 10;
	  var slowFR = 20;
	  setInterval(fn, 1000 / 60);
	
	  // let currentFR = slowFR;
	  // const changeFR = dynamicInterval(fn, currentFR);
	
	  // setInterval(() => {
	  //   currentFR = currentFR === slowFR ? fastFR : slowFR;
	  //   changeFR(currentFR);
	  // }, 300)
	}
	
	function draw(ctx) {
	  withFrame(function () {
	    // clear the frame
	    ctx.clearRect(0, 0, innerWidth, innerHeight);
	    // set the frame
	    frame(ctx);
	  });
	
	  // createNoise();
	}
	
	function withCanvas(can, fn) {
	  if (can.getContext) {
	    var ctx = can.getContext('2d');
	    fn(ctx);
	  }
	}
	
	withCanvas(canvas, draw);
	console.log('Source: https://github.com/scyclow'); // eslint-disable-line

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.onResize = onResize;
	exports.setHeight = setHeight;
	var resizeFns = [];
	
	window.onresize = function () {
	  var _window = window;
	  var innerWidth = _window.innerWidth;
	  var innerHeight = _window.innerHeight;
	
	  resizeFns.forEach(function (fn) {
	    return fn(innerWidth, innerHeight);
	  });
	};
	
	function onResize() {
	  var _window2 = window;
	  var innerWidth = _window2.innerWidth;
	  var innerHeight = _window2.innerHeight;
	
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }
	
	  fns.forEach(function (fn) {
	    return fn(innerWidth, innerHeight);
	  });
	
	  resizeFns = resizeFns.concat(fns);
	  return resizeFns;
	}
	
	function setHeight(canvas) {
	  return function (width, height) {
	    canvas.width = width;
	    canvas.height = height;
	  };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function createNoise() {
	  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	
	  // set up the different audio nodes we will use for the app
	  var gainNode = audioCtx.createGain();
	  var biquadFilter = audioCtx.createBiquadFilter();
	  var source = audioCtx.createOscillator();
	
	  source.connect(biquadFilter);
	  biquadFilter.connect(gainNode);
	  gainNode.connect(audioCtx.destination);
	
	  gainNode.gain.value = 0.0025;
	
	  biquadFilter.type = 'peaking';
	  biquadFilter.frequency.value = 250; // between 250 and 1000
	  biquadFilter.gain.value = 35; // between 10 and 45 or 250
	
	  source.type = 'square';
	  source.detune.value = 100;
	  source.frequency.value = 25; // between 15 and 30
	  source.start(0);
	
	  var i = 0;
	  var direction = 10;
	
	  return setInterval(function () {
	    biquadFilter.frequency.value += direction;
	    if (biquadFilter.frequency.value >= 1000 || biquadFilter.frequency.value <= 250) direction *= -1;
	
	    biquadFilter.frequency.value += direction;
	    i++;
	  }, 100);
	}
	
	exports.default = createNoise;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(4);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	exports.onMouseMove = onMouseMove;
	exports.distance = distance;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mouseMoveFns = [];
	
	document.onmousemove = function (e) {
	  var x = e.clientX + window.pageXOffset;
	  var y = e.clientY + window.pageYOffset;
	  mouseMoveFns.forEach(function (fn) {
	    return fn(x, y);
	  });
	};
	
	function onMouseMove() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }
	
	  return mouseMoveFns = mouseMoveFns.concat(fns);
	}
	
	function distance(_ref, _ref2) {
	  var _ref4 = (0, _slicedToArray3.default)(_ref, 2);
	
	  var x1 = _ref4[0];
	  var y1 = _ref4[1];
	
	  var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);
	
	  var x2 = _ref3[0];
	  var y2 = _ref3[1];
	
	  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(5);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(57);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(53);
	module.exports = __webpack_require__(55);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	var global        = __webpack_require__(19)
	  , hide          = __webpack_require__(23)
	  , Iterators     = __webpack_require__(11)
	  , TO_STRING_TAG = __webpack_require__(50)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(9)
	  , step             = __webpack_require__(10)
	  , Iterators        = __webpack_require__(11)
	  , toIObject        = __webpack_require__(12);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(16)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(13)
	  , defined = __webpack_require__(15);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(14);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(17)
	  , $export        = __webpack_require__(18)
	  , redefine       = __webpack_require__(33)
	  , hide           = __webpack_require__(23)
	  , has            = __webpack_require__(34)
	  , Iterators      = __webpack_require__(11)
	  , $iterCreate    = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(49)
	  , getPrototypeOf = __webpack_require__(51)
	  , ITERATOR       = __webpack_require__(50)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(19)
	  , core      = __webpack_require__(20)
	  , ctx       = __webpack_require__(21)
	  , hide      = __webpack_require__(23)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 19 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 20 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(22);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(24)
	  , createDesc = __webpack_require__(32);
	module.exports = __webpack_require__(28) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(25)
	  , IE8_DOM_DEFINE = __webpack_require__(27)
	  , toPrimitive    = __webpack_require__(31)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(28) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(28) && !__webpack_require__(29)(function(){
	  return Object.defineProperty(__webpack_require__(30)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(29)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26)
	  , document = __webpack_require__(19).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(26);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23);

/***/ },
/* 34 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(36)
	  , descriptor     = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(49)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(23)(IteratorPrototype, __webpack_require__(50)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(25)
	  , dPs         = __webpack_require__(37)
	  , enumBugKeys = __webpack_require__(47)
	  , IE_PROTO    = __webpack_require__(44)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(30)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(48).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(24)
	  , anObject = __webpack_require__(25)
	  , getKeys  = __webpack_require__(38);
	
	module.exports = __webpack_require__(28) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(39)
	  , enumBugKeys = __webpack_require__(47);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(34)
	  , toIObject    = __webpack_require__(12)
	  , arrayIndexOf = __webpack_require__(40)(false)
	  , IE_PROTO     = __webpack_require__(44)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(12)
	  , toLength  = __webpack_require__(41)
	  , toIndex   = __webpack_require__(43);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(42)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(45)('keys')
	  , uid    = __webpack_require__(46);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(19)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19).document && document.documentElement;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(24).f
	  , has = __webpack_require__(34)
	  , TAG = __webpack_require__(50)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(45)('wks')
	  , uid        = __webpack_require__(46)
	  , Symbol     = __webpack_require__(19).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(34)
	  , toObject    = __webpack_require__(52)
	  , IE_PROTO    = __webpack_require__(44)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(15);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(54)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(16)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , defined   = __webpack_require__(15);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(56)
	  , ITERATOR  = __webpack_require__(50)('iterator')
	  , Iterators = __webpack_require__(11);
	module.exports = __webpack_require__(20).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(14)
	  , TAG = __webpack_require__(50)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(53);
	module.exports = __webpack_require__(59);

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(25)
	  , get      = __webpack_require__(60);
	module.exports = __webpack_require__(20).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(56)
	  , ITERATOR  = __webpack_require__(50)('iterator')
	  , Iterators = __webpack_require__(11);
	module.exports = __webpack_require__(20).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = random;
	function random(i, j) {
	  if (!isNaN(j)) {
	    return i + random(j - i);
	  } else {
	    return Math.floor(Math.random() * i);
	  }
	}

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.dynamicInterval = dynamicInterval;
	function dynamicInterval(fn, startTime) {
	  var set = function set(time) {
	    return setInterval(fn, time);
	  };
	
	  var interval = set(startTime);
	
	  return function (time) {
	    clearInterval(interval);
	    return interval = set(time);
	  };
	}

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function numToHex(num) {
	  var hex = Math.round(Math.min(num, 255)).toString(16);
	  return (hex.length === 1 ? '0' + hex : hex).toUpperCase();
	}
	
	var hexToNum = function hexToNum(hex) {
	  return parseInt(hex, 16);
	};
	
	var rgbToHex = function rgbToHex(_ref) {
	  var r = _ref.r;
	  var g = _ref.g;
	  var b = _ref.b;
	  return '#' + numToHex(r) + numToHex(g) + numToHex(b);
	};
	
	var hexToRgb = function hexToRgb(hex) {
	  return hex.length === 7 ? {
	    r: hexToNum(hex.slice(1, 3)),
	    g: hexToNum(hex.slice(3, 5)),
	    b: hexToNum(hex.slice(5, 7))
	  } : {
	    r: hexToNum(hex.slice(1, 2).repeat(2)),
	    g: hexToNum(hex.slice(2, 3).repeat(2)),
	    b: hexToNum(hex.slice(3, 4).repeat(2))
	  };
	};
	
	var round = function round(n) {
	  var decimals = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	  return +n.toFixed(decimals);
	};
	
	// http://www.rapidtables.com/convert/color/rgb-to-hsv.htm
	function rgbToHsv(_ref2) {
	  var r = _ref2.r;
	  var g = _ref2.g;
	  var b = _ref2.b;
	
	  r /= 255;
	  g /= 255;
	  b /= 255;
	
	  var max = Math.max(r, g, b);
	  var min = Math.min(r, g, b);
	  var diff = max - min;
	  var value = max;
	  var saturation = max ? diff / max : 0;
	
	  var hue = void 0;
	  if (!diff) {
	    hue = 0;
	
	    // For some reason website says "mod 6". This returns wonky
	    // values, while + 6 appears to return the correct values.
	  } else if (r === max) {
	      hue = (g - b) / diff + 6;
	    } else if (g === max) {
	      hue = (b - r) / diff + 2;
	    } else if (b === max) {
	      hue = (r - g) / diff + 4;
	    }
	
	  hue *= 60;
	
	  return {
	    h: hue === 360 ? 0 : hue,
	    s: round(saturation, 2),
	    v: round(value, 2)
	  };
	}
	
	function hsvToRgb(_ref3) {
	  var h = _ref3.h;
	  var s = _ref3.s;
	  var v = _ref3.v;
	
	  h /= 60;
	  var c = v * s;
	  var x = c * (1 - Math.abs(h % 2 - 1));
	  var m = v - c;
	
	  var r = void 0,
	      g = void 0,
	      b = void 0;
	  switch (Math.floor(h)) {
	    case 0:
	    case 6:
	      r = c;g = x;b = 0;break;
	    case 1:
	      r = x;g = c;b = 0;break;
	    case 2:
	      r = 0;g = c;b = x;break;
	    case 3:
	      r = 0;g = x;b = c;break;
	    case 4:
	      r = x;g = 0;b = c;break;
	    case 5:
	      r = c;g = 0;b = x;break;
	  }
	
	  return {
	    r: round((r + m) * 255),
	    g: round((g + m) * 255),
	    b: round((b + m) * 255)
	  };
	}
	
	var hexToHsv = function hexToHsv(hex) {
	  return rgbToHsv(hexToRgb(hex));
	};
	var hsvToHex = function hsvToHex(hsv) {
	  return rgbToHex(hsvToRgb(hsv));
	};
	
	var wrap = function wrap(number, max) {
	  return number >= max ? wrap(number - max, max) : number < 0 ? wrap(max + number, max) : number;
	};
	
	var between = function between(n, max, min) {
	  return Math.max(Math.min(n, max), min);
	};
	
	function applyToHex(hex) {
	  var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  var _ref4$h = _ref4.h;
	  var h = _ref4$h === undefined ? 0 : _ref4$h;
	  var _ref4$s = _ref4.s;
	  var s = _ref4$s === undefined ? 0 : _ref4$s;
	  var _ref4$v = _ref4.v;
	  var v = _ref4$v === undefined ? 0 : _ref4$v;
	  var mod = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	
	  var hsv = hexToHsv(hex);
	  return hsvToHex({
	    h: wrap(hsv.h + h / mod, 360),
	    s: between(hsv.s + s / mod, 1, 0),
	    v: between(hsv.v + v / mod, 1, 0)
	  });
	}
	
	// experimental
	function setHsvOnHex(hex, _ref5) {
	  var h = _ref5.h;
	  var s = _ref5.s;
	  var v = _ref5.v;
	
	  var hsv = hexToHsv(hex);
	  return hsvToHex({
	    h: !isNaN(h) ? wrap(h, 360) : hsv.h,
	    s: !isNaN(s) ? between(s, 1, 0) : hsv.s,
	    v: !isNaN(v) ? between(v, 1, 0) : hsv.v
	  });
	}
	
	var randMax = function randMax(ceil) {
	  return Math.floor(Math.random() * ceil);
	};
	
	function randHex() {
	  var color = '#';
	  for (var i = 0; i < 6; i++) {
	    color += randMax(16).toString(16);
	  }
	  return color.toUpperCase();
	}
	
	exports.default = {
	  applyToHex: applyToHex,
	  setHsvOnHex: setHsvOnHex,
	  hexToNum: hexToNum,
	  hexToRgb: hexToRgb,
	  hsvToRgb: hsvToRgb,
	  numToHex: numToHex,
	  rgbToHex: rgbToHex,
	  rgbToHsv: rgbToHsv,
	  randHex: randHex
	};

/***/ }
/******/ ]);
//# sourceMappingURL=error.js.map