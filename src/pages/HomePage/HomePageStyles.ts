import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const UpdateNewsButton = styled.button`
  margin-bottom: 10px;
  width: 80%;
  text-decoration: none;
  user-select: none;
  background-color: PeachPuff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: Verdana;
  font-size: 10pt;
  :hover {
    background-color: #ffecdb;
    cursor: pointer;
  }
  :active {
    background-color: #ffecdb;
  }
`;

export const Card = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  margin-bottom: 10px;
  width: 80%;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  font-family: Verdana;
  font-size: 10pt;
  a {
    color: black;
    text-decoration: none;
  }
  a:hover {
    color: DarkSlateGrey;
  }
`;

export const NewsNumber = styled.div`
  margin-right: 5px;
`;

export const NewsBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NewsInfo = styled.div`
  font-size: 9pt;
`;
