import React, { useEffect, useState } from 'react';
import {  StatusBar } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';

import {
  CarList,
  Container, Header, HeaderContent, TotalCars, MyCarsButton
} from './styles';
import { RootStackParamList } from '../../routes';



type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export function Home(){



  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const theme = useTheme();

  function handleCarDetails(car: CarDTO) {  
    navigation.navigate('CarDetails', { car: {...car} })
  }

  function handleMyCars() {
    navigation.navigate('MyCars');
  }

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

                  <TotalCars>Total de {cars && cars.length?cars.length:0} carros</TotalCars>
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
                  onPress={() => handleCarDetails(item)}
                />
              }
            />
          }

    <MyCarsButton onPress={handleMyCars}>
        <Ionicons 
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>

       </Container>
   );
}