import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-4xl font-bold text-center">Based Blobs</h1>
          <p className="text-center">
            Based Blobs is an open collection of unique, algorithmically
            generated blobs. Each blob is stored as an NFT on Base.
            The collection was created by{" Funkornaut "}to memorialize the Dencun upgrade that introduced 
            Proto-danksharding and data blobs via Ethereum improvement proposal (EIP)-4844
            <a
              href="https://twitter.com/funkornaut"
              className="text-blue-500"
              target="_blank"
              rel="noreferrer"
            >
              Funkornaut
            </a>
            .
          </p>
         
          <p className="text-center">
            Mint via frame on warpcast{" "}
            <a
              href="https://warpcast.com/funkornaut"
              className="text-blue-500"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            . 
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/blob.png"
            alt="Based Blobs"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div> 
    </main>
  );
}
