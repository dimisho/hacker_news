import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GetItemNews from 'API/GetItemNews';
import { ItemSchema } from 'schemes/ItemSchema';
import { defaultColors, ThemeVariantType } from '~/const/defaultColors';
import styled from 'styled-components';
import Comments from '~/components/Comments/Comments';
import Loader from '~/components/Loader';

export default function ItemPage() {
  const [itemNews, setItemNews] = useState<ItemSchema>();
  const [updater, setUpdater] = useState<boolean>(false);
  const [loader, setLoader] = useState(true);
  const params = useSearchParams();

  useEffect(() => {
    const GetResponse = async () => {
      const response = await GetItemNews(params.get('id'));
      setItemNews(response.data);
      setLoader(false);
    };
    GetResponse();
    const timer = setInterval(() => {
      GetResponse();
    }, 60000);
    return () => clearInterval(timer);
  }, [params, updater]);

  return (
    <Main>
      {itemNews && !loader && (
        <Card>
          <CardBody>
            <Link href={'/'}>
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
