"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::shipment.shipment", ({ strapi }) => ({

  // Handler to get all shipments
  async findAllShipments(ctx) {
    try {
      const shipments = await strapi.entityService.findMany('api::shipment.shipment', {
        populate: '*',
      });
      ctx.send(shipments);
    } catch (error) {
      ctx.throw(500, 'Error fetching shipments');
    }
  },


  // Controller to find shipment by shipmentId
  async findByShipmentId(ctx) {
    const { shipmentId } = ctx.params;

    try {
      const shipment = await strapi.entityService.findMany("api::shipment.shipment", {
        filters: { shipmentId },
        populate: "*",
      });

      if (shipment.length === 0) {
        return ctx.notFound("Shipment not found");
      }

      return ctx.send(shipment[0]);
    } catch (error) {
      return ctx.throw(500, error);
    }
  },

  async updateShipment(ctx) {
  const { shipmentId } = ctx.params;
  const { shipmentStatus, longitude, latitude } = ctx.request.body;

  try {
    // Find the shipment by shipmentId
    const [existingShipment] = await strapi.entityService.findMany("api::shipment.shipment", {
      filters: { shipmentId },
      populate: "order",
    });

    if (!existingShipment) {
      return ctx.notFound("Shipment not found");
    }

    // Prepare the data object with conditional updates
    const updateData = {
      ...(shipmentStatus && { shipmentStatus }),
      ...(longitude !== undefined && { longitude }),
      ...(latitude !== undefined && { latitude }),
    };

    // Update the shipment
    const updatedShipment = await strapi.entityService.update(
      "api::shipment.shipment",
      existingShipment.id,
      { data: updateData }
    );

    // If shipment status is updated, update the order status to match
    if (shipmentStatus && existingShipment.order) {
      await strapi.entityService.update(
        "api::order.order",
        existingShipment.order.id,
        {
          data: { orderStatus: shipmentStatus },
        }
      );
    }

    ctx.send(updatedShipment);
  } catch (error) {
    ctx.throw(500, error);
  }
}

}));
