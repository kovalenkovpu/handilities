[![npm version](https://badge.fury.io/js/handilities.svg)](https://badge.fury.io/js/handilities)
[![Coverage Status](https://coveralls.io/repos/github/kovalenkovpu/handilities/badge.svg?branch=master)](https://coveralls.io/github/kovalenkovpu/handilities?branch=master)

# Handilities

> List of handy utilities for JS/TS projects in web and nodejs environments.

## Prerequisites

No specific version of nodejs and npm is required, but for the usage as an npm package please install [nodejs](https://nodejs.org/en/download/) of your choice.

## Table of contents

- [Project Name](#project-name)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [API](#api)
    - [TS Utilities](#ts-utils)
      - [KeyOf type](#key-of)
      - [ValueOf type](#value-of)
      - [objectKeys](#object-keys)
    - [Common Utilities](#common-utils)
      - [removeByKey](#remove-by-key)
      - [removeDeepByKey](#remove-deep-by-key)
    - [List Utils](#list-utils)
      - [findByPrimaryKey](#find-by-primary-key)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

To install and set up the library, run:

```sh
$ npm install -S handilities
```

Or if you prefer using Yarn:

```sh
$ yarn add handilities
```

## API

---

### <a id="ts-utils"></a>TS Utilities

#### <a id="key-of"></a> KeyOf

```ts
type KeyOf<T>;
```

Utility type that constructs a type consisting of own enumerable keys of a given object.

Example:

```ts
type TKey = KeyOf<{ a: 'a', b: 'b' }>;

const key1: TKey = 'a';
const key2: TKey = 'b';
const key3: TKey = 'c'; -> Type '"c"' is not assignable to type '"a" | "b"'.
```

#### <a id="value-of"></a> ValueOf

```ts
type ValueOf<T>;
```

Utility type that constructs a type consisting of values of own enumerable keys of a given object.

Example:

```ts
type TValue = ValueOf<{ a: 'a', b: 'b' }>

const value1: TValue = 'a';
const value2: TValue = 'b';
const value3: TValue = 'c'; -> Type '"c"' is not assignable to type 'TValue'.
```

#### <a id="object-keys"></a> objectKeys()

```ts
objectKeys(target: Record<string, any>);
```

Utility function that returns an array of own enumerable keys of a given object.

#### Options

| Name   | Type     | Default value |
| ------ | -------- | ------------- |
| target | `Object` | -             |

Example:

```ts
const car = {
  wheels: 4,
  output: '200 HP',
  name: 'Tesla',
};

// Compare:
const keys1 = Object.keys(car); -> const keys1: string[]
const keys2 = objectKeys(car); -> const keys2: ("wheels" | "output" | "name")[]
```

### <a id="common-utils"></a>Common Utilities

#### <a id="remove-by-key"></a> removeByKey()

```ts
removeByKey(path: string | string[], target: Record<string, any>);
```

Removes key-value pair in the object by a provided `path`. <br/>
Returns new object if the `path` was successfully resolved. <br/> Returns `target` if the `path` wasn't resolved.

#### Options

| Name   | Type               | Default value |
| ------ | ------------------ | ------------- |
| path   | `string, string[]` | -             |
| target | `Object`           | -             |

Examples:

```ts
// Removes 'b' key in the target object
const target = {
  a: 'A',
  b: 'B',
};

const result = removeByKey('a', target); -> { b: 'B' }

// Removes 'c' key in the target object
const target = {
  a: {
    c: 'C'
  },
  b: 'B',
};

const result = removeByKey(['a', 'c'], target); -> { a: {}, b: 'B' }

// Path isn't resolved
const target = {
  a: 'a',
  b: 'B',
};

const result = removeByKey(['c'], target); -> { a: 'a', b: 'B' }
const targetEqualsResult = result === target; -> true
```

#### <a id="remove-deep-by-key"></a> removeDeepByKey()

```ts
removeDeepByKey(path: string[], target: Record<string, any>);
```

Removes key-value pair in the object by a provided `path`. <br/> Also, if deleted key-value was the only one in an object, removes that empty object and recursively checks previous key-value pair for the same. <br/>
Returns new object if the `path` was successfully resolved. <br/> Returns `target` if the `path` wasn't resolved.

#### Options

| Name   | Type       | Default value |
| ------ | ---------- | ------------- |
| path   | `string[]` | -             |
| target | `Object`   | -             |

Examples:

```ts
// Removes 'b' key in the target object
const target = {
  a: 'A',
  b: 'B',
};

const result = removeDeepByKey(['a'], target); -> { b: 'B' }

// Removes 'c' key in the target object, and recursively removes empty "parents"
const target = {
  a: {
    c: 'C'
  },
  b: 'B',
};

const result = removeDeepByKey(['a', 'c'], target); -> { b: 'B' }

// Path isn't resolved
const target = {
  a: 'a',
  b: 'B',
};

const result = removeDeepByKey(['c'], target); -> { a: 'a', b: 'B' }
const targetEqualsResult = result === target; -> true
```

### <a id="list-utils"></a>List Utils

A common function for initializing a bag of useful traversing utilities for going over, finding and mutating nodes within some nested objects structures.
For now, contains following methods:

- [`findByPrimaryKey()`](#find-by-primary-key) - finds a node by its primary identifier and invokes provided callback to mutate the node.

Might be useful if you want to create a set of handy functions at one place, binding primary and secondary keys of your list (please refer to the example below).

#### Options

| Name        | Type                    | Required | Default value |
| ----------- | ----------------------- | -------- | ------------- |
| initOptions | `IInitListUtilsOptions` | +        | -             |

Examples:

```ts
const list = [
  {
    id: '0', // <- primary key
    value: 'v-0',
  },
  {
    id: '1',
    value: 'v-1',
    children: [ // <- children key
      {
        id: '1-1',
        value: 'v-1-1',
      },
    ],
  },
];

const listUtils = initListUtils({ primaryKey: 'id', childrenKey: 'children' });

// Going through the list and finds a node with id === '1-1', returns a link to the found node
listUtils.findByPrimaryKey(list, '1-1'); -> { id: '1-1', value: 'v-1-1' }
```

For more exhaustive details on the `findByPrimaryKey()` interface please refer to the corresponding section of this document.

#### <a id="find-by-primary-key"></a> findByPrimaryKey()

This function is a part of the above described [List Utils](#list-utils). It is returned as a result of invoking the `initListUtils`.

Purpose: the utility function that iterates over the list of a nested objects and searches for a particular node by its `id`. Also, calls provided callback on a found node (if any).

#### Options

| Name        | Type     | Required | Default value |
| ----------- | -------- | -------- | ------------- |
| primaryKey  | `string` | +        | -             |
| childrenKey | `string` | +        | -             |

Returns another function with the following arguments interface:

| Name     | Type                                    | Required | Default value |
| -------- | --------------------------------------- | -------- | ------------- |
| items    | `(T extends Record<string, unknown>)[]` | +        | -             |
| value    | `T[primaryKey]`                         | +        | -             |
| callback | `(node: T) => void`                     | -        | -             |

Examples:

```ts
interface INodeItem {
  id: string;
  value: string;
  children?: INodeItem[];
}

const list: INodeItem[] = [
  {
    id: '0', // <- primary key
    value: 'v-0',
  },
  {
    id: '1',
    value: 'v-1',
    children: [ // <- children key
      {
        id: '1-1',
        value: 'v-1-1',
      },
    ],
  },
];

// Going through the list and finds a node with id === '1-1', returns a link to the found node
findByPrimaryKey('id', 'children')(list, '1-1'); -> { id: '1-1', value: 'v-1-1' }

const mutateCallback = (node: INodeItem) => node.value = 'mutated';

// Going through the list and finds a node with id === '1-1', calls mutateCallback on a found node, returns a link to the node
findByPrimaryKey('id', 'children')(
  list,
  '1-1',
  mutateCallback,
); -> { id: '1-1', value: 'mutated' }
```

## Contributing

_[TODO]:_ Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kovalenkovpu/handilities/tags).

## Authors

- **Pavel Kovalenkov** - [kovalenkovpu](https://github.com/kovalenkovpu)

## License

[ISC](https://en.wikipedia.org/wiki/ISC_license)
