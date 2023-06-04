import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

function PaymentFailed() {
  return (
    <Box>
      <VStack h="100vh" justifyContent={"center"}>
        <Heading textTransform={"uppercase"}> Order Failed</Heading>
      </VStack>
    </Box>
  );
}

export default PaymentFailed;
