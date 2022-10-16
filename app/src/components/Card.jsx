import { Heading, Box, Text, Center, Stack, Button } from '@chakra-ui/react';

export default function Card({ title, description, url }) {
  return (
    <Center py={6}>
      <Box
        maxW={'300px'}
        w='100%'
        h='100%'
        bg='gray.700'
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Box p={5}>
          <Stack spacing={3} align={'center'} mb={1}>
            <Heading fontSize={'2xl'} fontWeight={800} fontFamily={'body'}>
              {title}
            </Heading>
            <Text align={'center'} color={'gray.400'}>
              {description}
            </Text>
          </Stack>

          <Button
            w={'full'}
            bg='gray.900'
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={() => window.open(url, '_blank')}
          >
            Follow
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
