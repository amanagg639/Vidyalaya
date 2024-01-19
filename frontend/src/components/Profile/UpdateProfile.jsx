import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { updateProfile } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate('/profile');
  };

  const { loading } = useSelector(state => state.profile);

  return (
    <Container py={16} minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Update Profile"
          my={16}
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
        />
        <VStack spacing={8}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type={'text'}
            focusBorderColor="yellow.500"
          />
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type={'email'}
            focusBorderColor="yellow.500"
          />
          <Button
            w={'full'}
            isLoading={loading}
            colorScheme="yellow"
            type="submit"
            children={'Update'}
          />
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
