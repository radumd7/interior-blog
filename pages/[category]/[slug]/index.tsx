import { createClient } from "contentful";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from 'next/image';
import Head from "next/head";
import BlockSection from "../../../components/Pages/Posts/BlockSection";
import { blogSectionFormat } from "../../../utils/blogSectionFormat";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function BlogPost({ sections, postData }: InferGetStaticPropsType< typeof getStaticProps >) {
    const { title, intro, thumbnail } = postData;
    return(
        <>
            <Head>
                <title>{title + ' | The Savinterior'}</title>
                <meta name='description' content={title + ' | The Savinterior.'}/>
            </Head>
            <article>
                <section className='w-full relative'>
                    <div className='relative w-full h-screen'>
                        <Image
                            src={thumbnail.url}
                            alt={thumbnail.alt}
                            layout='fill'
                            objectFit='cover'
                            priority
                        />
                    </div>
                    <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/60 prose md:prose-md lg:prose-lg xl:prose-xl mx-auto max-w-none'>
                        <h1 className='text-white text-center capitalize'>
                            {title}
                        </h1>
                    </div>
                </section>
                <div className="mx-auto prose prose-slate md:prose-md lg:prose-lg xl:prose-xl py-4 lg:py-10">
                    {
                        intro && (
                            <section className="p-4">
                                {documentToReactComponents(intro)}
                            </section>
                        )
                    }
                    {sections?.map((section: any, index: any) => {
                        if(section.type === 'block-section'){
                            return(
                                <BlockSection
                                    key={section.title}
                                    sectionContent={section}
                                    sectionCount={index+1}
                                    isLast={index+1 === sections.length}
                                />
                            );
                        }
                    })}
                </div>
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
    });

    const nodes = (post.items[0] as any).fields.content?.content || null;
    
    const sections = blogSectionFormat(nodes);

    return{
        props: {
            sections,
            postData: {
                title: (post.items[0].fields as any).title.split(' ').map((word: string) => word[0].toUpperCase() +word.slice(1)).join(' '),
                intro: (post.items[0].fields as any).intro || null,
                thumbnail: {
                    url: 'https:'+(post.items[0].fields as any).thumbnail.fields.file.url,
                    alt: (post.items[0].fields as any).title + ' | The Savinterior'
                }
            },
        },
        revalidate: 60
    };
};