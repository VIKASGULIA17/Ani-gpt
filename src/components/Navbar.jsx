import { assets } from "../assets/assets";




const Navbar = () => {
  return (
    <div className="nav flex items-center justify-between text-xl lg:text-2xl p-2 lg:p-5 text-gray-600">
      <img src={assets.menu_icon} className="w-7 h-7 lg:hidden" alt="" />
      <p>Ani-gpt</p>
      <img
        className="h-8 w-8  border-[1px]  lg:w-12 lg:h-12 lg:border-2 border-black rounded-full"
        src={assets.user_icon}
        alt="User Icon"
      />
    </div>
  );
};

export default Navbar;
