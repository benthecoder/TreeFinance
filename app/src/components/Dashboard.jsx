import React from 'react';

import {
  Box,
  Heading,
  Center,
  VStack,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Flex,
} from '@chakra-ui/react';

function Dashboard({ data }) {
  const categoryCounts = data.reduce((acc, item) => {
    const categories = item.category;

    // split the category string into an array of categories
    categories.forEach((category) => {
      // trim whitespace from category
      category = category.trim();

      // if the category is not in the accumulator, add it with a count of 1
      if (!acc[category]) {
        acc[category] = 1;
      } else {
        // if the category is in the accumulator, increment the count
        acc[category]++;
      }
    });

    return acc;
  }, {});

  const convertFormat = (amount) => {
    return (
      '$' +
      amount
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    );
  };

  const calculateChange = (data) => {
    var totalChange = 0;
    var total = 0;

    for (var i = 0; i < data.length; i++) {
      if (data[i].amount > 0) {
        var amount = data[i].amount;
        totalChange += Math.ceil(amount) - amount;
        total += amount;
      }
    }
    return [totalChange, total];
  };

  const [donation, total] = calculateChange(data);

  const StatsCard = ({ title, value }) => {
    return (
      <Stat
        px={{ base: 1, md: 10 }}
        py='40px'
        shadow='xl'
        border='1px solid'
        borderColor='gray.500'
        bg='green.800'
        rounded='lg'
      >
        <StatLabel fontWeight={'medium'}>{title}</StatLabel>
        <StatNumber fontSize={'3xl'} fontWeight={'medium'}>
          {value}
        </StatNumber>
      </Stat>
    );
  };

  //calculate difference between two dates
  const dateDiff = (date1, date2) => {
    var diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  return (
    <Center>
      <VStack spacing={10}>
        <Heading>Statistics</Heading>
        <Text as='kbd'>
          A total of {data.length} transactions were made in the past{' '}
          {dateDiff(
            data[0].authorized_date,
            data[data.length - 1].authorized_date
          )}{' '}
          days
        </Text>
        <Text as='kbd'>
          A total of <Text as='u'> {convertFormat(total)}</Text> was spent{' '}
        </Text>
        <Text as='kbd'>
          Your top spending category was{' '}
          <Text as='u'> {Object.keys(categoryCounts)[0]}</Text>, a total of{' '}
          {Object.values(categoryCounts)[0]} †ransactions were made{' '}
        </Text>

        <Text fontSize='3xl' color='tomato'>
          {' '}
          If you donated to the Priceless Planet Coalition, you would have:{' '}
        </Text>
        <Box>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard title={'Donated'} value={convertFormat(donation)} />
            <StatsCard
              title={'Planted'}
              value={(donation / 2).toFixed(2) + ' Trees'}
            />
            <StatsCard
              title={'Sequestered'}
              value={(donation * 50).toFixed(2) + ' lbs of CO2'}
            />
          </SimpleGrid>
        </Box>
      </VStack>
    </Center>
  );
}

export default Dashboard;
