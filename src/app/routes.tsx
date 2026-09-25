import { createHashRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { People } from "./components/People";
import { Datasets } from "./components/Datasets";
import { Publications } from "./components/Publications";
import { Blog } from "./components/Blog";
import { Connect } from "./components/Connect";
import { NotFound } from "./components/NotFound";

// Hash-based routes keep every page refresh-safe on GitHub Pages, which does
// not provide the server-side fallback required by browser-history routes.
export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "people", Component: People },
      { path: "datasets", Component: Datasets },
      { path: "publications", Component: Publications },
      { path: "blog", Component: Blog },
      { path: "connect", Component: Connect },
      { path: "*", Component: NotFound },
    ],
  },
]);
