// Helper to validate and build regex patterns safely
exports.buildRegex = (pattern) => {
  try {
    return new RegExp(pattern, 'i');
  } catch (e) {
    return null;
  }
};