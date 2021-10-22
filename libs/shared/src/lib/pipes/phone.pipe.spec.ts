import { PhonePipe } from './phone.pipe';

describe('PhonePipe', () => {
  let pipe: PhonePipe;
  beforeEach(() => {
    pipe = new PhonePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should provide 10 digit phone number and check proper format', () => {
    expect(pipe.transform('1234567890')).toBe('(123) 456-7890');
  });

  it('should pass more than 3 values and check format', () => {
    expect(pipe.transform('1234')).toBe('(123) 4');
  });

  it('should pass less than 3 values and check format', () => {
    expect(pipe.transform('12')).toBe('12');
  });
});
