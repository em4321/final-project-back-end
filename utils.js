function getRandom(len = 32) {
  let uniqueId = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  let charsLength = chars.length;

  for (let i = 0; i < len; i++) {
    uniqueId += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return (uniqueId += Date.now());
}

module.exports = { getRandom };
