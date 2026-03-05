import { IconMailFilled } from "@tabler/icons-react";
import { IconBellFilled } from "@tabler/icons-react";
import { User } from "lucide-react";
import { Menu } from "lucide-react";
import manthanLogo from "/manthanlogo.png";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <nav className="py-4 border-b-2 border-gray-200 w-full flex justify-start lg:justify-end items-center gap-4 pr-5 sticky top-0 bg-white border">
      <div className="lg:hidden flex gap-2 items-center ml-2">
        <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded transition"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        <img src={manthanLogo} alt="Manthan Logo" className="w-8 h-auto" />
        <div className="text-xl font-semibold">Manthan</div>
      </div>
      <div className="hidden lg:flex gap-4 ">
        <IconMailFilled className="text-gray-600 w-5 h-5" />
        <IconBellFilled className="text-gray-600 w-5 h-5" />
      </div>
      <div className="hidden lg:block border-r-[0.5px] border-gray-200 h-5"></div>
      <div className="rounded-full bg-black p-2 hidden lg:flex items-center justify-center">
        <User className="text-white w-5 h-5" />
      </div>
    </nav>
  );
};

export default Navbar;
