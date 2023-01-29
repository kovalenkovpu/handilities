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
      - [objectKeys function](#object-keys)
    - [Common Utilities](#common-utils)
      - [removeByKey](#remove-by-key)
      - [removeDeepByKey](#remove-deep-by-key)
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
objectKeys(targetObject);
```

Utility function that returns an array of own enumerable keys of a given object.

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

### <a id="ts-utils"></a>Common Utilities

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
| target | Object             | -             |

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
removeDeepByKey(path: string | string[], target: Record<string, any>);
```

Removes key-value pair in the object by a provided `path`. <br/> Also, if deleted key-value was the only one in an object, removes that empty object and recursively checks previous key-value pair for the same. <br/>
Returns new object if the `path` was successfully resolved. <br/> Returns `target` if the `path` wasn't resolved.

#### Options

| Name   | Type       | Default value |
| ------ | ---------- | ------------- |
| path   | `string[]` | -             |
| target | Object     | -             |

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

## Contributing

_[TODO]:_ Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kovalenkovpu/handilities/tags).

## Authors

- **Pavel Kovalenkov** - [kovalenkovpu](https://github.com/kovalenkovpu)

## License

[ISC](https://en.wikipedia.org/wiki/ISC_license)
