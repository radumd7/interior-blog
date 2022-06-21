import { createClient } from "contentful";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { renderOptions } from "../../utils/contentfulRenderer";
import Image from 'next/image';

export default function BlogPost({ post }: InferGetStaticPropsType< typeof getStaticProps >) {
    return(
        <article>
            <div className='w-full relative'>
                <div className='relative w-full h-screen'>
                <Image
                    src={'https:'+post.fields.thumbnail.fields.file.url}
                    alt={post.fields.title}
                    layout='fill'
                    objectFit='cover'
                    priority
                />
                </div>
                <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/60'>
                    <h1 className='inline text-center text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white uppercase select-none font-roboto md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg'>
                        {post.fields.title}
                    </h1>
                </div>
            </div>
            {documentToReactComponents(post.fields.content, renderOptions)}
        </article>
    );
};

const client = createClient({
    space: process.env.CONTENTFUL_SPACE as string,
    accessToken: process.env.CONTENTFUL_ACCESS as string
});

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await client.getEntries({
        content_type: 'blogPost',
        'fields.category': 'kitchen'
    });
    const paths = posts.items.map((post: any) => ({
        params: {
            slug: post.fields.slug
        }
    }));
    return{
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const post = await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': params?.slug
    })
    return{
        props: {
            post: post.items[0]
        }
    }
};