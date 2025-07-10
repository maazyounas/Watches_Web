import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-24 md:pt-36 max-w-5xl">
          {/* Vision Section */}
          <section className="mb-28 text-center">
            <div className="mb-12">
              <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
              <h1 className="text-5xl md:text-6xl font-light tracking-wide text-gray-900 font-serif">
                Our Vision
              </h1>
              <p className="text-xl text-amber-700 mt-6 tracking-wider uppercase font-light">
                Be proud to be unique
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed border-l-2 border-amber-600 pl-6 py-2">
                We believe every person deserves to express their individuality. 
                Our creations celebrate your uniqueness through thoughtfully 
                crafted pieces that reflect your personal essence.
              </p>
            </div>
          </section>

          {/* Inspired by Humans Section */}
          <section className="mb-28">
            <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-xl p-12 border border-amber-100 shadow-sm">
              <h2 className="text-4xl font-serif font-light text-gray-800 text-center italic">
                <span className="text-5xl leading-none text-amber-600 mr-2">"</span>
                Inspired by humans.<br />
                Personalised by nature.
                <span className="text-5xl leading-none text-amber-600 ml-2">"</span>
              </h2>
            </div>
          </section>

          {/* Enjoy Your Time Section */}
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <img
                  src="/pictures/enjoy.jpeg"
                  alt="Enjoy your time"
                  className="w-full h-auto rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
                />
                <div className="absolute -inset-4 border border-amber-200 rounded-xl z-[-1]"></div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-serif font-light text-gray-900 mb-6">
                Enjoy your time
              </h2>
              <p className="text-gray-600 leading-relaxed space-y-4">
                <span className="block">
                  In our accelerating world of endless choices and constant stimulation, 
                  we design sanctuaries for reflection.
                </span>
                <span className="block">
                  Each piece serves as a tactile reminder to pause, breathe, and reconnect 
                  with what truly matters - accompanied by your personal fragment of nature.
                </span>
              </p>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};

export default About;