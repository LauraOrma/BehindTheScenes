import React from 'react';
import YouTube from 'react-youtube';

function onReady(event: any) {
    event.target.pauseVideo();
}

function YoutubeVideo(props: any) {
    const opts = {
        height: '500',
        width: '800',
    };

    return (
        <YouTube
            videoId={props.video}
            opts={opts}
            onReady={onReady}/>
    );
}

export default YoutubeVideo;