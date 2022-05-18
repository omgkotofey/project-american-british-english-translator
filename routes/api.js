'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  const wrapWordWithHightligntTag = (word) => {
    return `<span class="highlight">${word}</span>`
  }

  const highLightTranslation = (translationResult) => {
    return translationResult.translation.split(' ').map(word => {
      if (translationResult.translatedWords.includes(word)) {
        return wrapWordWithHightligntTag(word);
      }

      return word;
    }).join(' ');
  }
  
  app.route('/api/translate')
    .post((req, res) => {
      const {locale, text} = req.body;
      let result, translation;
      
      try {
        let translationResult = translator.translate(
          text,
          locale
        );

        if (translationResult.translation == text) {
          translation = 'Everything looks good to me!';
        } else {
          translation = highLightTranslation(translationResult);
        }
        
        result = {
          text: translationResult.text,
          translation: translation
        }
      } catch (err) {
        result = {error: err.message}
      }

      return res.status(200).json(result);
    });
};
