import Image from 'next/image';
import Link from 'next/link';

const CategoryCard = ({ image, name }) => {
    return (
        <div className="relative rounded-lg p-6 flex flex-col hover:opacity-75">
            <Link href={`/category/${name.toLowerCase()}`} passHref>
                <div className="p-6 flex items-end">
                    <Image src={image} alt="" height={700} width={1300} />
                    <h3 className="font-semibold">
                        {name}
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-gray-500">
                    Shop now
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default CategoryCard;
