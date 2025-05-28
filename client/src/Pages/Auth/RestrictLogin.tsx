import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../Redux/store';


interface PublicRouteProps {
  redirectPath?: string;
}

const RestrictLogin: React.FC<PublicRouteProps> = ({ redirectPath = '/dashboard' }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default  RestrictLogin;
