import Button from "../components/Button";

const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center px-4 sm:px-6 md:px-8">
      <div className="h-[80%] w-full max-w-4xl text-center p-6 sm:p-8 flex flex-col justify-center items-center">
        
        {/* Logo Section */}
        <div className="flex justify-center xl:mb-6 mb-2">
          <svg
            width="73"
            height="72"
            viewBox="0 0 73 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_1054)">
              <path
                d="M9.5 30H42.5V36H9.5V30ZM9.5 24H42.5V18H9.5V24ZM9.5 48H30.5V42H9.5V48ZM54.53 38.61L56.66 36.48C57.83 35.31 59.72 35.31 60.89 36.48L63.02 38.61C64.19 39.78 64.19 41.67 63.02 42.84L60.89 44.97L54.53 38.61ZM52.4 40.74L36.5 56.64V63H42.86L58.76 47.1L52.4 40.74Z"
                fill="#7C8181"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_1054">
                <rect width="72" height="72" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Title and Description */}
        <div className="mb-6">
          <h1 className="pt-7 text-[2.6rem] font-semibold sm:text-[2rem]">Sentence Construction</h1>
          <p className="pt-1 text-md text-[#7C8181] sm:text-base">
            Select the correct words to complete the sentence by arranging the provided options in the right order.
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats py-6 sm:py-8 flex flex-wrap sm:flex-nowrap justify-center gap-6">
          <div className="left px-10 py-3 w-full sm:w-auto">
            <h2 className="text-[1.25rem] pb-3">Time Per Question</h2>
            <p className="text-[#7C8181] text-lg">30 seconds</p>
          </div>
          <div className="middle xl:border-r-1 xl:border-l-1 border-gray-300 px-10 py-3 w-full sm:w-auto">
            <h2 className="text-[1.25rem] pb-3">Total Questions</h2>
            <p className="text-[#7C8181] text-lg">10</p>
          </div>
          <div className="right px-10 py-3 w-full sm:w-auto">
            <h2 className="text-[1.25rem] pb-3">Coins</h2>
            <div className="text-[#7C8181] flex items-center justify-center gap-2 text-lg">
              <div className="w-4 h-4 rounded-full bg-[#f8ce00] border-yellow-400 border-2 coin-spin"></div>0 coins
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button text="Back" link="/" buttonCSS="first" />
          <Button text="Start" link="/examination" buttonCSS="second" />
        </div>
      </div>
    </div>
  );
};

export default Home;
