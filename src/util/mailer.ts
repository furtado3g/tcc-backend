import sgMail from "@sendgrid/mail";
import {api_key} from '../configs/mail.json' 
sgMail.setApiKey(process.env.SENDGRID_API_KEY || api_key);

class Mail {
  constructor(
    public to?: string,
    public subject?: string,
    public message?: string
  ) {}

  sendMail() {
    let msg = {
      from: "furtado3g@gmail.com",
      to: this.to,
      subject: this.subject,
      html: this.message,
      text: 'this.message',
    };
    return sgMail
      .send(msg)
      .then(() => {
        return "E-mail enviado com sucesso!";
      })
      .catch((error) => {
        return error;
      });
  }
}

export default new Mail();
