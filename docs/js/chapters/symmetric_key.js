function caesarEncrypt(message, shift) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXY'
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
