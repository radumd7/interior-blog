import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { createClient } from 'contentful';
import Image from 'next/image';
import Section from '../components/Pages/Homepage/Section';
import Head from 'next/head';

const Home = ({ posts }: InferGetServerSidePropsType< typeof getServerSideProps >) => {
  return (
    <>
      <Head>
        <title>The Interiorist</title>
        <meta name='description' content='Get the latest home decor inspiration and news from the editors of The Interiorist.'/>
      </Head>
      <div className='w-full relative'>
        <div className='relative w-full h-screen'>
          <Image
            src='/hero-interior-design.jpg'
            alt='Interior Design Hero Image'
            layout='fill'
            objectFit='cover'
            priority
          />
        </div>
        <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/50'>
          <h1 className='text-center text-3xl md:text-6xl lg:text-8xl xl:text-9xl font-extrabold text-white uppercase select-none font-roboto'>The inspiration<br/>you deserve.</h1>
        </div>
      </div>
      <div className='container mx-auto flex flex-col space-y-4 py-4 md:px-4'>
        <Section
          posts={posts.items.filter((p: any) => p.fields.category === 'living-room')}
          category='living-room'
          title='Living Room Inspiration'
        />
        <Section
          posts={posts.items.filter((p: any) => p.fields.category === 'kitchen')}
          category='kitchen'
          title='Kitchen Love'
        />
        <Section
          posts={posts.items.filter((p: any) => p.fields.category === 'bedroom')}
          category='bedroom'
          title='Bedroom'
        />
        <Section
          posts={posts.items.filter((p: any) => p.fields.category === 'bathroom')}
          category='bathroom'
          title='Bathroom'
        />
        <Section
          posts={posts.items.filter((p: any) => p.fields.category === 'dining-room')}
          category='dining-room'
          title='Dining Room'
        />
      </div>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async(context) => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE as string,
    accessToken: process.env.CONTENTFUL_ACCESS as string
  });
  const posts = await client.getEntries({ content_type: 'blogPost' });
  return{
    props:{
      posts
    }
  };
};