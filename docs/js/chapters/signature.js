function updateExample() {
  const [p, q] = $('#key-param-pq-input').val().split("|").map(Number)
  const {d, e, n} = generateRsaKeyPair(p, q)

  const doc = $('#doc-input').val().toUpperCase()
  const docSignHash = fletcher32(doc)
  const signature = encryptRsaText(docSignHash, [e, n])
  const verifyHash = decryptRsaText(signature, [d, n])

  $('.pub-key').text(`[${d}, ${n}]`)
  $('.priv-key').text(`[${e}, ${n}]`)
  $('.doc-value').text(doc)
  $('.doc-sign-hash').text(docSignHash)
  $('.signature-value').text(signature)
  $('.verify-hash').text(verifyHash)
}
