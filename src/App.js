import "./App.css";
import { Footer } from "./components";
import { LandingPage } from "./pages";
// import Mockman from "mockman-js";

function App() {
  return (
    <div className="pagewrap">
      <LandingPage />
      <Footer />
      {/* <Mockman colorScheme="dark" /> */}
    </div>
  );
}

export default App;
