import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const params = useParams();

  const { loading, message, error } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate('/login');
    }
  }, [dispatch, error, message, navigate]);

  return (
    <Container py={16} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Reset Password"
          my={16}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />

        <VStack spacing={8}>
          <Input
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New Password"
            type={'password'}
            focusBorderColor="yellow.500"
          />

          <Button
            type="submit"
            w={'full'}
            isLoading={loading}
            colorScheme="yellow"
            children="Reset Password"
          />
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;

// https://www.youtube.com/watch?v=S-BppC7vy40&list=PLt5mNkGuWcuXc26LBe_5mBfVoN-12q_ns&index=9&ab_channel=6PackProgrammer
