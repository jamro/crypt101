function generateRsaKeyPair(p, q) {

  function gcd(a, b) {
    if (b === 0)
      return a;
    else
      return gcd(b, a % b);
  }

  function extendedEuclidean(a, b) { 
    if (a === 0) { 
      return [b, 0, 1]; 
    } else {
      let [g, x, y] = extendedEuclidean(b % a, a); 
      return [g, y - Math.floor(b / a) * x, x]; 
    }
  } 

  function findE(phi) {
    for (let e = 2; e < phi; e++) {
      if (gcd(e, phi) === 1)
        return e;
    }
    return null;
  }
  
  function findD(e, phi) { 
    let [g, x, _] = extendedEuclidean(e, phi); 
    if(x < 0) { // 'd' has to be positive  
      return x + phi;
    } else {
      return x;
    }
  } 


  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const e = findE(phi);
  const d = findD(e, phi);
  return { n, e, d };
}

function encryptRsaText(text, key) {

  function encryptRsaNumber(msg, e, n) {
    let result = 1;
    msg = Number(msg) % n;
    while (e > 0) {
      if (e % 2 == 1)
        result = (result * msg) % n;
      e = Math.floor(e / 2);
      msg = (msg * msg) % n;
    }
    return result;
  }

  const inputChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 .,-:{}[]\"'!"
  const allChars =  inputChars + "abcdefghijklmnopqrstuvwxyz@#$%^&*()_+=<>?/|~`;"

  const msg = text
    .toUpperCase()
    .split('')
    .filter(c => inputChars.includes(c))
    .join('')

  const encoded = msg.split('').map(c => inputChars.indexOf(c))
  const encrypted = encoded.map(c => encryptRsaNumber(c, key[0], key[1]))
  const decoded = encrypted.map(c => allChars[c]).join('')

  return decoded
}


function decryptRsaText(text, key) {

  function encryptRsaNumber(msg, e, n) {
    let result = 1;
    msg = Number(msg) % n;
    while (e > 0) {
      if (e % 2 == 1)
        result = (result * msg) % n;
      e = Math.floor(e / 2);
      msg = (msg * msg) % n;
    }
    return result;
  }

  const inputChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 .,-:{}[]\"'!"
  const allChars =  inputChars + "abcdefghijklmnopqrstuvwxyz@#$%^&*()_+=<>?/|~`;"

  const msg = text
    .toUpperCase()
    .split('')
    .filter(c => inputChars.includes(c))
    .join('')

  const encryptedEncodedDecoded = text.split('').map(c => allChars.indexOf(c))
  const decrypted = encryptedEncodedDecoded.map(c => encryptRsaNumber(c, key[0], key[1]))
  const decoded = decrypted.map(c => inputChars[c]).join('')

  return decoded
}
