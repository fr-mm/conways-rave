// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../domain/enums/tileStatusEnum.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TileStatusEnum;

(function (TileStatusEnum) {
  TileStatusEnum["ALIVE"] = "ALIVE";
  TileStatusEnum["DEAD"] = "DEAD";
})(TileStatusEnum || (TileStatusEnum = {}));

exports.default = TileStatusEnum;
},{}],"../domain/enums/tileSignEnum.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TileSignEnum;

(function (TileSignEnum) {
  TileSignEnum["ALIVE"] = "O";
  TileSignEnum["DEAD"] = "&nbsp";
})(TileSignEnum || (TileSignEnum = {}));

exports.default = TileSignEnum;
},{}],"../domain/enums/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TileSignEnum = exports.TileStatusEnum = void 0;

var tileStatusEnum_1 = __importDefault(require("./tileStatusEnum"));

exports.TileStatusEnum = tileStatusEnum_1.default;

var tileSignEnum_1 = __importDefault(require("./tileSignEnum"));

exports.TileSignEnum = tileSignEnum_1.default;
},{"./tileStatusEnum":"../domain/enums/tileStatusEnum.ts","./tileSignEnum":"../domain/enums/tileSignEnum.ts"}],"../domain/entities/rulesSet.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var enums_1 = require("domain/enums");

var RuleSet = /*#__PURE__*/function () {
  function RuleSet(rules) {
    _classCallCheck(this, RuleSet);

    this._rules = new Map();

    this._rules.set(enums_1.TileStatusEnum.ALIVE, rules.forTheLiving);

    this._rules.set(enums_1.TileStatusEnum.DEAD, rules.forTheDead);
  }

  _createClass(RuleSet, [{
    key: "getNewTileStatus",
    value: function getNewTileStatus(previousStatus, neighboursCount) {
      var rulesForStatus = this._rules.get(previousStatus);

      return rulesForStatus.get(neighboursCount);
    }
  }]);

  return RuleSet;
}();

exports.default = RuleSet;
},{"domain/enums":"../domain/enums/index.ts"}],"../domain/entities/rulesForNeighbourCounts.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var RulesForGivenTileStatus = /*#__PURE__*/function () {
  function RulesForGivenTileStatus(rules) {
    _classCallCheck(this, RulesForGivenTileStatus);

    this._rules = new Map();

    this._rules.set(0, rules.zero);

    this._rules.set(1, rules.one);

    this._rules.set(2, rules.two);

    this._rules.set(3, rules.three);

    this._rules.set(4, rules.four);

    this._rules.set(5, rules.five);

    this._rules.set(6, rules.six);

    this._rules.set(7, rules.seven);

    this._rules.set(8, rules.eight);
  }

  _createClass(RulesForGivenTileStatus, [{
    key: "get",
    value: function get(neighboursCount) {
      return this._rules.get(neighboursCount);
    }
  }]);

  return RulesForGivenTileStatus;
}();

exports.default = RulesForGivenTileStatus;
},{}],"../domain/exceptions/domainException.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DomainException = /*#__PURE__*/function (_Error) {
  _inherits(DomainException, _Error);

  var _super = _createSuper(DomainException);

  function DomainException() {
    _classCallCheck(this, DomainException);

    return _super.apply(this, arguments);
  }

  return _createClass(DomainException);
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.default = DomainException;
},{}],"../domain/exceptions/invalidLandscapeSizeException.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var exceptions_1 = require("domain/exceptions");

var InvalidLandscapeSizeException = /*#__PURE__*/function (_exceptions_1$DomainE) {
  _inherits(InvalidLandscapeSizeException, _exceptions_1$DomainE);

  var _super = _createSuper(InvalidLandscapeSizeException);

  function InvalidLandscapeSizeException(x, y) {
    _classCallCheck(this, InvalidLandscapeSizeException);

    var message = "Must be integers > 0, got X: ".concat(x, "; Y: ").concat(y);
    return _super.call(this, message);
  }

  return _createClass(InvalidLandscapeSizeException);
}(exceptions_1.DomainException);

exports.default = InvalidLandscapeSizeException;
},{"domain/exceptions":"../domain/exceptions/index.ts"}],"../domain/exceptions/invalidLandscapeCoordinates.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var domainException_1 = __importDefault(require("./domainException"));

