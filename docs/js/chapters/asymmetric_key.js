const INPUT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 .,-:{}[]\"'!"
const ALL_CHARS =  INPUT_CHARS + "abcdefghijklmnopqrstuvwxyz@#$%^&*()_+=<>?/|~`;"

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

function updateExample1() {
  const p = Number($('#key-param-p-input').val())
  const q = Number($('#key-param-q-input').val())

  if(p === q) {
    $('#key-param-p-input').addClass('border-danger')
    $('#key-param-q-input').addClass('border-danger')
    $('#pq-error').removeClass('d-none')
    return
  } else {
    $('#key-param-p-input').removeClass('border-danger')
    $('#key-param-q-input').removeClass('border-danger')
    $('#pq-error').addClass('d-none')
  }

  const n = p * q
  const phi = (p - 1) * (q - 1)
  const e = findE(phi)
  const d = findD(e, phi)

  let msg = $('#msg1').val()
  if(!msg || msg.length === 0 || isNaN(msg)) {
    $('#msg1').addClass('border-danger')
    $('#msg1-error').css('display', 'inline-block')
    return
  } else {
    $('#msg1').removeClass('border-danger')
    $('#msg1-error').css('display', 'none')
  }

  msg = Number(msg)
  msg = Math.round(msg)
  msg = Math.max(2, msg)
  msg = Math.min(n-1, msg)

  const encrypted = encryptRsaNumber(msg, e, n)
  const decrypted = encryptRsaNumber(encrypted, d, n)

  $('#msg1').val(msg)
  $('.msg1').text(msg)
  $('.encrypted1').text(encrypted)
  $('.decrypted1').text(decrypted)
  $('.key-param-p').text(p)
  $('.key-param-q').text(q)
  $('.key-param-n').text(n)
  $('.key-param-phi').text(phi)
  $('.key-param-e').text(e)
  $('.key-param-d').text(d)
}

function updateExample2() {
  const [p, q] = $('#key-param-pq-input').val().split("|").map(Number)

  if(p === q) {
    $('#key-param-p-input').addClass('border-danger')
    $('#key-param-q-input').addClass('border-danger')
    $('#pq-error').removeClass('d-none')
    return
  } else {
    $('#key-param-p-input').removeClass('border-danger')
    $('#key-param-q-input').removeClass('border-danger')
    $('#pq-error').addClass('d-none')
  }
  
  const n = p * q
  const phi = (p - 1) * (q - 1)
  const e = findE(phi)
  const d = findD(e, phi)

  const msg = $('#message-input').val()
    .toUpperCase()
    .split('')
    .filter(c => INPUT_CHARS.includes(c))
    .join('')
  const encoded = msg.split('').map(c => INPUT_CHARS.indexOf(c))
  const encrypted = encoded.map(c => encryptRsaNumber(c, e, n))
  const encryptedEncoded = encrypted.map(c => ALL_CHARS[c]).join('')
  const encryptedEncodedDecoded = encryptedEncoded.split('').map(c => ALL_CHARS.indexOf(c))
  const decrypted = encryptedEncodedDecoded.map(c => encryptRsaNumber(c, d, n))
  const decoded = decrypted.map(c => INPUT_CHARS[c]).join('')

  $('.key-param-n').text(n)
  $('.key-param-e').text(e)
  $('.key-param-d').text(d)
  $('.encoded').text(encoded.map(c => c.toString().padStart(2, '0')).join(' '))
  $('.encrypted').text(encrypted.map(c => c.toString().padStart(2, '0')).join(' '))
  $('.encrypted-encoded').text(encryptedEncoded)
  $('.encrypted-encoded-decoded').text(encryptedEncodedDecoded.map(c => c.toString().padStart(2, '0')).join(' '))
  $('.decrypted').text(decrypted.map(c => c.toString().padStart(2, '0')).join(' '))
  $('.decoded').text(decoded)
}

function generateAsciiTable(tbody) {
  let table = ''
  for (let i = 0; i < INPUT_CHARS.length; i += 3) {
    table += '<tr>'
    for (let j = 0; j < 3; j++) {
      let code = i + j
      let char = INPUT_CHARS[code]
      table += `<td><code>${code}</code></td><td>${char}</td>`
    }
    table += '</tr>'
  }
  tbody.html(table)
}