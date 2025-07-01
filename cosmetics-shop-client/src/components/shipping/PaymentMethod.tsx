export default function PaymentMethod({
  setShippingValue,
  shippingValueMissing,
}: {
  setShippingValue: (value: number) => void;
  shippingValueMissing: string;
}) {
  return (
    <div className="">
      <div className="">
        <h2 className="text-2xl font-bold mb-4">Delivery</h2>
        <div className="flex items-center  bg-white rounded-lg shadow p-4 gap-5">
          <div className=" ">
            <div className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="delivery"
                className="mr-2 cursor-pointer"
                id="isInsideDhaka"
                onChange={() => setShippingValue(60)}
              />
              <label htmlFor="isInsideDhaka" className="cursor-pointer">
                Inside Dhaka ৳ 60
              </label>
            </div>
          </div>
          <div className="">
            <div className="flex items-center ">
              <input
                type="radio"
                name="delivery"
                className="mr-2 cursor-pointer"
                id="isOutsideDhaka"
                onChange={() => setShippingValue(120)}
              />
              <label htmlFor="isOutsideDhaka" className="cursor-pointer">
                Outside Dhaka ৳ 120
              </label>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <p className="text-sm text-gray-600 mb-4">
          All transactions are secure and encrypted.
        </p>

        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <div className="flex items-center ">
            <input
              type="radio"
              defaultChecked
              name="payment"
              className="mr-2"
              readOnly
            />
            <span>Cash on Delivery (COD)</span>
          </div>
        </div>

        {/* <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow flex items-center justify-center">
          <p className="text-center text-gray-600">
            After clicking "Pay now", your order will be processed for Cash on
            Delivery.
          </p>
        </div> */}

        {/* <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Billing address</h3>
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center mb-2">
              <input type="radio" name="billing" className="mr-2" checked />
              <span>Same as shipping address</span>
            </div>
            <div className="flex items-center">
              <input type="radio" name="billing" className="mr-2" />
              <span>Use a different billing address</span>
            </div>
          </div>
        </div> */}

        {/* <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Add tip</h3>
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Show your support for the team at HOK Makeup</span>
            </div>
          </div>
        </div> */}
        {shippingValueMissing && (
          <div className="p-4 bg-rose-100 text-rose-800 rounded-lg mb-4">
            <p className="text-sm">{shippingValueMissing}</p>
          </div>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold mb-4"
        >
          Complete Order
        </button>

        <div className="text-center text-sm text-gray-500">
          <a href="#" className="mr-2">
            Refund policy
          </a>
          <a href="#" className="mr-2">
            Shipping policy
          </a>
          <a href="#" className="mr-2">
            Privacy policy
          </a>
          <a href="#" className="mr-2">
            Terms of service
          </a>
          <a href="#">Contact information</a>
        </div>
      </div>
    </div>
  );
}
