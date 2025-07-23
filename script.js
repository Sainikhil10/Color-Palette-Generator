const generateBtn = document.getElementById('generate-btn');
const paletteDiv = document.getElementById('palette');
const savedPalettesDiv = document.getElementById('saved-palettes');

let currentPalette = [];

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

function renderPalette() {
  paletteDiv.innerHTML = '';
  currentPalette.forEach(color => {
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;
    colorBox.title = 'Click to copy ' + color;

    const hexLabel = document.createElement('div');
    hexLabel.className = 'color-hex';
    hexLabel.textContent = color.toUpperCase();

    colorBox.appendChild(hexLabel);
    colorBox.addEventListener('click', () => {
      navigator.clipboard.writeText(color).then(() => {
        alert(`Copied ${color} to clipboard!`);
      });
    });

    paletteDiv.appendChild(colorBox);
  });

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save Palette';
  saveBtn.style.marginTop = '1rem';
  saveBtn.addEventListener('click', savePalette);
  paletteDiv.appendChild(saveBtn);
}

function savePalette() {
  let savedPalettes = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
  savedPalettes.push(currentPalette);
  localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
  renderSavedPalettes();
}

function renderSavedPalettes() {
  let savedPalettes = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
  savedPalettesDiv.innerHTML = '';

  savedPalettes.forEach((palette, index) => {
    const paletteDiv = document.createElement('div');
    paletteDiv.className = 'saved-palette';

    const colorsDiv = document.createElement('div');
    colorsDiv.className = 'saved-colors';

    palette.forEach(color => {
      const colorBox = document.createElement('div');
      colorBox.className = 'saved-color';
      colorBox.style.backgroundColor = color;
      colorsDiv.appendChild(colorBox);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deletePalette(index);
    });

    paletteDiv.appendChild(colorsDiv);
    paletteDiv.appendChild(deleteBtn);

    savedPalettesDiv.appendChild(paletteDiv);
  });
}

function deletePalette(index) {
  let savedPalettes = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
  savedPalettes.splice(index, 1);
  localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
  renderSavedPalettes();
}

generateBtn.addEventListener('click', () => {
  currentPalette = [];
  for (let i = 0; i < 5; i++) {
    currentPalette.push(getRandomColor());
  }
  renderPalette();
});

// Initial render
generateBtn.click();
renderSavedPalettes();
