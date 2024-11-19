"use strict";

module.exports = {
  routes: [
    // Custom route to get order by custom orderId
    {
      method: "GET",
      path: "/orders/by-orderId/:orderId",
      handler: "order.findByOrderId",
      config: {
        auth: false,
      },
    },
    // Custom route to update order details by orderId
    {
      method: "PUT",
      path: "/orders/update/:orderId",
      handler: "order.updateOrder",
      config: {
        auth: false,
      },
    },
  ],
};
