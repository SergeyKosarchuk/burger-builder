const getUserFromResponse = (response: any) => {
  const userId = response.data.localId;
  const token = response.data.idToken;

  const expiresInSeconds = parseInt(response.data.expiresIn, 10);
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + expiresInSeconds);

  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('expirationDate', expirationDate.toString());

  return [userId, token, expiresInSeconds];
}

export { getUserFromResponse };