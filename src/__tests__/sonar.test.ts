import { Sonar } from '../index';

test('My Sonar', () => {
    const sonar = new Sonar();
    expect(sonar.ping()).toBe('PING!');
});