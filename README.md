# photos - WIP
A self-hosted open-source photo/video hosting service like Flickr / Google Photos.

## Why?
I have used Google Photos and OneDrive for a while for my photo/video storage. Google Photos' free unlimited downsampled photo storage paired with the raw files in OneDrive made for a nice combination. But now that Google Photos will no longer offer free unlimited storage and with my OneDrive storage very quickly approaching the upper limit, I set out to find an alternative that is reasonably priced while offering similar features to Google Photos. There are many great services for JUST photos but when it comes to videos, they all tend to have very low limits on file size (many of my videos are 4K HDR drone footage which is very large - 5GB+) or VERY high prices. Since I couldn't find anything that fit my needs, I decided to build my own backed by any S3 compatible storage. A few terabytes of files on AWS S3 or Backblaze is very reasonably cheap.

### Goals
- Reasonably cheap for high-volumes (100GB+ per month) of photos/videos
- Great with photos AND videos
- No file-size limits (cause it is self-hosted)

## Getting Started
```bash
# install dependencies
npm install
sudo apt-get update
sudo apt-get install libimage-exiftool-perl ffmpeg

# build the TypeScript
npm run build

# start the server
npm run start
```

## Architecture
- Node.js / TypeScript / Express
- MongoDB / Mongoose
- BullMQ / Redis
- S3 Compatible Media Storage
