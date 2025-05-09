const parseSwish = require('./parser');

module.exports = function(babel) {
  const { types: t } = babel;

  return {
    name: "babel-plugin-swish",
    pre(state) {
      // Injeta a função swish no escopo global
      const swishIdentifier = t.identifier('swish');
      const swishFunction = t.functionDeclaration(
        swishIdentifier,
        [t.identifier('value'), t.identifier('cases')],
        t.blockStatement([
          t.returnStatement(
            t.callExpression(
              t.arrowFunctionExpression(
                [],
                t.blockStatement([
                  t.switchStatement(
                    t.identifier('value'),
                    Object.entries(t.identifier('cases')).map(([key, value]) => {
                      if (key === '_') {
                        return t.switchCase(null, [t.returnStatement(value)]);
                      }
                      return t.switchCase(
                        t.stringLiteral(key),
                        [t.returnStatement(value)]
                      );
                    })
                  )
                ])
              ),
              []
            )
          )
        ])
      );

      state.path.unshiftContainer('body', swishFunction);
    },
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("jsx", "typescript");
    },
    visitor: {
      CallExpression(path) {
        if (
          t.isIdentifier(path.node.callee, { name: "swish" }) &&
          path.node.arguments.length === 2
        ) {
          const [value, cases] = path.node.arguments;
          
          if (t.isObjectExpression(cases)) {
            const switchCases = [];
            let defaultCase = null;

            cases.properties.forEach(prop => {
              if (t.isObjectProperty(prop) && t.isStringLiteral(prop.key)) {
                if (prop.key.value === "_") {
                  defaultCase = t.returnStatement(prop.value);
                } else {
                  switchCases.push(
                    t.switchCase(
                      t.stringLiteral(prop.key.value),
                      [t.returnStatement(prop.value)]
                    )
                  );
                }
              } else if (t.isObjectProperty(prop) && t.isMemberExpression(prop.key)) {
                switchCases.push(
                  t.switchCase(
                    prop.key,
                    [t.returnStatement(prop.value)]
                  )
                );
              }
            });

            if (defaultCase) {
              switchCases.push(t.switchCase(null, [defaultCase]));
            }

            const switchStatement = t.switchStatement(value, switchCases);
            const arrowFunction = t.arrowFunctionExpression(
              [],
              t.blockStatement([switchStatement])
            );

            path.replaceWith(
              t.callExpression(arrowFunction, [])
            );
          }
        }
      }
    }
  };
}; 