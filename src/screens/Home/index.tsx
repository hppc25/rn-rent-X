import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';


import {
  CarList,
  Container, Header, HeaderContent, TotalCars
} from './styles';
export function Home(){

  // const cars =
  // [ {
  //     brand:"Audi",
  //     name:"RS Coupe",
  //     period:"Ao dia",
  //     price:"50",
  //     fuel_type:"gasoline_motor",
  //     thumbnail:"https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png"
  //   },

  //   {
  //     brand:"Porsche",
  //     name:"Panamera",
  //     period:"Ao dia",
  //     price:"100",
  //     fuel_type:"electric_motor",
  //     thumbnail:"http://assets.stickpng.com/images/580b585b2edbce24c47b2cae.png"
  //   }
  // ];

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();


  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  },[]);

  function handleCarDetails() {
    navigation.navigate('CarDetails' as never)

  }
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

            
            { loading ? 
            <Load /> :

            <CarList
              data={cars}
              keyExtractor={item => item.id}
              renderItem={({ item }) => 
                <Car 
                  data={item}
                  onPress={handleCarDetails}
                />
              }
            />
          }

       </Container>
   );
}