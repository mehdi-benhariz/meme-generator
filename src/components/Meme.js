import React from 'react';

const Meme = ({template,settemplate}) => {
    return ( 
<React.Fragment>
<img src={template.url} 
                 alt={template.name} 
                 height='300'
                 width="400"
                 onClick={()=>settemplate(template)}
        
                 />

</React.Fragment>

     );
}
 
export default Meme;