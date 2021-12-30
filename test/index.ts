import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { Storage, Storage__factory } from '@/typechain';

describe('Storage', (): void => {
  let storageFactory: Storage__factory;
  let storage: Storage;
  let alice: SignerWithAddress;

  const uuid = 'test-uuid';
  const ipfsHash = 'test-ipfs-hash-0000000000000000000000000000000';
  const mime = 'test-mime';
  const name = 'test-file';

  beforeEach(async (): Promise<void> => {
    storageFactory = await ethers.getContractFactory('Storage');
    [alice] = await ethers.getSigners();

    storage = await storageFactory.deploy();
  });

  it('Should put file data in storage', async () => {
    const res = await storage.uploadFile(uuid, ipfsHash, mime, name, { from: alice.address });

    expect(res)
      .to.emit(storage, 'FileUploaded')
      .withArgs(alice.address, ipfsHash, mime, name, BigNumber);
  });

  it('Should receive file hash', async (): Promise<void> => {
    await storage.uploadFile(uuid, ipfsHash, mime, name, { from: alice.address });

    const res = await storage.getFile(alice.address, uuid);
    expect(res.ipfsHash).to.equal(ipfsHash);
    expect(res.mime).to.equal(mime);
    expect(res.name).to.equal(name);
  });

  it('Should increment likes counter', async (): Promise<void> => {
    await storage.uploadFile(uuid, ipfsHash, mime, name, { from: alice.address });

    await storage.like(alice.address, uuid);
    const res2 = await storage.getFile(alice.address, uuid);
    expect(res2.likes).to.equal(1);
  });
});