var InvalidLandscapeCoordinatesException = /*#__PURE__*/function (_domainException_1$de) {
  _inherits(InvalidLandscapeCoordinatesException, _domainException_1$de);

  var _super = _createSuper(InvalidLandscapeCoordinatesException);

  function InvalidLandscapeCoordinatesException() {
    _classCallCheck(this, InvalidLandscapeCoordinatesException);

    return _super.apply(this, arguments);
  }

  return _createClass(InvalidLandscapeCoordinatesException);
}(domainException_1.default);

exports.default = InvalidLandscapeCoordinatesException;
},{"./domainException":"../domain/exceptions/domainException.ts"}],"../domain/exceptions/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidLandscapeCoordinatesException = exports.InvalidLandscapeSizeException = exports.DomainException = void 0;

var domainException_1 = __importDefault(require("./domainException"));

exports.DomainException = domainException_1.default;

var invalidLandscapeSizeException_1 = __importDefault(require("./invalidLandscapeSizeException"));

exports.InvalidLandscapeSizeException = invalidLandscapeSizeException_1.default;

var invalidLandscapeCoordinates_1 = __importDefault(require("./invalidLandscapeCoordinates"));

exports.InvalidLandscapeCoordinatesException = invalidLandscapeCoordinates_1.default;
},{"./domainException":"../domain/exceptions/domainException.ts","./invalidLandscapeSizeException":"../domain/exceptions/invalidLandscapeSizeException.ts","./invalidLandscapeCoordinates":"../domain/exceptions/invalidLandscapeCoordinates.ts"}],"../domain/valueObjects/landscapeSize.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var exceptions_1 = require("domain/exceptions");

var LandscapeSize = /*#__PURE__*/function () {
  function LandscapeSize(size) {
    _classCallCheck(this, LandscapeSize);

    this._validate(size.x, size.y);

    this._x = size.x;
    this._y = size.y;
  }

  _createClass(LandscapeSize, [{
    key: "x",
    get: function get() {
      return this._x;
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    }
  }, {
    key: "_validate",
    value: function _validate(x, y) {
      if (!this._isValid(x) || !this._isValid(y)) {
        throw new exceptions_1.InvalidLandscapeSizeException(x, y);
      }
    }
  }, {
    key: "_isValid",
    value: function _isValid(value) {
      return this._isInteger(value) && this._isGreaterThenZero(value);
    }
  }, {
    key: "_isInteger",
    value: function _isInteger(value) {
      return Number.isInteger(value);
    }
  }, {
    key: "_isGreaterThenZero",
    value: function _isGreaterThenZero(value) {
      return value > 0;
    }
  }]);

  return LandscapeSize;
}();

exports.default = LandscapeSize;
},{"domain/exceptions":"../domain/exceptions/index.ts"}],"../domain/valueObjects/landscapeCoordinates.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var exceptions_1 = require("domain/exceptions");

var LandscapeCoordinates = /*#__PURE__*/function () {
  function LandscapeCoordinates(args) {
    _classCallCheck(this, LandscapeCoordinates);

    this._validate(args);

    this._x = args.coordinates.x;
    this._y = args.coordinates.y;
  }

  _createClass(LandscapeCoordinates, [{
    key: "x",
    get: function get() {
      return this._x;
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    }
  }, {
    key: "equals",
    value: function equals(landscapeCoordinates) {
      return landscapeCoordinates.x === this.x && landscapeCoordinates.y === this.y;
    }
  }, {
    key: "_validate",
    value: function _validate(args) {
      this._validateCoordinate(args.coordinates.x, args.landscapeSize.x);

      this._validateCoordinate(args.coordinates.y, args.landscapeSize.y);
    }
  }, {
    key: "_validateCoordinate",
    value: function _validateCoordinate(coordinate, ceiling) {
      this._validateInteger(coordinate);

      this._validatePositive(coordinate);

      this._validateInsideLandscape(coordinate, ceiling);
    }
  }, {
    key: "_validateInteger",
    value: function _validateInteger(value) {
      if (!Number.isInteger(value)) {
        throw new exceptions_1.InvalidLandscapeCoordinatesException("".concat(value, " is not an integer"));
      }
    }
  }, {
    key: "_validatePositive",
    value: function _validatePositive(value) {
      if (value < 0) {
        throw new exceptions_1.InvalidLandscapeCoordinatesException("".concat(value, " is not positive"));
      }
    }
  }, {
    key: "_validateInsideLandscape",
    value: function _validateInsideLandscape(value, ceiling) {
      if (value >= ceiling) {
        throw new exceptions_1.InvalidLandscapeCoordinatesException("".concat(value, " out of landscape range (should be less than ").concat(ceiling, ")"));
      }
    }
  }]);

  return LandscapeCoordinates;
}();

