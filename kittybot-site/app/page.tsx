import Image from 'next/image';
import Head from 'next/head';
import KittyBot from '@/components/kittybot';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex flex-col items-center min-h-screen p-24">
        <Head>
          <title>KittyBott | AI Generated Marketing</title>
          <meta 
            name="description"
            content="Generate branding snippets for your product."
          />
          <link rel="icon" href="/favicon.ico" />
         </Head> 
          <KittyBot /> 
        
        
      </div>
    </main>
  );
}
