import querystring from 'querystring';
import {parseSongJSON} from "./getCurrentPlaying";

const {
    CLIENT_ID: client_id,
    CLIENT_SECRET: client_secret,
    REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const RECENTLY_LIKED_ENDPOINT = "\thttps://api.spotify.com/v1/me/tracks?limit=15"
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

export const getRecentlyLiked = async () => {
    const {access_token} = await getAccessToken();

    return fetch(RECENTLY_LIKED_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

export default async (_, res) => {
    const recentlyLikedResponse = await getRecentlyLiked();
    const recentlyLikedJSON = await recentlyLikedResponse.json();
    const filteredSongs = recentlyLikedJSON.items.map(track => parseSongJSON(track.track))

    return res.status(200).json({recentlyLiked: filteredSongs});
};