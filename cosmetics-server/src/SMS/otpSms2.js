import pkg from "follow-redirects";
import config from "../config/index.js";
const { http } = pkg;

export function otpSendSms2(bookingMessage, method) {
  return new Promise((resolve, reject) => {
    var options = {
      method: method,
      hostname: `${config.sms_api_host}`,
      path: bookingMessage,
      headers: {},
      maxRedirects: 20,
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        resolve(body.toString());
      });

      res.on("error", function (error) {
        reject(error);
      });
    });

    req.end();
  });
}

export const otpGet = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("SMS Response:", data);
  } catch (err) {
    console.error("Error sending SMS:", err);
  }
};
