import { createClient } from "contentful";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from 'next/image';
import BlogCard from "../../components/BlogCard";

const CategoryPage = ({ posts, category }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const getTitle = (category: string) => {
        const arr: string[] = []
        category.split('-').map((word: string) => arr.push(word[0].toUpperCase() + word.slice(1).toLowerCase()));
        return arr.join(' ')+' | The Interiorist';
    };
    return(
        <>
            <Head>
                <title>{getTitle(category)}</title>
            </Head>
            <div className='w-full relative'>
                <div className='relative w-full h-screen'>
                <Image
                    src={`/hero-${category}.jpg`}
                    alt={`${category} Hero Image`}
                    layout='fill'
                    objectFit='cover'
                    priority
                />
                </div>
                <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/40'>
                    <h1 className='text-center text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white uppercase select-none font-roboto'>The inspiration<br/>you deserve.</h1>
                </div>
            </div>
            {
                posts.items.length > 0 && (
                    <section className="container mx-auto py-4 lg:py-10">
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10">
                            {posts.items.map((post: any) => {
                                const { slug, title, category, thumbnail } = post.fields;
                                return(
                                    <li key={slug}>
                                        <BlogCard
                                            image={{
                                            url: 'https:'+thumbnail.fields.file.url,
                                            alt: title
                                            }}
                                            title={title}
                                            slug={category+'/'+slug}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )
            }
        </>
    );
};
export default CategoryPage;

const client = createClient({
    space: process.env.CONTENTFUL_SPACE as string,
    accessToken: process.env.CONTENTFUL_ACCESS as string
});

export const getStaticPaths: GetStaticPaths = async () => {
    return{
        paths: [
            {params: {category: 'living-room'}},
            {params: {category: 'kitchen'}},
            {params: {category: 'bedroom'}},
            {params: {category: 'bathroom'}},
            {params: {category: 'dining-room'}},
        ],
        fallback: false
    }
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const posts = await client.getEntries({
        content_type: 'blogPost',
        'fields.category': params?.category as string
    });
    return{
        props: {
            posts,
            category: params?.category
        }
    }
};