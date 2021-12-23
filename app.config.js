import 'dotenv/config';

export default {
    name: 'water-saver',
    version: '1.0.0',
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messageSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID, 
      measuremntId: process.env.MEASUREMNT_ID,
    },
  };