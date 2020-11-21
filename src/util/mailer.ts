import * as nodemailer from "nodemailer";
import  sgTransport from 'nodemailer-sendgrid-transport'
import * as config from '../configs/mail.json'
class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }


    sendMail() {

        let mailOptions = {
            from: "furtado3g@gmail.com",
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        const transporter = nodemailer.createTransport(sgTransport({
            auth: {
                api_key: config.api_key
            }    
        }));

        transporter.sendMail(mailOptions, (error : any, info:any) => {
            if (error) {
                console.log(error)
                return error;
            } else {
                return "E-mail enviado com sucesso!";
            }
        })
    }


}

export default new Mail;