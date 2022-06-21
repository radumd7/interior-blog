import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
    image: {
        url: string;
        alt: string;
    };
    title: string;
    slug: string;
};

const BlogCard: React.FC<BlogCardProps> = ({
    image,
    title,
    slug
}) => {
    return(
        <Link
            href={`/${slug}`}
            passHref
        >
            <a>
                <div>
                    <div className="w-full aspect-w-1 aspect-h-1 relative shadow-lg">
                        <Image
                            src={image.url}
                            alt={image.alt}
                            layout='fill'
                            objectFit="cover"
                        />
                    </div>
                    <div className="py-4">
                        <h3 className="font-bold tracking-wide font-mono text-gray-700 antialiased">{title}</h3>
                    </div>
                </div>
            </a>
        </Link>
    );
};
export default BlogCard;