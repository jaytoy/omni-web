import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, setQuantity } from '../redux/cart.slice';
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/solid';

const CartPage = () => {

  // Extracting cart state from redux store 
  const cart = useSelector((state) => state.cart);

  // Reference to the dispatch function from redux store
  const dispatch = useDispatch();

  const onQuantityChange = (itemId, newQty) => {
    dispatch(setQuantity({itemId, newQty}));
  }

  const getTotalPrice = () => {
    return cart.cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    ).toFixed(2);
  };

  const submitOrder = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      data: event.target.total
    }

    console.log(data)

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = '/api/order';

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <form onSubmit={(e) => submitOrder(e)} className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            {cart.length === 0 ? (
                <h1>Your Cart is Empty!</h1>
            ) : (
                <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                    {cart.cartItems.map((item, itemIdx) => (
                    <li key={item.id} className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                        <Image src={item.image} alt="" height="90" width="65" className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48" />
                        </div>
    
                        <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                            <div className="flex justify-between">
                                <h3 className="text-sm">
                                <a href={item.href} className="font-medium text-gray-700 hover:text-gray-800">
                                    {item.product}
                                </a>
                                </h3>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                            </div>
    
                            <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label htmlFor={`quantity-${itemIdx}`} className="sr-only">
                                Quantity, {item.quantity}
                            </label>
                            <select
                                value={item.quantity}
                                onChange={(e) => onQuantityChange(item.id, e.target.value)}
                                id={`quantity-${itemIdx}`}
                                name={`quantity-${itemIdx}`}
                                className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                            </select>
    
                            <div className="absolute top-0 right-0">
                                <button
                                  onClick={() => dispatch(removeFromCart(item.id))} 
                                  type="button" 
                                  className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                >
                                <span className="sr-only">Remove</span>
                                <XIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                            </div>
                        </div>
    
                        {/* <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                            {item.inStock ? (
                            <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                            ) : (
                            <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                            )}
                            <span>{item.inStock ? 'In stock' : `Ships in ${item.leadTime}`}</span>
                        </p> */}

                        <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                            <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                            <span>In stock</span>
                        </p>
                        </div>
                    </li>
                    ))}
                </ul>
            )}

           
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">€{getTotalPrice()}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how shipping is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">Free</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">€{getTotalPrice()}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Checkout
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
