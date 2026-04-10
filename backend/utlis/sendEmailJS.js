/**
 * Send an email confirmation using EmailJS REST API from the Backend.
 * This approach is more reliable as it bypasses browser AdBlockers and CORS.
 */
const sendEmailJS = async (templateParams) => {
  try {
    const serviceId = process.env.EMAILJS_SERVICE_ID?.trim();
    const templateId = process.env.EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = process.env.EMAILJS_PUBLIC_KEY?.trim();
    const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim();

    console.log(`\x1b[33m[EmailJS Debug]\x1b[0m Checking keys...`);
    console.log(`- Service: ${serviceId?.slice(0, 8)}...`);
    console.log(`- Template: ${templateId}`);
    console.log(`- Public: ${publicKey?.slice(0, 5)}...`);
    console.log(`- Private Key Present: ${!!privateKey}`);

    if (!serviceId || !templateId || !publicKey) {
      console.error(`\x1b[31m[EmailJS Error]\x1b[0m Missing keys in process.env! Check config.env.`);
      return false;
    }

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: templateParams,
    };

    console.log(`\x1b[36m[EmailJS Info]\x1b[0m Sending to: ${templateParams.email}`);

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseBody = await response.text();

    if (response.ok) {
      console.log(`\x1b[32m[EmailJS Success]\x1b[0m API responded: ${responseBody}`);
      return true;
    } else {
      console.error(`\x1b[31m[EmailJS Failed]\x1b[0m Status: ${response.status} - Content: ${responseBody}`);
      return false;
    }
  } catch (err) {
    console.error(`\x1b[31m[EmailJS Network Error]\x1b[0m ${err.message}`);
    return false;
  }
};

module.exports = sendEmailJS;
