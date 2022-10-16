// create page that talkes about what carbon footprint is and provides resources to learn more designed using chakra ui

import { Box, Heading, Text, VStack, Link } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import React from 'react';

export default function About() {
  return (
    <>
      <Navbar />

      <VStack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
        <Box>
          <Heading mb={2}> What is carbon footprint?</Heading>
          <Text>
            A carbon footprint is the{' '}
            <Text as={'span'} position={'relative'} color='green.400'>
              total amount of greenhouse gases
            </Text>
            produced to directly and indirectly support human activities,
            usually expressed in equivalent tons of carbon dioxide (CO2).
          </Text>
        </Box>
        <Box>
          <Heading mb={2}>How does it happen?</Heading>
          <Text>
            Each person's actions and decisions adds to their carbon footprint.
            The major contributors to the carbon footprint include food,
            consumption, transportation and household energy.
          </Text>

          <Text>
            Our impact is evident as{' '}
            <Text as={'span'} position={'relative'} color='red'>
              global temperatures are rising
            </Text>
            , weather events are becoming more severe and so on.
          </Text>
        </Box>
        <Box>
          <Heading mb={2}>
            How does{' '}
            <Text as={'span'} position={'relative'} color='green.400'>
              Tree
            </Text>
            Finance help?
          </Heading>
          <Text>
            We connect your bank account(s) with{' '}
            <Link
              textDecoration={'underline'}
              href='https://plaid.com/'
              isExternal
            >
              {' '}
              Plaid
            </Link>
            , and then we round up all your spendings and measure the possible
            impact if you donated them to the
            <Link
              textDecoration={'underline'}
              href='https://www.mastercard.us/en-us/vision/corp-responsibility/priceless-planet.html'
              isExternal
            >
              {' '}
              Priceless Planet Coalition.
            </Link>
          </Text>
        </Box>

        <Box>
          <Heading mb={2}>How is impact measured?</Heading>
          <Text>
            We use the{' '}
            <Link
              textDecoration={'underline'}
              href='https://developer.mastercard.com/priceless-planet/documentation/use-cases/impact_calculator/'
              isExternal
            >
              {' '}
              Impact Metric Calculator
            </Link>{' '}
            service which determine the sustainability impact measured in the
            number of trees to be planted by the donated amount along with the
            carbon sequestered over a 5-year period.
          </Text>
        </Box>
      </VStack>
    </>
  );
}
