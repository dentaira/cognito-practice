import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

type PrivateRouteProps = {
    children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;