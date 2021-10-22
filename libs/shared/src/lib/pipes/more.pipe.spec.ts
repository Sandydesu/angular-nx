import { MorePipe } from './more.pipe';

describe('MorePipe', () => {
  let pipe: MorePipe;

  beforeEach(() => {
    pipe = new MorePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return text with ellipsis', () => {
    const value = pipe.transform('Hello Iam testing', 10);
    expect(value).toEqual('Hello Iam...');
  });

  it('should return text with out ellipsis', () => {
    const value = pipe.transform('Hello Iam', 10);
    expect(value).toEqual('Hello Iam');
  });
});
