import React from 'react'
import { useLocation ,Link} from 'react-router-dom'

const OrderDetails = () => {
  const location = useLocation()
  const order = location.state;
  console.log(order)
  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No Order Found</h2>
        <p className="mb-4 text-gray-500">Please go back and select a valid order.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go to Home
        </Link>
      </div>
    );
  }


  // Calculate total dynamically
  const itemsTotal = order.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(itemsTotal * 0.1); // 10% tax
  const delivery = itemsTotal > 500 ? 0 : 50; // Free if over ₹1000
  const total = itemsTotal + tax + delivery;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      {/* Order Summary */}
      <div className="mb-4">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Payment Status:</strong> <span className="text-green-600">{order.isPaid ? "Paid" : "Not Paid"}</span></p>
      </div>

      {/* Shipping Address */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Shipping Address</h3>
        <p>{order.user.name}</p>
        <p>{order.user.email}</p>
        <p>{order.shippingInfo.address}</p>
        <p>{order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.country} - {order.shippingInfo.zip}</p>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Payment</h3>
        <p><strong>Method:</strong> {order.paymentMethod}</p>
        <p><strong>Status:</strong> {order.isPaid ? "Paid" : "Not Paid"}</p>
      </div>

      {/* Ordered Items */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Items Ordered</h3>
        <div className="divide-y">
          {order.cartItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 py-4">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium">{item.productId.name}</p>
                <p>Qty: {item.quantity}</p>
              </div>
              <div>
                <p className="text-right font-semibold">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="border-t pt-4">
        <p><strong>Items Total:</strong> ₹{itemsTotal}</p>
        <p><strong>Tax (10%):</strong> ₹{tax}</p>
        <p><strong>Delivery:</strong> ₹{delivery}</p>
        <p className="text-lg font-bold mt-2">Total Paid: ₹{total}</p>
      </div>
    </div>
  )
}

export default OrderDetails;
