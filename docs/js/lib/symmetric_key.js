
function vigenereEncrypt(message, keyword) {
  if(!keyword) return message.toUpperCase()
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const keywordRepeat = keyword.repeat(Math.ceil(message.length / keyword.length)).slice(0, message.length)
  const encrypted = []
  for (let i = 0; i < message.length; i++) {
    const char = message[i].toUpperCase()
    const index = alphabet.indexOf(char)
    const shift = alphabet.indexOf(keywordRepeat[i])

    if (index === -1) {
      encrypted.push(char)
    } else {
      const newIndex = (index + shift) % alphabet.length
      encrypted.push(alphabet[newIndex])
    }
  }
  return encrypted.join('')
}

function vigenereDecrypt(encrypted, keyword) {
  if(!keyword) return encrypted.toUpperCase()
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const keywordRepeat = keyword.repeat(Math.ceil(encrypted.length / keyword.length)).slice(0, encrypted.length)
  const decrypted = []
  for (let i = 0; i < encrypted.length; i++) {
    const char = encrypted[i].toUpperCase()
    const index = alphabet.indexOf(char)
    const shift = alphabet.indexOf(keywordRepeat[i])

    if (index === -1) {
      decrypted.push(char)
    } else {
      const newIndex = (index - shift + alphabet.length) % alphabet.length
      decrypted.push(alphabet[newIndex])
    }
  }
  return decrypted.join('')
}