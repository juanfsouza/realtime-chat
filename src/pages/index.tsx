import React from 'react';
import Chat from '../components/Chat';
import { NextPage } from 'next';

const Home: NextPage = () => {
    return (
      <div className="h-screen bg-gray-100">
        <Chat />
      </div>
    );
  };

export default Home;
