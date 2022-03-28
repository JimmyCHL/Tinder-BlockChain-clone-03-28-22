import Moralis from 'moralis/node';
import { ethers } from 'ethers';
import { TINDER_ADDRESS, TINDER_ABI } from '../../lib/constants';

const mintMatchNFT = async(req, res) => {
    await Moralis.start({
        serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
        appId: process.env.NEXT_PUBLIC_APP_ID,
        masterKey: process.env.NEXT_PUBLIC_MORALIS_MASTER_KEY,
    });

    console.log(req.body);

    const metadata = {
        name: `${req.body.names[0]} & ${req.body.names[1]}`,
        description: `${req.body.names[0].split(' ')[0]} & ${
      req.body.names[1].split(' ')[0]
    } just matched!`,
        image: `ipfs://QmY4tKpDGzVHzaSkQc5gzVMCMNoznZqaX15DXkyL2bPp8Z`,
    };

    const toBtoa = Buffer.from(JSON.stringify(metadata)).toString('base64');
    console.log(toBtoa);

    //can save object or file
    const metadataFile = new Moralis.File('file.json', { base64: toBtoa });

    await metadataFile.saveIPFS({ useMasterKey: true });

    //can get the uri after directly
    const metadataURI = await metadataFile.ipfs();

    console.log(metadataURI);

    const provider = ethers.getDefaultProvider(process.env.ALCHEMY_API_URL, {
        alchemy: process.env.ALCHEMY_API_KEY,
    });

    //this person would pay for gas fee
    const walletWithProvider = new ethers.Wallet(
        process.env.WALLET_PRIVATE_KEY,
        provider
    );

    const contract = new ethers.Contract(
        TINDER_ADDRESS,
        TINDER_ABI,
        walletWithProvider
    );

    console.log(contract);

    const tx = await contract.mintNFT(
        req.body.walletAddresses[0],
        req.body.walletAddresses[1],
        metadataURI
    );

    console.log(tx);

    const txReceipt = await tx.wait();

    console.log(txReceipt);

    res
        .status(200)
        .send({ message: 'success', data: { tx: tx, txReceipt: txReceipt } });
};

export default mintMatchNFT;