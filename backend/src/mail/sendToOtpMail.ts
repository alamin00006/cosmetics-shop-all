export function otpMail(result: any, name: any) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - Project Second Home</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333333;
          }
  
          .container {
              width: 80%;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              color: #0066cc;
          }
  
          p {
              margin-bottom: 15px;
          }
  
          .booking-details {
              border-top: 2px solid #eeeeee;
              margin-top: 20px;
              padding-top: 10px;
          }
  
          .footer {
              margin-top: 20px;
              color: #777777;
              font-size: 12px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <p>Dear ${name},</p>
          <p>${result}</p>
          <p>Warm regards,<br>Sharikana Team.</p>
      </div>
  </body>
  </html>
  
      
    `
}
