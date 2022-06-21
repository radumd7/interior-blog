import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Image from 'next/image';

export const renderOptions = {
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