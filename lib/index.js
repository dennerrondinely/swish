"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var parseSwish = require('./parser');
module.exports = function (babel) {
  var t = babel.types;
  return {
    name: "babel-plugin-swish",
    visitor: {
      CallExpression: function CallExpression(path) {
        if (t.isIdentifier(path.node.callee, {
          name: "swish"
        }) && path.node.arguments.length === 2) {
          var _path$node$arguments = _slicedToArray(path.node.arguments, 2),
            _ = _path$node$arguments[0],
            cases = _path$node$arguments[1];
          if (t.isObjectExpression(cases)) {
            var switchCases = [];
            var defaultCase = null;

            // Encontra a variável que está sendo testada
            var testValue = null;
            if (path.parentPath.isReturnStatement()) {
              var functionPath = path.getFunctionParent();
              if (functionPath && functionPath.node.params.length > 0) {
                testValue = functionPath.node.params[0];
              }
            }
            if (!testValue) {
              testValue = t.identifier('value');
            }
            cases.properties.forEach(function (prop) {
              if (t.isObjectProperty(prop)) {
                if (prop.key.value === "_") {
                  defaultCase = t.returnStatement(prop.value);
                } else {
                  var test = t.isStringLiteral(prop.key) ? t.stringLiteral(prop.key.value) : prop.key;
                  switchCases.push(t.switchCase(test, [t.returnStatement(prop.value)]));
                }
              }
            });
            if (defaultCase) {
              switchCases.push(t.switchCase(null, [defaultCase]));
            }
            var switchStatement = t.switchStatement(testValue, switchCases);
            path.replaceWith(t.callExpression(t.arrowFunctionExpression([], t.blockStatement([switchStatement])), []));
          }
        }
      }
    }
  };
};