exports.default = LandscapeCoordinates;
},{"domain/exceptions":"../domain/exceptions/index.ts"}],"../domain/valueObjects/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LandscapeCoordinates = exports.LandscapeSize = void 0;

var landscapeSize_1 = __importDefault(require("./landscapeSize"));

exports.LandscapeSize = landscapeSize_1.default;

var landscapeCoordinates_1 = __importDefault(require("./landscapeCoordinates"));

exports.LandscapeCoordinates = landscapeCoordinates_1.default;
},{"./landscapeSize":"../domain/valueObjects/landscapeSize.ts","./landscapeCoordinates":"../domain/valueObjects/landscapeCoordinates.ts"}],"../domain/entities/landscape.ts":[function(require,module,exports) {
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var exceptions_1 = require("domain/exceptions");

var valueObjects_1 = require("domain/valueObjects");

var Landscape = /*#__PURE__*/function () {
  function Landscape(args) {
    _classCallCheck(this, Landscape);

    this._matrix = args.matrix;
  }

  _createClass(Landscape, [{
    key: "height",
    get: function get() {
      return this._matrix.length;
    }
  }, {
    key: "width",
    get: function get() {
      return this._matrix[0].length;
    }
  }, {
    key: "asText",
    get: function get() {
      var result = "";

      var _iterator = _createForOfIteratorHelper(this._matrix),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          result += line.join("") + Landscape._breakLineTag;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return result;
    }
  }, {
    key: "getCharAt",
    value: function getCharAt(coordinates) {
      return this._matrix[coordinates.y][coordinates.x];
    }
  }, {
    key: "getNeighbours",
    value: function getNeighbours(coordinates) {
      var centralCoordinates = this._getLandscapeCoordinates(coordinates);

      var neighbours = [];

      for (var y = centralCoordinates.y - 1; y < centralCoordinates.y + 2; y++) {
        for (var x = centralCoordinates.x - 1; x < centralCoordinates.x + 2; x++) {
          try {
            var neighbourCoordinates = this._getLandscapeCoordinates({
              x: x,
              y: y
            });

            if (!neighbourCoordinates.equals(centralCoordinates)) {
              neighbours.push(this._matrix[neighbourCoordinates.y][neighbourCoordinates.x]);
            }
          } catch (error) {
            if (!(error instanceof exceptions_1.InvalidLandscapeCoordinatesException)) {
              throw error;
            }
          }
        }
      }

      return neighbours;
    }
  }, {
    key: "_getLandscapeCoordinates",
    value: function _getLandscapeCoordinates(coordinates) {
      return new valueObjects_1.LandscapeCoordinates({
        coordinates: coordinates,
        landscapeSize: {
          x: this.width,
          y: this.height
        }
      });
    }
  }]);

  return Landscape;
}();

exports.default = Landscape;
Landscape._breakLineTag = "<br>";
},{"domain/exceptions":"../domain/exceptions/index.ts","domain/valueObjects":"../domain/valueObjects/index.ts"}],"../domain/entities/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Landscape = exports.RulesForNeighbourCounts = exports.RuleSet = void 0;

var rulesSet_1 = __importDefault(require("./rulesSet"));

exports.RuleSet = rulesSet_1.default;

var rulesForNeighbourCounts_1 = __importDefault(require("./rulesForNeighbourCounts"));

exports.RulesForNeighbourCounts = rulesForNeighbourCounts_1.default;

var landscape_1 = __importDefault(require("./landscape"));

exports.Landscape = landscape_1.default;
},{"./rulesSet":"../domain/entities/rulesSet.ts","./rulesForNeighbourCounts":"../domain/entities/rulesForNeighbourCounts.ts","./landscape":"../domain/entities/landscape.ts"}],"../domain/factories/ruleSetFactory.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var entities_1 = require("domain/entities");

