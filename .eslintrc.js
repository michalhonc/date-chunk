'use strict'
module.exports = {
  extends: ['@strv/typescript'],
  ignorePatterns: ['lib/index.d.ts'],
  parserOptions: {
    project: './tsconfig.json',
  },
}
