"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = {
  async login(ctx) {
    const { identifier, password } = ctx.request.body;

    try {
      // Find the user by email (identifier)
      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { email: identifier },
          populate: ["shipments", "orders"],
        });

      if (!user) {
        return ctx.badRequest("User not found");
      }

      // Validate the password
      const validPassword = await strapi.plugins[
        "users-permissions"
      ].services.user.validatePassword(password, user.password);

      if (!validPassword) {
        return ctx.badRequest("Invalid credentials");
      }

      // Generate a JWT token
      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        id: user.id,
      });

      return { jwt };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async register(ctx) {
    const { username, email, password } = ctx.request.body;

    try {
      // Create the user
      const newUser = await strapi.plugins[
        "users-permissions"
      ].services.user.add({
        username,
        email,
        password,
        role: 1,
      });

      // To link the driver entry linked to the user
      const newDriver = await strapi.entityService.create(
        "api::driver.driver",
        {
          data: {
            user: newUser.id,
            email: email,
          },
        }
      );

      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        id: newUser.id,
      });

      return { jwt };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Fetch all drivers
  async findAll(ctx) {
    try {
      // Fetch all drivers, including related user information
      const drivers = await strapi.services.driver.find({
        populate: { user: true },
      });
      ctx.send(drivers);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  // Fetch a specific driver by ID
  async findOne(ctx) {
    try {
      const { id } = ctx.params;

      // Find a driver by ID and populate the related user data
      const driver = await strapi.services.driver.findOne({
        where: { id },
        populate: { user: true },
      });

      if (!driver) {
        return ctx.throw(404, "Driver not found");
      }

      ctx.send(driver);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