var enums_1 = require("domain/enums");

var RuleSetFactory = /*#__PURE__*/function () {
  function RuleSetFactory() {
    _classCallCheck(this, RuleSetFactory);
  }

  _createClass(RuleSetFactory, [{
    key: "buildDefault",
    value: function buildDefault() {
      return new entities_1.RuleSet({
        forTheLiving: new entities_1.RulesForNeighbourCounts({
          zero: enums_1.TileStatusEnum.DEAD,
          one: enums_1.TileStatusEnum.DEAD,
          two: enums_1.TileStatusEnum.ALIVE,
          three: enums_1.TileStatusEnum.ALIVE,
          four: enums_1.TileStatusEnum.DEAD,
          five: enums_1.TileStatusEnum.DEAD,
          six: enums_1.TileStatusEnum.DEAD,
          seven: enums_1.TileStatusEnum.DEAD,
          eight: enums_1.TileStatusEnum.DEAD
        }),
        forTheDead: new entities_1.RulesForNeighbourCounts({
          zero: enums_1.TileStatusEnum.DEAD,
          one: enums_1.TileStatusEnum.DEAD,
          two: enums_1.TileStatusEnum.DEAD,
          three: enums_1.TileStatusEnum.ALIVE,
          four: enums_1.TileStatusEnum.DEAD,
          five: enums_1.TileStatusEnum.DEAD,
          six: enums_1.TileStatusEnum.DEAD,
          seven: enums_1.TileStatusEnum.DEAD,
          eight: enums_1.TileStatusEnum.DEAD
        })
      });
    }
  }]);

  return RuleSetFactory;
}();

exports.default = RuleSetFactory;
},{"domain/entities":"../domain/entities/index.ts","domain/enums":"../domain/enums/index.ts"}],"../domain/factories/landscapeFactory.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var entities_1 = require("domain/entities");

var enums_1 = require("domain/enums");

var valueObjects_1 = require("domain/valueObjects");

var LandscapeFactory = /*#__PURE__*/function () {
  function LandscapeFactory() {
    _classCallCheck(this, LandscapeFactory);
  }

  _createClass(LandscapeFactory, [{
    key: "blank",
    value: function blank(args) {
      var createChar = function createChar() {
        return enums_1.TileSignEnum.DEAD;
      };

      return this._buildNew({
        size: args.size,
        createChar: createChar
      });
    }
  }, {
    key: "randomized",
    value: function randomized(args) {
      var possibleChars = [enums_1.TileSignEnum.ALIVE, enums_1.TileSignEnum.DEAD];

      var createChar = function createChar() {
        return possibleChars[Math.floor(Math.random() * possibleChars.length)];
      };

      return this._buildNew({
        size: args.size,
        createChar: createChar
      });
    }
  }, {
    key: "fromMatrix",
    value: function fromMatrix(args) {
      return new entities_1.Landscape({
        matrix: args.matrix
      });
    }
  }, {
    key: "_buildNew",
    value: function _buildNew(args) {
      var size = new valueObjects_1.LandscapeSize({
        x: args.size.x,
        y: args.size.y
      });
      var matrix = [];

      for (var y = 0; y < size.y; y++) {
        var line = [];

        for (var x = 0; x < size.x; x++) {
          var char = args.createChar();
          line.push(char);
        }

        matrix.push(line);
      }

      return new entities_1.Landscape({
        matrix: matrix
      });
    }
  }]);

  return LandscapeFactory;
}();

exports.default = LandscapeFactory;
},{"domain/entities":"../domain/entities/index.ts","domain/enums":"../domain/enums/index.ts","domain/valueObjects":"../domain/valueObjects/index.ts"}],"../domain/factories/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LandscapeFactory = exports.RuleSetFactory = void 0;

var ruleSetFactory_1 = __importDefault(require("./ruleSetFactory"));

exports.RuleSetFactory = ruleSetFactory_1.default;

var landscapeFactory_1 = __importDefault(require("./landscapeFactory"));

exports.LandscapeFactory = landscapeFactory_1.default;
},{"./ruleSetFactory":"../domain/factories/ruleSetFactory.ts","./landscapeFactory":"../domain/factories/landscapeFactory.ts"}],"../domain/services/generateNextLandscapeService.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var enums_1 = require("domain/enums");

