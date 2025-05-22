function appendTimestamp(input) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${input}-${timestamp}`;
}

module.exports = { appendTimestamp };