

function fletcher16(str) {
  let sum1 = 0;
  let sum2 = 0;
  for(let i = 0; i < str.length; i++) {
    sum1 = (sum1 + str.charCodeAt(i)) % 255;
    sum2 = (sum2 + sum1) % 255;
  }
  return ((sum2 << 8) | sum1).toString(16).toUpperCase().padStart(4, '0');
}
