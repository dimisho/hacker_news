import { defaultColors, ThemeVariantType } from 'const/defaultColors';
import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Card = styled.div`
  background-color: ${defaultColors.card.primary};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  margin-bottom: 10px;
  width: 80%;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-family: Verdana;
  font-size: 10pt;
  a {
    color: black;
    text-decoration: none;
  }
  a:hover {
    color: ${defaultColors.text.primary};
  }
`;

export const BackButton = styled.button`
  margin-bottom: 10px;
  width: 10%;
  text-decoration: none;
  user-select: none;
  background-color: ${defaultColors.bgButton.primary};
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: Verdana;
  font-size: 10pt;
  :hover {
    background-color: ${defaultColors.hoverButton.primary};
    cursor: pointer;
  }
`;

export const NewsBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NewsInfo = styled.div`
  font-size: 10pt;
`;

export const NewsTitle = styled.p`
  font-size: 11pt;
  margin: 0px;
`;

export const UpdateItemButton = styled.button`
  margin: 20px;
  text-decoration: none;
  user-select: none;
  background-color: ${defaultColors.bgButton.primary};
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: Verdana;
  font-size: 10pt;
  :hover {
    background-color: ${defaultColors.hoverButton.primary};
    cursor: pointer;
  }
`;
