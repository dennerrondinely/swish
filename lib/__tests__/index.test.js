"use strict";

var babel = require('@babel/core');
var plugin = require('../index');
describe('babel-plugin-swish', function () {
  var transform = function transform(code) {
    return babel.transformSync(code, {
      plugins: [plugin],
      presets: ['@babel/preset-env']
    }).code;
  };
  it('should transform swish syntax to switch statement', function () {
    var input = "\n      const result = switch {\n        Status.ACTIVE => \"Active\",\n        Status.INACTIVE => \"Inactive\",\n        _ => \"Unknown\"\n      }\n    ";
    var output = transform(input);
    expect(output).toContain('switch');
    expect(output).toContain('case');
    expect(output).toContain('default');
  });
  it('should handle expressions in case values', function () {
    var input = "\n      const result = switch {\n        user.status === \"active\" => \"Active User\",\n        user.status === \"inactive\" => \"Inactive User\",\n        _ => \"Unknown Status\"\n      }\n    ";
    var output = transform(input);
    expect(output).toContain('switch');
    expect(output).toContain('case');
    expect(output).toContain('default');
  });
});