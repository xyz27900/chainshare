import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';
import IconSpinner from '@/assets/spinner.svg';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { FileInput } from '@/components/FileInput';
import { Icon } from '@/components/Icon';
import { Navbar } from '@/components/Navbar';
import { useDApp } from '@/providers/dapp';
import { useNotifications } from '@/providers/notifications';
import { getAccount } from '@/store/app';
import { fileToBuffer } from '@/utils/file';

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'];

export const Upload: React.FC = () => {
  const { notify } = useNotifications();
  const dApp = useDApp();
  const account = useSelector(getAccount);
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const invalidFormat = !ALLOWED_FILE_TYPES.includes(file?.type ?? '');

  const addFile = async (data: File): Promise<string | null> => {
    if (!dApp.ipfs) {
      notify('Unable to connect to IPFS', 'error');
      return null;
    }

    try {
      const buffer = await fileToBuffer(data);
      const res = await dApp.ipfs.add(buffer);
      return res.path;
    } catch (e) {
      notify('IPFS error', 'error');
      return null;
    }
  };

  const addFileTx = async (ipfsHash: string, data: File): Promise<string | null> => {
    if (!dApp.contract.full) {
      notify('Unable to connect to contract', 'error');
      return null;
    }

    try {
      const uuid = v4();
      const tx = await dApp.contract.full.uploadFile(uuid, ipfsHash, data.type, data.name);
      await tx.wait();
      return uuid;
    } catch (e) {
      notify('Transaction error', 'error');
      return null;
    }
  };

  const upload = async (): Promise<void> => {
    if (!file) {
      notify('File not provided', 'error');
      return;
    }

    if (invalidFormat) {
      notify('Invalid file format', 'error');
      return;
    }

    if (file.size > 100 * 10 ** 6) {
      notify('File is too large', 'error');
      return;
    }

    setUploadInProgress(true);

    const ipfsHash = await addFile(file);
    if (!ipfsHash) {
      setUploadInProgress(false);
      return;
    }

    const fileUuid = await addFileTx(ipfsHash, file);
    if (!fileUuid) {
      setUploadInProgress(false);
      return;
    }

    navigate(`/image/${account}/${fileUuid}`);
  };

  return <AppLayout header={<Navbar />}>
    <div className="flex flex-col flex-grow justify-center items-center">
      <Card
        title={'Upload image'}
        description={file ? file.name : 'Choose image from your device to upload to blockchain'}
        truncate
      >
        <FileInput
          disabled={uploadInProgress}
          accept={ALLOWED_FILE_TYPES}
          file={file}
          onChange={setFile}
        />
        {
          file &&
          <div className="mt-3">
            <Button
              disabled={uploadInProgress}
              block
              onClick={upload}
            >
              {
                uploadInProgress ?
                  <Icon color={'white'} className="w-6 h-6 animate-spin">
                    <IconSpinner />
                  </Icon> :
                  'Upload'
              }
            </Button>
          </div>
        }
      </Card>
    </div>
  </AppLayout>;
};
