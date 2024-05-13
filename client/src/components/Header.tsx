import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Open Studio</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              {" "}
              <Link
                to="/my-bookings"
                className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                My Classes
              </Link>{" "}
              <Link
                to="/my-studios"
                className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                My Studios
              </Link>
              <Link
                to="/sign-out"
                className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
