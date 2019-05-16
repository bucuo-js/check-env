# Check Env

Check environment variables.

## Install

```bash
npm i @zhaoyao91/check-env
```

## Usage

```js
const checkEnv = require("@zhaoyao91/check-env");

const env = checkEnv({
  SOME_ENV: {
    optional: true,                   // ?= false
    default: "some-value",            // ?= undefined
    checkIn: x => x !== "bad-value",  // ?= alwaysTrue
    map: x => x.split("-"),           // ?= identity
    checkOut: x => x.length > 1       // ?= alwaysTrue
  }

  // OTHER_ENV: ...
});

// env is {SOME_VALUE: ['some', 'value']}
```

## License

MIT
