export const blogSectionFormat = (nodes: any) => {
    if(!nodes){
        return null;
    };
    let sections: any[] = [];
    for(let i = 0; i < nodes.length; i++){
        if(nodes[i].nodeType === 'hr'){
            let chunk = nodes.slice(i-3, i);
            let section = {} as any;
            chunk.map((node: any, i: number) => {
                if(node.nodeType === 'embedded-asset-block'){
                    section.image = {
                        url: 'https:'+node.data.target.fields.file.url,
                        alt: node.data.target.fields.title
                    };
                };
                if(node.nodeType === 'heading-2'){
                    section.title = node.content[0].value;
                };
                if(node.nodeType === 'paragraph'){
                    section.paragraph = node.content[0].value;
                };
                if(section.image && section.title && section.paragraph){
                    sections.push(section);
                    section = {};
                };
            });
        };
        if(isBlockSection(nodes[i])){
            sections.push({
                type: 'block-section',
                image: {
                    url: 'https:' + nodes[i].data.target.fields.image.fields.file.url,
                    alt: nodes[i].data.target.fields.image.fields.title.split(' ').map((word: string) => word[0].toUpperCase() +word.slice(1)).join(' ')
                },
                title: nodes[i].data.target.fields.title.split(' ').map((word: string) => word[0].toUpperCase() +word.slice(1)).join(' '),
                paragraph: nodes[i].data.target.fields.paragraph
            });
        };
    };
    return sections;
};

function isBlockSection(node: any) {
    if(node.nodeType === "embedded-entry-block" && node.data.target.sys.contentType.sys.id === 'blogPostSection'){
        return true;
    };
    return false;
}