# create-chakra-icon

[![NPM version][npm-image]][npm-url]

Convert one or multiple svg files into inline-svg Chakra UI (React) Icon component. With colors being red from style fill properties.
Forked from [create-chakra-icon](https://github.com/skinread/create-chakra-icon) that is inspired by [react-icons](https://github.com/gorangajic/react-icons) project.

If you are wondering what the benefit is to use inline svg in React component, please check this post [Creating an SVG Icon System with React](https://css-tricks.com/creating-svg-icon-system-react/).

## Installation

Clone this repo

## Usage

```sh
$ create-chakra-icon ./alert.svg dist
$ create-chakra-icon ./*.svg dist
```

## Result

Your source svg file `mobile-menu-dark.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.66 119.78"><defs><style>.cls-1{fill:#202990;}.cls-2{fill:#fc5501;}.cls-3{fill:#fcFF01;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M13.34,0A13.41,13.41,0,0,1,26.66,13.32,13.46,13.46,0,0,1,13.34,26.66,13.5,13.5,0,0,1,0,13.33,13.48,13.48,0,0,1,13.34,0Z"/><path class="cls-2" d="M26.64,59.84A13.3,13.3,0,1,1,0,59.67a13.23,13.23,0,0,1,13.27-13A13.21,13.21,0,0,1,26.64,59.84Z"/><path class="cls-3" d="M26.66,106.69a13.44,13.44,0,0,1-13.55,13.09,13.33,13.33,0,1,1,.46-26.66A13.48,13.48,0,0,1,26.66,106.69Z"/></g></g></svg>

```

Results in the output `MobileMenuDark.js`:

```js
import React from "react";
import { Icon } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
const MobileMenuDark = (props) => (
  <Icon viewBox="0 0 26.66 119.78" {...props}>
    <path
      fill={props?.colors?.[0] ?? "#202990"}
      d={
        "M13.34,0A13.41,13.41,0,0,1,26.66,13.32,13.46,13.46,0,0,1,13.34,26.66,13.5,13.5,0,0,1,0,13.33,13.48,13.48,0,0,1,13.34,0Z"
      }
    />
    ,
    <path
      fill={props?.colors?.[1] ?? "#FF2990"}
      d={
        "M26.64,59.84A13.3,13.3,0,1,1,0,59.67a13.23,13.23,0,0,1,13.27-13A13.21,13.21,0,0,1,26.64,59.84Z"
      }
    />
    ,
    <path
      fill={props?.colors?.[2] ?? "#FFFF90"}
      d={
        "M26.66,106.69a13.44,13.44,0,0,1-13.55,13.09,13.33,13.33,0,1,1,.46-26.66A13.48,13.48,0,0,1,26.66,106.69Z"
      }
    />
  </Icon>
);
export default chakra(MobileMenuDark);
```

## How to use icons

```js
import { MobileMenuDark } from "MobileMenuDark";

export default (props) => {
  return (
    <div>
      <MobileMenuDark boxSize="32" colors={["red", "blue", "teal"]} /> Manage my
      Collections
    </div>
  );
};
```

## License

MIT
