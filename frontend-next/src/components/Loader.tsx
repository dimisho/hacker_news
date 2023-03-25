import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const Loader = () => {
  return (
    <LoaderBlock>
      <Spinner animation="border" />
    </LoaderBlock>
  );
};

export default Loader;

const LoaderBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
