import { defaultColors, getDefaultColor, ThemeVariantType } from 'const/defaultColors';
import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 8px;
`;

export const StyledButton = styled.button<{ variant?: ThemeVariantType }>`
  width: 80%;
  text-decoration: none;
  user-select: none;
  background-color: ${(props) => getDefaultColor(defaultColors.bgButton, props.variant)};
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: Verdana;
  font-size: 10pt;
  :hover {
    background-color: ${(props) => getDefaultColor(defaultColors.hoverButton, props.variant)};
    cursor: pointer;
  }
  :disabled,
  [disabled] {
    background-color: ${(props) => getDefaultColor(defaultColors.bgButton, props.variant)};
    cursor: not-allowed;
  }
`;

export const Card = styled.div<{ variant?: ThemeVariantType }>`
  background-color: ${(props) => getDefaultColor(defaultColors.card, props.variant)};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  margin-bottom: 10px;
  width: 80%;
`;

export const CardBody = styled.div<{ variant?: ThemeVariantType }>`
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
    color: ${(props) => getDefaultColor(defaultColors.text, props.variant)};
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
