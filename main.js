// Getting DOM references
const info = document.getElementById('info');
const text = document.querySelector('textarea');
const stats = document.querySelector('.stats');
const settings = document.getElementById('settings');
const edits = document.querySelectorAll('.edits');


// keeping track of every curser movement
setInterval(() => {
  document.querySelectorAll('small')[2].textContent = `${text.selectionStart}/${text.value.length}`;
}, 1)

/* max function */
/**
 * Returns the most frequent object in an array/string.
 * @param {string} text
 * @param {boolean} showCount
 * @returns {string | number}
 */
const maxFrequency = (text, showCount = false) => {
  const freq = {};
  
  for (let char in text) {
    if (text[char] === "" || text[char] === ' ') continue;
    freq[text[char]] = (freq[text[char]] || 0) + 1;
  }
  
  let maxChar = 'None';
  let maxCount = 0;
  for (let c in freq) {
    if (freq[c] > maxCount) {
      maxChar = freq[c];
      maxCount = freq[c];
    }
  }
  if (text === '' || text === ' ') {
    maxChar = 'None';
    maxCount = 0;
  }
  return showCount ? maxCount : maxChar;
}



info.addEventListener('click', () => {
  const wordsLengthFrequency = text.value.length === 0 ? 0 : text.value.split(' ').length
  
  // Adding text stats
  stats.textContent = `Letters count: ${text.value.length} 
  Words count: ${wordsLengthFrequency}
  Most used letter: ${text.value[maxFrequency(text.value)]} (${maxFrequency(text.value, true)} times)
  Most used word: ${text.value.split(' ')[maxFrequency(text.value.split(' '))]} (${maxFrequency(text.value.split(' '), true)} times)
  `;
  stats.innerHTML += `<br><button onclick='stats.close()' style='background-color: transparent; color: red; '>close</button>`;
  
  stats.showModal();
})

settings.onclick = () => {
  document.querySelector('.settings').showModal();
  
  
  document.getElementById('font').onchange = () => text.style.fontFamily = document.getElementById('font').value;
  
  document.getElementById('size').oninput = () => text.style.fontSize = `${document.getElementById('size').value}px`;
  
  document.getElementById('weight').onchange = () => text.style.fontWeight = `${document.getElementById('weight').value}`;
  
  document.getElementById('bgt').onchange = () => {
    switch (document.getElementById('bgt').value) {
      case 'black':
        // Changing DOM Elements to black theme
        info.style.border = '1px solid white';
        info.style.color = 'white';
        text.style.color = 'white';
        text.style.backgroundColor = '#0A0A0A';
        document.body.style.color = 'white';
        document.body.style.backgroundColor = '#0A0A0A';
        stats.style.backgroundColor = 'black';
        stats.style.color = 'white';
        edits.forEach((e) => {
          e.style.color = 'white';
        })
        break;
        
      case 'white':
        // changing DOM Elements to white theme
        info.style.border = '1px solid black';
        info.style.color = '#0A0A0A';
        text.style.color = '#0A0A0A';
        text.style.backgroundColor = 'white';
        document.body.style.backgroundColor = 'white';
        stats.style.backgroundColor = 'white';
        stats.style.color = '#0A0A0A';
        edits.forEach((e) => {
          e.style.color = '#0A0A0A';
        })
        break;
        
    }
  }
  
  document.getElementById('bgc').onkeyup = () => {
    
    document.body.style.backgroundColor = `${bgc.value.toLowerCase()}`;
    text.style.backgroundColor = `${bgc.value.toLowerCase()}`;
  }
  
  document.getElementById('color').onkeyup = () => {
    document.body.style.color = `${document.getElementById('color').value.toLowerCase()}`;
    text.style.color = `${document.getElementById('color').value.toLowerCase()}`
  }
  
  document.getElementById('cols').oninput = () => {
    text.cols = `${document.getElementById('cols').value}`
  }
}
setInterval(() => {
  const radios = document.querySelectorAll('input[type="radio"]');
  
  if (radios[0].checked) {
    text.style.whiteSpace = 'wrap';
  }
  else if (radios[1].checked) {
    text.style.whiteSpace = 'nowrap';
    text.style.overflow = 'hidden';
    text.style.textOverflow = 'ellipsis';
  }
}, 10)


edits[0].onclick = () => {
  if (text.selectionStart === text.selectionEnd) {
    navigator.clipboard.writeText(text.value);
  } else {
    navigator.clipboard.writeText(text.value.slice(text.selectionStart, text.selectionEnd+1))
  }
}
edits[1].onclick = () => {
  if (text.selectionStart === text.selectionEnd) {
    text.value = '';
    document.querySelectorAll('small')[2].textContent = '0/0';
  } else {
    const part = text.value.slice(text.selectionStart, text.selectionEnd+1)
    
    text.value = text.value.slice(0, text.selectionStart) + text.value.slice(text.selectionEnd+1)
    document.querySelectorAll('small')[2].textContent = `${text.selectionStart}/${text.value.length}`;
  }
  
}
edits[2].onclick = async () => {
  const clipboardText = await navigator.clipboard.readText();
  text.value += clipboardText;
  document.querySelectorAll('small')[2].textContent = `${text.selectionStart}/${text.value.length}`;
}