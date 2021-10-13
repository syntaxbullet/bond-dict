import React from 'react';
import { HStack, Box, useColorModeValue, Text } from '@chakra-ui/react';

// create a minimal react function component that takes in an array as prop and returns it as a box
const Pattern = ({pattern, meaning}) => {
    const tapcolor = useColorModeValue('blue.500', 'blue.300');
    const patternbg = useColorModeValue('blackAlpha.200', 'blackAlpha.300');
    return (
    <Box>
    <HStack className="pattern-wrapper" w="720px" maxW="80vw" bg={patternbg} h="20px" borderRadius="20px">
        {pattern.map((item, index) => {
            return (
                    <Box key={index} className="pattern-item-box" w={`${item/100}%`} h="100%" borderRadius="20px" _odd={{bg: tapcolor}}></Box>
            )
        })}
    </HStack>
    <Text className="pattern-meaning" fontSize="sm" color="GrayText" marginY={2}>{meaning}</Text>
    </Box>
    )
}
export default Pattern;