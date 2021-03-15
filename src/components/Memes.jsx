import React, { useState, useEffect } from "react";
import { usePaginatedQuery } from "react-query";
import Meme from "./Meme";

const Memes = ({ page, setpage }) => {
  const [templates, settemplates] = useState([]);
  const [template, settemplate] = useState(null);
  const [meme, setmeme] = useState(null);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);

  const input = `bg-gray-200 rounded w-auto px-3 py-1 hover:shadow-xl transform ease-linear duration-150 
  focus:bg-white border-transparent focus:border-blue-400 border-2 outline-none w-full mb-2 mr-4`;

  useEffect(() => {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((x) => x.json())
      .then((res) => settemplates(res.data.memes));
  }, []);

  //a function to fetch meme
  const fetchMeme = async (key, page) => {
    const res = await fetch(`https://api.imgflip.com/get_memes`);
    return res.json();
  };
  //using hook to fetch memes
  let { resolvedData, status } = usePaginatedQuery(
    ["Meme", page],
    fetchMeme,
    {
      staleTime: 2000,
      cacheTime: 50000,
    }
  );

  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) return text;
        else return c;
      })
    );
  };

  const generateMeme = (e) => {
    e.preventDefault();
    const currentMeme = templates[memeIndex];
    const formData = new FormData();

    formData.append("username", process.env.REACT_APP_IMGFLIP_USERNAME);
    formData.append("password", process.env.REACT_APP_IMGFLIP_PASSWORD);
    formData.append("template_id", currentMeme.id);
  
        captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));
        fetch("https://api.imgflip.com/caption_image", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setmeme(data?.data?.url)});


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
  //return to meme list
  const returnOriginal = () => settemplate(null);
  //reset captions
  useEffect(() => {
    if (templates.length)
      setCaptions(Array(templates[memeIndex].box_count).fill(""));
  }, [memeIndex, templates]);

  if (meme) {
    return (
      <div style={{ textAlign: "center" }}>
        <img src={meme} style={{ width: "200" }} alt="a meme " />
        <a href={meme} onClick={download}>
          <button class="rounded bg-green-300 py-2 px-4 text-lg font-normal text-white hover:bg-green-500 duration-200 ease-linear ">Download </button>
        </a>
      </div>
    );
  }

  return (
    <div>
      {status === "error" && <div> error</div>}
      {status === "loading" && (
        <div class="text-xl text-gray-400 font-bold"> loading....</div>
      )}
      {status === "success" && (
        <div>
          {template && (
            <form onSubmit={generateMeme}>
              <button
                onClick={returnOriginal}
                class="bg-red-400 py-2 px-4 mb-2 rounded text-lg font-bold text-white hover:bg-red-600 ml-3"
              >
                Return{" "}
              </button>
              <Meme template={template} />
              <div class={`grid grid-rows-${template.box_count}`}>
                {[...Array(template.box_count + 1).keys()].slice(1).map((i) => {
                  return (
                    <input
                    key={i}
                      class={input}
                      label="buttom text"
                      onChange={(e) => updateCaption(e, i-1)}
                      id="input"
                    />
                  );
                })}
              </div>

              <button
                type="submit"
                class="bg-blue-400 py-2 px-4 rounded text-lg font-bold text-white hover:bg-blue-600 ml-3 mb-2"
                onClick={(e) => generateMeme(e)}
              >
                Create Meme
              </button>
            </form>
          )}
          {!template &&
            resolvedData.data.memes.map((template, i) => {
              return (
                <div
                  onClick={() => {
                    settemplate(template);
                    setMemeIndex(i);
                  }}
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
///aux
