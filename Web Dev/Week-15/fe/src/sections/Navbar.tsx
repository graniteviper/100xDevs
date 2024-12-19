import { HiAcademicCap } from "react-icons/hi";
import Button from "../components/Button";
import { PiPlusBold } from "react-icons/pi";

const Navbar = () => {
  return (
    <div className="w-screen flex items-center justify-between sm:justify-around mt-5">
      <div className="ml-5 cursor-pointer">
        <HiAcademicCap className="h-10 w-10" />
      </div>
      <Button
        icon={<PiPlusBold />}
        title="Add Content"
        variant="primary"
        className="px-3 py-1 mr-5"
      />
    </div>
  );
};

export default Navbar;
