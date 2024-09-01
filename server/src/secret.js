require('dotenv').config();
const port = process.env.SERVER_PORT || 3001;
const mongoDbUrl = process.env.MONGODB_URL;
const jsonActivationKey = process.env.JSON_ACTIVATION_KEY;
const smtpUsername = process.env.SMTP_USERNAME || '';
const smtpPassword = process.env.SMTP_PASSWORD || "";
const clientUrl = process.env.CLIENT_URL;
const sendGridApiKey = process.env.SENDGRID_API_KEY || "";
module.exports = {port, mongoDbUrl, jsonActivationKey, smtpUsername, smtpPassword, clientUrl, sendGridApiKey};