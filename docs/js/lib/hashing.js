

function fletcher16(str) {
  let sum1 = 0;
  let sum2 = 0;
  for(let i = 0; i < str.length; i++) {
    sum1 = (sum1 + str.charCodeAt(i)) % 255;
    sum2 = (sum2 + sum1) % 255;
  }
  return ((sum2 << 8) | sum1).toString(16).toUpperCase().padStart(4, '0');
}

function fletcher32(str) {
  let sum1 = 0xFFFF;
  let sum2 = 0xFFFF;
  
  for (let i = 0; i < str.length; i += 2) {
    let word = str.charCodeAt(i) << 8;
    if (i + 1 < str.length) {
      word |= str.charCodeAt(i + 1);
    }
    sum1 = (sum1 + word) % 0xFFFF;
    sum2 = (sum2 + sum1) % 0xFFFF;
  }

  return (((sum2 << 16) | sum1) >>> 0).toString(16).toUpperCase().padStart(8, '0');
}
