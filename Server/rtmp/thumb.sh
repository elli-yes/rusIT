#!/bin/sh
ffmpeg -i /tmp/hls/$1.mp4 -ss 00:00:01 -frames:v 1 /tmp/hls/$1.png;
