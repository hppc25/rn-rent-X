import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
// import { Car as ModelCar } from '../../database/model/Car';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage
} from './style';

interface CarData{
    brand: string,
    name: string,
    period: string,
    thumbnail: string,
    price: string,
    fuel_type: string,
}
interface Props extends RectButtonProps{
//   data: ModelCar;
  data: CarData;
}

export function Car({ data, ...rest } : Props){
// export function Car({ data, ...rest } : any){
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`${data.price}£`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage 
        source={{ uri: data.thumbnail }} 
        resizeMode="contain"
      />
      {/* <CarImage 
        source={{ uri: data.thumbnail }} 
        resizeMode="contain"
      /> */}
    </Container>
  );
}