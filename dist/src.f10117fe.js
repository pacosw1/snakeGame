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
})({"src/GameContext.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var GameContext =
/** @class */
function () {
  function GameContext() {}

  GameContext.scale = 30;
  GameContext.width = 1400;
  GameContext.height = 1920;
  GameContext.context = null;
  return GameContext;
}();

exports["default"] = GameContext;
},{}],"src/Snake.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var Snake =
/** @class */
function () {
  function Snake() {
    var _this = this;

    this.position = [1, 0];
    this.direction = [1, 0];
    this.color = "cyan";
    this.length = 4; // private direccion = ;

    this.path = [{
      x: 2,
      y: 0
    }, {
      x: 2,
      y: 0
    }, {
      x: 2,
      y: 0
    }, {
      x: 2,
      y: 0
    }, {
      x: 2,
      y: 0
    }, {
      x: 2,
      y: 0
    }];

    this.update = function () {
      var context = GameContext_1["default"].context,
          scale = GameContext_1["default"].scale;
      var _a = _this,
          position = _a.position,
          path = _a.path,
          direction = _a.direction;
      var _b = context.canvas,
          height = _b.height,
          width = _b.width;

      if (position[0] > width + -scale) {
        position[0] = 0;
      } else if (position[0] < 0) {
        position[0] = width - scale;
      } else if (position[1] < 0) {
        position[1] = height - scale;
      } else if (position[1] > height) {
        position[1] = 0;
      } else {
        position[0] += direction[0] * scale;
        position[1] += direction[1] * scale;
      }

      for (var i = 0; i < path.length; i++) {
        if (i + 1 < path.length) path[i] = path[i + 1];

        if (i == path.length - 1) {
          path[i] = {
            x: position[0],
            y: position[1]
          };
        }

        if (path[i + 1]) path[i] = path[i + 1];
      }
    };

    this.render = function () {
      var context = GameContext_1["default"].context;
      var scale = GameContext_1["default"].scale;
      var _a = _this.position,
          x = _a[0],
          y = _a[1];
      context.save();
      context.beginPath();
      context.fillStyle = _this.color;
      context.fillRect(x, y, scale, scale);

      for (var i = 0; i < _this.path.length; i++) {
        // if (this.path[i + 1]) this.path[i] = this.path[i + 1];
        context.fillRect(_this.path[i].x, _this.path[i].y, scale, scale);
      }

      context.closePath();
      context.restore();
    };
  }

  Snake.prototype.setPosition = function (x, y) {
    this.position[0] = x;
    this.position[1] = y;
  };

  Snake.prototype.addTail = function () {
    this.path.push({
      x: 0,
      y: 0
    });
  };

  Snake.prototype.getPosition = function () {
    return {
      x: this.position[0],
      y: this.position[1]
    };
  };

  Snake.prototype.setDirection = function (directionObject) {
    if (directionObject.x == 0) this.direction[0] = directionObject.x;
    if (directionObject.y == 0) this.direction[1] = directionObject.y;
  };

  return Snake;
}();

exports["default"] = Snake;
},{"./GameContext":"src/GameContext.ts"}],"src/Engine.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var Snake_1 = __importDefault(require("./Snake"));

var Engine =
/** @class */
function () {
  function Engine() {
    var _this = this;

    this.framerate = 1000 / 10;
    this.player = null;
    this.directionTable = {
      d: {
        x: 1,
        y: 0
      },
      w: {
        x: 0,
        y: -1
      },
      a: {
        x: -1,
        y: 0
      },
      s: {
        x: 0,
        y: 1
      }
    };

    this.start = function () {
      _this.init();

      setInterval(_this.tick, _this.framerate);
    };

    this.eventListener = function (event) {
      var direction = _this.directionTable[event.key];

      _this.player.setDirection(direction);
    };

    this.clearScreen = function () {
      var context = GameContext_1["default"].context;
      var canvas = context.canvas;
      var width = canvas.width;
      var height = canvas.height;
      context.save();
      context.beginPath();
      context.fillStyle = "green";
      context.strokeStyle = "white";
      context.lineWidth = 5;
      context.strokeRect(10, 10, 100, 100);
      context.fillRect(0, 0, width, height);
      context.closePath();
      context.restore();
    };

    this.init = function () {
      _this.player = new Snake_1["default"]();
    };

    this.tick = function () {
      _this.clearScreen();

      _this.player.render();

      _this.player.update();
    };
  }

  return Engine;
}();

exports["default"] = Engine;
},{"./GameContext":"src/GameContext.ts","./Snake":"src/Snake.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var Engine_1 = __importDefault(require("./Engine"));

var canvas = document.getElementById("game-area");
var context = canvas.getContext("2d");
GameContext_1["default"].context = context;
var engine = new Engine_1["default"]();
engine.start();
canvas.addEventListener("keypress", engine.eventListener); // import marioImage from "../assets/06-mario.png";
// context.rect(width / 2.4, heigth / 2.5, 200, 200);
// context.fillStyle = "#808";
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
},{"./GameContext":"src/GameContext.ts","./Engine":"src/Engine.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52039" + '/');

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