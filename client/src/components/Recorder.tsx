import * as React from "react";
import { Heading, Text, Button, Box } from "@chakra-ui/react";

const Recorder = (props: any) => (
    <>
    <Box textAlign="center">
    <Heading size="xl" className="animate__animated animate__fadeInUpBig">bond-dict</Heading>
    <Text className="animate__animated animate__fadeInUp" style={{animationDelay: '1s'}}>some text</Text>
    </Box>
    <Button className="animate__animated animate__fadeInUp" style={{animationDelay: '1s'}}>Click me</Button>
</>
);
export { Recorder };
