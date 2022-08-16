import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GetItemNews from 'API/GetItemNews';
import { ItemSchema } from 'schemes/ItemSchema';
import { Main, Card, CardBody, BackButton, NewsBlock, NewsInfo, NewsTitle, UpdateItemButton } from './ItemPageStyles';
import Comments from 'components/Comments/Comments';

export default function ItemPage() {
  const [itemNews, setItemNews] = useState<ItemSchema>();
  const [updater, setUpdater] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const GetResponse = async () => {
      const response = await GetItemNews(id);
      setItemNews(response.data);
    };
    GetResponse();
    const timer = setInterval(() => {
      GetResponse();
    }, 60000);
    return () => clearInterval(timer);
  }, [updater, id]);

  return (
    <Main>
      {itemNews && (
        <Card>
          <CardBody>
            <Link to={'/'}>
              <BackButton>Back</BackButton>
            </Link>

            <NewsBlock>
              <NewsTitle>{itemNews.title}</NewsTitle>
              <NewsInfo>
                {typeof itemNews?.url !== 'undefined' && itemNews?.url.indexOf('item?id=') == -1 ? (
                  <p>
                    Link: <a href={itemNews?.url}>{itemNews?.url}</a>
                  </p>
                ) : (
                  <p>No link</p>
                )}
                {new Date(itemNews.time * 1000).toLocaleString()} | by {itemNews.user} | {itemNews.comments_count}{' '}
                comments
              </NewsInfo>
            </NewsBlock>
            <UpdateItemButton onClick={() => setUpdater(!updater)}>Update</UpdateItemButton>
            <Comments comments={itemNews.comments} />
          </CardBody>
        </Card>
      )}
    </Main>
  );
}
