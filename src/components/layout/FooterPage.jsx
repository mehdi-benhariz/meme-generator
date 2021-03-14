import React from "react";
const FooterPage = () => {
  return (
    <footer class="flex flex-wrap justify-center bg-blue-200 mt-2 shadow-lg p-6 static bottom-0">
      <div class="flex flex-wrap mb-4 w-full">
        <div class="w-full sm:w-1/2 md:w-1/2 lg:w-  2/3 pr-4 ">
          <h3 class="text-3xl py-4">About Us</h3>
          <p>
            i'm an ambitous and hardworker tunisian software engineer aiming to
            enhance my level,non-stop learner!
          </p>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
          <h3 class="text-3xl py-4">Cantact me</h3>
          <form action="#">
            <div class="mb-4">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
focus:bg-white focus:border-blue-500"
                id="inline-full-name"
                type="text"
                placeholder="Email"
              />
            </div>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>{" "}
    </footer>
  );
};

export default FooterPage;
