import React, { useEffect, useState } from 'react';
import Animated, { 
  Extrapolate, 
  interpolate, 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  useSharedValue 
} from 'react-native-reanimated';
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo';


import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import api from "../../services/api";

import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/model/Car';


import {Container, 
        Header,
        Footer,
        Details,
        Description,
        CarImages,
        Brand,
        Name,
        Rent,
        Period,
        Price,
        About,
        Accessories,
        OfflineInfo,
    } from './styles';
import { Button } from '../../components/Button';

import { StackNavigationProp } from '@react-navigation/stack';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { RootStackParamList } from '../../routes';
import { useTheme } from 'styled-components';

type NextScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CarDetails'
>;

type NextScreenProps = {
  navigation: NextScreenNavigationProp;
  route: {params: {car: ModelCar}}
}

interface ImgProps {
    id: string;
    photo: string;
  
}[];


export function CarDetails({ navigation, route:{params: {car}}}: NextScreenProps){

  // const route: RouteProp<{params: {car: CarDTO}}, 'params'> = useRoute();
  // const [car, setCar] = useState<CarDTO>(route.params?.car);
  const [carUpdate, setCarUpdate] = useState<CarDTO>({} as CarDTO);
  const netInfo = useNetInfo();

  const theme = useTheme()

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      ),
    }
  });

  function handleScheduling() {
    navigation.navigate('Scheduling', {car: carUpdate })
  };

  function handleBack() {
    navigation.goBack();
  };


  useEffect(() => {
    async function fetchOnlineData() {
      const response = await api.get(`cars/${car.id}`);
      setCarUpdate(response.data);
    }

    if(netInfo.isConnected === true){
      fetchOnlineData();
    }
  },[netInfo.isConnected])


  return (
    <Container >
       <StatusBar 
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      
      <Animated.View
        style={[
          headerStyleAnimation, 
          styles.header,
          { backgroundColor: theme.colors.background_secondary }
        ]}
      >
        <Header>
          <BackButton onPress={handleBack}/>
        </Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImageSlider 
              imagesUrl={
                !!carUpdate.photos ? 
                carUpdate.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
              } 
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            {/* <Price>{car.price}£</Price> */}
            <Price>{netInfo.isConnected === true ? car.price+'£' : '...'}</Price>
          </Rent>
        </Details>

        {
          carUpdate.accessories &&
          <Accessories>
            {
              carUpdate.accessories.map(accessory => (
                <Accessory 
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </Accessories>
        }

        <About>
          {car.about}
        </About>
      </Animated.ScrollView>
     
      <Footer>
        <Button 
          title="Escolher período do aluguel "
          onPress={handleScheduling}
          enabled={netInfo.isConnected === true}
        />
        {
          netInfo.isConnected === false &&
          <OfflineInfo>
          Conecte-se a internet para ver mais detalhes e agendar seu carro.
          </OfflineInfo>
        }
      </Footer>
    </Container>
  )
} 

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})