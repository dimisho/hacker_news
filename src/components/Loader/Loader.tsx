import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { LoaderBlock } from './LoaderStyles';

const Loader = () => {
  return (
    <LoaderBlock>
      <Spinner animation="border" />
    </LoaderBlock>
  );
};

export default Loader;
