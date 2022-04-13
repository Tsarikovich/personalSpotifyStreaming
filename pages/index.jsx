import useSWR from 'swr';
import {SiSpotify} from 'react-icons/si';
import Clock from 'react-live-clock';
import Link from 'next/link'

export default function Home() {
    const fetcher = (url) => fetch(url).then((r) => r.json());
    const {data} = useSWR('/api/getCurrentPlaying', fetcher);

    return (
        <>
            <section className='grid justify-items-center items-center h-screen text-center'>
                <main className=''>
                    <Clock
                        format={'h:mm:ssa'}
                        style={{fontSize: '3.6em', text: 'center'}}
                        ticking={true}
                    />

                    <h1 className="pb-2">{data?.isPlaying ? "Currently playing track" : ""}</h1>

                    <a
                        target='_blank'
                        rel='noopener noreferer'
                        href={
                            data?.isPlaying
                                ? data.songUrl
                                : 'https://open.spotify.com/user/31up25c3755bjrop6we62atmyrgm?si=db2cc2e4a3b64f9b'
                        }
                        className=' xl:pt-5 relative items-center flex p-5 space-x-4 transition-shadow border rounded-md hover:shadow-md'
                    >
                        <div className='xl:w-fit xl:h-fit'>
                            {data?.isPlaying ? (
                                <img
                                    className='xl:w-48 xl:h-48 w-48 h-48'
                                    src={data?.albumImageUrl}
                                    alt={data?.album}
                                />
                            ) : (
                                <SiSpotify size={64} color={'#1ED760'}/>
                            )}
                        </div>
                        <div className='flex-1 xl:text-xl items-center'>
                            <p className='font-bold component'>
                                {data?.isPlaying ? data.title : 'Not Listening'}
                            </p>
                            <p className='font-dark'>
                                {data?.isPlaying ? data.artist : 'Spotify'}
                            </p>
                        </div>
                        <div className='absolute bottom-1.5 right-1.5'>
                            <SiSpotify className='xl:w-8 xl:h-8 w-12 h-12' color={'#1ED760'}/>
                        </div>
                    </a>
                    <div className="text-base pt-1 text-right pr-5 hyperlink">
                        <Link href={'/liked'}>My last 10 liked songs</Link>
                    </div>

                </main>
            </section>
        </>
    );
}