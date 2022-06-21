import { createClient } from "contentful";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { renderOptions } from "../../../utils/contentfulRenderer";
import Head from "next/head";

export default function BlogPost({ post }: InferGetStaticPropsType< typeof getStaticProps >) {
    return(
        <>
            <Head>
                <title>{post.fields.title}</title>
                <meta name='description' content={post.fields.title + ' | The Interiorist.'}/>
            </Head>
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
                    <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/60 prose md:prose-md lg:prose-lg xl:prose-xl mx-auto max-w-none'>
                        <h1 className='text-white text-center capitalize'>
                            {post.fields.title}
                        </h1>
                    </div>
                </div>
                {documentToReactComponents(post.fields.content, renderOptions)}
            </article>
        </>
    );
};

const client = createClient({
    space: process.env.CONTENTFUL_SPACE as string,
    accessToken: process.env.CONTENTFUL_ACCESS as string
});

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await client.getEntries({
        content_type: 'blogPost',
    });
    const paths = posts.items.map((post: any) => ({
        params: {
            category: post.fields.category,
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