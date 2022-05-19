'use strict';

const {Translator, highlightTranslation} = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();
  
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
          translation = highlightTranslation(translationResult);
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
