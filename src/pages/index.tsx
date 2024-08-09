import React from 'react';
import Chatbox from '../components/Chatbox';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="h-screen bg-gray-100">
      <Chatbox />
    </div>
  );
};

export default Home;
