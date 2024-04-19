import globals from 'globals';

import path from 'path';
import {fileURLToPath} from 'url';
import {FlatCompat} from '@eslint/eslintrc';
import pluginJs from '@eslint/js';

// Mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended});

export default [
    {files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
    {languageOptions: {globals: globals.node}},
    ...compat.extends('xo'),
    {
        rules: {
            indent: ['error', 4],
            radix: 'off',
            eqeqeq: 'off',
            'no-else-return': 'off',
        },
    },
];
