import express from "express";
import { renderToNodeStream } from "react-dom/server";
import React from "react";
import Hello from "../src/Hello";
import path from "path";
import fs from "fs";
import { StaticRouter } from "react-router-dom/server";

const app = express();
const PORT = 3000;

const html = fs.readFileSync("./public/index.html").toString();

const htmlParts = html.split("not rendered");

app.use("static", express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
  res.write(htmlParts[0]);
  const staticContext = {};
  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContext}>
      <Hello />
    </StaticRouter>
  );
  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.status(staticContext.statusCode || 200);
    res.write(htmlParts[1]);
    res.end();
  });
  //   const component = renderToString(<Hello />);
  //   const html = `
  //         <!doctype html>
  //         <html lang="en">
  //             <head>
  //                 <meta charset="utf-8">
  //                 <title>React App from Scratch</title>
  //                 <meta name="description" content="React App from Scratch">
  //                 <meta name="author" content="Paul Chon">
  //                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //             </head>
  //             <body>
  //                 <div id="root">${component}</div>
  //                 <h2>hello paul</h2>
  //                 <script src="./static/bundle.js"></script>
  //             </body>
  //         </html>
  //     `;
  //   res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server now listening at http://localhost:${PORT}`);
});
