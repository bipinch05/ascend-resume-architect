
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resumeStore";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const resetStore = useResumeStore((state) => state.resetStore);
  
  return (
    <header className="bg-resume-blue text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-xl font-bold">Ascend Resume Architect</h1>
        </Link>
        
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white/10"
            onClick={() => resetStore()}
          >
            New Resume
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
