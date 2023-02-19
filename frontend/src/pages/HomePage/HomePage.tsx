import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import GetListNews from 'API/GetListNews';
import { FeedItemSchema } from 'schemes/FeedItemSchema';
import { Main, Card, CardBody, NewsNumber, NewsInfo, NewsBlock, StyledButton } from './HomePageStyles';
import Loader from 'components/Loader/Loader';
import moment from 'moment';
import Modal from 'components/Modal/Modal';

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
                  <Link to={`/${item.id}`}>{item.title}</Link>
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
