import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // Load the auth. user
  const { isAuthenticated, isLoading } = useUser();
  // If there is no auth user, redirect to the login
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) {
        navigate('/login');
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  // While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // If there is a user, render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
