<h3 align="center">photos - WIP</h3>

<div align="center">

[![GitHub Issues](https://img.shields.io/github/issues/nprail/photos.svg)](https://github.com/nprail/photos/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/nprail/photos.svg)](https://github.com/nprail/photos/pulls)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

</div>

---

<p align="center"> A self-hosted open-source photo/video hosting service like Flickr / Google Photos
    <br> 
</p>

This project is a work-in-progress.

## 📝 Table of Contents

- [Why?](#why)
- [Getting Started](#getting_started)
- [Authors](#authors)
- [Architecture](#architecture)

## ❓ Why? <a name = "why"></a>

I have used Google Photos and OneDrive for a while for my photo/video storage. Google Photos' free unlimited downsampled photo storage paired with the raw files in OneDrive made for a nice combination. But now that Google Photos will no longer offer free unlimited storage and with my OneDrive storage very quickly approaching the upper limit, I set out to find an alternative that is reasonably priced while offering similar features to Google Photos. There are many great services for JUST photos but when it comes to videos, they all tend to have very low limits on file size (many of my videos are 4K HDR drone footage which is very large - 5GB+) or VERY high prices. Since I couldn't find anything that fit my needs, I decided to build my own backed by any S3 compatible storage. A few terabytes of files on AWS S3 or Backblaze is very reasonably cheap.

### Goals

- Reasonably cheap for high-volumes (100GB+ per month) of photos/videos
- Great with photos AND videos
- No file-size limits (cause it is self-hosted)
- Easy to set up & maintain

## 🏁 Getting Started <a name = "getting_started"></a>

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

## ✍️ Authors <a name = "authors"></a>

- [@nprail](https://github.com/nprail) - Maintainer

See also the list of [contributors](https://github.com/nprail/photos/contributors) who participated in this project.

## 🏗 Architecture <a name = "architecture"></a>

- Node.js / TypeScript / Express
- MongoDB / Mongoose
- Redis / BullMQ
- S3 Compatible Media Storage
