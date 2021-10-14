import React from 'react';
import { HStack, Box, useColorModeValue, Text, Button } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';

// create a minimal react function component that takes in an array as prop and returns it as a box
const Pattern = ({ pattern, meaning }) => {
    const tapcolor = useColorModeValue('blue.500', 'blue.300');
    const patternbg = useColorModeValue('blackAlpha.200', 'blackAlpha.300');
    return (
        <HStack>
            <Box>
                <HStack
                    className="pattern-wrapper"
                    w="720px"
                    maxW="60vw"
                    bg={patternbg}
                    h="16px"
                    borderRadius="20px"
                >
                    {pattern.map((item, index) => {
                        return (
                            <Box
                                key={index}
                                className="pattern-item-box"
                                w={`${item / 100}%`}
                                h="100%"
                                borderRadius="20px"
                                _odd={{ bg: tapcolor }}
                            ></Box>
                        );
                    })}
                </HStack>
                <Text
                    className="pattern-meaning"
                    color="GrayText"
                    fontSize="md"
                    marginY={2}
                >
                    {meaning}
                </Text>
            </Box>
            {'vibrate' in navigator && (
                <Button
                    className="pattern-button"
                    variantColor="blue"
                    variant="outline"
                    size="sm"
                    marginLeft={2}
                    alignSelf="flex-start"
                    onClick={() => {
                        window.navigator.vibrate(pattern);
                    }}
                >
                    <FaPlay size="1em" fill="GrayText" />
                </Button>
            )}
        </HStack>
    );
};
export default Pattern;
