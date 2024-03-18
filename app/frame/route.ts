import { NextRequest, NextResponse } from "next/server"
import { getConnectedAddressForUser } from "../utils/fc";
import { mintNft, balanceOf } from "../utils/mint";

import { PinataFDK } from "pinata-fdk";
const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT as string,
  pinata_gateway: process.env.GATEWAY_URL as string,
});

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const frameMetadata = await fdk.getFrameMetadata({
      post_url: `${process.env.BASE_URL}/frame`,
      buttons: [{ label: "Mint NFT", action: "post" }], // can probaly add in regenerate button to make new blob
        aspect_ratio: "1:1",
        image: { url: "https://ipfs.io/ipfs/QmSrDz21mqCP3b8wsZQYdcu2ejnzAXgu9fmjEHvKSp55xs" }
      //image as QmWL2qH8ykwfjonfGKyP16wB9ZsfMsXqtSykNhAVuxYYUF/based_blobs.html did not work because of the html

    //   cid: "QmSrDz21mqCP3b8wsZQYdcu2ejnzAXgu9fmjEHvKSp55xs", // likely need to change this
    });
    return new NextResponse(frameMetadata);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

// mint request
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const fid = body.untrustedData.fid; //get farcaster id
  const address = await getConnectedAddressForUser(fid); //get users wallet from farcaster
  const balance = await balanceOf(address); //do they own any NFTs
    console.log(balance);
    //they can mint only 1 nft
  if (typeof balance === "number" && balance !== null && balance < 1) {
    try {
      const mint = await mintNft(address);
      console.log(mint);
      const frameMetadata = await fdk.getFrameMetadata({
        post_url: `${process.env.BASE_URL}/redirect`,
        buttons: [{ label: "Learn How to Make This", action: "post_redirect" }],
        aspect_ratio: "1:1",
        image: { url: "https://ipfs.io/ipfs/QmSrDz21mqCP3b8wsZQYdcu2ejnzAXgu9fmjEHvKSp55xs"}
      });
      return new NextResponse(frameMetadata);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error });
    }
  } else {
    const frameMetadata = await fdk.getFrameMetadata({
      post_url: `${process.env.BASE_URL}/redirect`,
      buttons: [{ label: "Learn How to Make This", action: "post_redirect" }],
      aspect_ratio: "1:1",
      image: { url: "https://ipfs.io/ipfs/QmSrDz21mqCP3b8wsZQYdcu2ejnzAXgu9fmjEHvKSp55xs"}
    });
    return new NextResponse(frameMetadata);
  }
}