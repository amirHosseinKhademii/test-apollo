import { createRoot } from "react-dom/client";
import { Boot } from "./boot";
import "../styles/index.css";
const root = createRoot(document.getElementById("app") as HTMLElement);

root.render(<Boot />);
