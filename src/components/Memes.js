import React, { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import Meme from './Meme';
import { MDBInput, MDBBtn } from "mdbreact";


const Memes = ({ page, setpage }) => {
    const [templates, settemplates] = useState([]);
    const [template, settemplate] = useState(null);
    const [topText, settopText] = useState('');
    const [bottomText, setbottomText] = useState('');
    const [meme, setmeme] = useState(null)
    
    const fetchMeme = async (key, page) => {
        const res = await fetch(`https://api.imgflip.com/get_memes`);
        const jsonData = await res.json();
        settemplates(jsonData.data.memes);
    }
    useEffect(() => {
        fetchMeme();
    }, []);
    const objectToqueryParam = (obj) => {
        const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
        return '?' + params.join('&')
    
    }
    //submit form 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = {
            template_id: template.id,
            text0: topText,
            text1: bottomText,
            username: process.env.REACT_APP_IMGFLIP_USERNAME,
            password: process.env.REACT_APP_IMGFLIP_PASSWORD,
        }
        const res = await fetch(
            `https://api.imgflip.com/caption_image${objectToqueryParam(params)}`)

        const data = await res.json();
        setmeme(data.data.url)
    }
    //download the meme
    const download = e => {
        console.log(e.target.href);
        fetch(e.target.href, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.png"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
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
                <a href={meme} onClick={download} >
                    <MDBBtn color="" >Download  </MDBBtn>
                </a>
            </div>
        )
    }
    return (

        <div>
                {template && (
                    <form onSubmit={handleSubmit}  >

                        <MDBBtn onClick={returnOriginal} >Return </MDBBtn>
                        <Meme template={template} />
                        <MDBInput label="top text" onChange={e => settopText(e.target.value)} id="input" />
                        <MDBInput label="buttom text" onChange={e => setbottomText(e.target.value)} id="input" />
                        <MDBBtn type="submit" >Create Meme</MDBBtn>
                    </form>
                )}
                {!template && (
                    templates.map((template) => {
                        return (
                            <Meme key={template.id}
                                template={template}
                                returnOriginal={returnOriginal}
                                settemplate={settemplate}
                            />
                        );
                    })
                )}
            </div>
    );
}

export default Memes;