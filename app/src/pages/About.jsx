// create page that talkes about what carbon footprint is and provides resources to learn more designed using chakra ui

import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <Box>
      <Heading size="lg">What is a carbon footprint?</Heading>
      <Text>
        A carbon footprint is the total amount of greenhouse gases produced to
        directly and indirectly support human activities, usually expressed in
        equivalent tons of carbon dioxide (CO2). The term carbon footprint was
        popularized by the 2006 book by Mike Berners-Lee and Tony Juniper of the
        same name.
      </Text>
      <Text>
        The term is used to describe the climate change impact of an individual,
        event, organization, product or service, by quantifying the total
        greenhouse gas emissions caused by an individual or group, or an
        organization's products or operations in terms of the amount of carbon
        dioxide, methane, nitrous oxide and other greenhouse gases emitted.
      </Text>
      <Text>
        A carbon footprint is measured in units of mass (e.g. tonnes of carbon
        dioxide) or volume (e.g. litres of carbon dioxide equivalent). The
        carbon footprint is a measure of the impact of human activities on the
        environment. The carbon footprint is the amount of carbon dioxide (CO2)
        and other greenhouse gases (GHGs) released into the atmosphere as a
        result of the activities of an individual, event, organization, product
        or service.
      </Text>
      <Text>
        The carbon footprint of an organization, event, product or service is
        often calculated as the sum of the carbon footprints of all the
        activities it undertakes, including the manufacture of the product or
        service, transportation, distribution, and disposal or recycling at the
        end of its life.
      </Text>
      <Text>
        The carbon footprint of an individual is the total amount of greenhouse
        gas emissions caused by that individual, either directly or indirectly.
      </Text>
      <Text>
        The carbon footprint of an individual is usually expressed in units of
        mass (e.g. tonnes of carbon dioxide) or volume (e.g. litres of carbon
        dioxide equivalent).
      </Text>
      {/* want to learn more? check out these links below */}
      <Heading size="lg">Want to learn more?</Heading>
      <Text>
        <Link to="https://www.nrdc.org/stories/what-carbon-footprint">
          What is a carbon footprint?
        </Link>
      </Text>
      <Text>
        <Link to="https://www.nrdc.org/stories/how-reduce-your-carbon-footprint">
          How to reduce your carbon footprint
        </Link>
      </Text>
    </Box>
  );
}
