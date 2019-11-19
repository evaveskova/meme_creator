import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then(x =>
      x.json().then(response => setTemplates(response.data.memes)));
  }, [])

  return (
    <div>{
      templates.map(template => {
        return (
          <img key={template.id} src={template.url} alt={template.name} />
        )
      })
    }
    </div>
  );
}

export default App;
