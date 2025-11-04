module.exports = {
  '**/*.{md,json,html}': ['prettier --cache --write'],
  '**/*.{js,jsx}': ['npx eslint -c eslint.config.js --fix', 'prettier --cache --write'],
  '**/*.ts?(x)': [
    'npx tsc-files --noEmit',
    'npx eslint -c eslint.config.js --fix',
    'prettier --cache --parser=typescript --write',
  ],
  '**/*.{css,less,scss}': [
    'npx stylelint --aei --config stylelint.config.js --fix',
    'prettier --cache --write',
  ],
}
