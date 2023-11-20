import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Center,
  Flex,
  SimpleGrid,
  Stack,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const initialResponses = Array.from({ length: 75 }, () => null);
  const [responses, setResponses] =
    useState<Array<string | null>>(initialResponses);
  const [loading, setloading] = useState(false);
  const handleRowChange = (index: number, value: string) => {
    // Update the responses array with the selected value at the specified index
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };
  const handleSubmit = async () => {
    // Do something with the collected responses, e.g., send them to an API
    console.log(responses);
    const url = "/api/result";
    setloading(true);
    try {
      const req = await axios.post(url, { data: responses });
    } catch (error) {}
    setloading(false);
  };

  return (
    <Center w={"100%"}>
      <VStack
        marginBottom={10}
        marginTop={10}
        spacing={5}
        w={["100%", "70%", "50%"]}
      >
        <Flex justifyContent={"space-around"} w={"100%"}>
          <Text fontSize={"x-large"} fontWeight={"bold"}>
            Player
          </Text>
          <Text fontSize={"x-large"} fontWeight={"bold"}>
            Banker
          </Text>
          <Text fontSize={"x-large"} fontWeight={"bold"}>
            Tie
          </Text>
        </Flex>
        {Array.from({ length: 75 }).map((_, key) => {
          return (
            <Row
              key={key}
              index={key}
              onChange={(value) => handleRowChange(key, value)}
            />
          );
        })}
        <Button
          isLoading={loading}
          onClick={handleSubmit}
          w={"80%"}
          colorScheme="green"
        >
          Submit
        </Button>
      </VStack>
    </Center>
  );
}

interface RowProps {
  index: number;
  onChange: (value: string) => void;
}

const Row: React.FunctionComponent<RowProps> = ({ index, onChange }) => {
  const [value, setValue] = React.useState("1");
  return (
    <RadioGroup
      onChange={(val) => {
        setValue(val);
        onChange(val);
      }}
      w={"100%"}
      value={value}
    >
      <Flex justifyContent={"space-around"} direction="row">
        <Radio size={"lg"} colorScheme="blue" value="Player"></Radio>
        <Radio size={"lg"} colorScheme="red" value="Banker"></Radio>
        <Radio size={"lg"} colorScheme="green" value="Tie"></Radio>
      </Flex>
    </RadioGroup>
  );
};
