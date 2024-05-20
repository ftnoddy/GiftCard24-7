import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    orderId: { type: Number, required: true, unique: true },
    productId: { type: Number, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    denomination: { type: Number, required: true },
    email: { type: String, required: true },
    contact: { type: String },
    poNumber: { type: String, required: true },
    orderTotal: { type: Number, required: true },
    orderDiscount: { type: String, required: true },
    discountPercent: { type: String, required: true },
    currencyCode: { type: String, required: true },
    currencyValue: { type: Number, required: true },
    amountCharged: { type: Number, required: true },
    orderStatus: { type: String, required: true },
    deliveryStatus: { type: String, required: true },
    voucherCode: { type: String, required: true },
    voucherValidity: { type: String, required: true },
    voucherAmount: { type: Number, required: true },
    voucherCurrency: { type: String, required: true },
    voucherCountry: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const placeOrder = mongoose.model('Order', orderSchema);

export default placeOrder;
