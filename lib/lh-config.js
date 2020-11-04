"use strict";

/**
 * @type {LH.Config.Json}
 */
module.exports = {
  extends: "lighthouse:default",
  settings: {
    // This test runs in CI and hits the outside network of a live site.
    // Be a little more forgiving on how long it takes all network requests of several nested iframes
    // to complete.
    maxWaitForLoad: 25000,
    networkQuietThresholdMs: 25000,
  },
};
