const { smtpUsername, smtpPassword, sendGridApiKey } = require("../secret");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(sendGridApiKey);
const emailWithSendGrid = async (emailData) => {
    const msg = {
        to: emailData.email,
        from: smtpUsername,
        subject: emailData.subject,
        html: emailData.html,
        };
    try {
        await sgMail.send(msg);
    }
    catch(error){
        throw new Error(error);
    }
}

module.exports = {emailWithSendGrid};