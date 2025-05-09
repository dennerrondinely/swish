"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function preprocessSwitch(code) {
  // Regex para encontrar a estrutura switch { ... }
  var switchRegex = /switch\s*{([^}]*)}/g;
  return code.replace(switchRegex, function (match, content) {
    // Divide o conteúdo em linhas e processa cada uma
    var lines = content.split('\n').map(function (line) {
      return line.trim();
    }).filter(function (line) {
      return line;
    });

    // Processa cada linha para converter para o formato de objeto
    var processedLines = lines.map(function (line) {
      if (!line) return '';

      // Remove a vírgula do final da linha, se houver
      line = line.replace(/,\s*$/, '');

      // Verifica se é o caso padrão (_)
      if (line.startsWith('_')) {
        var _line$split$map = line.split('=>').map(function (part) {
            return part.trim();
          }),
          _line$split$map2 = _slicedToArray(_line$split$map, 2),
          _ = _line$split$map2[0],
          _value = _line$split$map2[1];
        return "[\"_\"]: ".concat(_value);
      }

      // Para outros casos, converte a condição em uma chave computada
      var _line$split$map3 = line.split('=>').map(function (part) {
          return part.trim();
        }),
        _line$split$map4 = _slicedToArray(_line$split$map3, 2),
        condition = _line$split$map4[0],
        value = _line$split$map4[1];
      return "[".concat(condition, "]: ").concat(value);
    });

    // Tenta encontrar a variável que está sendo testada
    var context = '';
    var functionMatch = code.match(/function\s+\w+\s*\((\w+)\)/);
    if (functionMatch) {
      context = functionMatch[1];
    }

    // Junta tudo em uma chamada de função swish
    return "swish(".concat(context || 'undefined', ", {\n      ").concat(processedLines.join(',\n      '), "\n    })");
  });
}
module.exports = preprocessSwitch;