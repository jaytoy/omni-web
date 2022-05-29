import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart.slice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div key={product.id}>
      <div className="relative">
        <div className="relative w-full h-72 rounded-lg overflow-hidden">
          <Image src={product.image} alt="" height={300} width={220} className="object-center object-cover" />
        </div>

        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
          <h3 className='flex-grow truncate'>{product.product}</h3>
          <p className='nowrap'>€{product.price}</p>
        </div>
        <p className="mt-1 text-md italic text-gray-500">{product.category}</p>
      </div>
      
      <div className="mt-6">
        <button
          onClick={() => dispatch(addToCart(product))}
          className="relative w-full bg-gray-300 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-indigo-500 hover:text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;