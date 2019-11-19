import React, { useState, useEffect } from "react";
import "./App.css";
import { Meme } from "./components/Meme";

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    );
  }, []);

  return (
    <div class="container">
      {template && (
        <form
          onSubmit={e => {
            e.preventDefault();
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
