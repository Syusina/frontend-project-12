import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Channels from './Channels';
import Messages from './Messages';
import useAuth from '../hooks/useAuth';
import routes from '../routes';

const Chat = () => {
  const auth = useAuth();

  useEffect(
    () => {
      const fetchChat = async (token) => {
        try {
          const { data } = await axios.get(routes.usersPath(), {
            headers: {
             Authorization: `Bearer ${token}`,
            },
         });
          const { channels } = data;
          console.log(channels);
         
      } catch (error) {
        if (!error.isAxiosError) {
          console.log('unknown error');
        }
        if (error.response.status === 401) {
          console.log('go to login page');
        } else {
          console.log('network error');
        }
      }
    };
      fetchChat(auth.user.token);
  }, []);

  return (

    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row"> 
        <Channels />
        <Messages />
       </Row>
    </Container>

  );
};

export default Chat;
