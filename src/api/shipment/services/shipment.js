// import nodemailer from "nodemailer";

// @ts-ignore
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::shipment.shipment");
