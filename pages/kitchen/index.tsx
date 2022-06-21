import { createClient } from "contentful";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import BlogCard from "../../components/BlogCard";
import Image from 'next/image';

const LivingRoomPage = ({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return(
        <div>
            <div className='w-full relative'>
                <div className='relative w-full h-screen'>
                <Image
                    src='/hero-kitchen.jpg'
                    alt='Kitchen Hero Image'
                    layout='fill'
                    objectFit='cover'
                    priority
                />
                </div>
                <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/40'>
                    <h1 className='text-center text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white uppercase select-none font-roboto'>The inspiration<br/>you deserve.</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {posts.items.map((post: any) => {
                    const { slug, title, category, thumbnail } = post.fields;
                    return(
                        <BlogCard
                            key={slug}
                            image={{
                            url: 'https:'+thumbnail.fields.file.url,
                            alt: title
                            }}
                            title={title}
                            slug={category+'/'+slug}
                        />
                    );
                })}
            </div>
        </div>
    );
};
export default LivingRoomPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE as string,
        accessToken: process.env.CONTENTFUL_ACCESS as string
    });
    const posts = await client.getEntries({
        content_type: 'blogPost',
        'fields.category': 'kitchen'
    })
    return{
        props: {
            posts
        }
    };
};