import { createTransport } from "nodemailer";

const transporter = createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "manhtranduc0202@gmail.com",
    pass: "upcq knry czpz wtpu",
  },
  secure: true,
});

export default transporter;