var GenerateNextLandscapeService = /*#__PURE__*/function () {
  function GenerateNextLandscapeService(args) {
    _classCallCheck(this, GenerateNextLandscapeService);

    this._rules = args.ruleSet;
    this._landscapeFactory = args.landscapeFactory;
  }

  _createClass(GenerateNextLandscapeService, [{
    key: "execute",
    value: function execute(oldLandscape) {
      var matrix = [];

      for (var y = 0; y < oldLandscape.height; y++) {
        var line = [];

        for (var x = 0; x < oldLandscape.width; x++) {
          var char = this._getFutureChar({
            coordinates: {
              x: x,
              y: y
            },
            oldLandscape: oldLandscape
          });

          line.push(char);
        }

        matrix.push(line);
      }

      return this._landscapeFactory.fromMatrix({
        matrix: matrix
      });
    }
  }, {
    key: "_getFutureChar",
    value: function _getFutureChar(args) {
      var oldChar = args.oldLandscape.getCharAt({
        x: args.coordinates.x,
        y: args.coordinates.y
      });

      var aliveNeighboursCount = this._countAliveNeighbours(args);

      var oldStatus = oldChar === enums_1.TileSignEnum.ALIVE ? enums_1.TileStatusEnum.ALIVE : enums_1.TileStatusEnum.DEAD;

      var newStatus = this._rules.getNewTileStatus(oldStatus, aliveNeighboursCount);

      return newStatus === enums_1.TileStatusEnum.ALIVE ? enums_1.TileSignEnum.ALIVE : enums_1.TileSignEnum.DEAD;
    }
  }, {
    key: "_countAliveNeighbours",
    value: function _countAliveNeighbours(args) {
      var neighbours = args.oldLandscape.getNeighbours(args.coordinates);
      return neighbours.filter(function (neighbour) {
        return neighbour == enums_1.TileSignEnum.ALIVE;
      }).length;
    }
  }]);

  return GenerateNextLandscapeService;
}();

exports.default = GenerateNextLandscapeService;
},{"domain/enums":"../domain/enums/index.ts"}],"../domain/services/getMaxLandscapeSizeForBrowserService.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var valueObjects_1 = require("domain/valueObjects");

var GetMaxLandscapeSizeForBrowserService = /*#__PURE__*/function () {
  function GetMaxLandscapeSizeForBrowserService() {
    _classCallCheck(this, GetMaxLandscapeSizeForBrowserService);

    this._XPixelsPerChar = 7.2;
    this._YPixelsPerChar = 14.2;
  }

  _createClass(GetMaxLandscapeSizeForBrowserService, [{
    key: "execute",
    value: function execute() {
      var element = document.documentElement;
      var body = element.getElementsByTagName("body")[0];
      var pixelsX = window.innerWidth || element.clientWidth || body.clientWidth;
      var pixelsY = window.innerHeight || element.clientHeight || body.clientHeight;
      var charsX = Math.ceil(pixelsX / this._XPixelsPerChar);
      var charsY = Math.ceil(pixelsY / this._YPixelsPerChar);
      return new valueObjects_1.LandscapeSize({
        x: charsX,
        y: charsY
      });
    }
  }]);

  return GetMaxLandscapeSizeForBrowserService;
}();

exports.default = GetMaxLandscapeSizeForBrowserService;
},{"domain/valueObjects":"../domain/valueObjects/index.ts"}],"../domain/services/createRandomLandscapeService.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CreateRandomLandscapeService = /*#__PURE__*/function () {
  function CreateRandomLandscapeService(args) {
    _classCallCheck(this, CreateRandomLandscapeService);

    this._landscapeFactory = args.landscapeFactory;
    this._getMaxLandscapeSizeForBrowserService = args.getMaxLandscapeSizeForBrowserService;
  }

  _createClass(CreateRandomLandscapeService, [{
    key: "execute",
    value: function execute() {
      var landscapeSize = this._getMaxLandscapeSizeForBrowserService.execute();

      return this._landscapeFactory.randomized({
        size: landscapeSize
      });
    }
  }]);

  return CreateRandomLandscapeService;
}();

