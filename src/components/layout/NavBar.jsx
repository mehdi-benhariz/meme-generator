import React from "react";

const NavBar = () => {
  return (
    <nav class="bg-blue-400 shadow mb-16" role="navigation">
      <div class="container mx-auto p-2 flex flex-wrap items-center md:flex-no-wrap">
        <div class="mr-4 md:mr-8">
          <ul >
            <li class="inline-block align-middle" >
              <a href="/" rel="home">
                <h2 class="text-white font-bold  ">Memes For Life :) </h2>
              </a>
            </li>
            <li  class="inline-block align-middle pr-2 right-2 md:absolute lg:absolute ">
              <a href="/https://www.linkedin.com/in/mehdi-ben-hariz/" target="_blanked" >
                <h2 class="text-white font-bold">
                  Know more about me!
                </h2>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
