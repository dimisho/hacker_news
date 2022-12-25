import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import GetListNews from 'API/GetListNews';
import { FeedItemSchema } from 'schemes/FeedItemSchema';
import { Main, Card, CardBody, NewsNumber, NewsInfo, NewsBlock, UpdateNewsButton } from './HomePageStyles';
import Loader from 'components/Loader/Loader';
import moment from 'moment';

export default function HomePage() {
  const [news, setNews] = useState<FeedItemSchema[]>([]);
  const [updater, setUpdater] = useState(false);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);

  const GetResponse = useCallback(async () => {
    const response = await GetListNews(page);
    if (response.data.length == 0) {
      setPage(page - 1);
      return;
    }
    setNews(response.data);
    setLoader(false);
  }, [page]);

  useEffect(() => {
    GetResponse();
    const timer = setInterval(() => {
      GetResponse();
    }, 60000);
    return () => clearInterval(timer);
  }, [updater, GetResponse]);

  return (
    <Main>
      <UpdateNewsButton
        onClick={() => {
          setUpdater(!updater);
          setLoader(true);
        }}
      >
        Update
      </UpdateNewsButton>
      {loader && <Loader />}
      {news &&
        !loader &&
        news.slice(0, 100).map((item, index) => {
          return (
            <Card key={index} bgColor={index % 2 == 0 ? 'Khaki' : 'PaleGoldenrod'}>
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
      <UpdateNewsButton
        onClick={() => {
          setUpdater(!updater);
          setLoader(true);
          page > 1 && setPage(page - 1);
        }}
      >
        Previous Page
      </UpdateNewsButton>
      <UpdateNewsButton
        onClick={() => {
          setUpdater(!updater);
          setLoader(true);
          setPage(page + 1);
        }}
      >
        Next Page
      </UpdateNewsButton>
    </Main>
  );
}
