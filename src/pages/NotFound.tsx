
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="wedding-container py-20">
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-6xl font-serif mb-6">404</h1>
          <p className="text-xl text-wedding-light mb-8">Oops! Page not found</p>
          <Link to="/" className="btn">
            RETURN TO HOME
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
