import ProductCard from '../components/ProductCard';
import { getProducts } from './api/product/index';

const ShopPage = ({ products }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        
        <h2 className="text-xl font-bold text-gray-900">All Results</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

export async function getStaticProps() {
  const products = await getProducts();
  // const res = await fetch('http://127.0.0.1:8080/products');
  // const products = await res.json();
  return { props: { products } };
}

export default ShopPage;
