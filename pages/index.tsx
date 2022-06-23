import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from 'next'
import { createClient } from 'contentful';
import Image from 'next/image';
import Section from '../components/Pages/Homepage/Section';
import Head from 'next/head';
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const HeroSection: React.FC<{
  imageUrl: string;
}> = ({
  imageUrl
}) => {
  return(
    <div className='w-full relative'>
      <div className='relative w-full h-screen'>
        <Image
          src={imageUrl}
          alt='Interior Design Hero Image | The Savinterior'
          layout='fill'
          objectFit='cover'
          priority
        />
      </div>
      <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/60'>
        <h1 className='text-center text-3xl md:text-6xl lg:text-8xl xl:text-9xl font-extrabold text-white uppercase select-none font-roboto'>
          The inspiration<br/>you deserve.
        </h1>
      </div>
    </div>
  );
};

const Home = ({ posts }: InferGetStaticPropsType< typeof getStaticProps >) => {
  return (
    <>
      <Head>
        <title>The Savinterior</title>
        <meta name='description' content='Get the latest home decor inspiration and news from the editors of The Savinterior.'/>
      </Head>
      <div className='w-full relative'>
        <div className='relative w-full h-screen'>
          <Image
            src='/hero-interior-design.jpg'
            alt='Interior Design Hero Image | The Savinterior'
            layout='fill'
            objectFit='cover'
            priority
          />
        </div>
        <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/60'>
          <h1 className='text-center text-3xl md:text-6xl lg:text-8xl xl:text-9xl font-extrabold text-white uppercase select-none font-roboto'>The inspiration<br/>you deserve.</h1>
        </div>
      </div>
      <div className='container mx-auto flex flex-col space-y-4 p-4 md:p-10'>
        <Section
          posts={posts.items.filter((p: any) => p.fields.category === 'living-room')}
          category='living-room'
          title='Living Room'
        />
        <Section
          posts={posts.items.filter((p: any) => p.fields.category === 'kitchen')}
          category='kitchen'
          title='Kitchen'
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

export const getStaticProps: GetStaticProps = async() => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE as string,
    accessToken: process.env.CONTENTFUL_ACCESS as string
  });
  const posts = await client.getEntries({
    content_type: 'blogPost',
    select: 'fields.slug,fields.category,fields.title,fields.thumbnail'
  });
  return{
    props:{
      posts
    },
    revalidate: 60
  };
};