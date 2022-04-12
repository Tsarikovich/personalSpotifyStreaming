import querystring from 'querystring';

const {
    CLIENT_ID: client_id,
    CLIENT_SECRET: client_secret,
    REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=10"
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token,
        }),
    });

    return response.json();
};

export function parseSongJSON(song) {
    const title = song.name;
    const artist = song.artists.map((_artist) => _artist.name).join(', ');
    const album = song.album.name;
    const albumImageUrl = song.album.images[0].url;
    const songUrl = song.external_urls.spotify;

    return {
        album,
        albumImageUrl,
        artist,
        songUrl,
        title
    }
}

export const getRecentlyPlayed = async () => {
    const {access_token} = await getAccessToken();

    return fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

export const getNowPlaying = async () => {
    const {access_token} = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export default async (_, res) => {
    const nowPlayingResponse = await getNowPlaying();
    const recentlyPlayedResponse = await getRecentlyPlayed();

    const recentlyPlayedSongs = await recentlyPlayedResponse.json();

    const filteredSongs = recentlyPlayedSongs.items.map(track => parseSongJSON(track.track))

    console.log(filteredSongs);
    if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
        return res.status(200).json({isPlaying: false, recentlyPlayed: filteredSongs});
    }

    const nowPlayingSong = await nowPlayingResponse.json();
    let data = parseSongJSON(nowPlayingSong.item);
    data['isPlaying'] = nowPlayingSong.is_playing;
    data['recentlyPlayed'] = filteredSongs;

    return res.status(200).json(data);
};