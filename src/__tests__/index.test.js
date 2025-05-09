const babel = require('@babel/core');
const plugin = require('../index');

describe('babel-plugin-swish', () => {
  const transform = (code) => {
    return babel.transformSync(code, {
      plugins: [plugin],
      presets: ['@babel/preset-env'],
    }).code;
  };

  it('should transform swish syntax to switch statement', () => {
    const input = `
      const result = switch {
        Status.ACTIVE => "Active",
        Status.INACTIVE => "Inactive",
        _ => "Unknown"
      }
    `;

    const output = transform(input);
    expect(output).toContain('switch');
    expect(output).toContain('case');
    expect(output).toContain('default');
  });

  it('should handle expressions in case values', () => {
    const input = `
      const result = switch {
        user.status === "active" => "Active User",
        user.status === "inactive" => "Inactive User",
        _ => "Unknown Status"
      }
    `;

    const output = transform(input);
    expect(output).toContain('switch');
    expect(output).toContain('case');
    expect(output).toContain('default');
  });
}); 