import Link from "next/link";
import BlogCard from "../../../BlogCard";
import { MdOutlineArrowRightAlt } from 'react-icons/md';

interface SectionProps {
    posts: Array<any>;
    category: string;
    title: string;
};
const Section: React.FC<SectionProps> = ({
    posts,
    category,
    title
}) => {
    return(
        <section className="flex flex-col space-y-6">
            <h2 className="font-bold text-3xl tracking-wide font-serif text-blue-900 underline underline-offset-[10px]">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {posts.map((post) => (
                    <BlogCard
                        key={post.fields.slug}
                        image={{
                            url: 'https:' + post.fields.thumbnail.fields.file.url,
                            alt: post.fields.title
                        }}
                        title={post.fields.title}
                        slug={post.fields.category + '/' + post.fields.slug}
                    />
                ))}
            </div>
            <div className="w-full flex justify-center lg:justify-end">
                <Link href={`/${category}`} passHref>
                    <a className="text-blue-900 font-semibold flex items-center space-x-1">
                        <span className="text-sm">View more</span>
                        <MdOutlineArrowRightAlt/>
                    </a>
                </Link>
            </div>
        </section>
    );
};
export default Section;