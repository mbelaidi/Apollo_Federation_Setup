const { root } = require("./root");
const { inputResult } = require("./inputResult");
const { login } = require("./login");
const { signup } = require("./signup");

export const modules = [root, inputResult, ...login, ...signup];
