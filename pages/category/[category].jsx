import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';
import { getProductsByCategory } from '../api/product/[category]';

const CategoryPage = ({ products }) => {
  const router = useRouter();
  
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        
        <h2 className="text-xl font-bold text-gray-900">Results for {router.query.category}</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default CategoryPage;

export async function getServerSideProps(ctx) {
  const category = ctx.query.category;
  const products = await getProductsByCategory(category);
  return { props: { products } };
}
