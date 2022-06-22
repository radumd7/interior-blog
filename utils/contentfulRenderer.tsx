import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Image from 'next/image';

export const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
        const source = 'https:' + node.data.target.fields.file.url;
        const alt = node.data.target.fields.title;
        return(
          <div className="contentful_image_container">
            <Image
              src={source}
              alt={alt}
              layout='fill'
              objectFit="cover"
            />
          </div>
        );
      }
    }
  };