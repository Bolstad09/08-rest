'use strict';

const superagent = require('superagent');
const app = require('./../../../src/app');

describe('app', () => {

  beforeAll(() => {
    app.start(3002);
  });
  afterAll(() => {
    app.stop();
  });

  it('should return id for GET /?id=foo', () => {
    return superagent
      .get('http://localhost:3002/api/v1/doggo?id=123')
      .then(data => {
        expect(data.text).toBe('ID: 123');
      });
  });

  it('should return 400 failed request when there is no query', () => {
    return superagent
      .get('http://localhost:3002/api/v1/doggo')
      .catch(err => {
        expect(err.response.text).toBe('failed request');
      });
  });

  it('should return 400 failed request when there is no body', () => {
    return superagent
      .post('http://localhost:3002/api/v1/doggo')
      .catch(err => {
        expect(err.response.text).toBe('failed request (/api/v1/doggo)');
        expect(err.status).toBe(400);
      });
  });

  it('should return body content for POST', () => {
    let object = { 'test': 'testing' };
    return superagent
      .post('http://localhost:3002/api/v1/doggo')
      .send(object)
      .then(data => {
        expect(data.text).toBe('{"test":"testing"}');
      });
  });
});

