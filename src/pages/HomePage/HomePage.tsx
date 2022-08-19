import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetListNews from 'API/GetListNews';
import { FeedItemSchema } from 'schemes/FeedItemSchema';
import { Main, Card, CardBody, NewsNumber, NewsInfo, NewsBlock, UpdateNewsButton } from './HomePageStyles';
import Loader from 'components/Loader/Loader';

export default function HomePage() {
  const [news, setNews] = useState<FeedItemSchema[]>([]);
  const [updater, setUpdater] = useState(false);
  const [loader, setLoader] = useState(true);

  const GetResponse = async () => {
    const response = await GetListNews();
    setNews(response.map((promise) => promise.data).flat());
    setLoader(false);
  };

  useEffect(() => {
    GetResponse();
    const timer = setInterval(() => {
      GetResponse();
    }, 60000);
    return () => clearInterval(timer);
  }, [updater]);

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
                <NewsNumber>{index + 1}. </NewsNumber>
                <NewsBlock>
                  <Link to={`/${item.id}`}>{item.title}</Link>
                  <NewsInfo>
                    {item?.points} points | by {item?.user} | {new Date(item.time * 1000).toLocaleString('ru')}
                  </NewsInfo>
                </NewsBlock>
              </CardBody>
            </Card>
          );
        })}
    </Main>
  );
}
