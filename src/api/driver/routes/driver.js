"use strict";

module.exports = {
  routes: [
    // Login route (no authentication is required)
    {
      method: "POST",
      path: "/drivers/login",
      handler: "driver.login",
      config: {
        auth: false,
      },
    },
    // Register route (no authentication is required)
    {
      method: "POST",
      path: "/drivers/register",
      handler: "driver.register",
      config: {
        auth: false,
      },
    },
    // Creating a new driver (authentication is required)
    {
      method: "POST",
      path: "/drivers",
      handler: "driver.register",
      config: {
        auth: {
          scope: ["authenticated"],
        },
      },
    },
    // Route to get all drivers
    {
      method: "GET",
      path: "/drivers",
      handler: "driver.findAll",
      config: {
        auth: {
          scope: ["authenticated"],
        },
      },
    },
    // Route to get a specific driver by ID
    {
      method: "GET",
      path: "/drivers/:id",
      handler: "driver.findOne",
      config: {
        auth: {
          scope: ["authenticated"],
        },
      },
    },
  ],
};
