import Link from "next/link";
import { ShoppingBagIcon } from '@heroicons/react/outline';
import { useSelector } from "react-redux";

export default function Header() {
    // Selecting cart from global state
    const cart = useSelector((state) => state.cart);

    // Getting the count of items
    const getItemsCount = () => {
        return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
    };

    return (
        <header>
            <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="w-full py-6 flex items-center justify-between border-b border-gray-500">
                    <div className="flex items-center">
                        <div className="hid ml-10 space-x-8 lg:block">
                            <Link href="/">
                                <a className="text-base font-medium hover:text-indigo-500">Home</a>
                            </Link>
                            <Link href="/shop">
                                <a className="text-base font-medium hover:text-indigo-500">Shop</a>
                            </Link>
                        </div>
                    </div>
                    <div className="ml-10 space-x-4">
                        <Link href="/cart" passHref>
                            <a className="group -m-2 p-2 flex items-center">
                                <ShoppingBagIcon
                                    className="flex-shrink-0 h-6 w-6 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                />
                                <span className="ml-2 text-xl font-medium text-gray-700 group-hover:text-gray-800">({getItemsCount()})</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}
