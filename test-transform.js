const babel = require('@babel/core');

const code = `
const Status = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

function getStatus(status) {
  return swish(status, {
    [Status.ACTIVE]: "Active",
    [Status.INACTIVE]: "Inactive",
    ["_"]: "Unknown"
  });
}
`;

try {
  const result = babel.transformSync(code, {
    plugins: ['./src/index.js'],
    presets: ['@babel/preset-env']
  });

  console.log('Transformed code:');
  console.log(result.code);
} catch (error) {
  console.error('Error:', error.message);
  if (error.stack) {
    console.error('Stack:', error.stack);
  }
} 