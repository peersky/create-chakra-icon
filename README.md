# create-chakra-icon
[![NPM version][npm-image]][npm-url]

Convert one or multiple svg files into inline-svg Chakra UI (React) Icon component. Forked from [create-react-icon](https://github.com/envato/create-react-icon) that is inspired by [react-icons](https://github.com/gorangajic/react-icons) project.

If you are wondering what the benefit is to use inline svg in React component, please check this post [Creating an SVG Icon System with React](https://css-tricks.com/creating-svg-icon-system-react/).

## Installation

```sh
$ npm i -g create-chakra-icon
```

## Usage

```sh
$ create-chakra-icon ./alert.svg dist
$ create-chakra-icon ./*.svg dist
```

## Result

Your source svg file `alertIcon.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M200.4 54.1c-1.9-18.7 8.4-32.9 25.8-32.9h63.1c17.4 0 27.7 14.2 25.8 32.9l-27.7 242.2c-1.9 17.4-13.5 28.3-29.6 28.3s-27.7-11-29.6-28.3L200.4 54.1zm57.3 313.1c32.2 0 56 23.8 56 54.8v1.3c0 30.9-23.8 54.8-56 54.8s-56-23.8-56-54.8V422c0-31 23.8-54.8 56-54.8z"/></svg>

```

Results in the output `alertIcon.js`:

```js
import React from 'react';
import { Icon } from '@chakra-ui/react';

export const AlertIcon = (props) => (
  <Icon viewBox="0 0 512 512" {...props}>
    <g><path d="M200.4 54.1c-1.9-18.7 8.4-32.9 25.8-32.9h63.1c17.4 0 27.7 14.2 25.8 32.9l-27.7 242.2c-1.9 17.4-13.5 28.3-29.6 28.3s-27.7-11-29.6-28.3L200.4 54.1zm57.3 313.1c32.2 0 56 23.8 56 54.8v1.3c0 30.9-23.8 54.8-56 54.8s-56-23.8-56-54.8V422c0-31 23.8-54.8 56-54.8z"/></g>
  </Icon>
);
```

## How to use icons

```js
import { AlertIcon } from 'alertIcon'

export default (props) => {
   return (<div>
     <AlertIcon boxSize="32" color="red" /> Manage my Collections
  </div>)
}
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/create-chakra-icon.svg?style=flat-square
[npm-url]: https://npmjs.org/package/create-chakra-icon
[downloads-image]: http://img.shields.io/npm/dm/create-chakra-icon.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/create-chakra-icon

