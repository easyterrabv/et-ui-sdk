import { Sonar } from '../sonar';

test('My Sonar', () => {
    const sonar = new Sonar();
    expect(sonar.ping()).toBe('PING!');
});