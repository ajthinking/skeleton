const Parser = require('../resources/js/objectModel/ObjectModelNotesParser')

var assert = require('assert');
describe('Parser', function() {
  describe('#importing works', function() {
    it('should have a name equals to "Parser"', function() {
      assert.equal(Parser.constructor.name, "Parser");
    });
  });
});