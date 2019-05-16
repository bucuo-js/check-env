const tap = require("tap");
const uuid = require("uuid");

const checkEnv = require("../index");

function genKey() {
  return "FAKE_ENV_" + uuid.v4();
}

tap.test("simple case", t => {
  const key = genKey();
  process.env[key] = "some value";
  const env = checkEnv({ [key]: {} });
  t.strictSame(env, { [key]: "some value" });
  t.end();
});

tap.test("non-optional env is missing", t => {
  const key = genKey();

  t.throw(() => checkEnv({ [key]: {} }), {
    message: `env <${key}> is missing`
  });

  t.end();
});

tap.test("optional env is missing", t => {
  const key = genKey();

  const env = checkEnv({
    [key]: {
      optional: true,
      checkIn: () => false // this should not be triggered since the env is missing optional
    }
  });

  t.equal(env[key], undefined);

  t.end();
});

tap.test("default value", t => {
  const key = genKey();

  const env = checkEnv({ [key]: { optional: true, default: "default value" } });

  t.equal(env[key], "default value");

  t.end();
});

tap.test("checkIn failed", t => {
  const key = genKey();

  process.env[key] = "Bob";

  t.throw(() => checkEnv({ [key]: { checkIn: x => x !== "Bob" } }), {
    message: `in value <Bob> of env <${key}> is invalid`
  });

  t.end();
});

tap.test("map value", t => {
  const key = genKey();

  process.env[key] = "123";

  const env = checkEnv({ [key]: { map: Number } });

  t.equal(env[key], 123);

  t.end();
});

tap.test("checkOut failed", t => {
  const key = genKey();

  process.env[key] = "123";

  t.throw(
    () =>
      checkEnv({
        [key]: {
          map: Number,
          checkOut: x => x !== 123
        }
      }),
    {
      message: `out value <123> of env <${key}> is invalid`
    }
  );

  t.end();
});
