import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import {
  Button,
  Text,
  Badge,
  HStack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Input
} from '@chakra-ui/react'
import { Pattern } from '../components/Pattern'
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}
const Recorder = () => {
  const [recording, setRecording] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [chunkTimer, setChunkTimer] = useState(0)
  const [pattern, setPattern] = useState([])
  const [recordingOver, setRecordingOver] = useState(false)
  const ButtonRef: any = useRef(null)
  // create a function that converts the time in milliseconds to a string in the format mm:ss:ms prepend with 0 if less than 10 or 100 milliseconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 60000) % 1000)
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}:${
      milliseconds < 10 ? '00' : milliseconds < 100 ? '0' : ''
    }${milliseconds}`
  }
  useEffect(() => {
    let elapsedInterval: any = null
    let chunkInterval: any = null
    if (recording && elapsedTime < 10000) {
      elapsedInterval = setInterval(() => {
        setElapsedTime((prevtime) => {
          return prevtime + 10
        })
      }, 10)
      chunkInterval = setInterval(() => {
        setChunkTimer((prevtime) => {
          return prevtime + 10
        })
      }, 10)
    } else {
      clearInterval(elapsedInterval)
      clearInterval(chunkInterval)
    }
    if (elapsedTime >= 10000) {
      setRecording(false)
      setRecordingOver(true)
    }
    if (pattern.length % 2 === 1 && chunkTimer >= 3000) {
      setElapsedTime(10000)
      setRecordingOver(true)
    }
    return () => {
      clearInterval(elapsedInterval)
      clearInterval(chunkInterval)
    }
  }, [recording, elapsedTime, pattern, chunkTimer])

  return (
    <>
      <VStack width="100vw">
        <Pattern
          pattern={{
            meaning: '',
            pattern: JSON.stringify(pattern, null, 2),
            color: ''
          }}
        />
        <Button
          h="fit-content"
          onMouseDown={(e) => {
            setRecording(true)
            if (recording && elapsedTime < 10000) {
              setChunkTimer(0)
              window.navigator.vibrate(10000)
              setPattern([...pattern, chunkTimer as never])
            }
          }}
          onMouseUp={(e) => {
            if (recording && elapsedTime < 10000) {
              setChunkTimer(0)
              window.navigator.vibrate(0)
              setPattern([...pattern, chunkTimer as never])
            }
          }}
          onTouchStart={(e) => {
            setRecording(true)
            window.navigator.vibrate(10000)
            if (recording && elapsedTime < 10000) {
              setChunkTimer(0)
              window.navigator.vibrate(10000)
              setPattern([...pattern, chunkTimer as never])
            }
          }}
          onTouchEnd={(e) => {
            window.navigator.vibrate(0)
            if (recording && elapsedTime < 10000) {
              setChunkTimer(0)
              setPattern([...pattern, chunkTimer as never])
            }
          }}>
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
              strokeWidth="4"
            />
            <rect x="82" y="49" width="96" height="4" rx="2" fill="#C4C4C4" />
          </svg>
        </Button>
        <Stat textAlign="center">
          {recording && (
            <>
              <StatLabel>Recording...</StatLabel>
              <StatNumber fontSize="2xl" color="Highlight">
                {formatTime(elapsedTime)}
              </StatNumber>
              <StatHelpText>
                Time left: {formatTime(10000 - elapsedTime)}
              </StatHelpText>
            </>
          )}
          {!recording && (
            <>
              <Pattern pattern={{ meaning: '', pattern: '[]', color: '' }} />
              <StatLabel>Touch to start Recording!</StatLabel>
              <StatNumber fontSize="2xl" color="GrayText">
                {formatTime(elapsedTime)}
              </StatNumber>
              <StatHelpText>
                Time left: {formatTime(10000 - elapsedTime)}
              </StatHelpText>
            </>
          )}
          {recordingOver && (
            <>
              <Input placeholder="Type your meaning here" ref={ButtonRef} />
              <Button
                colorScheme="green"
                my="8"
                onClick={() => {
                  postData('http://192.168.178.71:5000/patterns', {
                    pattern: JSON.stringify(pattern),
                    meaning: ButtonRef.current.value
                  })
                  window.location.reload()
                }}>
                Save
              </Button>
            </>
          )}
        </Stat>
      </VStack>
    </>
  )
}
export { Recorder }
