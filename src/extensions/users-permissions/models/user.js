module.exports = {
  lifecycles: {
    // Triggered after a new user is created
    async afterCreate(result, params, data) {
      // Check if the newly created user has the 'driver' role
      if (result.role.name === 'Authenticated') {
        // Data to be saved in the Driver content type
        const driverData = {
          user: result.id, // Link Driver to User via user relation
          // Add any other fields needed for the Driver content type
          // Example: license_number, vehicle_info, etc.
        };

        // Create the Driver record in Strapi
        await strapi.services.driver.create(driverData);
      }
    },
  },
};
