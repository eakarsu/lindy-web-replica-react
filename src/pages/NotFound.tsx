import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-[60vh] items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-4 text-xl text-gray-600">That page is outside the supported workflow.</p>
      <Link to="/" className="text-lindy-primary underline">Return to the overview</Link>
    </div>
  </div>
);

export default NotFound;
