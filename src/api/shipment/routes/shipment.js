"use strict";

module.exports = {
  routes: [
    // Custom route to get shipment by custom shipmentId
    {
      method: "GET",
      path: "/shipments/by-shipmentId/:shipmentId",
      handler: "shipment.findByShipmentId",
      config: {
        auth: false,
      },
    },
    // Custom route to update shipment details by shipmentId
    {
      method: "PUT",
      path: "/shipments/update/:shipmentId",
      handler: "shipment.updateShipment",
      config: {
        auth: false,
      },
    },
  ],
};
