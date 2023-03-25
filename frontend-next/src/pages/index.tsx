import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import GetListNews from 'API/GetListNews';
import { FeedItemSchema } from '~/schemes/FeedItemSchema';
import Loader from '~/components/Loader';
import moment from 'moment';
import Modal from '~/components/Modal/Modal';
import { defaultColors, getDefaultColor, ThemeVariantType } from '~/const/defaultColors';
import styled from 'styled-components';

export default function HomePage() {
  const [news, setNews] = useState<FeedItemSchema[]>([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);

  const [showModalParent, setShowModalParent] = useState(false);
  const [showModalChild, setShowModalChild] = useState(false);

  const getResponse = useCallback(async () => {
    const timeOut = setTimeout(() => setLoader(true), 100);
    const response = await GetListNews(page);
    setNews(response.data);
    clearTimeout(timeOut);
    setLoader(false);
  }, [page]);

  useEffect(() => {
    getResponse();
    const timer = setInterval(() => getResponse(), 60000);

    return () => clearInterval(timer);
  }, [getResponse]);

  return (
    <Main>
      <div>
        <button onClick={() => setShowModalParent(true)}>Открыть родительскую модальку</button>
        <Modal visible={showModalParent} onClose={() => setShowModalParent(false)} closeOnEscape={false}>
          <div>
            <h1>Родительская модалька</h1>
            <button onClick={() => setShowModalChild(true)}>Открыть дочернюю модальку</button>
            <button onClick={() => setShowModalParent(false)}>Закрыть</button>
          </div>
        </Modal>
        <Modal visible={showModalChild} onClose={() => setShowModalChild(false)} closeOnEscape={true} important>
          <div>
            <h1>Дочерняя модалька</h1>
            <button onClick={() => setShowModalChild(false)}>Закрыть</button>
          </div>
        </Modal>
      </div>

      <StyledButton onClick={() => getResponse()}>Update</StyledButton>
      {loader && <Loader />}
      {!!news.length &&
        !loader &&
        news.slice(0, 100).map((item, index) => {
          return (
            <Card key={index} variant={index % 2 == 0 ? 'primary' : 'secondary'}>
              <CardBody>
                <NewsNumber>{index + 1 + (page - 1) * 10}. </NewsNumber>
                <NewsBlock>
                  <Link href={`item/${item.id}`}>{item.title}</Link>
                  <NewsInfo>
                    {item?.points} points | by {item?.user} | {moment(new Date(item.time)).fromNow()}
                  </NewsInfo>
                </NewsBlock>
              </CardBody>
            </Card>
          );
        })}
      <StyledButton onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous Page
      </StyledButton>
      <StyledButton onClick={() => setPage(page + 1)} disabled={news.length < 10}>
        Next Page
      </StyledButton>
    </Main>
  );
}

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
