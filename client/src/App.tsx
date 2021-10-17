import * as React from 'react'
import { useState, useEffect } from 'react'
import { ChakraProvider, Grid, VStack, theme } from '@chakra-ui/react'
import { ColorModeSwitcher } from './components/ColorModeSwitcher'
import { Hero } from './components/Hero'
import { Recorder } from './components/Recorder'
import { Pattern } from './components/Pattern'

export const App = () => {
  const [patterns, setPatterns] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  // create a useEffect to fetch the number of patterns
  useEffect(() => {
    fetch('http://localhost:5000/patterns')
      .then((res) => res.json())
      .then((data) => {
        setPatterns(data)
      })
  }, [])
  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh">
        <ColorModeSwitcher position="absolute" right="32px" top="32px" />
        <VStack spacing="8" minH="100vh" justifyContent="center">
          {!isRecording && (
            <Hero setRecording={setIsRecording} patterns={patterns} />
          )}
          {isRecording && <Recorder />}
        </VStack>
        <VStack>
          {!isRecording &&
            patterns.map((pattern) => <Pattern pattern={pattern} />)}
        </VStack>
      </Grid>
    </ChakraProvider>
  )
}
