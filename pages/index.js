import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";

async function getIcons(url) {
  const response = await axios(
    "https://cors-anywhere.thecodeblog.net/" + url
  ).catch((e) => {
    console.error(e);
  });
  if (!response) return [];
  const { data } = await response;
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, "text/html");

  var links = doc.getElementsByTagName("link");
  var icons = [];

  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var rel = link.getAttribute("rel");
    if (rel) {
      if (rel.toLowerCase().indexOf("icon") > -1) {
        var href = link.getAttribute("href");
        if (href) {
          if (
            href.toLowerCase().indexOf("https:") == -1 &&
            href.toLowerCase().indexOf("http:") == -1 &&
            href.indexOf("//") != 0
          ) {
            var absoluteHref = "https://" + url.split("/")[0];

            if (href.indexOf("/") == 0) {
              absoluteHref += href;
            } else {
              var path = window.location.pathname.split("/");
              path.pop();
              var finalPath = path.join("/");

              absoluteHref += finalPath + "/" + href;
            }

            icons.push(absoluteHref);
          } else if (href.indexOf("//") == 0) {
            var absoluteUrl = window.location.protocol + href;

            icons.push(absoluteUrl);
          } else {
            icons.push(href);
          }
        }
      }
    }
  }

  return icons;
}

function App() {
  const [icons, setIcons] = useState([]);
  const [resultIcons, setResultIcons] = useState([]);
  const [url, setUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // useEffect(() => {
  //   setIcons([]);
  //   getIcons(url.split("://").pop() || "").then(setIcons);

  //   return () => {};
  // }, [url]);

  // useEffect(() => {
  //   setResultIcons([]);
  //   getIcons(resultUrl.split("://").pop() || "").then(setResultIcons);
  // }, [resultUrl]);

  function getShortenedURL() {
    setResultUrl("Generating...")
    fetch("./api/url/add", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((json) => {
            setUrl("");
            setResultUrl(json.shortUrl);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="bg-zinc-800 w-full h-screen flex flex-col items-center justify-center font-['Jetbrains_Mono']">
      <h1 className="text-yellow-400 text-3xl mb-8 flex items-center gap-4">
        <Icon
          icon="uil:link"
          className="w-8 h-8 stroke-[0.4px] stroke-yellow-400"
        />
        URL SHORTENER
      </h1>
      <div className="flex">
        <div
          style={{
            clipPath: "polygon(0 0, 100% 0, 93.1% 100%, 0% 100%)",
          }}
          className="border-2 border-yellow-400 bg-yellow-400"
        >
          <div
            style={{
              clipPath: "polygon(0 0, 99.7% 0%, 93.14% 100%, 0% 100%)",
            }}
            className="bg-zinc-800 px-4 h-16 w-[36rem] flex items-center justify-center gap-3"
          >
            {icons[0] ? (
              <img src={icons[0]} className="h-7 w-7" />
            ) : (
              <div className="w-7 h-7 flex items-center justify-center">
                <Icon
                  icon="uil:link"
                  className="w-6 h-6 text-yellow-400 stroke-[0.4px] stroke-yellow-400"
                />
              </div>
            )}
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              className="bg-transparent flex-1 text-yellow-400 placeholder-slate-400 mr-8 focus:outline-none"
              placeholder="https://somewebsite.com"
            />
          </div>
        </div>
        <div
          style={{
            clipPath: "polygon(35% -2%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          className="border-2 border-yellow-400 bg-yellow-400 -ml-8"
        >
          <button
            type="button"
            onClick={getShortenedURL}
            style={{
              clipPath: "polygon(35% 0%, 100% 0%, 100% 100%, 1.6% 100%)",
            }}
            className="bg-yellow-400 h-16 w-28 flex items-center justify-center"
          >
            <Icon
              icon="uil:arrow-right"
              className="w-8 h-8 ml-4 text-zinc-800 stroke-[0.3px] stroke-yellow-400 mt-0.5"
            />
          </button>
        </div>
      </div>
      <h2 className="text-yellow-400 mt-8 text-xl">SHORTENED URL</h2>
      <div className="flex mt-3">
        <div
          style={{
            clipPath: "polygon(0 0, 100% 0, 93.1% 100%, 0% 100%)",
          }}
          className="border-2 border-yellow-400 bg-yellow-400"
        >
          <div
            style={{
              clipPath: "polygon(0 0, 99.7% 0%, 93.14% 100%, 0% 100%)",
            }}
            className="bg-zinc-800 px-4 h-16 w-[36rem] flex items-center justify-center gap-3"
          >
            {icons[0] ? (
              <img src={resultIcons[0]} className="h-7 w-7" />
            ) : (
              <div className="w-7 h-7 flex items-center justify-center">
                <Icon
                  icon="uil:copy"
                  className="w-6 h-6 text-yellow-400 stroke-[0.4px] stroke-yellow-400"
                />
              </div>
            )}
            <input
              disabled
              value={resultUrl}
              type="text"
              className="bg-transparent flex-1 text-yellow-400 placeholder-slate-400 mr-8 focus:outline-none"
              placeholder="https://url.thecodeblog.net/pte2w6z6fka"
            />
          </div>
        </div>
        <div
          style={{
            clipPath: "polygon(35% -2%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          className="border-2 border-yellow-400 bg-yellow-400 -ml-8"
        >
          <button
            type="button"
            onClick={() => {
              copy(resultUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            style={{
              clipPath: "polygon(35% 0%, 100% 0%, 100% 100%, 1.6% 100%)",
            }}
            className="bg-yellow-400 h-16 w-28 flex items-center justify-center pl-4 pt-0.5 font-medium"
          >
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
