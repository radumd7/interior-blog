import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Image from 'next/image';
import Section from '../components/Pages/Homepage/Section';

const Home = ({ posts }: InferGetServerSidePropsType< typeof getServerSideProps >) => {
  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
        const source = 'https:' + node.data.target.fields.file.url;
        const alt = node.data.target.fields.title;
        return(
          <div
            style={{
              position: 'relative',
              width: '400px',
              height: '400px'
            }}
          >
            <Image
              src={source}
              alt={alt}
              layout='fill'
            />
          </div>
        );
      }
    }
  };
  return (
    <div>
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
        <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/40'>
          <h1 className='text-center text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white uppercase select-none font-roboto'>The inspiration<br/>you deserve.</h1>
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
          title='Kitchen Inspiration'
        />
      </div>
    </div>
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