exports.default = CreateRandomLandscapeService;
},{}],"../domain/services/printLandscapeService.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var PrintLandscapeService = /*#__PURE__*/function () {
  function PrintLandscapeService() {
    _classCallCheck(this, PrintLandscapeService);
  }

  _createClass(PrintLandscapeService, [{
    key: "execute",
    value: function execute(landscape) {
      document.getElementsByClassName("main")[0].innerHTML = landscape.asText;
    }
  }]);

  return PrintLandscapeService;
}();

exports.default = PrintLandscapeService;
},{}],"../domain/services/runSimulationService.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var RunSimulationService = /*#__PURE__*/function () {
  function RunSimulationService(args) {
    _classCallCheck(this, RunSimulationService);

    this._frameTimeoutMS = 50;
    this._createLandscapeService = args.createLandscapeService;
    this._generateNextLandscapeService = args.generateNextLandscapeService;
    this._printLandscapeService = args.printLandscapeService;
  }

  _createClass(RunSimulationService, [{
    key: "execute",
    value: function execute() {
      var _this = this;

      var landscape = this._createLandscapeService.execute();

      var runFrames = function runFrames() {
        _this._printLandscapeService.execute(landscape);

        landscape = _this._generateNextLandscapeService.execute(landscape);
        setTimeout(runFrames, _this._frameTimeoutMS);
      };

      runFrames();
    }
  }]);

  return RunSimulationService;
}();

exports.default = RunSimulationService;
},{}],"../domain/services/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RunSimulationService = exports.PrintLandscapeService = exports.CreateRandomLandscapeService = exports.GetMaxLandscapeSizeForBrowserService = exports.GenerateNextLandscapeService = void 0;

var generateNextLandscapeService_1 = __importDefault(require("./generateNextLandscapeService"));

exports.GenerateNextLandscapeService = generateNextLandscapeService_1.default;

var getMaxLandscapeSizeForBrowserService_1 = __importDefault(require("./getMaxLandscapeSizeForBrowserService"));

exports.GetMaxLandscapeSizeForBrowserService = getMaxLandscapeSizeForBrowserService_1.default;

var createRandomLandscapeService_1 = __importDefault(require("./createRandomLandscapeService"));

exports.CreateRandomLandscapeService = createRandomLandscapeService_1.default;

var printLandscapeService_1 = __importDefault(require("./printLandscapeService"));

exports.PrintLandscapeService = printLandscapeService_1.default;

var runSimulationService_1 = __importDefault(require("./runSimulationService"));

exports.RunSimulationService = runSimulationService_1.default;
},{"./generateNextLandscapeService":"../domain/services/generateNextLandscapeService.ts","./getMaxLandscapeSizeForBrowserService":"../domain/services/getMaxLandscapeSizeForBrowserService.ts","./createRandomLandscapeService":"../domain/services/createRandomLandscapeService.ts","./printLandscapeService":"../domain/services/printLandscapeService.ts","./runSimulationService":"../domain/services/runSimulationService.ts"}],"script.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var factories_1 = require("domain/factories");

var services_1 = require("domain/services");

var runApp = function runApp() {
  var landscapeFactory = new factories_1.LandscapeFactory();
  var getMaxLandscapeSizeForBrowserService = new services_1.GetMaxLandscapeSizeForBrowserService();
  var createLandscapeService = new services_1.CreateRandomLandscapeService({
    landscapeFactory: landscapeFactory,
    getMaxLandscapeSizeForBrowserService: getMaxLandscapeSizeForBrowserService
  });
  var ruleSetFactory = new factories_1.RuleSetFactory();
  var generateNextLandscapeService = new services_1.GenerateNextLandscapeService({
    ruleSet: ruleSetFactory.buildDefault(),
    landscapeFactory: landscapeFactory
  });
  var printLandscapeService = new services_1.PrintLandscapeService();
  var runSimulationService = new services_1.RunSimulationService({
    createLandscapeService: createLandscapeService,
    generateNextLandscapeService: generateNextLandscapeService,
    printLandscapeService: printLandscapeService
  });
  runSimulationService.execute();
};

runApp();
},{"domain/factories":"../domain/factories/index.ts","domain/services":"../domain/services/index.ts"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39261" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.ts"], null)
//# sourceMappingURL=/script.221c08a2.js.map