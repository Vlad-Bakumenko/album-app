import "./App.css";
import { useState, useEffect, useRef } from "react";
import Album from "./Album";
import ReCAPTCHA from "react-google-recaptcha";

function App() {
  const [inputs, setInputs] = useState({});
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState([]);

  const fileInput = useRef(null);
  const recaptcha = useRef(null);

  useEffect(() => {
    getAlbums();
  }, [album]);

  async function getAlbums() {
    const response = await fetch(`${import.meta.env.VITE_API}/albums`);
    if (response.ok) {
      const data = await response.json();
      setAlbums(data);
    }
  }

  function handleChange(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const captcha = recaptcha.current.getValue();

    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("year", inputs.year);
    formData.append("artist", inputs.artist);
    formData.append("jacket", inputs.jacket);
    formData.append("captcha", captcha);

    setInputs({});
    fileInput.current.value = "";

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/add`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAlbum(data);
        alert(`added!`);
      } else {
        const { error } = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
    
    recaptcha.current.reset();
  }

  return (
    <>
      <h1>My Favorites</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="artist"
          onChange={handleChange}
          value={inputs.artist || ""}
          name="artist"
        />
        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          value={inputs.title || ""}
          name="title"
        />
        <input
          type="text"
          placeholder="year"
          onChange={handleChange}
          value={inputs.year || ""}
          name="year"
        />
        <input
          type="file"
          ref={fileInput}
          onChange={(e) => setInputs({ ...inputs, jacket: e.target.files[0] })}
          accept="image/*"
        />
        <div className="recaptcha">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_SITE_RECAPTCHA}
            ref={recaptcha}
          />
        </div>
        <button>Add</button>
      </form>
      <div className="albums">
        {!!albums.length &&
          albums.map((album) => (
            <Album
              key={album._id}
              album={album}
              getAlbums={getAlbums}
              inputs={inputs}
              setInputs={setInputs}
              setAlbum={setAlbum}
            />
          ))}
      </div>
    </>
  );
}

export default App;
