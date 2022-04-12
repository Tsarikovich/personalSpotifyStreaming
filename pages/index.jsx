import useSWR from 'swr';
import {SiSpotify} from 'react-icons/si';
import Clock from 'react-live-clock';

export default function Home() {
    const fetcher = (url) => fetch(url).then((r) => r.json());
    const {data} = useSWR('/api/spotify', fetcher);
    return (
        <>
            <section className='xl:pt-4'>
                <main className='flex flex-col items-center justify-center space-y-3'>
                    <div className="xl:flex xl:gap-x-28 pb-12 ">
                        <div className="xl:block">
                            <div className="flex flex-col items-center">
                                <Clock
                                    format={'h:mm:ssa'}
                                    style={{fontSize: '3.5em', text: 'center'}}
                                    ticking={true}
                                    className = "flex flex-col items-center"
                                />
                            </div>

                            <a
                                target='_blank'
                                rel='noopener noreferer'
                                href={
                                    data?.isPlaying
                                        ? data.songUrl
                                        : 'https://open.spotify.com/user/31up25c3755bjrop6we62atmyrgm?si=db2cc2e4a3b64f9b'
                                }
                                className='xl:pt-5 relative items-center flex p-5 space-x-4 transition-shadow border rounded-md hover:shadow-md'
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
                        </div>

                        <div className="block">

                            <h2 className='xl:text-center pl-5 xl:pb-3 pt-4 pb-3'>Recently liked tracks</h2>
                            {
                                data?.recentlyLiked.map(track => (
                                    <div
                                        className="xl:py-2 pt-5 relative flex-1 p-3 xl:p-2 transition-shadow border rounded-md hover:shadow-md ">
                                        <a
                                            className="xl:flex xl:gap-2.5 flex items-center"
                                            target='_blank'
                                            rel='noopener noreferer'
                                            href={track?.songUrl}
                                        >
                                            <div className='xl:w-fit xl:h-fit w-fit h-fit'>
                                                <img
                                                    className="xl:w-8 xl:h-8 w-16 h-16"
                                                    src={track?.albumImageUrl}
                                                    alt={track?.album}/>
                                            </div>

                                            <div className='pl-5 xl:pl-0 text-sm xl:text-sm text-justify'>
                                                <p className="font-bold">
                                                    {track?.title}
                                                </p>
                                                <p className="font-dark">
                                                    {track?.artist}
                                                </p>
                                            </div>
                                            <div className='absolute bottom-1.5 right-1.5'>
                                                <SiSpotify className='xl:w-6 xl:h-6 w-6 h-6' color={'#1ED760'}/>
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