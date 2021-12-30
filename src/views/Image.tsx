import { BigNumber } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import IconCross from '@/assets/cross.svg';
import IconDownload from '@/assets/download.svg';
import IconHeart from '@/assets/heart.svg';
import IconImage from '@/assets/image.svg';
import IconSpinner from '@/assets/spinner.svg';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Navbar } from '@/components/Navbar';
import { Text } from '@/components/Text';
import { useDApp } from '@/providers/dapp';
import { useNotifications } from '@/providers/notifications';
import { getLoggedIn } from '@/store/app';
import { dateformat } from '@/utils/date';
import { iterableToBase64 } from '@/utils/file';
import { ellipsisAddress , classname } from '@/utils/string';

type Params = {
  owner: string;
  uuid: string;
}

type TransactionResult = {
  ipfsHash: string,
  mime: string,
  name: string,
  uploadedAt: BigNumber,
  likes: number
}

type ImageData = {
  base64: string;
  name: string;
  uploadedAt: string;
  likes: number;
}

type ImageDataItemProps = {
  property: string;
  value: string | number;
  border?: boolean;
}

const ImageDataItem: React.FC<ImageDataItemProps> = ({ property, value, border = true }) =>
  <div
    className={
      classname(
        'px-4',
        'border-0',
        'border-solid',
        'border-separator',
        border && 'border-b',
      )
    }
  >
    <div className="flex justify-between py-2 overflow-hidden">
      <div className="mr-2">
        <Text normal>{ property }</Text>
      </div>
      <div className="ml-2">
        <Text color={'label-secondary'}>{ value }</Text>
      </div>
    </div>
  </div>;

export const Image: React.FC = () => {
  const { owner, uuid } = useParams();
  const { notify } = useNotifications();
  const dApp = useDApp();
  const isLoggedIn = useSelector(getLoggedIn);
  const [state, setState] = useState<'LOADING' | 'OK' | 'ERROR'>('LOADING');
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [likeInProgress, setLikeInProgress] = useState(false);

  const validateParams = (): Params | null => {
    if (typeof owner !== 'string') {
      notify('Invalid owner address', 'error');
      return null;
    }

    if (typeof uuid !== 'string') {
      notify('Invalid file identifier', 'error');
      return null;
    }

    return { owner, uuid };
  };

  const getFileTx = async (): Promise<TransactionResult | null> => {
    if (!dApp.contract.readonly) {
      notify('Unable to connect to contract', 'error');
      return null;
    }

    const params = validateParams();
    if (!params) {
      return null;
    }

    try {
      const tx = await dApp.contract.readonly.getFile(params.owner, params.uuid);
      return {
        ipfsHash: tx.ipfsHash,
        mime: tx.mime,
        name: tx.name,
        uploadedAt: tx.uploadedAt,
        likes: tx.likes,
      };
    } catch (e) {
      notify('Transaction error', 'error');
      return null;
    }
  };

  const getFileBase64 = async (hash: string): Promise<string | null> => {
    if (!dApp.ipfs) {
      notify('Unable to connect to IPFS', 'error');
      return null;
    }

    try {
      const res = dApp.ipfs.cat(hash);
      return await iterableToBase64(res);
    } catch (e) {
      notify('IPFS error', 'error');
      return null;
    }
  };

  const getFile = async (): Promise<void> => {
    const tx = await getFileTx();
    if (!tx) {
      return;
    }

    if (tx.ipfsHash.length === 0) {
      setState('ERROR');
      return;
    }

    const base64 = await getFileBase64(tx.ipfsHash);
    if (!base64) {
      setState('ERROR');
      return;
    }

    setImageData({
      base64: `data:${tx.mime};base64,${base64}`,
      name: tx.name,
      uploadedAt: dateformat('YYYY-MM-DD HH:mm:ss', new Date(tx.uploadedAt.toNumber() * 1e3)),
      likes: tx.likes,
    });

    setState('OK');
  };

  const like = async (): Promise<void> => {
    if (!isLoggedIn || !imageData) {
      return;
    }

    if (!dApp.contract.full) {
      notify('Unable to connect to contract', 'error');
      return;
    }

    const params = validateParams();
    if (!params) {
      return;
    }

    setLikeInProgress(true);

    try {
      const tx = await dApp.contract.full.like(params.owner, params.uuid);
      await tx.wait();

      setImageData({
        ...imageData,
        likes: imageData.likes + 1,
      });
    } catch (e) {
      notify('Transaction error', 'error');
    } finally {
      setLikeInProgress(false);
    }
  };

  const download = (): void => {
    if (!imageData) {
      return;
    }

    const link = document.createElement('a');
    link.setAttribute('href', imageData.base64);
    link.setAttribute('download', imageData.name);
    link.click();
  };

  useEffect(() => {
    (async (): Promise<void> => await getFile())();
  }, [dApp.contract.readonly, uuid, owner]);

  return <AppLayout header={<Navbar />}>
    {
      state === 'OK' && imageData &&
      <div className="md:flex">
        <div className="mr-0 mb-4 md:mb-0 md:mr-2 basis-1/2">
          <Card label={'Image'} compact>
            <img src={imageData.base64} alt=""/>
          </Card>
        </div>
        <div className="ml-0 md:ml-2 basis-1/2">
          <Card label={'Information'} compact>
            {
              owner &&
              <ImageDataItem
                property={'Owner'}
                value={ellipsisAddress(owner)}
              />
            }
            <ImageDataItem
              property={'Name'}
              value={imageData.name}
            />
            <ImageDataItem
              property={'Uploaded at'}
              value={imageData.uploadedAt}
            />
            <ImageDataItem
              property={'Likes'}
              value={imageData.likes}
              border={false}
            />
          </Card>
          <div className="mt-2 flex items-center">
            {
              isLoggedIn &&
              <div className="mr-1 flex-grow basis-1/2">
                <Button
                  icon={
                    <Icon color={'white'} className={classname(likeInProgress && 'animate-spin')}>
                      { likeInProgress ? <IconSpinner /> : <IconHeart /> }
                    </Icon>
                  }
                  disabled={likeInProgress}
                  size={'sm'}
                  block
                  onClick={like}
                >
                  Like
                </Button>
              </div>
            }
            <div
              className={
                classname(
                  !isLoggedIn && 'flex-grow',
                  isLoggedIn && 'ml-1',
                  isLoggedIn && 'basis-1/2'
                )
              }
            >
              <Button
                icon={
                  <Icon color={'white'}>
                    <IconDownload />
                  </Icon>
                }
                size={'sm'}
                block
                onClick={download}
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    }
    {
      state === 'LOADING' &&
      <div className="flex items-center justify-center flex-grow">
        <div className="flex flex-col items-center animate-pulse">
          <Icon color={'gray-2'} className="h-16 w-16 mb-3">
            <IconImage />
          </Icon>
          <Text type={'headline'} color={'gray-2'} normal>Loading image data</Text>
        </div>
      </div>
    }
    {
      state === 'ERROR' &&
      <div className="flex items-center justify-center flex-grow">
        <Card
          header={
            <Icon color={'orange'} className="w-16 h-16">
              <IconCross />
            </Icon>
          }
          title={'Image not found'}
          description={'Make sure you have provided right owner address and file id'}
          align={'center'}
          size={'md'}
        />
      </div>
    }
  </AppLayout>;
};
