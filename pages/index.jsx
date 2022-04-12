import useSWR from 'swr';
import {SiSpotify} from 'react-icons/si';

export default function Home() {
    const fetcher = (url) => fetch(url).then((r) => r.json());
    const {data} = useSWR('/api/spotify', fetcher);
    return (
        <>
            <section className=''>
                <main className='flex flex-col items-center justify-center min-h-screen space-y-3'>
                    <div className="xl:flex xl:gap-x-12">
                        <div className="xl:block">
                            <h1 className='text-center xl:pb-5 lg:pt-28'>Now Artur listening to..</h1>

                            <a
                                target='_blank'
                                rel='noopener noreferer'
                                href={
                                    data?.isPlaying
                                        ? data.songUrl
                                        : 'https://open.spotify.com/user/31up25c3755bjrop6we62atmyrgm?si=db2cc2e4a3b64f9b'
                                }
                                className='lg:pt-24 xl:pt-5 relative flex items-center p-5 space-x-4 transition-shadow border rounded-md hover:shadow-md'
                            >
                                <div className='xl:w-fit xl:h-fit'>
                                    {data?.isPlaying ? (
                                        <img
                                            className='xl:w-56 xl:h-56 lg:w-96 lg:h-96'
                                            src={data?.albumImageUrl}
                                            alt={data?.album}
                                        />
                                    ) : (
                                        <SiSpotify size={64} color={'#1ED760'}/>
                                    )}
                                </div>
                                <div className='flex-1 lg:text-5xl xl:text-2xl'>
                                    <p className='font-bold component'>
                                        {data?.isPlaying ? data.title : 'Not Listening'}
                                    </p>
                                    <p className='font-dark'>
                                        {data?.isPlaying ? data.artist : 'Spotify'}
                                    </p>
                                </div>
                                <div className='absolute bottom-1.5 right-1.5'>
                                    <SiSpotify className='xl:w-8 xl:h-8 lg:w-24 lg:h-24' color={'#1ED760'}/>
                                </div>
                            </a>
                        </div>
                        <div className="xl:block lg:pb-10">
                            <h1 className='text-center xl:pb-5 xl:pt-5 lg:pt-32 lg:pb-16'>Recently liked tracks</h1>
                            {
                                data?.recentlyLiked.map(track => (
                                    <div
                                        className="lg:max-w-6xl xl:py-2 lg:py-5 relative flex-1 p-5 space-x-4 transition-shadow border rounded-md hover:shadow-md ">
                                        <a
                                            className="xl:flex xl:gap-2.5 lg:flex items-center"
                                            target='_blank'
                                            rel='noopener noreferer'
                                            href={track?.songUrl}
                                        >
                                            <div className='xl:w-fit xl:h-fit lg:w-fit lg:h-fit'>
                                                <img
                                                    className="xl:w-8 xl:h-8 lg:w-56"
                                                    src={track?.albumImageUrl}
                                                    alt={track?.album}/>
                                            </div>

                                            <div className='lg:text-5xl xl:text-sm lg:text-justify'>
                                                <p className="font-bold">
                                                    {track?.title}
                                                </p>
                                                <p className="font-dark">
                                                    {track?.artist}
                                                </p>
                                            </div>
                                            <div className='absolute bottom-1.5 right-1.5'>
                                                <SiSpotify className='xl:w-8 xl:h-8 lg:w-20 lg:h-20' color={'#1ED760'}/>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}