export default () => ({
  port: parseInt(process.env['PORT'] ?? '3001', 10),
  frontendUrl: process.env['FRONTEND_URL'] ?? 'http://localhost:3000',

  database: {
    url: process.env['DATABASE_URL'],
  },

  jwt: {
    secret: process.env['JWT_SECRET'] ?? 'change-in-production',
    expiresIn: process.env['JWT_EXPIRES_IN'] ?? '15m',
    refreshSecret: process.env['JWT_REFRESH_SECRET'] ?? 'change-refresh-in-production',
    refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] ?? '7d',
  },

  cloudinary: {
    cloudName: process.env['CLOUDINARY_NAME'],
    apiKey: process.env['CLOUDINARY_KEY'],
    apiSecret: process.env['CLOUDINARY_SECRET'],
  },

  smtp: {
    host: process.env['SMTP_HOST'],
    user: process.env['SMTP_USER'],
    pass: process.env['SMTP_PASS'],
  },
})
