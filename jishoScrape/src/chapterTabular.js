function makeNumberRow(rowLength) {
  let numberRow = [...Array(rowLength).keys()]; // Array containing numbers 0 to rowLength-1
  numberRow = numberRow.map((number) => (number + 1).toString()); // Correct numbers and convert to string
  numberRow = numberRow.map((number) => `{\\large ${number}}`); // Encapsulate numbers in TeX code
  numberRow = [' ', ...numberRow];
  return `
  ${numberRow.join(' & ')} \\\\
  \\hline
  \\endhead\n`;
}

function kanjiRow(index, rowLength, kanjiArray) {
  let result = [];
  for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
    const currentIndex = index + rowIndex;
    result.push(kanjiArray[currentIndex] ? kanjiArray[currentIndex] : '');
  }
  return result;
}

function makeRows(rowLength, columnLength, kanjiArray) {
  let result = '';
  for (let columnIndex = 0; columnIndex < columnLength; columnIndex++) {
    let line = new Array;
    const index = columnIndex * rowLength;

    // Add the number of current character
    line.push(`{\\large ${index}}`);

    // Concatenate the number with the rest of the row
    line = [...line, ...kanjiRow(index, rowLength, kanjiArray)];

    // Convert the line array into a tex row and add it to result.
    result += `${line.join(' & ')} \\\\\n`;
  }

  return result;
}

/**
 * Turns an array of kanji into a tabular for a chapter overview
 * @param {string[]} kanjiArray An array of kanji characters to put into the tabular
 * @param {number} rowLength The length of each row
 * @returns {string} A tex tabular
 */
function chapterTabular(kanjiArray, rowLength) {
  const columnLength = Math.ceil(kanjiArray.length/rowLength);

  let tabularString = '';
  
  tabularString += makeNumberRow(rowLength);
  tabularString += makeRows(rowLength, columnLength, kanjiArray);

  return `\\begin{chapterTabular}{ ${' l | ' + 'l '.repeat(rowLength)}}
${tabularString}\\end{chapterTabular}`
}

exports.chapterTabular = chapterTabular;