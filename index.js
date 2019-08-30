function checkEnv(settings) {
  const env = process.env;

  const results = {};

  Object.keys(settings).forEach(key => {
    const {
      optional = false,
      default: defaultValue = undefined,
      checkIn = alwaysTrue,
      map = identity,
      checkOut = alwaysTrue
    } = settings[key];

    let value = env[key];

    if (value === undefined) {
      value = defaultValue;
    }

    if (optional && value === undefined) {
      return;
    }

    if (value === undefined) {
      throw new Error(`env <${key}> is missing`);
    }

    if (!checkIn(value)) {
      throw new Error(`in value <${value}> of env <${key}> is invalid`);
    }

    value = map(value);

    if (!checkOut(value)) {
      throw new Error(`out value <${value}> of env <${key}> is invalid`);
    }

    results[key] = value;
  });

  return results;
}

module.exports = checkEnv;

function alwaysTrue() {
  return true;
}

function identity(x) {
  return x;
}
