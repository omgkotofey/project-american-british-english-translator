const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

const { locales } = require("../components/translator.js");
const { AMERICAN_TO_BRITISH, BRITISH_TO_AMERICAN } = locales;

suite('Functional Tests', () => {

  test('Translation with text and locale fields: POST request to /api/translate', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        locale: AMERICAN_TO_BRITISH,
        text: "Mangoes are my favorite fruit."
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        done();
      });
  });

  test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        locale: 'invalid locale',
        text: "Mangoes are my favorite fruit."
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value for locale field');
        done();
      });
  });
  test('Translation with missing text field: POST request to /api/translate', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        locale: AMERICAN_TO_BRITISH,
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });
  test('Translation with missing locale field: POST request to /api/translate', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        text: "Mangoes are my favorite fruit.",
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });
  test('Translation with empty text: POST request to /api/translate', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        text: '',
        locale: AMERICAN_TO_BRITISH
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'No text to translate');
        done();
      });
  });
  test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        text: 'Hello',
        locale: AMERICAN_TO_BRITISH
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Everything looks good to me!');
        done();
      });
  });
});
