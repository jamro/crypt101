function caesarEncrypt(message, shift) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  while(shift < 0) {
    shift += alphabet.length
  }
  const encrypted = []
  for (let i = 0; i < message.length; i++) {
    const char = message[i].toUpperCase()
    const index = alphabet.indexOf(char)

    if (index === -1) {
      encrypted.push(char)
    } else {
      const newIndex = (index + shift) % alphabet.length
      encrypted.push(alphabet[newIndex])
    }
  }
  return encrypted.join('')
}

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

function vigenerDecrypt(encrypted, keyword) {
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

function updateCaesar() {
  const shiftLabels = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
  const shift = Number($('#shift-input').val())
  const message = $('#message-input').val()
  const encrypted = caesarEncrypt(message, shift)

  $('.shift-value').text(shiftLabels[shift])
  $('.shift-num-value').text(shift)
  $('.encrypted-value').text(encrypted)
  $('.decrypted-value').text(caesarEncrypt(encrypted, -shift))
  
}

function updateVigenere() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const keyword = $('#keyword-input').val().toUpperCase()
  const message = $('#message-input').val().toUpperCase()
  const keywordRepeat = keyword.length ? keyword.repeat(Math.ceil(message.length / keyword.length)).slice(0, message.length) : ''
  const encrypted = vigenereEncrypt(message, keyword)
  const encryptSteps = []
  for (let i = 0; i < message.length && encryptSteps.length < 4; i++) {
    const char = message[i]
    const shift = alphabet.indexOf(keywordRepeat[i])
    if(shift === -1) continue
    if(alphabet.indexOf(char) === -1) continue
    encryptSteps.push(`${char} + ${shift} = ${alphabet[(alphabet.indexOf(char) + shift) % alphabet.length]}`)
  }
  encryptSteps.push('...')

  const decrypted = vigenerDecrypt(encrypted, keyword)
  const decryptSteps = []
  for (let i = 0; i < encrypted.length && decryptSteps.length < 4; i++) {
    const char = encrypted[i]
    const shift = alphabet.indexOf(keywordRepeat[i])
    if(shift === -1) continue
    if(alphabet.indexOf(char) === -1) continue
    decryptSteps.push(`${char} - ${shift} = ${alphabet[(alphabet.indexOf(char) - shift + alphabet.length) % alphabet.length]}`)
  }
  decryptSteps.push('...')

  $('.keyword-value').text(keyword)
  $('.keyword-repeat-value').text(keywordRepeat)
  $('.message-value').text(message)
  $('.encrypt-steps').text(encryptSteps.join('\n'))
  $('.encrypted-value').text(encrypted)
  $('.decrypted-value').text(decrypted)
  $('.decrypt-steps').text(decryptSteps.join('\n'))

}
