import React from "react";
import {
  Badge,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Text,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { useQuery } from "react-query";


type Price = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price : string;
  price_change_percentage_24h : string;
  total_volume: string;
  market_cap : string;
}

const getMarket = async () => {
  const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=IDR&per_page=10";
  const response = await fetch(URL);

  if(!response.ok) {
    throw new Error("Fetching Error");
  }

  return await response.json();
}

export default function Market() {
  const { data, isError, isLoading, isFetching, isSuccess} = useQuery("market", getMarket);


  return (
    <Layout title="Crypto Market">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Coin</Th>
            <Th>Last Price</Th>
            <Th>24h % Change</Th>
            <Th isNumeric>Total Volume</Th>
            <Th isNumeric>Market Cap</Th>
          </Tr>
        </Thead>
        <Tbody>

         { data.map((price: Price) => (
                <Tr>
            <Td>
              <Flex alignItems="center">
                <Image
                  src={price.image}
                  boxSize="24px"
                  ignoreFallback={true}
                />

                <Text pl={2} fontWeight="bold" textTransform="capitalize">
                 {price.id}
                </Text>
                <Badge ml={3}> {price.symbol} </Badge>
              </Flex>
            </Td>
            <Td> {price.current_price} </Td>
            <Td>{price.price_change_percentage_24h}</Td>
            <Td isNumeric> {price.total_volume} </Td>
            <Td isNumeric> {price.market_cap} </Td>
          </Tr>
          ))}
     
        </Tbody>
      </Table>
    </Layout>
  );
}
