import { Toaster } from "react-hot-toast";

import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";

const App = () => {
  return (
    <div className="bg-white dark:bg-[#0b1c22] dark:text-white lg:px-20">
      <Toaster />
      <Navbar />
      <div className="max-w-7xl mx-auto py-10 min-h-[85vh] mt-16">
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default App;
