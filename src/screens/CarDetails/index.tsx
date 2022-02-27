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


import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { CarDTO } from '../../dtos/CarDTO';


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
  route: {params: {car: CarDTO}}
}

interface ImgProps {
    id: string;
    photo: string;
  
}[];


export function CarDetails({ navigation, route:{params: {car}}}: NextScreenProps){

  // const route: RouteProp<{params: {car: CarDTO}}, 'params'> = useRoute();
  // const [car, setCar] = useState<CarDTO>(route.params?.car);
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
    navigation.navigate('Scheduling', {car})
  };

  function handleBack() {
    navigation.goBack();
  };


  // const [photos, setPhotos] = useState<ImgProps[]>([]);
  
  // useEffect(() => {
  //   let list:ImgProps[] = new Array();

  //   // car.photos.map( item=> list.push({'id': item, 'photo': item}))
  //   setPhotos([...list])
    
  // },[])


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
              imagesUrl={car.photos}
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
            <Price>{car.price}£</Price>
          </Rent>
        </Details>

        <Accessories>
            {
              car.accessories.map( ({type, name}) => (
                <Accessory
                  key={type} 
                  name={name}
                  icon={getAccessoryIcon(type)}
                  />
              ) )
            }
          
          
        </Accessories>

        <About>
          {car.about}
        </About>
      </Animated.ScrollView>
     
      <Footer>
        <Button 
          title="Escolher período do aluguel "
          onPress={handleScheduling}
        />
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