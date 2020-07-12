// Event Listeners for btns
document.getElementById('encrypt-btn').addEventListener('click', encrypt);
document.getElementById('decrypt-btn').addEventListener('click', decrypt);
document.getElementById('reset').addEventListener('click', reset);


function encrypt() {
  // Variables for input message and input key
  const message = document.getElementById('input-text').value.toUpperCase();
  const key = document.getElementById('input-keyword').value.toUpperCase();

  // Variables
  const messageRe = /[A-Z\s]/g;
  const lettersRe = /[A-Z]/g;
  const messageArr = message.split('');
  let nonLetterIndex = [];
  let messageNums = [];
  let unformattedEncrypt = [];

  // Check for message input 
  if (!message) {
    return messageError();
  }

  // Keep track of ASCII chars and store non-letter inputs in nonLetterIndex
  for (let i = 0; i < messageArr.length; i++) {
    if (!messageArr[i].match(messageRe)) {
      return messageError();
      break;
    } else if (!messageArr[i].match(lettersRe)) {
      nonLetterIndex.push([i, messageArr[i]]);
    } else {
      messageNums.push(messageArr[i].charCodeAt(0));
    }
  }

  // Subtract 65 from the keys ASCII value to work with 0 - 25
  let keyNums = [];
  let keyArr = key.split('');

  // Check for key input
  if (!key) {
    return keyError();
  }

  // Check for valid key input then add to keyNums
  for (let i = 0; i < keyArr.length; i++) {
    if (!keyArr[i].match(lettersRe)) {
      return keyError();
      break;
    } else {
      keyNums.push(keyArr[i].charCodeAt(0) - 65);
    }
  }

  // Get the longer of the message/key inputs in order to properly iterate
  const longestVar = Math.max(messageNums.length, keyNums.length);
  // Encrypt the message 
  for (i = 0; i < longestVar; i++) {
    if (messageNums[i] + keyNums[i % keyNums.length] > 90) {
      unformattedEncrypt.push(String.fromCharCode((messageNums[i] + keyNums[i % keyNums.length]) - 90 + 64));
    } else {
      unformattedEncrypt.push(String.fromCharCode(messageNums[i] + keyNums[i % keyNums.length]));
    }
  }

  // Insert the spaces and punctuation into the encrypted message
  let formattedEncrypt = unformattedEncrypt.slice();
  for (let i = 0; i < nonLetterIndex.length; i++) {
    formattedEncrypt.splice(nonLetterIndex[i][0], 0, nonLetterIndex[i][1]);
  }

  document.getElementById('input-text').value = formattedEncrypt.join('');
  document.getElementById('input-text').disabled = true;
  document.getElementById('input-keyword').disabled = true;
  document.getElementById('encrypt-btn').disabled = true;
  document.getElementById('decrypt-btn').disabled = false;
}


function decrypt() {
  // Encrypted message & key
  const message = document.getElementById('input-text').value.toUpperCase();
  const key = document.getElementById('input-keyword').value.toUpperCase();

  // Variables
  const lettersRe = /[A-Z]/g;
  const messageArr = message.split('');
  let nonLetterIndex = [];
  let messageNums = [];
  let unformattedDecrypt = [];

  // Keep track of ASCII chars and store non-letter inputs in nonLetterIndex
  for (let i = 0; i < messageArr.length; i++) {
    if (!messageArr[i].match(lettersRe)) {
      nonLetterIndex.push([i, messageArr[i]]);
    } else {
      messageNums.push(messageArr[i].charCodeAt(0));
    }
  }

  // Subtract 65 from the keys ASCII value to work with 0 - 25
  let keyNums = [];
  let keyArr = key.split('');

  // Add to keyNums
  keyArr.forEach(char => keyNums.push(char.charCodeAt(0) - 65));

  // Get the longer of the message/key inputs in order to properly iterate
  const longestVar = Math.max(messageNums.length, keyNums.length);
  // Encrypt the message 
  for (i = 0; i < longestVar; i++) {
    if (messageNums[i] - keyNums[i % keyNums.length] < 65) {
      unformattedDecrypt.push(String.fromCharCode(91 - (65 - (messageNums[i] - keyNums[i % keyNums.length]))));
    } else {
      unformattedDecrypt.push(String.fromCharCode(messageNums[i] - keyNums[i % keyNums.length]));
    }
  }

  // Insert the spaces and punctuation into the encrypted message
  let formattedDecrypt = unformattedDecrypt.slice();
  for (let i = 0; i < nonLetterIndex.length; i++) {
    formattedDecrypt.splice(nonLetterIndex[i][0], 0, nonLetterIndex[i][1]);
  }

  document.getElementById('input-text').value = formattedDecrypt.join('');
  document.getElementById('encrypt-btn').disabled = false;
  document.getElementById('decrypt-btn').disabled = true;
}

// Error functions
function messageError() {
  document.getElementById('input-text').value = 'Invalid input';
  document.getElementById('input-text').style.border = '2px solid red';
  document.getElementById('input-text').style.color = 'red';

  // Clear error message after 3 seconds
  setTimeout(clearError, 3000);

  // Clear error
  function clearError() {
    document.getElementById('input-text').value = '';
    document.getElementById('input-text').style.border = '2px solid #444';
    document.getElementById('input-text').style.color = '#444';
  }
}

function keyError() {
  document.getElementById('input-keyword').value = 'Invalid input';
  document.getElementById('input-keyword').style.border = '2px solid red';
  document.getElementById('input-keyword').style.color = 'red';

  // Clear error message after 3 seconds
  setTimeout(clearError, 3000);

  // Clear error
  function clearError() {
    document.getElementById('input-keyword').value = '';
    document.getElementById('input-keyword').style.border = '2px solid #444';
    document.getElementById('input-keyword').style.color = '#444';
  }
}

// Reset page
function reset() {
  location.reload();
}