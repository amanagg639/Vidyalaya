import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import introVideo from '../../assets/videos/intro.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCondition from '../../assets/docs/termsAndCondition.js';
import { Link } from 'react-router-dom';

const Founder = () => {
  return (
    <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
      <VStack>
        <Avatar
          src="https://yt3.googleusercontent.com/ytc/AOPolaQZFYlHwD68YQN02lA692Q6SkIUD_zRkl31WW4j=s900-c-k-c0x00ffffff-no-rj"
          boxSize={['40', '48']}
        />
        <Text children="Co-Founder" opacity={0.7} />
      </VStack>
      <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
        <Heading children="Sarthak Jain" size={['md', 'xl']} />
        <Text
          textAlign={['center', 'left']}
          children={'Hi I am currently a student in Chitkara'}
        />
      </VStack>
    </Stack>
  );
};

const VideoPlayer = () => {
  return (
    <Box>
      <video
        autoPlay
        muted
        controls
        loop
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        src={introVideo}
      ></video>
    </Box>
  );
};

const TandC = ({ termsAndCondition }) => {
  return (
    <Box>
      <Heading
        size={'md'}
        children="Terms & Condition"
        textAlign={['center', 'left']}
        my={4}
      />
      <Box h={'sm'} p={4} overflowY={'scroll'}>
        <Text
          fontFamily={'heading'}
          letterSpacing={'widest'}
          textAlign={['center', 'left']}
        >
          {termsAndCondition}
        </Text>
        <Heading
          my="4"
          size={'xs'}
          children="Refund only applicable for cancelation within 7 days"
        />
      </Box>
    </Box>
  );
};

const About = () => {
  return (
    <Container maxW={'container.lg'} padding={16} boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Founder />
      <Stack m={'8'} direction={['column', 'row']} alignItems={'center'}>
        <Text fontFamily={'cursive'} m="8" textAlign={['center', 'left']}>
          We are a video streaming platform with some premium courses available
          only for premium users.
        </Text>

        <Link to={'/subscribe'}>
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />

      <TandC termsAndCondition={termsAndCondition} />

      <HStack my={4} p={'4'}>
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
          children={'Payment is secured by Razorpay'}
        />
      </HStack>
    </Container>
  );
};

export default About;
