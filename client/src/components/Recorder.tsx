import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import {
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'
import { Pattern } from '../components/Pattern'
const Recorder = () => {
  const primary = useColorModeValue('red.500', 'red.200')
  const [isRecording, setIsRecording] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10000)
  const toTimestamp = (time: number) => {
    // convert milliseconds to mm:ss
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  const handleRecording = () => {
    // handle recording here
  }
  return (
    <>
      <Heading size="4xl">Record a Pattern</Heading>
      <Text color="GrayText">
        This is a simple example of a React component that uses hooks to record
        button presses.
      </Text>
      <VStack>
        <HStack width="50vw" justifyContent="space-evenly" marginBottom="2em">
          <Text color={primary}>{toTimestamp(timeLeft)}</Text>
          <Text color="GrayText" fontSize="sm">
            Waiting for interaction...
          </Text>
          <Text color="GrayText">{toTimestamp(10000 - timeLeft)}</Text>
        </HStack>
        <Button
          onClick={() => {
            handleRecording()
          }}
          h="fit-content"
          bg="transparent"
          borderRadius="20px"
          p="0"
          _focus={{ outline: 'none' }}>
          <svg
            width="260"
            height="105"
            viewBox="0 0 260 105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect
              x="2"
              y="2"
              width="256"
              height="101"
              rx="18"
              stroke="#CCCCCC"
              stroke-width="4"
            />
            <rect x="82" y="49" width="96" height="4" rx="2" fill="#C4C4C4" />
          </svg>
        </Button>
        <Pattern
          pattern={{
            pattern: '[]',
            color: 0,
            meaning: ''
          }}
        />
      </VStack>
    </>
  )
}
export { Recorder }
