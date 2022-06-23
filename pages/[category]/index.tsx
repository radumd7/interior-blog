import { createClient } from "contentful";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from 'next/image';
import BlogCard from "../../components/BlogCard";

const CategoryPage = ({ posts, category }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const getTitle = (category: string) => {
        const arr: string[] = []
        category.split('-').map((word: string) => arr.push(word[0].toUpperCase() + word.slice(1).toLowerCase()));
        return arr.join(' ')+' | The Savinterior';
    };
    const getH1 = (category: string) => {
        switch(category) {
            case 'living-room':
                return{
                    title: 'Living Room',
                    hook: 'Inspiration & Ideas',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga adipisci sunt magni cumque assumenda doloribus minima exercitationem aliquam officia voluptatibus, alias blanditiis eligendi beatae. Sed numquam error ipsam eveniet!'
                };
            case 'kitchen':
                return {
                    title: 'Kitchen',
                    hook: 'Inspiration & Ideas',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga adipisci sunt magni cumque assumenda doloribus minima exercitationem aliquam officia voluptatibus, alias blanditiis eligendi beatae. Sed numquam error ipsam eveniet!'
                };
            case 'dining-room':
                return {
                    title: 'Dining Room',
                    hook: 'Inspiration & Ideas',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga adipisci sunt magni cumque assumenda doloribus minima exercitationem aliquam officia voluptatibus, alias blanditiis eligendi beatae. Sed numquam error ipsam eveniet!'
                };
            case 'bedroom':
                return {
                    title: 'Bedroom',
                    hook: 'Inspiration & Ideas',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga adipisci sunt magni cumque assumenda doloribus minima exercitationem aliquam officia voluptatibus, alias blanditiis eligendi beatae. Sed numquam error ipsam eveniet!'
                };
            case 'bathroom':
                return {
                    title: 'Bathroom',
                    hook: 'Inspiration & Ideas',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga adipisci sunt magni cumque assumenda doloribus minima exercitationem aliquam officia voluptatibus, alias blanditiis eligendi beatae. Sed numquam error ipsam eveniet!'
                };
        }
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
                    alt={`${category} Hero Image | The Savinterior`}
                    layout='fill'
                    objectFit='cover'
                    priority
                />
                </div>
                <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/60 prose md:prose-md lg:prose-lg xl:prose-xl mx-auto max-w-none'>
                    <h1 className='text-white text-center capitalize'>
                        {getH1(category)?.title}<br/>
                        <span>{getH1(category)?.hook}</span>
                    </h1>
                </div>
            </div>
            {
                posts.items.length > 0 && (
                    <section className="container mx-auto py-4 lg:py-10">
                        <div className="prose md:prose-lg lg:prose-xl mx-auto pb-4 lg:pb-10 px-4">
                            <p>{getH1(category)?.description}</p>
                        </div>
                        <ul className="grid grid-cols-2 lg:grid-cols-4 p-4 lg:p-10 gap-4 lg:gap-10">
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
        },
        revalidate: 60
    }
};