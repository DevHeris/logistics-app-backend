"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  // Handler to get an order by custom orderId
  async findByOrderId(ctx) {
    const { orderId } = ctx.params;
    try {
      const order = await strapi.entityService.findMany("api::order.order", {
        filters: { orderId },
        populate: "*",
      });

      if (order.length === 0) {
        ctx.throw(404, "Order not found");
      }
      ctx.send(order[0]);
    } catch (error) {
      ctx.throw(500, "Error fetching order");
    }
  },

  // Handler to update order details by orderId
  async updateOrder(ctx) {
    const { orderId } = ctx.params;
    const { orderStatus } = ctx.request.body;

    try {
      const order = await strapi.entityService.updateMany("api::order.order", {
        filters: { orderId },
        data: { orderStatus },
      });

      if (order.count === 0) {
        ctx.throw(404, "Order not found or update failed");
      }

      ctx.send({ message: "Order updated successfully", order });
    } catch (error) {
      ctx.throw(500, "Error updating order");
    }
  },
}));
