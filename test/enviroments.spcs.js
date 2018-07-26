const env = require('../index.js');
const { expect, should } = require('chai');

should();

describe('Configuration', () => {
  it('if not passed any parameter should throw an exception', () => {
    expect(() => env.config()).to.throw('Faltan archivos de configuracion');
  });
  it('if passed passed parameter exists should throw an exception', () => {
    expect(() => env.config(['./missing'])).to.throw('No existe ningun archivo de configuración: ./missing');
  });
  it('if one file is passed return json of the file', () => {
    env.config(['./test/first.conf']);
    expect(process.configuration).to.deep.include({ test: { number: '1', first: '1' } });
  });
  it('if 2 file is passed return the first one and missing properties from second', () => {
    env.config(['./test/first.conf', './test/second.conf']);
    process.configuration.should.deep.include({ test: { number: '1', first: '1', second: '2' } });

    env.config(['./test/second.conf', './test/first.conf']);
    process.configuration.should.deep.include({ test: { number: '2', first: '1', second: '2' } });

    env.config(['./test/first.conf', './test/second.conf', './test/third.conf']);
    process.configuration.should.deep.include({
      test: {
        number: '1',
        first: '1',
        second: '2',
        third: '3',
      },
    });
  });
  it('if one file is passed and define defualt values return json of the file and defaultValue', () => {
    env.config(['./test/first.conf'], { defaultValue: 4 });
    expect(process.configuration).to.deep.include({ test: { number: '1', first: '1' }, defaultValue: 4 });
  });
});

