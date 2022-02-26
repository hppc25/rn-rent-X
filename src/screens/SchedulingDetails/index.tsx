import React, { useEffect, useState } from 'react';
//import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import SpeedSvg from '../../assets/speed.svg';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

interface RentalPeriod {
  start: string;
  end: string
}

export function SchedulingDetails(){
  const theme = useTheme();

  const navigation = useNavigation()

  function handleConfirmation() {
    navigation.navigate('Confirmation' as never)
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/10/2021</DateValue>
          </DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>21/10/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>80£ x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>240£</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmation}
        />
      </Footer>
    </Container>
  )
}