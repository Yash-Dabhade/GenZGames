import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

function PaymentSuccess() {
  return (
    <Box>
      <VStack h="100vh" justifyContent={"center"}>
        <Heading textTransform={"uppercase"}> Order Successfull</Heading>
      </VStack>
    </Box>
  );
}

export default PaymentSuccess;
