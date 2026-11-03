'use strict';

// Bound recursive AST traversal before it can exhaust the JavaScript stack.
const MAX_DEPTH = 64;
const assertDepth = depth => {
  if (depth > MAX_DEPTH) {
    const error = new SyntaxError(`Brace pattern nesting exceeds ${MAX_DEPTH} levels`);
    error.code = 'ERR_BRACES_DEPTH';
    throw error;
  }
};

module.exports = { MAX_DEPTH, assertDepth };
