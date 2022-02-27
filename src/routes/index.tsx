import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

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
};



export function Routes(){
  const { user } = useAuth();

  return (
    <NavigationContainer>
      { user.id ? <AppTabRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  );
}