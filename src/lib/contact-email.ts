type ContactEmail = {
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	message: string;
};

export function contactEmailTemplate(input: ContactEmail): string {
	return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
      <head>
        <link rel="preload" as="image" href="https://www.cobaltweb.tech/icons/any-192.png" />
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
      </head>
      <body style='background-color:rgb(243,244,246);font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";padding-top:40px;padding-bottom:40px'>
        <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
          <tbody>
            <tr>
              <td style='background-color:rgb(243,244,246);font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";padding-top:40px;padding-bottom:40px'>
                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:rgb(255,255,255);border-radius:8px;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 0 #0000;max-width:600px;margin-left:auto;margin-right:auto">
                  <tbody>
                    <tr style="width:100%">
                      <td>
                        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-top-left-radius:8px;border-top-right-radius:8px;padding-left:32px;padding-right:32px;padding-top:16px;padding-bottom:16px;text-align:center;background-color:#001689">
                          <tbody>
                            <tr>
                              <td>
                                <img alt="Cobalt Web Technologies Logo" src="https://www.cobaltweb.tech/icons/any-192.png" style="width:100%;height:auto;object-fit:cover;max-width:120px;margin-left:auto;margin-right:auto;display:block;outline:none;border:none;text-decoration:none" />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h1 style="font-size:24px;font-weight:700;color:rgb(243,244,246);margin-top:0px;margin-bottom:0px">
                                  Cobalt Web Technologies
                                </h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding-left:32px;padding-right:32px;padding-top:32px;padding-bottom:32px">
                          <tbody>
                            <tr>
                              <td>
                                <h2 style="font-size:24px;font-weight:700;color:rgb(17,24,39);margin-bottom:24px;margin-top:0px">
                                  New Contact Form Submission
                                </h2>
                                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:24px">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <h3 style="font-size:18px;font-weight:600;color:rgb(31,41,55);margin-bottom:16px;margin-top:0px">
                                          Personal Information
                                        </h3>
                                        <p style="font-size:14px;color:rgb(55,65,81);margin-bottom:8px;margin-top:0px;line-height:24px">
                                          <strong>Name:</strong> ${input.firstname} ${input.lastname}
                                        </p>
                                        <p style="font-size:14px;color:rgb(55,65,81);margin-bottom:8px;margin-top:0px;line-height:24px">
                                          <strong>Email:</strong> ${input.email}
                                        </p>
                                        <p style="font-size:14px;color:rgb(55,65,81);margin-bottom:8px;margin-top:0px;line-height:24px">
                                          <strong>Phone:</strong> ${input.phone}
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:24px">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <p style="font-size:14px;font-weight:600;color:rgb(31,41,55);margin-bottom:8px;margin-top:0px;line-height:24px">
                                          Additional Message:
                                        </p>
                                        <p style="font-size:14px;color:rgb(55,65,81);margin-bottom:16px;margin-top:0px;background-color:rgb(249,250,251);padding:12px;border-radius:4px;line-height:24px">
                                          ${input.message}
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:rgb(249,250,251);padding-left:32px;padding-right:32px;padding-top:24px;padding-bottom:24px;border-bottom-right-radius:8px;border-bottom-left-radius:8px">
                          <tbody>
                            <tr>
                              <td>
                                <p style="font-size:12px;color:rgb(75,85,99);text-align:center;margin:0px;line-height:24px;margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px">
                                  This email was generated by and sent from cobaltweb.tech website contact form.
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;
}
