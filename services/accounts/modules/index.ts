const { root } = require("./root");
const { inputResult } = require("./inputResult");
const { login } = require("./login");
const { signup } = require("./signup");
const { profile } = require("./profile");

export const modules = [root, inputResult, ...login, ...signup, ...profile];
