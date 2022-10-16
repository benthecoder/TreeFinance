import {
  Button,
  Flex,
  Center,
  createIcon,
  Box,
  Icon,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

import { usePlaidLink } from 'react-plaid-link';

import { useNavigate } from 'react-router-dom';

const SimplePlaidLink = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  React.useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch(
        'http://127.0.0.1:5000/api/create_link_token',
        {
          method: 'POST',
        }
      );
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow

    const sendToken = async () => {
      try {
        const response = await fetch(
          'http://127.0.0.1:5000/api/set_access_token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              public_token: publicToken,
            }),
          }
        );
        const data = await response.json();
        // enter you logic when the fetch is successful
        //store the access token local storage
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('metadata', JSON.stringify(metadata));
        navigate('/dashboard');
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error);
      }
    };
    sendToken();

    console.log(publicToken, metadata);
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    // onEvent
    // onExit
  });

  return (
    <>
      <Flex
        width={'100vw'}
        height={'100vh'}
        alignContent={'center'}
        justifyContent={'center'}
      >
        <Center>
          <Button
            colorScheme='teal'
            size='lg'
            onClick={() => open()}
            disabled={!ready}
          >
            Connect a bank account
          </Button>
        </Center>
      </Flex>
    </>
  );
};

export default SimplePlaidLink;
