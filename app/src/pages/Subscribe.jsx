import React, { useState } from 'react';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const Subscribe = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const toast = useToast();

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post('/api/verify', { phone });
      console.log(response.data);
      setVerificationId(response.data.verificationId);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post('/api/verify', {
        code,
        verificationId,
      });
      console.log(response.data);
      setIsVerified(response.data.verified);
    } catch (error) {
      console.log(error);
    }
  };

  const sendCustomMessage = async () => {
    try {
      const response = await axios.post('/api/message', { phone });
      console.log(response.data);
      toast({
        title: 'Message Sent',
        description: 'Your custom message has been sent to your phone number',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormControl id='phone'>
        <FormLabel>Phone Number</FormLabel>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Phone Number'
        />
        <Button onClick={sendVerificationCode} disabled={phone.length < 10}>
          Send Verification Code
        </Button>
      </FormControl>
      <FormControl id='code'>
        <FormLabel>Verification Code</FormLabel>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='Verification Code'
        />
        <Button onClick={verifyCode} disabled={code.length < 6}>
          Verify Code
        </Button>
      </FormControl>
      <Button onClick={sendCustomMessage} disabled={!isVerified}>
        Send Custom Message
      </Button>
    </>
  );
};

export default Subscribe;
