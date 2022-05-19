const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const AMERICAN_TO_BRITISH = 'american-to-british';
const BRITISH_TO_AMERICAN = 'british-to-american'
const alowedLocales = [AMERICAN_TO_BRITISH, BRITISH_TO_AMERICAN];

class Translator {

  _flipObject(obj) {
    return Object.fromEntries(Object.entries(obj).map(a => a.reverse()))
  }

  _validateInput(text, locale) {
    if (text == undefined || locale == undefined) {
      throw new Error('Required field(s) missing');
    }

    if (!text) {
      throw new Error('No text to translate');
    }

    if (!locale || !alowedLocales.includes(locale)) {
      throw new Error('Invalid value for locale field');
    }
  }

  _getLocaleTimeDelimeter(locale) {
    return locale == AMERICAN_TO_BRITISH ? '.' : ':';
  }

  _checkWordIsTime(word, locale) {
    const regexp = new RegExp(`[0-9]{1,2}[\.:][0-9]{2}`);
    return regexp.test(word);
  }

  _capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  translate(text, locale) {
    this._validateInput(text, locale);
    let vocabulary = {
      ...americanToBritishSpelling,
      ...americanToBritishTitles
    };

    const textWords = text.split(' ');
    if (locale == AMERICAN_TO_BRITISH) {
      vocabulary = {
        ...vocabulary,
        ...americanOnly
      };      
    } else {
      vocabulary = {
        ...this._flipObject(vocabulary),
        ...britishOnly
      }
    }
    
    let translatedWords = [];
    let processedWords = [];
    
    textWords.forEach((word, index) => {
      const normalizedWord = word.toLowerCase();
      let translatedWord;

      if (this._checkWordIsTime(word)) {
        translatedWord = word.replace(/[.:]/, this._getLocaleTimeDelimeter(locale));
      }
      
      if (vocabulary[normalizedWord]) {
        translatedWord = vocabulary[normalizedWord];
      };

      if (translatedWord) {
        if (index === 0) {
          // capitalize firts letter by default
          translatedWord = this._capitalizeFirstLetter(translatedWord);
        }
        // push translated word to related array
        translatedWords.push(translatedWord);
      }

      // attach word to the end of the result
      processedWords.push(translatedWord ? translatedWord : word);
    })

    return {
      text: text,
      locale: locale,
      translatedWords: translatedWords,
      translation: processedWords.join(' ')
    };
  }

}

const wrapWordWithHightligntTag = (word) => {
  return `<span class="highlight">${word}</span>`
}

const highlightTranslation = (translationResult) => {
  return translationResult.translation.split(' ').map(word => {
    if (translationResult.translatedWords.includes(word)) {
      return wrapWordWithHightligntTag(word);
    }

    return word;
  }).join(' ');
}

module.exports = {
  Translator: Translator,
  highlightTranslation: highlightTranslation,
  locales: {
    AMERICAN_TO_BRITISH: AMERICAN_TO_BRITISH,
    BRITISH_TO_AMERICAN: BRITISH_TO_AMERICAN
  }
};