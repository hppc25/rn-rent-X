import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import SpeedSvg from '../../assets/speed.svg';
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

export function CarDetails(){

  const navigation = useNavigation()

  function handleScheduling() {
    navigation.navigate('Scheduling' as never)
  }

  return (
    <Container >
      <Header>
        <BackButton onPress={() => {}}/>
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={[
              {id:'1', photo: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'},
              {id:'2', photo: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'}
            ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamburghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>80£</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
        </Accessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário 
          touro de lide indultado na praça Real Maestranza de Sevilla. 
          É um belíssimo carro para quem gosta de acelerar.
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