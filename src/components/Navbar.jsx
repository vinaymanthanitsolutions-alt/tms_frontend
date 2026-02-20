import { IconMailFilled } from "@tabler/icons-react";
import { IconBellFilled } from "@tabler/icons-react";
import { User } from 'lucide-react';
export default function Navbar() {
  return (
    <nav className="py-4 border-b-2 border-gray-200 w-full flex justify-end items-center gap-4 pr-5 ">
      <div className="flex gap-4 ">
        <IconMailFilled className="text-gray-600 w-5 h-5" />
        <IconBellFilled className="text-gray-600 w-5 h-5" />
      </div>
      <div className="border-r-[0.5px] border-gray-200 h-5"></div>
      <div className="rounded-full bg-black p-2">
          <User className="text-white w-5 h-5" />
      </div>
   </nav>
  );
}
