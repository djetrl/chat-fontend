import { useLocation, Navigate } from "react-router-dom";

export default function RequireAuth({ children , isAuth}) {
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  } else {
    return children;
  }
}