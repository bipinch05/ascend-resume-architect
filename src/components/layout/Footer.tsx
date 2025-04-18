
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-resume-blue text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="flex items-center justify-center gap-1">
          Built with <Heart className="h-4 w-4 text-red-500" /> by Ascend Resume Architect
        </p>
        <p className="text-sm mt-1 text-gray-300">
          © {new Date().getFullYear()} Ascend Resume Architect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
