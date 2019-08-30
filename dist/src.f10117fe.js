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
})({"src/Engine.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Engine =
/** @class */
function () {
  function Engine(objects) {
    var _this = this;

    this.tick = function () {
      // Time.update();
      for (var i = 0; i < _this.gameObjects.length; i++) {
        requestAnimationFrame(_this.tick);
      }
    };

    this.gameObjects = objects.slice();
  }

  Engine.prototype.start = function () {
    requestAnimationFrame(this.tick);
  };

  Engine.prototype.kill = function () {};

  return Engine;
}();

exports["default"] = Engine;
},{}],"src/GameObject.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var GameObject =
/** @class */
function () {
  function GameObject() {}

  GameObject.getCanvasWidth = function () {
    return GameObject.context.canvas.width;
  };

  GameObject.getCanvasHeight = function () {
    return GameObject.context.canvas.height;
  };

  return GameObject;
}();

exports["default"] = GameObject;
},{}],"src/Circle.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameObject_1 = __importDefault(require("./GameObject"));

var Circle =
/** @class */
function (_super) {
  __extends(Circle, _super);

  function Circle(x, y, size) {
    var _this = _super.call(this) || this;

    _this.size = size;
    _this.coordX = x;
    _this.coordY = y;
    return _this;
  }

  Circle.prototype.render = function () {
    var context = GameObject_1["default"].context;
    context.ellipse(this.coordX, this.coordY, this.size, this.size, 0, 0, Math.PI * 2);
    context.fillStyle = "#0074D9";
    context.fill();
  };

  return Circle;
}(GameObject_1["default"]);

exports["default"] = Circle;
},{"./GameObject":"src/GameObject.ts"}],"src/setup.js":[function(require,module,exports) {
exports.width = 1440;
exports.heigth = 750;
},{}],"src/Square.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameObject_1 = __importDefault(require("./GameObject"));

var setup_1 = require("./setup");

var Square =
/** @class */
function (_super) {
  __extends(Square, _super);

  function Square(x, y, size) {
    var _this = _super.call(this) || this;

    _this.speed = 10;
    _this.size = size;
    _this.direction = true;
    _this.xSign = 1;
    _this.coordX = 0;
    _this.coordY = y;
    return _this;
  }

  Square.prototype.render = function () {
    this.coordX += 10 * this.xSign;
    var context = GameObject_1["default"].context;
    context.clearRect(0, 0, 1440, 778);
    context.beginPath();

    if (this.coordX == setup_1.width - this.size || this.coordX == 0) {
      // alert(this.direction);
      this.direction = !this.direction;
      this.xSign = this.direction ? 1 : -1;
    }

    context.rect(this.coordX, this.coordY, this.size, this.size);
    context.fillStyle = "#0074D9";
    context.fill();
  };

  return Square;
}(GameObject_1["default"]);

exports["default"] = Square;
},{"./GameObject":"src/GameObject.ts","./setup":"src/setup.js"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true; // import marioImage from "../assets/06-mario.png";
// context.rect(width / 2.4, heigth / 2.5, 200, 200);
// context.fillStyle = "#808";
// context.fill();
// context.ellipse(250, 250, 100, 100, 0, 0, Math.PI * 2);
// context.fillStyle = "#0074D9";
// context.fill();
// const drawText = (color, text, x, y) => {
//   context.fillStyle = color;
//   context.textAlign = "center";
//   context.fillText(text, x, y);
//   context.restore();
// };
// let changeColor = ({ key }) => {
//   let hash = { 1: "#e6004c", 2: "#cc99ff", 3: "#0000ff", 4: "#009933" };
//   if (key in hash) {
//     drawText(hash[key], key, 200, 200);
//     context.fillStyle = hash[key];
//     context.fill();
//   }
// };
// let deleteKey = event => {
//   setTimeout(() => {
//     context.clearRect(0, 0, width, heigth);
//   }, 120);
// };
// canvas.addEventListener("keyup", deleteKey);
// canvas.addEventListener("keypress", changeColor);
// let x = 100;
// let y = 100;
// const imagen = new Image();
// imagen.src = marioImage;
// let direction = 1;
// let imageLoaded = () => {
//   context.save();
//   context.scale(-1, 1);
//   context.restore();
// };
// let move = ({ key }) => {
//   console.log(key);
//   if (key == "ArrowLeft") {
//     context.scale(-1, 1);
//     direction = -1;
//     context.clearRect(x - 200, y, 500, 500);
//     x -= 50;
//     console.log("x: " + x * -1);
//     console.log(direction);
//     context.drawImage(imagen, x * -1, y);
//   } else if (key == "ArrowRight") {
//     direction = 1;
//     context.clearRect(0, 0, 1440, 1000);
//     context.scale(1, 1);
//     x += 50;
//     console.log("x: " + x);
//     context.drawImage(imagen, x * direction, y);
//   }
// };
// imagen.addEventListener("load", imageLoaded);
// canvas.addEventListener("keydown", move);
// let volume = 1;
// import audio from "../assets/mlss-world-map.mp3";
// const sound = new Audio(audio);
// let move = ({ key }) => {
//   if (key == "ArrowUp") {
//     if (sound.volume < 1) sound.volume += 0.1;
//   } else if (key == "ArrowDown") {
//     if (sound.volume >= 0.25) sound.volume -= 0.1;
//   } else if (key == "Meta") sound.paused ? sound.play() : sound.pause(); //USE META SPACE NO JALA EN MAC
// };

var Engine_1 = __importDefault(require("./Engine"));

var Circle_1 = __importDefault(require("./Circle"));

var Square_1 = __importDefault(require("./Square")); // import Mario from "./Mario";


var canvas = document.getElementById("game-area");
var context = canvas.getContext("2d"); // canvas.addEventListener("keydown", move);

var engine = new Engine_1["default"]([new Square_1["default"](200, 200, 250), new Circle_1["default"](0, 100, 200)]);
engine.start();
},{"./Engine":"src/Engine.ts","./Circle":"src/Circle.ts","./Square":"src/Square.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49886" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map