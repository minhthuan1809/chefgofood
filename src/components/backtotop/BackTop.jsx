import { MdOutlineVerticalAlignTop } from "react-icons/md";

const BackTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="absolute bottom-4 right-4">
        <div
          onClick={scrollToTop}
          className="text-white rounded-full w-[3rem] h-[3rem] flex items-center justify-center cursor-pointer hover:bg-gray-700 transition duration-300"
        >
          <MdOutlineVerticalAlignTop />
        </div>
      </div>
    </div>
  );
};

export default BackTop;
