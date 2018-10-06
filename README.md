# webpack-optional-plugin

Load a file from disk if it exists, otherwise yield a pre-defined null value.

## Usage

See the provided example.

## Options

### `include`

Type: `String|RegExp|Array.<String>|Array.<RegExp>`

### `nullModulePath`

Type: `String`

Defaults to `webpack-optional-plugin/null.js`.

### `enabled`

Type: `Boolean`

Set to `false` to yield the null module for matching files even
regardless of whether the source file exists or not.

This option is intended for use when building for production
so that the optional files aren't included in the bundle.

## Changelog

### 1.1.0

- Added the `enabled` flag
