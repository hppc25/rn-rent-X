import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackRoutes } from './stack.routes';

import { CarDTO } from '../dtos/CarDTO';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  CarDetails: {car: CarDTO};
  Scheduling: {car: CarDTO};
  SchedulingDetails: {} | undefined;
  Confirmation: undefined;
  MyCars: undefined;
};

export function Routes(){
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )
}