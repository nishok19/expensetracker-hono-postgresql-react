export default function Login() {
  return (
    <div className="h-full bg-gray-400 dark:bg-gray-900">
      {/* <!-- Container --> */}
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          {/* <!-- Row --> */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* <!-- Col --> */}
            <div
              className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1514151458560-b9d0291a8676?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundPosition: "center",
                // backgroundSize: "cover",
                height: "75vh",
              }}
            ></div>
            {/* <!-- Col --> */}
            <div className="w-full h-full flex flex-col items-center lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <div className="min-h-full w-full flex flex-col items-center justify-center">
                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                  Sign In
                </h3>
                {/*  */}
                <form
                  action=""
                  className="w-full flex flex-col items-center justify-start"
                >
                  <div className="w-full h-44 flex flex-col items-center justify-around">
                    <a
                      href="/api/login"
                      className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                    >
                      <img
                        className="max-w-[25px]"
                        src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                        alt="Google"
                      />

                      <span className="ml-4">Sign Up with Google</span>
                      {/* <div>
                        You have to Login!!!
                        <a href="/api/login"> Click here to Login</a>
                      </div> */}
                    </a>
                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                      <img
                        className="max-w-[25px]"
                        src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                        alt="Google"
                      />

                      <span className="ml-4">Sign Up with Google</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
