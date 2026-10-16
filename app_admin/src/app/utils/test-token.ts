// Builds an unsigned JWT-shaped string for unit tests
export function fakeToken(secondsFromNow: number): string {
  const payload = {
    _id: '1', email: 'jsmith9867@example.com', name: 'Joe Smith',
    exp: Math.floor(Date.now() / 1000) + secondsFromNow
  };
  return 'header.' + btoa(JSON.stringify(payload)) + '.signature';
}
