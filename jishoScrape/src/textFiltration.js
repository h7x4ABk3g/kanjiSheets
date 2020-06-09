const stylingBrackets = {
  "start": '\\textbf{\\textcolor{kanjiColor!80!black}{',
  "end": '}}'
};
const yomiConnector = '、 ';
const yomiDash = '—';

const styleText = (string) => stylingBrackets.start + string + stylingBrackets.end;

function styleCharactersBeforeDot(string) {
  const words = string.split('.');
  words[0] = styleText(words[0]);
  return words.join('');
}

function styleEverythingExceptDash(string) {
  const words = string.split(/(?<=\-)/);
  if (words[0] === '-') { // ['-', 'word']
    words[0] = yomiDash;
    words[1] = styleText(words[1]);
  } else {               // ['Word-', '']
    words[1] = yomiDash;
    words[0] = words[0].slice(0, words[0].length-1);
    words[0] = styleText(words[0]);
  }
  return words.join('');
}

function convertKunyomi(jishoResult) {

  if (jishoResult.kunyomi.length === 0) return '';

  const kunyomi = JSON.stringify(jishoResult.kunyomi)
    .replace(/"|\[|\]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/&/g, '\\&')
    .split(',');

  for (const i in kunyomi) {
    instance = kunyomi[i];

    if (instance.includes('.') && instance.includes('-')) {
      //TODO: Apply combinated logic here
    }
    else if (instance.includes('.')) {
      kunyomi[i] = styleCharactersBeforeDot(instance);
    }
    else if (instance.includes('-')) {
      kunyomi[i] = styleEverythingExceptDash(instance);
    }
    else {
      kunyomi[i] = styleText(instance);
    }
  }

  return kunyomi.join(yomiConnector);
}

function convertOnyomi(jishoResult) {
  return JSON.stringify(jishoResult.onyomi)
    .replace(/"|\[|\]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/,/g, yomiConnector)
    .replace(/&/g, '\\&');

    //TODO: Style only the words, and not the yomiConnector inbetween
}

function convertMeaning(jishoResult) {
  return jishoResult.meaning
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/&/g, '\\&');
}

exports.convertKunyomi = convertKunyomi;
exports.convertOnyomi = convertOnyomi;
exports.convertMeaning = convertMeaning;