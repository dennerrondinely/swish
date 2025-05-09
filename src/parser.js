const { parse } = require('@babel/parser');

function parseSwish(code) {
  // Primeiro, vamos transformar nossa sintaxe em algo que o Babel possa entender
  const transformedCode = code.replace(
    /switch\s*{([^}]*)}/g,
    (match, content) => {
      // Transforma cada linha do switch em um objeto
      const cases = content
        .split(',')
        .map(line => line.trim())
        .filter(line => line)
        .map(line => {
          const [condition, result] = line.split('=>').map(part => part.trim());
          return `"${condition}": ${result}`;
        })
        .join(',\n');

      return `({${cases}})`;
    }
  );

  // Agora podemos parsear o código transformado
  return parse(transformedCode, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });
}

module.exports = parseSwish; 