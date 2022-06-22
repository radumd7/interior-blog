import Image from "next/image";
import React from "react";

interface BlockSectionProps {
    sectionContent: {
        image: {
            alt: string;
            url: string;
        };
        title: string;
        paragraph: string;
    };
    sectionCount: number;
    isLast: boolean;
};
const BlockSection: React.FC<BlockSectionProps> = ({
    sectionContent,
    sectionCount,
    isLast
}) => {
    return(
        <>
            <section className="flex flex-col py-4 lg:py-10">
                <div className="aspect-w-16 aspect-h-9 relative shadow-md">
                    <Image
                        src={sectionContent.image.url}
                        alt={sectionContent.image.alt + ' | The Savinterior.'}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="px-4">
                    <h2 className="font-serif text-blue-900">
                        <span className="text-5xl">{sectionCount.toString() + '. '}</span>
                        {sectionContent.title}
                    </h2>
                    <p>{sectionContent.paragraph}</p>
                </div>
            </section>
            {!isLast && <hr/>}
        </>
    );
};
export default BlockSection;