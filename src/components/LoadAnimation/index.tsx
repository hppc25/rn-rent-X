import React from 'react';
import { ActivityIndicator } from "react-native";

// import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/loadingCar.json';

import { Container } from './styles';



export function LoadAnimation(){

  return (

    <Container>

       <ActivityIndicator size="large" />

      {/* <LottieView 

        source={loadingCar}

        style={{ height: 200 }}

        resizeMode="contain"

        autoPlay

        loop

      /> */}


    </Container>

  )

} 