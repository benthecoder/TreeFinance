import React, { useEffect, useState } from "react";
import { Box, VStack, Skeleton } from "@chakra-ui/react";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  //get access_token from local storage
  const access_token = localStorage.getItem("access_token");
  const [transactions, setTransactions] = useState({});

  useEffect(() => {
    const getTransactions = async () => {
      fetch("http://127.0.0.1:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data.transactions);
          console.log(data);
        });
    };

    getTransactions();
  }, [access_token]);

  return (
    <Box>
      <Navbar />
      <Box px={16}>
        <VStack spacing={8} align="stretch" mt={20} alignItems="center">
          {transactions.length > 0 ? (
            <Dashboard data={transactions} />
          ) : (
            <>
              <Skeleton height="250px" width={"1000px"} color="white" />
              <Skeleton height="250px" width={"1000px"} color="white" />
              <Skeleton height="250px" width={"1000px"} color="white" />
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
}

export default App;
