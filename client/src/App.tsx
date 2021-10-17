import * as React from "react";
import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Grid,
  VStack,
  Text,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { Hero } from "./components/Hero";
import { Recorder } from "./components/Recorder";

export const App = () => {
  const [numberOfPatterns, setNumberOfPatterns] = useState(0);
  const [patterns, setPatterns] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  // create a useEffect to fetch the number of patterns
  useEffect(() => {
    fetch("http://localhost:5000/patterns")
      .then((res) => res.json())
      .then((data) => {
        setNumberOfPatterns(data.length);
        setPatterns(data);
      });
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh">
        <ColorModeSwitcher justifySelf="flex-end" margin="8"/>
        <VStack spacing="8">
          { !isRecording && <Hero setRecording={setIsRecording}/>}
          { isRecording && <Recorder/>}
        </VStack>
        <VStack>
          {patterns.map((pattern: any) => (
            <div className="pattern" key={pattern.id}>
              {pattern.pattern}
              {pattern.meaning}
            </div>
          ))}
          <Text>Number of Patterns: {numberOfPatterns}</Text>
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
