
function updateExample() {
  const [p, q] = $('#key-param-pq-input').val().split("|").map(Number)
  const {d, e, n} = generateRsaKeyPair(p, q)
  const sessionKey = $('#session-key').val().toUpperCase()
  const sessionKeyEncrypted = encryptRsaText(sessionKey, [e, n])
  const decryptedSessionKey = decryptRsaText(sessionKeyEncrypted, [d, n])

  const user = $('#user-input').val().toUpperCase()
  const pass = $('#pass-input').val().toUpperCase()
  const loginData = `${user}|${pass}`
  const loginDataEncrypted = vigenereEncrypt(loginData, sessionKey)
  const loginDataDecrypted = vigenereDecrypt(loginDataEncrypted, sessionKey)

  const response = $('#response-input').val().toUpperCase()
  const responseEncrypted = vigenereEncrypt(response, sessionKey)
  const responseDecrypted = vigenereDecrypt(responseEncrypted, sessionKey)

  $('.pub-key').text(`[${d}, ${n}]`)
  $('.priv-key').text(`[${e}, ${n}]`)
  $('.session-key').text(`[${sessionKey}]`)
  $('.session-key-encrypted').text(sessionKeyEncrypted)
  $('.session-key-decrypted').text(`[${decryptedSessionKey}]`)
  $('.login-data').text(loginData)
  $('.login-data-encrypted').text(loginDataEncrypted)
  $('.login-data-decrypted').text(loginDataDecrypted)
  $('.response').text(response)
  $('.response-encrypted').text(responseEncrypted)
  $('.response-decrypted').text(responseDecrypted)
}