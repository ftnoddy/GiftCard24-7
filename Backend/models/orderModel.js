import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
	{
		// add a reference to the corresponding user
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				qty: { type: Number, default: 0 },
				name: { type: String  },
				price: { type: Number,  default: 0 },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					
					ref: 'Product',
				},
			},
		],

		paymentMethod: {
			type: String,
			required: true,
		},
		// depends on if stripe or paypal method is used
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		
		taxPrice: {
			type: Number,
			default: 0.0,
		},
	
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		
		paidAt: {
			type: Date,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model('Order', orderSchema);

export default Order;