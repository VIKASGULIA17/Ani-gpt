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



// import { Button } from "@/components/ui/button";
// import { Menu } from "@/components/ui/menu";

// const Navbar = () => {
//   return (
//     <nav className="nav flex items-center justify-between bg-white shadow-md px-4 py-3 lg:px-8">
//       <Menu>
//         <Menu.Button className="lg:hidden">
//           <img src="/menu-icon.svg" alt="Menu Icon" className="w-7 h-7" />
//         </Menu.Button>
//         <Menu.Items className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg">
//           <Menu.Item>
//             {({ active }) => (
//               <a
//                 className={`${
//                   active ? "bg-blue-500 text-white" : "text-gray-900"
//                 } block px-4 py-2 text-sm`}
//                 href="/"
//               >
//                 Home
//               </a>
//             )}
//           </Menu.Item>
//           <Menu.Item>
//             {({ active }) => (
//               <a
//                 className={`${
//                   active ? "bg-blue-500 text-white" : "text-gray-900"
//                 } block px-4 py-2 text-sm`}
//                 href="/about"
//               >
//                 About
//               </a>
//             )}
//           </Menu.Item>
//         </Menu.Items>
//       </Menu>
//       <p className="text-lg font-semibold text-gray-800">Ani-GPT</p>
//       <Button variant="ghost" className="rounded-full">
//         <img
//           className="w-8 h-8 lg:w-12 lg:h-12 rounded-full border border-gray-300"
//           src="/user-icon.svg"
//           alt="User Icon"
//         />
//       </Button>
//     </nav>
//   );
// };

// export default Navbar;
