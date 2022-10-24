/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./原型链.ts":
/*!****************!*\
  !*** ./原型链.ts ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Worker\": () => (/* binding */ Worker)\n/* harmony export */ });\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\r\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\r\n        if (ar || !(i in from)) {\r\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\r\n            ar[i] = from[i];\r\n        }\r\n    }\r\n    return to.concat(ar || Array.prototype.slice.call(from));\r\n};\r\nvar People = /** @class */ (function () {\r\n    function People(name) {\r\n        this.name = name;\r\n    }\r\n    People.prototype.sayHi = function () {\r\n        console.log(\"my name is \".concat(this.name));\r\n    };\r\n    return People;\r\n}());\r\nvar Worker = /** @class */ (function (_super) {\r\n    __extends(Worker, _super);\r\n    function Worker(name, work) {\r\n        var _this = _super.call(this, name) || this;\r\n        _this.work = work;\r\n        return _this;\r\n    }\r\n    Worker.prototype.sayWork = function () {\r\n        console.log(\"i am working \".concat(this.work));\r\n    };\r\n    return Worker;\r\n}(People));\r\n\r\nvar worker = new Worker('ljm', 'programmer');\r\nworker.sayHi();\r\nworker.sayWork();\r\n// @ts-ignore\r\nconsole.log(worker.__proto__, '1');\r\n// @ts-ignore\r\nconsole.log(worker.__proto__ === Worker.prototype);\r\n// @ts-ignore\r\nconsole.log(worker.__proto__.__proto__, '2');\r\n// @ts-ignore\r\nconsole.log(worker.__proto__.__proto__ === People.prototype);\r\n// @ts-ignore\r\nconsole.log(worker.__proto__.__proto__.__proto__);\r\nFunction.prototype.call = function (context) {\r\n    var myContext = Object(context) || window;\r\n    myContext.fn = this;\r\n    var res = myContext.fn.apply(myContext, [arguments].slice(1));\r\n    delete myContext.fn;\r\n    return res;\r\n};\r\nFunction.prototype.apply = function (context, args) {\r\n    var myContext = Object(context) || window;\r\n    myContext.fn = this;\r\n    var res;\r\n    if (args) {\r\n        res = myContext.fn.apply(myContext, args);\r\n    }\r\n    else {\r\n        res = myContext.fn();\r\n    }\r\n    delete myContext.fn;\r\n    return res;\r\n};\r\nFunction.prototype.bind = function (context) {\r\n    var _this = this;\r\n    var args = [];\r\n    for (var _i = 1; _i < arguments.length; _i++) {\r\n        args[_i - 1] = arguments[_i];\r\n    }\r\n    return function () {\r\n        var values = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            values[_i] = arguments[_i];\r\n        }\r\n        return _this.apply(context, __spreadArray(__spreadArray([], args, true), values, true));\r\n    };\r\n};\r\nfunction aa() {\r\n    console.log(this.a, this.b, this.c);\r\n}\r\naa.apply({ a: 1, b: 2 });\r\naa.bind({ a: 1, b: 2 })();\r\n\n\n//# sourceURL=webpack://mode/./%E5%8E%9F%E5%9E%8B%E9%93%BE.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./原型链.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;