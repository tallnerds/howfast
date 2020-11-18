# [2.0.0](https://github.com/tallnerds/howfast/compare/1.6.0...2.0.0) (2020-11-18)


### Features

* reformat json output to add options ([2f7bc26](https://github.com/tallnerds/howfast/commit/2f7bc2675c2917056feb5be1f9f0ab69a7ce4241))


### BREAKING CHANGES

* this changes the output of the json file to be keyed.
If you were using the metrics directly, all of the metrics will now be
under a key labeled "metrics". We also added an additional key called
"options" that gives you full access to all cli options that were passed
in.

# [1.6.0](https://github.com/tallnerds/howfast/compare/1.5.2...1.6.0) (2020-11-05)


### Features

* add support for auth header ([6172586](https://github.com/tallnerds/howfast/commit/617258647a64a8ee84fd355343748e31ec6c9e2f))

## [1.5.2](https://github.com/tallnerds/howfast/compare/1.5.1...1.5.2) (2020-11-04)


### Bug Fixes

* up the max network wait time to 25seconds ([9c64d4f](https://github.com/tallnerds/howfast/commit/9c64d4f81e270023f2d4af2338c81788c05f0a10))

## [1.5.1](https://github.com/tallnerds/howfast/compare/1.5.0...1.5.1) (2020-11-04)


### Bug Fixes

* up the max load wait time to 25seconds ([2c312c8](https://github.com/tallnerds/howfast/commit/2c312c80b3fe99f91578a98285ae89840932962a))

# [1.5.0](https://github.com/tallnerds/howfast/compare/1.4.0...1.5.0) (2020-11-04)


### Features

* add verbose flag to surface info logs from lighthouse sdk ([3bcdb54](https://github.com/tallnerds/howfast/commit/3bcdb5482cf0f46af6d65fbc3ed9291ac2bf8f68))

# [1.4.0](https://github.com/tallnerds/howfast/compare/1.3.3...1.4.0) (2020-11-03)


### Features

* add total blocking time to report ([eed044e](https://github.com/tallnerds/howfast/commit/eed044e72d26670b3a1569b1bba781da26e269e7))

## [1.3.3](https://github.com/tallnerds/howfast/compare/1.3.2...1.3.3) (2020-11-03)


### Bug Fixes

* round actual numeric values in rendered report ([1eef44f](https://github.com/tallnerds/howfast/commit/1eef44f8c2347963dc67ad6c97297a2eaf9e9002))

## [1.3.2](https://github.com/tallnerds/howfast/compare/1.3.1...1.3.2) (2020-11-03)


### Bug Fixes

* use numeric values for rendered html report ([1d450cf](https://github.com/tallnerds/howfast/commit/1d450cffcf945d8905155442a6f2d7c13a35c443))

## [1.3.1](https://github.com/tallnerds/howfast/compare/1.3.0...1.3.1) (2020-11-02)


### Bug Fixes

* npmjs is my worst enemy ([36ef048](https://github.com/tallnerds/howfast/commit/36ef048fc8e400c5160565325b9dfa6541a533da))

# [1.3.0](https://github.com/tallnerds/howfast/compare/1.2.0...1.3.0) (2020-11-02)


### Bug Fixes

* access policy for npm ([9c9640f](https://github.com/tallnerds/howfast/commit/9c9640f34530f8e4ca027fd469f96ceb9b91cbb3))


### Features

* add github badge ([21b0ee1](https://github.com/tallnerds/howfast/commit/21b0ee103d0ba4c1bd51e58f4009143e7fd6fa29))

# 1.0.0 (2020-11-02)


### Features

* bin setup for cli ([0b960ed](https://github.com/tallnerds/howfast/commit/0b960ed49ec25bd09ebe8d44fd68aa2cde9eac81))
* refactor metrics; markdown table ([a1d5ee2](https://github.com/tallnerds/howfast/commit/a1d5ee2b2e781d2541f4dce9cdfcde5837f1f45d))
* render html report ([1b07642](https://github.com/tallnerds/howfast/commit/1b07642f39a8f8b71f1742468bfb31fd43c5c5eb))
* tidy, readme, etc ([c33f21b](https://github.com/tallnerds/howfast/commit/c33f21b0089344c080ea9a701e0d2c11c2085b09))
* update the console output a bit ([252c5f3](https://github.com/tallnerds/howfast/commit/252c5f30e3cacaac0c35d77a19e7ec9bdd5078aa))
* wire up cli options to renderer ([4ba75e6](https://github.com/tallnerds/howfast/commit/4ba75e6d0920ad2a27d5c9c8d25dab713529d76d))
