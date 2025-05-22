function appendTimestamp(input) {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  return `${input}_${timestamp}`;
}

module.exports = { appendTimestamp };