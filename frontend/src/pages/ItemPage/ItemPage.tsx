import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GetItemNews from 'API/GetItemNews';
import { ItemSchema } from 'schemes/ItemSchema';
import { Main, Card, CardBody, BackButton, NewsBlock, NewsInfo, NewsTitle, UpdateItemButton } from './ItemPageStyles';
import Comments from 'components/Comments/Comments';
import Loader from 'components/Loader/Loader';

export default function ItemPage() {
  const [itemNews, setItemNews] = useState<ItemSchema>();
  const [updater, setUpdater] = useState<boolean>(false);
  const [loader, setLoader] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const GetResponse = async () => {
      const response = await GetItemNews(id);
      setItemNews(response.data);
      setLoader(false);
    };
    GetResponse();
    const timer = setInterval(() => {
      GetResponse();
    }, 60000);
    return () => clearInterval(timer);
  }, [updater, id]);

  return (
    <Main>
      {itemNews && !loader && (
        <Card>
          <CardBody>
            <Link to={'/'}>
              <BackButton>Back</BackButton>
            </Link>
            {loader && <Loader />}
            <NewsBlock>
              <NewsTitle>{itemNews.title}</NewsTitle>
              <NewsInfo>
                {itemNews?.url && !itemNews.url.includes('item?id=') ? (
                  <p>
                    Link: <a href={itemNews?.url}>{itemNews?.url}</a>
                  </p>
                ) : (
                  <p>No link</p>
                )}
                {new Date(itemNews.time).toLocaleString()} | by {itemNews.user} | {itemNews.comments?.length} comments
              </NewsInfo>
            </NewsBlock>
            <UpdateItemButton
              onClick={() => {
                setUpdater(!updater);
                setLoader(true);
              }}
            >
              Update
            </UpdateItemButton>
            <Comments comments={itemNews.comments} />
          </CardBody>
        </Card>
      )}
    </Main>
  );
}
