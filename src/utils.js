import { adjectives, nouns } from "./word";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

// console.log(process.env.MAILGUN_API, process.env.MAILGUN_DOMAIN);
export const sendMail = (email) => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const client = nodemailer.createTransport(mgTransport(options));
  return client
    .sendMail(email)
    .then(() => {
      console.log("Message sent!");
    })
    .catch((error) => {
      console.log(error);
    });
};

// 메일에 대한 내용을 다룹니다. sendMail을 통해 메일을 보냅니다.
export const sendSecretMail = (address, secret) => {
  console.log(address, secret);
  const email = {
    from: "test@edupopkorn.com",
    to: address,
    subject: "Login Secret for Prismagram 🚀",
    html: `hello! your login secret is <strong>${secret}.</strong><br/>
    Copy paste on the web/app to Login`,
  };
  return sendMail(email);
};

// id를 받아서 암호화된 JWTToken을 만들어주는 메소드
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);