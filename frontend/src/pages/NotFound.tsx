import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-5xl font-serif font-semibold mb-6">404</h1>
      <h2 className="text-3xl font-serif mb-4">Page Not Found</h2>
      <p className="text-villa-700 mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Button asChild>
        <Link to="/">Return to Homepage</Link>
      </Button>
    </div>
  );
};

export default NotFound;
