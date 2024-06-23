import { libScs } from './lib-real2csc';

describe('libScs', () => {
  it('should work', () => {
    expect(libScs()).toEqual('lib-real2csc');
  });
});
