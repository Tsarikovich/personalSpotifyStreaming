import useSWR from 'swr';
import {SiSpotify} from 'react-icons/si';
import Link from 'next/link'

export default function Liked() {
    const fetcher = (url) => fetch(url).then((r) => r.json());
    const {data} = useSWR('/api/getLastLikedSongs', fetcher);

    return (
        <>
            <section>
                <main className='grid items-center justify-center space-y-1 pb-10'>
                    <h1 className='text-center  xl:pb-3 pb-3 pt-3 xl:pt-3'>Recently liked tracks</h1>
                    {
                        data?.recentlyLiked.map(track => (
                            <div
                                className="pt-5 relative p-3 xl:p-2 transition-shadow border rounded-md hover:shadow-md ">
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

                    <div className="text-2xl pt-3 text-right pr-6 hyperlink">
                        <Link href={'/'}>Back</Link>
                    </div>


                </main>
            </section>
        </>
    );
}