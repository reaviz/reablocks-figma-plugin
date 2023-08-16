var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@create-figma-plugin/utilities/lib/events.js
function on(name, handler) {
  const id = `${currentId}`;
  currentId += 1;
  eventHandlers[id] = { handler, name };
  return function() {
    delete eventHandlers[id];
  };
}
function once(name, handler) {
  let done = false;
  return on(name, function(...args) {
    if (done === true) {
      return;
    }
    done = true;
    handler(...args);
  });
}
function invokeEventHandler(name, args) {
  for (const id in eventHandlers) {
    if (eventHandlers[id].name === name) {
      eventHandlers[id].handler.apply(null, args);
    }
  }
}
var eventHandlers, currentId, emit;
var init_events = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/events.js"() {
    eventHandlers = {};
    currentId = 0;
    emit = typeof window === "undefined" ? function(name, ...args) {
      figma.ui.postMessage([name, ...args]);
    } : function(name, ...args) {
      window.parent.postMessage({
        pluginMessage: [name, ...args]
      }, "*");
    };
    if (typeof window === "undefined") {
      figma.ui.onmessage = function([name, ...args]) {
        invokeEventHandler(name, args);
      };
    } else {
      window.onmessage = function(event) {
        if (typeof event.data.pluginMessage === "undefined") {
          return;
        }
        const [name, ...args] = event.data.pluginMessage;
        invokeEventHandler(name, args);
      };
    }
  }
});

// node_modules/@create-figma-plugin/utilities/lib/ui.js
function showUI(options, data) {
  if (typeof __html__ === "undefined") {
    throw new Error("No UI defined");
  }
  const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}</script>`;
  figma.showUI(html, __spreadProps(__spreadValues({}, options), {
    themeColors: typeof options.themeColors === "undefined" ? true : options.themeColors
  }));
}
var init_ui = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/index.js
var init_lib = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
    init_events();
    init_ui();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
function main_default() {
  function rgbaToHex(red, green, blue, opacity) {
    if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255 || opacity < 0 || opacity > 100) {
      throw new Error(`Invalid color value: rgba(${red}, ${green}, ${blue}, ${opacity})`);
    }
    const opacityDecimal = Math.round(opacity * 255);
    const opacityHex = Math.round(opacityDecimal).toString(16);
    const hex = `#${Number(red).toString(16)}${Number(green).toString(16)}${Number(blue).toString(
      16
    )}`;
    return opacityDecimal === 255 ? hex : `${hex}${opacityHex}`;
  }
  function generateCSS() {
    var _a;
    const localStyles = figma.getLocalPaintStyles();
    const requiredStylesElements = [];
    for (const style of localStyles) {
      if (style.type === "PAINT" && style.paints[0].type === "SOLID") {
        const [primaryLabel, secondaryLabel] = style.name.split("/").map((part) => part.trim());
        requiredStylesElements.push({
          fullName: style.name,
          primaryLabel,
          secondaryLabel,
          opacity: style.paints[0].opacity,
          hex: rgbaToHex(
            Math.round(style.paints[0].color.r * 255),
            Math.round(style.paints[0].color.g * 255),
            Math.round(style.paints[0].color.b * 255),
            (_a = style.paints[0].opacity) != null ? _a : 1
          )
        });
      }
    }
    let colorJson = {};
    for (const color of requiredStylesElements) {
      const { primaryLabel, secondaryLabel, hex } = color;
      if (primaryLabel) {
        if (secondaryLabel) {
          colorJson[primaryLabel] = __spreadProps(__spreadValues({}, colorJson[primaryLabel]), {
            [secondaryLabel]: hex
          });
        } else {
          colorJson[primaryLabel] = hex;
        }
      }
    }
    return colorJson;
  }
  once("GENERATE_CSS", () => {
    const cssObj = generateCSS();
    emit("SUCCESS", { value: cssObj });
  });
  showUI({ height: 300, width: 600 });
}
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
