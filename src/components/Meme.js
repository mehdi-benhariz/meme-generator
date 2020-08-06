import React from 'react';
import { usePaginatedQuery} from 'react-query';


const Meme = ({page,setpage}) => {
    const fetchMeme = async (key,page) => {
        const res = await fetch(`https://api.imgflip.com/get_memes`);
        return res.json();
      }
      const {  resolvedData,
        latestData,
        status  } =  usePaginatedQuery(["Meme",page],fetchMeme ,{
        staleTime:2000,
        cacheTime:50000
    } );
    console.log(resolvedData)
    return ( 
        <div>
             <h1>Meme</h1>
        {status === "error" && (<div> error</div>) }
        {status === "loading" && (<div> loading....</div>) }
        {status === "success" && (<div> 
            {
                 <img src={resolvedData.data.memes[page].url} 
                 alt={resolvedData.data.memes[page].name} 
                 height={resolvedData.data.memes[page].height}
                 width={resolvedData.data.memes[page].width}
                 />
                 }
                 

                </div>
                )}
        </div>
       
     );
}
 
export default Meme;