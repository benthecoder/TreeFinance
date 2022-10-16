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
  Kbd,
  Tag,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

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

  // group the data by authorized date for each year into months
  const monthlyData = data.reduce((acc, item) => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });

    // if the year is not in the accumulator, add it with an array of the month
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = 0;
    }
    acc[year][month] += 1;

    return acc;
  }, {});

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  for (const year in monthlyData) {
    for (const month of months) {
      if (!monthlyData[year][month]) {
        monthlyData[year][month] = 0;
      }
    }
  }

  // create a list of objects for the chart grouped by month with each year as a key
  // create a list of 12 objects representing each month
  let monthList = months.map((month) => {
    return { name: month };
  });

  for (const year in monthlyData) {
    const yearData = monthlyData[year];
    for (const month in yearData) {
      const monthData = yearData[month];
      const monthIndex = months.indexOf(month);
      monthList[monthIndex][year] = monthData;
    }
  }

  const categoryCountsList = Object.keys(categoryCounts).map((key) => {
    return {
      name: key,
      value: categoryCounts[key],
    };
  });

  categoryCountsList.sort((a, b) => {
    return b.value - a.value;
  });

  const CustomTooltip = ({ active, payload, label }) => {
    console.log(payload);
    if (active && payload && payload.length) {
      return (
        <Box backgroundColor={'white'} color='black' p='6'>
          <Text>
            You had transacted
            <span styles={{ fontWeight: 'bold' }}>
              {' '}
              {payload[0].value}
            </span>{' '}
            times on <span styles={{ fontWeight: 'bold' }}> {label}</span>{' '}
            category items
          </Text>
        </Box>
      );
    }

    return null;
  };

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
        py='26px'
        shadow='xl'
        border='1px solid'
        borderColor='gray.500'
        bg='#82E5D8'
        rounded='lg'
        color={'black'}
      >
        <StatLabel fontWeight={'bold'}>{title}</StatLabel>
        <StatNumber fontSize={'3xl'} fontWeight={'bold'}>
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

  // genrate random color that looks good in dark mode
  const randomColor = () => {
    const colors = [
      '#FF0000',
      '#FF7F00',
      '#FFFF00',
      '#00FF00',
      '#0000FF',
      '#4B0082',
      '#9400D3',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const ChartStats = () => {
    return (
      <>
        <BarChart width={1250} height={400} data={categoryCountsList}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey='value' fill='#8884d8' />
        </BarChart>
        <LineChart
          width={1250}
          height={400}
          data={monthList}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='2020'
            stroke='#8884d8'
            strokeWidth={3}
          />
          <Line
            type='monotone'
            dataKey='2021'
            stroke='#82ca9d'
            strokeWidth={3}
          />
          <Line
            type='monotone'
            dataKey='2022'
            stroke='#FF0000'
            strokeWidth={3}
          />
        </LineChart>
      </>
    );
  };

  return (
    <Center mb={20}>
      <VStack spacing={10}>
        <Heading>Statistics</Heading>

        <Text align='center' fontSize={24}>
          A total of{' '}
          <Tag size='lg' variant='subtle' colorScheme='teal'>
            {data.length}
          </Tag>{' '}
          transactions were made in the past{' '}
          <Tag size='lg' variant='subtle' colorScheme='teal'>
            {dateDiff(
              data[0].authorized_date,
              data[data.length - 1].authorized_date
            )}
          </Tag>{' '}
          days
        </Text>
        <Text align='center' fontSize={24}>
          A total of{' '}
          <Tag size='lg' variant='subtle' colorScheme='teal'>
            {convertFormat(total)}
          </Tag>{' '}
          was spent
        </Text>
        <Text align='center' fontSize={24}>
          Your top spending category was{' '}
          <Tag size='lg' variant='subtle' colorScheme='teal'>
            {' '}
            {Object.keys(categoryCounts)[0]}
          </Tag>
          , a total of{' '}
          <Tag size='lg' variant='subtle' colorScheme='teal'>
            {Object.values(categoryCounts)[0]}
          </Tag>{' '}
          transactions were made
        </Text>
        <Text fontSize='3xl' fontWeight='bold'>
          If you donated to the Priceless Planet Coalition, you would have:{' '}
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            color='teal'
            title={'Donated'}
            value={convertFormat(donation)}
          />
          <StatsCard
            title={'Planted'}
            value={(donation / 2).toFixed(2) + ' Trees'}
          />
          <StatsCard
            title={'Sequestered'}
            value={(donation * 50).toFixed(2) + ' lbs of CO2'}
          />
        </SimpleGrid>
        <ChartStats />
      </VStack>
    </Center>
  );
}

export default Dashboard;
