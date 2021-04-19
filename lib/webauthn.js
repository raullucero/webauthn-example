export const register = async ({ username, name }) => {
  const resChallenge = await getChallenge({ username, name });
  const dataChallenge = await resChallenge.json();

  dataChallenge.challenge = Uint8Array.from(dataChallenge.challenge, (c) =>
    c.charCodeAt(0)
  );
  dataChallenge.user.id = Uint8Array.from(dataChallenge.user.id, (c) =>
    c.charCodeAt(0)
  );

  const credential = await navigator.credentials.create({
    publicKey: dataChallenge,
  });

  const formattedCredential = formatCredentialToJSON(credential);

  const res = await sendResponse(formattedCredential);
  const data = await res.json();
  console.log(data);
};

const getChallenge = (body) => {
  return fetch('/api/auth/register', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const sendResponse = (body) => {
  return fetch('/api/auth/response', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const convertBase64 = (buffer) =>
  btoa(
    new Uint8Array(buffer).reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '')
  );

const formatCredentialToJSON = (credential) => {
  if (credential instanceof Array) {
    let arr = [];
    for (let i of credential) arr.push(formatCredentialToJSON(i));
    return arr;
  }

  if (credential instanceof ArrayBuffer) {
    return convertBase64(credential);
  }

  if (credential instanceof Object) {
    let obj = {};

    for (let key in credential) {
      obj[key] = formatCredentialToJSON(credential[key]);
    }

    return obj;
  }

  return credential;
};
