const https = require('https');

/**
 * Send an email confirmation using EmailJS REST API from the Backend.
 * Switched to 'https' module to avoid the 30s DNS timeout bug in Node's native fetch on Windows.
 */
const sendEmailJS = (templateParams, customTemplateId = null) => {
  return new Promise((resolve, reject) => {
    try {
      const serviceId = process.env.EMAILJS_SERVICE_ID?.trim();
      const templateId = (customTemplateId || process.env.EMAILJS_TEMPLATE_ID)?.trim();
      const publicKey = process.env.EMAILJS_PUBLIC_KEY?.trim();
      const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim();

      console.log(`\x1b[33m[EmailJS Debug]\x1b[0m Checking keys...`);
      console.log(`- Service: ${serviceId?.slice(0, 8)}...`);
      console.log(`- Template: ${templateId}`);
      console.log(`- Public: ${publicKey?.slice(0, 5)}...`);
      console.log(`- Private Key Present: ${!!privateKey}`);

      if (!serviceId || !templateId || !publicKey) {
        console.error(`\x1b[31m[EmailJS Error]\x1b[0m Missing keys in process.env!`);
        return reject(new Error('Missing EmailJS keys in environment configuration.'));
      }

      const postData = JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: templateParams,
      });

      const options = {
        hostname: 'api.emailjs.com',
        port: 443,
        path: '/api/v1.0/email/send',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
        timeout: 10000, // 10 second timeout for faster feedback
      };

      console.log(`\x1b[36m[EmailJS Info]\x1b[0m Sending "${templateId}" to: ${templateParams.email}`);

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`\x1b[32m[EmailJS Success]\x1b[0m API responded: ${body}`);
            resolve(true);
          } else {
            console.error(`\x1b[31m[EmailJS Failed]\x1b[0m Status: ${res.statusCode} - Content: ${body}`);
            reject(new Error(`EmailJS API Error: ${res.statusCode} - ${body}`));
          }
        });
      });

      req.on('error', (err) => {
        console.error(`\x1b[31m[EmailJS Network Error]\x1b[0m ${err.message}`);
        reject(err);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('EmailJS connection timed out.'));
      });

      req.write(postData);
      req.end();

    } catch (err) {
      console.error(`\x1b[31m[EmailJS Fatal Error]\x1b[0m ${err.message}`);
      reject(err);
    }
  });
};

module.exports = sendEmailJS;
