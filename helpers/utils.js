import crypto from 'crypto';

export const randomBase64URLBuffer = (len) => {
  len = len || 32;

  const buff = crypto.randomBytes(len);
  console.log(buff.toString('base64'));
  console.log(buff.toString('base64url'));
  return buff.toString('base64');
};
