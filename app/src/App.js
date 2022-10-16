import React, { useEffect, useState } from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { useLocation } from 'react-router-dom';

function App() {
  const { state } = useLocation();

  //get access_token from local storage
  const access_token = localStorage.getItem('access_token');
  const metadata = localStorage.getItem('metadata');

  const [transactions, setTransactions] = useState({});

  React.useEffect(() => {
    const getTransactions = async () => {
      fetch('http://127.0.0.1:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      <VStack spacing={8} align='stretch' mt={20}>
        {transactions.length > 0 ? (
          <Dashboard data={transactions} />
        ) : (
          'No transactions'
        )}
      </VStack>
    </Box>
  );
}

export default App;
