// Entry point for the product stage: draws the demo component into #hero.
import { createRoot } from "react-dom/client"
import Demo from "./demo"

createRoot(document.getElementById("hero")).render(<Demo />)
