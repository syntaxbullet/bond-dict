import * as React from 'react'
import 'animate.css'
import { Box, Text, useColorModeValue } from '@chakra-ui/react'

const Pattern = (props: any) => {
  const primary = useColorModeValue('blue.500', 'blue.200')
  return (
    <>
      <div
        className="pattern-wrapper"
        style={{
          maxWidth: '1200px',
          width: '80vw',
          display: 'flex',
          marginTop: '2em'
        }}>
        {JSON.parse(props.pattern.pattern).map((size: number) => {
          return (
            <Box
              className="pattern"
              style={{
                width: `${size / 100}%`,
                height: '1em',
                borderRadius: '1em'
              }}
              _odd={{ background: primary }}></Box>
          )
        })}
      </div>
      <Text color="GrayText" fontSize="sm">
        {props.pattern.meaning}
      </Text>
    </>
  )
}
export { Pattern }
