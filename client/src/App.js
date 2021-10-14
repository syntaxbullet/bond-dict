import React, { useEffect, useRef, useState } from 'react';
import {
    ChakraProvider,
    Box,
    Heading,
    Text,
    VStack,
    Grid,
    Button,
    theme,
    Container,
    useColorModeValue,
} from '@chakra-ui/react';
import Pattern from './components/Pattern';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';

function App() {
    const [patternData, setPatternData] = useState([]);
    const [creationMode, setCreationMode] = useState(false);
    const [isRecording, setRecording] = useState(false);
    const [time, setTime] = useState();
    const btnRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:5000/patterns')
            .then(res => res.json())
            .then(data => {
                setPatternData(data);
                setCreationMode(false);
                setRecording(false);
            });
    }, []);

    useEffect(() => {
        if (!btnRef.current) return;

        const mouseDown = () => {
            if (time) setPatternData([...patternData, Date.now() - time]);

            setTime(Date.now());
        };
        const mouseUp = () => {
            setPatternData([...patternData, Date.now() - time]);
            setTime(Date.now());
        };

        btnRef.current.addEventListener('mousedown', mouseDown);
        btnRef.current.addEventListener('mouseup', mouseUp);

        return () => {
            if (!btnRef.current) return;

            btnRef.current.removeEventListener('mousedown', mouseDown);
            btnRef.current.removeEventListener('mouseup', mouseUp);
        };
    }, [btnRef, creationMode, patternData, time]);

    return (
        <ChakraProvider theme={theme}>
            <Box textAlign="center" fontSize="xl">
                {creationMode ? (
                    <Grid minH="100vh" p={3}>
                        <ColorModeSwitcher justifySelf="flex-end" />
                        <VStack spacing={8}>
                            <Heading as="h1" size="2xl">
                                Creating a Pattern
                            </Heading>
                            <Text fontSize="md" color="GrayText" maxW="75%">
                                Click or touch the device below to record your
                                pattern. Once you are done, you can either save
                                your pattern or start again.
                            </Text>
                            <Text>{JSON.stringify(patternData, null, 2)}</Text>
                            <svg
                                width="287"
                                height="119"
                                viewBox="0 0 287 119"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                ref={btnRef}
                            >
                                <rect
                                    x="2"
                                    y="2"
                                    width="283"
                                    height="115"
                                    rx="30"
                                    stroke="#aaa"
                                    strokeOpacity="1"
                                    strokeWidth="4"
                                />
                                <rect
                                    x="84"
                                    y="56"
                                    width="119"
                                    height="6"
                                    rx="3"
                                    fill="#aaa"
                                    fillOpacity="1"
                                />
                            </svg>
                        </VStack>
                    </Grid>
                ) : (
                    <>
                        <Grid minH="100vh" p={3}>
                            <ColorModeSwitcher justifySelf="flex-end" />
                            <VStack spacing={8}>
                                <Heading as="h1" size="3xl">
                                    Our Bond Touch Dictionary
                                </Heading>
                                <Text fontSize="md" color="GrayText" maxW="75%">
                                    A simple web application that allows us to
                                    add patterns and meanings to our bond touch
                                    dictionary.
                                </Text>
                                <Button
                                    colorScheme="blue"
                                    size="md"
                                    onClick={() => {
                                        setCreationMode(true);
                                    }}
                                >
                                    Add a Pattern
                                </Button>
                            </VStack>
                        </Grid>
                        <VStack minH="25vh" p={8} spacing={8}>
                            {patternData.map(pattern => (
                                <Pattern
                                    key={pattern.id}
                                    pattern={JSON.parse(pattern.pattern)}
                                    meaning={pattern.meaning}
                                />
                            ))}
                        </VStack>
                    </>
                )}
            </Box>
        </ChakraProvider>
    );
}
export default App;
