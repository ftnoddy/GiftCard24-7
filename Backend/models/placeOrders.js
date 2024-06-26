import { Schema, model } from 'mongoose';

const voucherSchema = new Schema({
    productId: Number,
    orderId: Number,
    voucherCode: String,
    pin: String,
    validity: Date,
    amount: Number,
    currency: String,
    country: String,
    type: String,
    currencyValue: Number
}, { _id: false });

const voucherDetailSchema = new Schema({
    orderId: Number,
    productId: Number,
    productName: String,
    currencyCode: String,
    productStatus: String,
    denomination: Number
}, { _id: false });

const placeOrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    userName: { type: String }, 
    orderId: { type: Number, required: true, unique: true },
    orderTotal: Number,
    orderDiscount: String,
    discountPercent: String,
    currencyCode: String,
    amountCharged: Number,
    orderStatus: String,
    deliveryStatus: String,
    tag: String,
    quantity: Number,
    vouchers: [voucherSchema],
    voucherDetails: [voucherDetailSchema]
});

const PlaceOrder = model('PlaceOrder', placeOrderSchema);

export default PlaceOrder;
