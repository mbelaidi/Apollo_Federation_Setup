const { AuthDirective } = require("./auth");
// const { createRateLimitDirective } = require("graphql-rate-limit-directive");

export = {
  auth: AuthDirective,
  // rateLimit: createRateLimitDirective(),
};
