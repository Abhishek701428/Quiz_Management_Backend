import nodemailer from 'nodemailer';

const sendEmail = async (to: string, subject: string, text: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            secure: false,
            auth: {
                user: 'dudpra02@gmail.com',
                pass: '#992865#'
            }
        });

        const mailOptions = {
            from: 'dudpra02@gmail.com',
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export { sendEmail };
