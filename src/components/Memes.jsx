import React, { useState, useEffect } from "react";
import { usePaginatedQuery } from "react-query";
import Meme from "./Meme";

const objectToqueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

const Memes = ({ page, setpage }) => {
  const [templates, settemplates] = useState()
  const [template, settemplate] = useState(null)
  const [topText, settopText] = useState("")
  const [bottomText, setbottomText] = useState("")
  const [meme, setmeme] = useState(null)
const [boxes, setboxes] = useState([])

  const input = `bg-gray-200 rounded w-auto px-3 py-1 hover:shadow-xl transform ease-linear duration-150 
  focus:bg-white border-transparent focus:border-blue-400 border-2 outline-none w-full mb-2 mr-4`;

  useEffect(() => {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((x) => x.json())
      .then((res) => settemplates(res.data.memes));

  }, []);

  const fetchMeme = async (key, page) => {
    const res = await fetch(`https://api.imgflip.com/get_memes`);
    return res.json();
  };
  let { resolvedData, latestData, status } = usePaginatedQuery(
    ["Meme", page],
    fetchMeme,
    {
      staleTime: 2000,
      cacheTime: 50000,
    }
  );

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      template_id: template.id,
      text0: topText,
      text1: bottomText,
      username: process.env.REACT_APP_IMGFLIP_USERNAME,
      password: process.env.REACT_APP_IMGFLIP_PASSWORD,
    };
    const res = await fetch(
      `https://api.imgflip.com/caption_image${objectToqueryParam(params)}`
    );

    const data = await res.json();
    setmeme(data.data.url);
  };
  //download the meme
  const download = (e) => {
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ///////////////////
  const returnOriginal = () => settemplate(null);
  //////////////////
  if (meme) {
    return (
      <div style={{ textAlign: "center" }}>
        <img src={meme} style={{ width: "200" }} />
        <a href={meme} onClick={download}>
          <button class="rounded bg-green-300 py-2 px-4">Download </button>
        </a>
      </div>
    );
  }
  return (
    <div>
      {status === "error" && <div> error</div>}
      {status === "loading" && <div class="text-xl text-gray-400 font-bold" > loading....</div>}
      {status === "success" && (
        <div>
          {template && (
            <form onSubmit={handleSubmit}>
              <button
                onClick={returnOriginal}
                class="bg-red-400 py-2 px-4 rounded text-lg font-bold text-white hover:bg-red-600 ml-3"
              >
                Return{" "}
              </button>
              <Meme template={template} />
              <div class={`grid grid-rows-${template.box_count}`}>
            
              {[...Array(template.box_count+1).keys()].slice(1).map((i) => {
                console.log(i)
                return (
                  <input
                    class={input}
                    label="buttom text"
                    onChange={(e) => setbottomText(e.target.value)}
                    id="input"
                  />
                );
              })}
               </div>

              <button
                type="submit"
                class="bg-blue-400 py-2 px-4 rounded text-lg font-bold text-white hover:bg-blue-600 ml-3 mb-2"
              >
                Create Meme
              </button>
            </form>
          )}
          {resolvedData.success &&
            resolvedData.data.memes.map((template) => {
              console.log(resolvedData.data.memes)
              return (
                <div   onClick={()=> settemplate(template)}
                >
                <Meme
                  key={template.id}
                  template={template}
                  returnOriginal={returnOriginal}
                />
                </div>

              );
            })}
        </div>
      )}
    </div>
  );
};

export default Memes;
