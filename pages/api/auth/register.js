import nc from 'next-connect';
import { db } from 'helpers/db';
import { randomBase64URLBuffer } from 'helpers/utils';

const handler = nc();

handler.post((req, res) => {
  const { body } = req;
  if (!body || !body.username) {
    res.json({
      status: 'failed',
      message: 'Request missing name or username field!',
    });

    return;
  }

  const { username, name } = body;

  console.log(db);
  if (db.hasOwnProperty(username) && db[username].registered) {
    res.json({
      status: 'failed',
      message: `Username ${username} already exists`,
    });

    return;
  }

  const userId = randomBase64URLBuffer();
  db[username] = {
    name: name,
    registered: false,
    id: userId,
    authenticators: [],
  };

  const challengeCred = {
    challenge: randomBase64URLBuffer(32),
    rp: {
      name: 'YOLO',
    },
    user: {
      id: userId,
      name: name,
      displayName: username,
    },
    attestation: 'direct',
    pubKeyCredParams: [
      {
        type: 'public-key',
        alg: -7, // "ES256" IANA COSE Algorithms registry
      },
    ],
  };

  res.status(200).json(challengeCred);
});

export default handler;
