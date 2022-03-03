import React, { useEffect, useState } from "react";
import { BackHandler, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNetInfo } from '@react-native-community/netinfo';

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database'
import { Car as ModelCar } from '../../database/model/Car';


import { LoadAnimation } from "../../components/LoadAnimation";

import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";
import { RootStackParamList } from "../../routes";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const netInfo = useNetInfo();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car: { ...car } });
  }


  async function offlineSynchronize(){
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api
          .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = response.data;
        console.log('timestamp:', latestVersion)
        console.log("changes pull")
        console.log(changes)
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        console.log("changes push")
        console.log(changes)
        const user = changes.users;
        await api.post('/users/sync', user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
      
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();
        
        if (isMounted) {
          setCars(cars);
        }
        
      } catch (error) {

        console.log("error");
        console.log(error);
      
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  },[]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  useEffect(() => {
    if(netInfo.isConnected === true){
      offlineSynchronize();
    }
  },[netInfo.isConnected])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && (
            <TotalCars>{`Total de ${cars.length} carros`}</TotalCars>
          )}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

   
    </Container>
  );
}
