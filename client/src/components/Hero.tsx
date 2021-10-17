import * as React from 'react'
import { Heading, Text, Button, Box } from '@chakra-ui/react'
import { FaCircle } from 'react-icons/fa'
import 'animate.css'
const Hero = (props: any, key: any) => (
  <>
    <Box textAlign="center">
      <Heading size="4xl" className="animate__animated animate__fadeInDownBig">
        Our Bond Touch Dictionary
      </Heading>
      <Text
        className="animate__animated animate__fadeInDown"
        color="GrayText"
        marginY="1rem"
        style={{ animationDelay: '1s' }}>
        There currently are {props.patterns.length} patterns click the button
        below to record a new pattern.
      </Text>
    </Box>
    <Button
      className="animate__animated animate__fadeInDown"
      colorScheme="red"
      size="lg"
      style={{ animationDelay: '1s' }}
      onClick={() => props.setRecording(true)}>
      <FaCircle size="1em" style={{ marginRight: '8px' }} />
      Record a new pattern
    </Button>
  </>
)
export { Hero }
