import React, { useState, useEffect } from "react";
import "./App.css";
import { Meme } from "./components/Meme";

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return '?' + params.join('&');
};

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://cors-anywhere.herokuapp.com/http://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    );
  }, []);

  if (meme) {
    return (<div className="custom-meme">
      <img src={meme} alt="Your Custom Meme" style={{width:800, height:800}}/>
    </div>
  );
  }
  return (
    <div className="container">
      {template && (
        <form
          onSubmit={async e => {
            e.preventDefault();

            const params = {
              template_id: template.id,
              text0: topText,
              text1: bottomText,
              username: process.env.REACT_APP_IMGFLIP_USERNAME,
              password: process.env.REACT_APP_IMGFLIP_PASSWORD
            };
            const response = await fetch(
              `https://cors-anywhere.herokuapp.com/https://api.imgflip.com/caption_image${objectToQueryParam(params)}`,
              {}
            );
            const json = await response.json();
            setMeme(json.data.url)
          }}
        >
          <Meme template={template} />
          <input
            placeholder="Top Text"
            value={topText}
            onChange={e => setTopText(e.target.value)}
          />
          <input
            placeholder="Bottom Text"
            value={bottomText}
            onChange={e => setBottomText(e.target.value)}
          />
          <button type="submit">Create Meme</button>
        </form>
      )}
      {!template && (
        <>
          <h1>Choose a Meme Template</h1>
          {templates.map(template => {
            return (
              <Meme
                template={template}
                onClick={() => {
                  setTemplate(template);
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
