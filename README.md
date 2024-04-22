# moment-javaformat

[![CircleCI](https://circleci.com/gh/RangerRick/moment-javaformat/tree/main.svg?style=svg)](https://circleci.com/gh/RangerRick/moment-javaformat/tree/main)

This plugin for [Moment.js](https://momentjs.com/) adds support for formatting using the Java [SimpleDateFormat](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html) and [DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) format options.

It differs from [moment-jdateformatparser](https://github.com/MadMG/moment-jdateformatparser) in that it doesn't just try to translate Java format strings to Moment, but instead implements a new set of format methods that can handle a wider range of Java format strings, at the expense of speed.

Thanks to [moment-jdateformatparser](https://github.com/MadMG/moment-jdateformatparser) for the basic idea, I ran with it in my own way because we needed some formats that just plain aren't possible in a simple format string translation. :)

## Version History

Changes made in the `develop` branch are checked against unit tests upon commit.
The latest [CHANGELOG.md](https://github.com/RangerRick/moment-javaformat/blob/main/CHANGELOG.md) is then auto-generated from the commit history and merged to `main`.

## Requirements

This plugin requires loading either `moment` or `moment-timezone`, but some functionality will be undefined or fail if you are using Moment.js without timezone support.

## Usage

In most cases, all you should have to do is load this module after you load moment, and then new methods are available to you for formatting:

```javascript
const moment = require("moment-timezone");
require("@rangerrick/moment-javaformat");

let now = moment("2020-01-01T15:00:00Z");
// a format matching Java 8 SimpleDateFormat definitions
now.formatJavaSDF("yyyy-MM-dd HH:mm"); // 2020-01-01 15:00

// a format matching Java 8 DateTimeFormatter definitions
now.formatJavaDTF("yyyy-MM-dd HH:mm:ss O"); // 2020-01-01 15:00:00 GMT-05:00
```

## Installation

You can install `moment-javaformat` from npm in the usual ways:

```shell
# install using npm
npm install --save @rangerrick/moment-javaformat

# install using yarn
yarn add @rangerrick/moment-javaformat
```

## Caveats

A few format strings are difficult to implement without going deeper down the rabbit hole than I was willing to go. ;)

- SimpleDateFormat: `W` (week-of-month), `F` (day-of-week-in-month)
- DateTimeFormatter: `W` (week-of-month), `F` (day-of-week-in-month), `n` (nano-of-second), `N` (nano-of-day)

I might implement the nano ones if I get around to doing the math (and probing `window.performance.now()`) but Date objects don't have that level of accuracy anyway.

## License

`moment-javaformat` is freely distributable under the terms of the MIT license.

Copyright (c) 2020-2024 Benjamin Reed.
