import styled from 'styled-components';

export const CommentBlock = styled.div<{ marginLeft: `${number}px` }>`
  background-color: Khaki;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-left: 6px solid DarkKhaki;
  margin-left: ${(props) => props.marginLeft};
  font-family: Verdana;
  font-size: 10pt;
`;

export const AuthorComment = styled.p`
  font-size: 11pt;
`;

export const ShowMoreButton = styled.button`
  margin-bottom: 10px;
  width: 10%;
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
