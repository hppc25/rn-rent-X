import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { LoadAnimation } from '../components/LoadAnimation';
import { useAuth } from '../hooks/auth';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { CarDTO } from '../dtos/CarDTO';

export type RootStackParamList = {
  SignUpFirstStep: {} | undefined;
  SignUpSecondStep: {} | undefined;
  SignIn: {} | undefined;
  Splash: undefined;
  Home: {} | undefined;
  CarDetails: {car: CarDTO};
  Scheduling: {car: CarDTO};
  SchedulingDetails: {} | undefined;
  Confirmation:{} | undefined;
  MyCars: undefined;
  Profile: undefined;
};



export function Routes(){
  const { user, loading } = useAuth();

  return (
    loading ? <LoadAnimation /> :
    <NavigationContainer>
      { (user && user.id) ? <AppTabRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  );
}