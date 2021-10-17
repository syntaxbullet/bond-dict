import * as React from "react";
import { Heading, Text, Button, Box } from "@chakra-ui/react";
import 'animate.css'
const Hero = (props: any) => (
    <>
        <Box textAlign="center">
        <Heading size="xl" className="animate__animated animate__fadeInDownBig">bond-dict</Heading>
        <Text className="animate__animated animate__fadeInDown" style={{animationDelay: '1s'}}>some text</Text>
        </Box>
        <Button className="animate__animated animate__fadeInDown" style={{animationDelay: '1s'}} onClick={() => props.setRecording(true)}>Click me</Button>
    </>
);
export { Hero };
