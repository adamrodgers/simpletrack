import Image from "next/image";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const UserProfile = ({ user, isAdmin }) => (
  <div className="relative flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 bg-indigo-50 text-indigo-600 dark:bg-sky-900 dark:text-sky-50">
    {isAdmin && <ShieldCheckIcon className="absolute top-0 left-0 w-4 h-4 text-yellow-500" />}
    <Image src={user.image} alt={user.name} width={24} height={24} className="w-6 h-6 mx-auto rounded-full mb-2" />
    <small className="text-center text-xs font-medium">{user.name.split(" ")[0]}</small>
  </div>
);

export default UserProfile;
