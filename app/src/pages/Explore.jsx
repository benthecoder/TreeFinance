import React from "react";

import Card from "../components/Card";
import Navbar from "../components/Navbar";

import {
  Image,
  Link,
  HStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
  Center,
  VStack,
  Box,
} from "@chakra-ui/react";

import { Formik, Form, Field } from "formik";

import { useToast } from "@chakra-ui/react";

function Explore() {
  // validate us phone number
  function validatePhone(value) {
    let error;
    if (!value) {
      error = "Phone number is required";
    } else if (value.length !== 10) {
      error = "Phone number must be 10 digits";
    } else if (value[0] !== "1") {
      error = "Phone number must start with 1";
    }
    return error;
  }
  async function subscribe(Phone) {
    const endpoint = `https://localhost:5000/subscribe?phone=${Phone}`;
    try {
      await fetch(endpoint);
    } catch (e) {
      alert(e);
    }
  }

  const toast = useToast();

  const resources = [
    {
      Goal: "2 million trees",
      Country: "BRAZIL",
      Title: "Amazon and Atlantic Forests",
      url: "https://www.mastercard.us/en-us/vision/corp-responsibility/priceless-planet/brazil.html",
    },

    {
      Goal: "890,400 trees",
      Country: "KENYA",
      Title: "Makuli Nzaui Landscape, Makueni County",
      url: "https://www.mastercard.us/en-us/vision/corp-responsibility/priceless-planet/kenya.html",
    },
    {
      Goal: "430,000 trees",
      Country: "AUSTRALIA",
      Title: "Southern Tablelands/Riverina, Western Sydney and Victoria",
      url: "https://www.mastercard.us/en-us/vision/corp-responsibility/priceless-planet/australia.html",
    },
    {
      Goal: "2 million trees",
      Country: "BRAZIL",
      Title: "Abrolhos Land and Seascape",
      url: "https://www.mastercard.us/en-us/vision/corp-responsibility/priceless-planet/brazil-abrolhos.html",
    },

    {
      Goal: "219,980 trees",
      Country: "CAMBODIA",
      Title: "Tonle Sap Lake",
      url: "https://www.mastercard.us/en-us/vision/corp-responsibility/priceless-planet/cambodia-tonle-sap.html",
    },

    {
      Goal: "150,000 trees",
      Country: "EUROPE",
      Title: "France, Spain and Portugal",
      url: "https://www.mastercard.us/en-us/vision/corp-responsibility/priceless-planet/europe-france-spain-portugal.html",
    },
  ];
  return (
    <>
      <Navbar />
      <Box p={16}>
        <HStack spacing={12}>
          <VStack h={"100%"}>
            <Image
              src="map.png"
              alt="Map"
              maxW={{ base: "700px", lg: "1000px" }}
              borderRadius={16}
            />
            <Link
              textDecoration={"underline"}
              href="https://www.mastercard.us/en-us/vision/corp-responsibility/priceless-planet.html"
              isExternal
              fontSize={20}
            >
              18 restoration projects globally
            </Link>
          </VStack>
          <VStack h={"100%"}>
            <Text fontSize="2xl" fontWeight={"bold"}>
              Want to be notified about this project? Subscribe below 👇
            </Text>
            <Formik
              initialValues={{
                phonenum: "1234567890",
              }}
              onSubmit={(values, actions) => {
                subscribe(values.phonenum);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form style={{ width: "100%", marginTop: "2rem" }}>
                  <Field name="phonenum" validate={validatePhone}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.phonenum && form.touched.phonenum
                        }
                      >
                        <FormLabel htmlFor="phonenum">Phone Number</FormLabel>
                        <Input
                          {...field}
                          id="phonenum"
                          placeholder="phonenum"
                        />
                        <FormErrorMessage>
                          {form.errors.phonenum}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={10}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                    width="100%"
                    onClick={() =>
                      toast({
                        title: "Subscribed.",
                        description: "We've added you to your list :)",
                        status: "success",
                        duration: 10000,
                        isClosable: true,
                      })
                    }
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </VStack>
        </HStack>
      </Box>
    </>
  );
}

export default Explore;
