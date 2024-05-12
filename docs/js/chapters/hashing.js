

function fletcher16(str) {
  let sum1 = 0;
  let sum2 = 0;
  for(let i = 0; i < str.length; i++) {
    sum1 = (sum1 + str.charCodeAt(i)) % 255;
    sum2 = (sum2 + sum1) % 255;
  }
  return ((sum2 << 8) | sum1).toString(16).toUpperCase();
}

function updateExample() {
  const user = $('#user-input').val().toUpperCase();
  const pass = $('#pass-input').val().toUpperCase();
  const passNumbers = pass.split('').map(c => c.charCodeAt(0))
  let calc = `sum1 = 0\nsum2 = 0\n`
  let sum1 = 0;
  let sum2 = 0;
  passNumbers.forEach((n, i) => {
    sum1 = (sum1 + n) % 255;
    sum2 = (sum2 + sum1) % 255;
    if(i < 2 || i === pass.length - 1) {
      calc += `byte = ${n} // Letter ${pass[i]}\n`
      calc += `sum1 = (sum1 + byte) % 255 = ${sum1}\n`
      calc += `sum2 = (sum2 + sum1) % 255 = ${sum2}\n`
    } else if(i === 2) {
      calc += `...\n`
    }
  });
  const passHash = ((sum2 << 8) | sum1).toString(16).toUpperCase();

  const userAuth = $('#user-auth').val().toUpperCase();
  const passAuth = $('#pass-auth').val().toUpperCase();
  const passAuthHash = fletcher16(passAuth);
  const authSuccess = (passAuthHash === passHash && userAuth === user);

  $('.pass-value').text(pass);
  $('.user-value').text(user);
  $('.pass-chars').text(pass.split('').map(c => c.padStart(2, ' ').padEnd(3, ' ')).join(' '));
  $('.pass-num').text(passNumbers.map(n => n.toString().padStart(3, ' ')).join(' '));
  $('.calc').text(calc);
  $('.sum1').text(sum1);
  $('.sum2').text(sum2);
  $('.sum1-hex').text(sum1.toString(16).toUpperCase());
  $('.sum2-hex').text(sum2.toString(16).toUpperCase());
  $('.pass-hash').text(passHash);
  $('.user-auth').text(userAuth);
  $('.pass-auth').text(passAuth);
  $('.pass-auth-hash').text(passAuthHash);
  $('.auth-result').text(authSuccess ? 'Success! One row found.' : 'Failure! No rows found.');
  $('.auth-response').text(authSuccess ? 'Access granted' : 'Access denied');

  if(authSuccess) {
    $('.auth-result').addClass('text-success').removeClass('text-danger');
    $('.auth-response').addClass('text-success').removeClass('text-danger');
  } else {
    $('.auth-result').addClass('text-danger').removeClass('text-success');
    $('.auth-response').addClass('text-danger').removeClass('text-success');
  }

}