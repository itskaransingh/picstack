export default {
    name:"post",
    title:"Post",
    type:"document",
    fields:[
        {
            name:"title",
            title:"Title",
            type:"string"
        },
        {
            name:"about",
            title:"About",
            type:"string"
        },
        {
            name:"dest",
            title:"Destination",
            type:"url"
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
          },
        {
            name:"image",
            title:"Image",
            type:"image",
            options:{
                hotspot:true,
            }
        },
        {
            name:"userid",
            title:"UserID",
            type:"string"
        },
        {
            name:"postedBy",
            title:"Posted By",
            type:"postedBy"
        },
        {
            name:"like",
            title:"Like",
            type:"array",
            of:[{type:'like'}],
        },
        {
            name:"comments",
            title:"Comments",
            type:"array",
            of:[{type:'comments'}]
        },
        
    ]
}