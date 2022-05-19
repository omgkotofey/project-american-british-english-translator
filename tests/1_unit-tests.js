const chai = require("chai");
const assert = chai.assert;

const { Translator, highlightTranslation, locales } = require("../components/translator.js");
const { AMERICAN_TO_BRITISH, BRITISH_TO_AMERICAN } = locales;

let translator = new Translator();

suite("Unit Tests", () => {

  test("Translate 'Mangoes are my favorite fruit.' to British English", () => {
    let result = translator.translate(
      'Mangoes are my favorite fruit.',
      AMERICAN_TO_BRITISH
    );
    assert.equal(
      'Mangoes are my favourite fruit.',
      result.translation
    );
  });

  test("Translate 'I ate yogurt for breakfast.' to British English", () => {
    let result = translator.translate(
      'I ate yogurt for breakfast.',
      AMERICAN_TO_BRITISH
    );
    assert.equal(
      'I ate yoghurt for breakfast.',
      result.translation
    );
  });

  test("Translate 'We had a party at my friend's condo.' to British English", () => {
    let result = translator.translate(
      'We had a party at my friend\'s condo.',
      AMERICAN_TO_BRITISH
    );
    assert.equal(
      'We had a party at my friend\'s condo.',
      result.translation
    );
  });

  test("Translate 'Can you toss this in the trashcan for me?' to British English", () => {
    let result = translator.translate(
      'Can you toss this in the trashcan for me?',
      AMERICAN_TO_BRITISH
    );
    assert.equal(
      'Can you toss this in the bin for me?',
      result.translation
    );
  });

  test("Translate 'The parking lot was full.' to British English", () => {
    let result = translator.translate(
      'The parking lot was full.',
      AMERICAN_TO_BRITISH
    );
    assert.equal(
      'The parking lot was full.',
      result.translation
    );
  });

  test("Translate 'Like a high tech Rube Goldberg machine.' to British English", () => {
    let result = translator.translate(
      'Like a high tech Rube Goldberg machine.',
      AMERICAN_TO_BRITISH
    );
    assert.equal(
      'Like a high tech Rube Goldberg machine.',
      result.translation
    );
  });

  test("Translate 'To play hooky means to skip class or work.' to British English", () => {
    let result = translator.translate(
      'To play hooky means to skip class or work.',
      AMERICAN_TO_BRITISH
    );
    assert.equal(
      'To play hooky means to skip class or work.',
      result.translation
    );
  });

  test("Translate 'No Mr. Bond, I expect you to die.' to British English", () => {
    let result = translator.translate(
      'No Mr. Bond, I expect you to die.',
      AMERICAN_TO_BRITISH
    );
    assert.equal(
      'No mr Bond, I expect you to die.',
      result.translation
    );
  });

  test("Translate 'Dr. Grosh will see you now.' to British English", () => {
    let result = translator.translate(
      'Dr. Grosh will see you now.',
      AMERICAN_TO_BRITISH
    );
    assert.equal(
      'Dr Grosh will see you now.',
      result.translation
    );
  });

  test("Translate 'Lunch is at 12:15 today.' to British English", () => {
    let result = translator.translate(
      'Lunch is at 12:15 today.',
      AMERICAN_TO_BRITISH
    );
    assert.equal(
      'Lunch is at 12.15 today.',
      result.translation
    );
  });

  test("Translate 'We watched the footie match for a while.' to American English", () => {
    let result = translator.translate(
      'We watched the footie match for a while.',
      BRITISH_TO_AMERICAN
    );
    assert.equal(
      'We watched the soccer match for a while.',
      result.translation
    );
  });

  test("Translate 'Paracetamol takes up to an hour to work.' to American English", () => {
    let result = translator.translate(
      'Paracetamol takes up to an hour to work.',
      BRITISH_TO_AMERICAN
    );
    assert.equal(
      'Tylenol takes up to an hour to work.',
      result.translation
    );
  });

  test("Translate 'First, caramelise the onions.' to American English", () => {
    let result = translator.translate(
      'First, caramelise the onions.',
      BRITISH_TO_AMERICAN
    );
    assert.equal(
      'First, caramelize the onions.',
      result.translation
    );
  });

  test("Translate 'I spent the bank holiday at the funfair.' to American English", () => {
    let result = translator.translate(
      'I spent the bank holiday at the funfair.',
      BRITISH_TO_AMERICAN
    );
    assert.equal(
      'I spent the bank holiday at the funfair.',
      result.translation
    );
  });

  test("Translate 'I had a bicky then went to the chippy.' to American English", () => {
    let result = translator.translate(
      'I had a bicky then went to the chippy.',
      BRITISH_TO_AMERICAN
    );
    assert.equal(
      'I had a cookie then went to the chippy.',
      result.translation
    );
  });

  test("Translate 'I've just got bits and bobs in my bum bag.' to American English", () => {
    let result = translator.translate(
      'I\'ve just got bits and bobs in my bum bag.',
      BRITISH_TO_AMERICAN
    );
    assert.equal(
      'I\'ve just got bits and bobs in my bum bag.',
      result.translation
    );
  });

  test("Translate 'The car boot sale at Boxted Airfield was called off.' to American English", () => {
    let result = translator.translate(
      'The car boot sale at Boxted Airfield was called off.',
      BRITISH_TO_AMERICAN
    );
    assert.equal(
      'The car boot sale at Boxted Airfield was called off.',
      result.translation
    );
  });

  test("Translate 'Have you met Mrs Kalyani?' to American English", () => {
    let result = translator.translate(
      'Have you met Mrs Kalyani?',
      BRITISH_TO_AMERICAN
    );
    assert.equal(
      'Have you met mrs. Kalyani?',
      result.translation
    );
  });

  test("Translate 'Prof Joyner of King's College, London.' to American English", () => {
    let result = translator.translate(
      'Prof Joyner of King\'s College, London.',
      BRITISH_TO_AMERICAN
    );
    assert.equal(
      'Prof. Joyner of King\'s College, London.',
      result.translation
    );
  });

  test("Translate 'Tea time is usually around 4 or 4.30.' to American English", () => {
    let result = translator.translate(
      'Tea time is usually around 4 or 4.30.',
      BRITISH_TO_AMERICAN
    );
    assert.equal(
      'Tea time is usually around 4 or 4:30.',
      result.translation
    );
  });

  test("Highlight translation in 'Mangoes are my favorite fruit.'", () => {
    let result = highlightTranslation(translator.translate(
      'Mangoes are my favorite fruit.',
      AMERICAN_TO_BRITISH
    ));
    assert.equal(
      'Mangoes are my <span class="highlight">favourite</span> fruit.',
      result
    );
  });

  test("Highlight translation in 'I ate yogurt for breakfast.'", () => {
    let result = highlightTranslation(translator.translate(
      'I ate yogurt for breakfast.',
      AMERICAN_TO_BRITISH
    ));
    assert.equal(
      'I ate <span class="highlight">yoghurt</span> for breakfast.',
      result
    );
  });

  test("Highlight translation in 'We watched the footie match for a while.'", () => {
    let result = highlightTranslation(translator.translate(
      'We watched the footie match for a while.',
      BRITISH_TO_AMERICAN
    ));
    assert.equal(
      'We watched the <span class="highlight">soccer</span> match for a while.',
      result
    );
  });

  test("Highlight translation in 'Paracetamol takes up to an hour to work.'", () => {
    let result = highlightTranslation(translator.translate(
      'Paracetamol takes up to an hour to work.',
      BRITISH_TO_AMERICAN
    ));
    assert.equal(
      '<span class="highlight">Tylenol</span> takes up to an hour to work.',
      result
    );
  });

});
