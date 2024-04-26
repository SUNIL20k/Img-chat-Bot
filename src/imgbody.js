import { useRef, useState, useEffect } from "react";
import ai from "./images/user-ico-removebg-preview.png";
import aico from "./images/ai-img-removebg-preview.png";

const Imgbody = ({ search, handleDel } ) => {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const data = useRef();
  const url = "https://source.unsplash.com/1600x800?";

  function image() {
    setLoading(true);
    const searchTerm = data.current.value.trim();
    const Data = data.current.value;
    const object = {
      ImgName: Data,
    };

    fetch("https://ai-bot-cbfb8-default-rtdb.firebaseio.com/ai-bot.json", {
      method: "POST",
      body: JSON.stringify(object),
    }).then(()=>{
      console.log(Data+" successfully added to database")
    })

    if (searchTerm) {
      const newImg = `${url}${searchTerm}`;
      const imgElement = new Image();

      imgElement.onload = () => {
        setSearches((prevSearches) => [
          ...prevSearches,
          { img: newImg, name: searchTerm },
        ]);
        setLoading(false);
      };

      imgElement.onerror = () => {
        setLoading(false);
        alert("Error fetching image, please try a different term.");
      };

      imgElement.src = newImg;
      data.current.value = "";
    } else {
      alert("Please enter a valid search term.");
      setLoading(false);
    }
  }

  // ------------------------------------------------------------------------------------------------------------------

  const text = "Give a Prompt to generate image";
  const speed = 80;
  const [commandText, setCommandText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setCommandText((prevText) => prevText + text.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCommandText("");
          setIndex(0);
        }, 1000);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [index]);

  //    ------------------------------------------------------------------------------------------------------------------
  
  
  return (
    <div className="right-side">
      <div className="chitti-right">
        <h3 className="version">Smart Pixel [Ai]</h3>
        <div
          className="alert alert-warning alert-dismissible fade show py-2"
          role="alert"
        >
          <strong className="warning">Warning!!</strong> Please do not search
          for adult content (18+).
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            style={{ padding: "12px 25px" }}
          ></button>
        </div>
        <div className="chat-box">
          <div className="chat-box-2">
          <h1 className="display-4 fw-bold intro">Hello, I'm Smart pixel</h1>
          <div className="command-prompt">
            <span id="command-text" className="display-5 fw-bold intro-2">
              {commandText}
            </span>
            <span id="cursor" className="cursor">
              &#x2588;
            </span>
          </div>
          <div className="imgs">
            {searches.map((search, index) => (
              <div className="message" key={index}>
                <div className="rev-box">
                  <div className="pro">
                    <img src={ai} className="profile"></img>
                  </div>

                  <div>
                    <h3
                      style={{
                        marginTop: "0px",
                        marginLeft: "25px",
                        marginBottom: "20px",
                        fontSize: "30px",
                        color: "white",
                      }}
                    >
                      user
                    </h3>
                    <p className="reverse">{search.name}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="pro">
                    <img src={aico} className="profile"></img>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <h3 className="text-white mb-3">
                      pixel <sup className="fs-6 mb-5"> [Ai]</sup>
                    </h3>
                    <div className="img-boxs">
                      <div className="img-box">
                        <div className="image-container">
                          <img src={search.img} alt={search.name} />
                        </div>
                      </div>
                      <a
                        href={search.img}
                        download={search.name || "image"}
                        className="download"
                      >
                        <i class="bi bi-download"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="fetch-spinner">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
          </div>

          <div className="input-feild alert1  alert-dismissible1">
            <input
              type="text"
              ref={data}
              placeholder="Enter image name EX: pig, dog"
            />
            <button onClick={image}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imgbody;
