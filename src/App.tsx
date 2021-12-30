import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import { Error } from '@/components/Error';
import { Loader } from '@/components/Loader';
import { useDApp } from '@/providers/dapp';
import { getError, getLoggedIn } from '@/store/app';
import { Image } from '@/views/Image';
import { Login } from '@/views/Login';
import { Upload } from '@/views/Upload';

export const App: React.FC = () => {
  const error = useSelector(getError);
  const loggedIn = useSelector(getLoggedIn);
  const { available, login } = useDApp();
  const [isReady, setReady] = useState(false);
  const location = useLocation();

  const init = async (): Promise<void> => {
    if (available) {
      await login();
    }

    window.setTimeout(() => setReady(true), available ? 0 : 1000);
  };

  useEffect(() => {
    if (window.location.href.match(/[^\/]#/)) {
      const newUrl = window.location.href.replace('#', '/#');
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location]);

  useEffect(() => {
    (async (): Promise<void> => await init())();
  }, []);

  return error ?
    <Error /> :
    isReady ?
      <Routes>
        <Route path={'/image/:owner/:uuid'} element={<Image />}/>
        <Route path={''} element={loggedIn ? <Upload /> : <Login />}/>
      </Routes> :
      <Loader />;
};
