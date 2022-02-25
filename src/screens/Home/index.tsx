import React from 'react';
import { StatusBar } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';


import {
  CarList,
  Container, Header, HeaderContent, TotalCars
} from './styles';
export function Home(){

  const cars =
  [ {
      brand:"Audi",
      name:"RS Coupe",
      period:"Ao dia",
      price:"50",
      fuel_type:"gasoline_motor",
      thumbnail:"https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png"
    },

    {
      brand:"Porsche",
      name:"Panamera",
      period:"Ao dia",
      price:"100",
      fuel_type:"electric_motor",
      thumbnail:"http://assets.stickpng.com/images/580b585b2edbce24c47b2cae.png"
    }
  ];

  return (
       <Container>
           <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
              <HeaderContent>
                  <Logo
                  width={RFValue(108)}
                  height={RFValue(12)}
                  />

                  <TotalCars>Total de 12 carros</TotalCars>
                </HeaderContent>
            </Header>

            {/* <Car data={carData} ></Car>
            <Car data={carData_2} ></Car> */}
            <CarList
                data={cars}
                keyExtractor={item => item.name}
                renderItem={({ item }) => 
                  <Car data={item}  />
                  // onPress={() => handleCarDetails(item)}
                }
             ></CarList>
       </Container>
   );
}