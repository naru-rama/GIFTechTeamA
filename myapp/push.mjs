import fetch from 'node-fetch'; // ❶

const tokens = [
  "ExponentPushToken[1kRs3RMRm3BeuBPEKOxvE8]",
];

tokens.forEach(async (token) => {
  const pushMessage = {
    to: token,
    sound: 'default',
    title: '本気で Push! Push!',
    badge: 0 | Math.random() * 9 + 1, // ❷
    body: 'We can say!',
    data: {
      timestamp: Date.now()
    }
  }

  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pushMessage)
  });

  console.log(res);
});