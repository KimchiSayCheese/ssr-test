import { hydrate } from "react-dom";
import React from "react";
import Hello from "./Hello";

hydrate(<Hello />, document.getElementById("root"));
