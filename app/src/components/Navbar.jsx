import { Flex, Spacer, Button, Box } from '@chakra-ui/react';
import { FaRegCompass, FaInfoCircle, FaTree } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  let navigate = useNavigate();

  const routeHome = () => {
    navigate('/dashboard');
  };

  const routeExplore = () => {
    navigate('/explore');
  };

  const routeAbout = () => {
    navigate('/about');
  };

  return (
    <Box color='gray.100' m={4}>
      <Flex>
        <Button
          leftIcon={<FaTree />}
          size='lg'
          variant='ghost'
          fontWeight='bold'
          onClick={routeHome}
        >
          Home
        </Button>

        <Spacer />
        <Button
          leftIcon={<FaRegCompass />}
          size='lg'
          variant='ghost'
          fontWeight='bold'
          onClick={routeExplore}
        >
          Explore
        </Button>
        <Button
          leftIcon={<FaInfoCircle />}
          size='lg'
          variant='ghost'
          fontWeight='bold'
          onClick={routeAbout}
        >
          About
        </Button>
      </Flex>
    </Box>
  );
}

export default Navbar;
