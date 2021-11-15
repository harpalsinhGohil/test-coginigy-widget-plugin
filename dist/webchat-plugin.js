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
  })({"JE2T":[function(require,module,exports) {
  if (!window.__COGNIGY_WEBCHAT) throw new Error('Cognigy Webchat v2.7 or higher has to be loaded before this plugin');
  module.exports = window.__COGNIGY_WEBCHAT.React;
  },{}],"/deH":[function(require,module,exports) {
  "use strict";
  
  var React = _interopRequireWildcard(require("react"));
  
  function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
  
  function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
  
  /*
      This plugin is to create a custom quick replies in cognigy webchat
      which allows 2 actions in one button postback & URL
  
      by clicking on this qr button widget should give postback to bot as well as open a url too
      for use-cases like sign in in the middle of flow
  
      You can call the plugin from within Cognigy by sending a data message using a Say Node.
      {
        "_plugin": {
          "type": "button",
          "text": "To help you with that, I need you to sign in first.",
          "quickReplies": [
              {
                  "title": "Sign in",
                  "imageAltText": "",
                  "imageUrl": "",
                  "contentType": "postbackAndURL",
                  "payload": "Sign in",
                  "URLConfig": {
                      "URL": "https://example.com",
                      "popupWindowTitle": "Sign in",
                      "popupWidth": 500,
                      "popupHeight": 600
                  }
              },
              {
                  "title": "I don't have a profile",
                  "imageAltText": "",
                  "imageUrl": "",
                  "contentType": "postback",
                  "payload": "I don't have a profile"
              }
            ]
        }
    }
  */
  
  /** open a popup in center of the screen */
  var popupwindow = function popupwindow(url, title, w, h) {
    var left = screen.width / 2 - w / 2;
    var top = screen.height / 2 - h / 2;
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  };
  
  var qrTemplateHeaderMessageCSS = {
    padding: "16px 24px",
    "min-width": "0px",
    "word-break": "break-word",
    "white-space": "pre-wrap",
    "border-radius": "16px 16px 16px 0px",
    "box-shadow": "rgba(151, 124, 156, 0.1) 0px 5px 9px 0px, rgba(203, 195, 212, 0.1) 0px 5px 16px 0px, rgba(216, 212, 221, 0.1) 0px 8px 20px 0px",
    background: "rgba(0, 0, 0, 0) linear-gradient(185deg, rgb(54, 118, 185), rgb(44, 108, 175)) repeat scroll 0% 0%",
    color: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgb(230, 230, 230)"
  };
  var qrTemplateRepliesContainerCSS = {
    'text-align': 'center',
    margin: '3px -5px -5px',
    'flex-wrap': 'wrap'
  };
  var qrTemplateButtonsCSS = {
    'background-color': 'transparent',
    'border': '1px solid rgb(44, 108, 175)',
    'border-radius': '40px',
    'padding': '4px 16px',
    'min-height': '40px',
    'min-width': '40px',
    'font-size': '15px',
    'color': 'rgb(44, 108, 175)',
    'cursor': 'pointer',
    'outline': 'currentcolor none medium',
    'transition': 'transform 0.1s ease-out 0s',
    'margin': '3px'
  };
  
  var Button = function Button(props) {
    var message = props.message,
        onSendMessage = props.onSendMessage;
    var data = message.data;
    var _plugin = data._plugin;
    var buttonsHTML;
  
    if (_plugin.quickReplies) {
      buttonsHTML = _plugin.quickReplies.map(function (button) {
        return React.createElement("button", {
          class: "webchat-quick-reply-template-reply",
          type: "button" // className="signinButton"
          ,
          onClick: function onClick() {
            onSendMessage(button.payload);
  
            if (button.contentType === 'postbackAndURL') {
              popupwindow(button.URLConfigs.URL, button.URLConfigs.popupWindowTitle, button.URLConfigs.popupWidth, button.URLConfigs.popupHeight);
            }
          },
          style: qrTemplateButtonsCSS
        }, React.createElement("span", {
          style: {
            'font-size': '15px',
            color: 'rgb(44, 108, 175)',
            cursor: 'pointer'
          }
        }, button.title));
      });
    }
  
    return React.createElement("div", {
      class: "webchat-quick-reply-template-root"
    }, React.createElement("div", {
      class: "webchat-quick-reply-template-header-message",
      style: qrTemplateHeaderMessageCSS
    }, _plugin.text), React.createElement("div", {
      class: "webchat-quick-reply-template-replies-container",
      style: qrTemplateRepliesContainerCSS
    }, buttonsHTML));
  };
  
  var buttonPlugin = {
    match: "button",
    component: Button
  };
  
  if (!window.cognigyWebchatMessagePlugins) {
    window.cognigyWebchatMessagePlugins = [];
  }
  
  window.cognigyWebchatMessagePlugins.push(buttonPlugin);
  },{"react":"JE2T"}]},{},["/deH"], null)
  //# sourceMappingURL=/webchat-plugin.js.map