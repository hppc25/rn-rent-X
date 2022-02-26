import React, { useEffect, useState } from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';

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
        Content
    } from './styles';
import { Button } from '../../components/Button';

import { StackNavigationProp } from '@react-navigation/stack';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { RootStackParamList } from '../../routes';

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

  function handleScheduling() {
    navigation.navigate('Scheduling', {car})
  };

  function handleBack() {
    navigation.goBack();
  };


  const [photos, setPhotos] = useState<ImgProps[]>([]);
  

  useEffect(() => {
    let list:ImgProps[] = new Array();

    car.photos.map( item=> list.push({'id': item, 'photo': item}))
    setPhotos([...list])
    
  },[])


  return (
    <Container >
      <Header>
        <BackButton onPress={handleBack}/>
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{car.rent.price}£</Price>
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
      </Content>
     
      <Footer>
        <Button 
          title="Escolher período do aluguel "
          onPress={handleScheduling}
        />
      </Footer>
    </Container>
  )
} 