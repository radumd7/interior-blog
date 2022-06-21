import Link from "next/link";
import BlogCard from "../../../BlogCard";

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
        <section className="flex flex-col space-y-4 lg:space-y-10">
            <Link href={`/${category}`} passHref>
                <a className="w-fit">
                    <h2 className="font-bold text-3xl tracking-wide font-serif text-blue-900 underline underline-offset-[10px]">{title}</h2>
                </a>
            </Link>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10">
                {posts.map((post) => (
                    <li key={post.fields.slug}>
                        <BlogCard
                            image={{
                                url: 'https:' + post.fields.thumbnail.fields.file.url,
                                alt: post.fields.title
                            }}
                            title={post.fields.title}
                            slug={post.fields.category + '/' + post.fields.slug}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};
export default Section;