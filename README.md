# proxy-maker

A [node.js](https://nodejs.org) tool to generate PDFs with cardgame proxies for printing.

---

## Dependencies

Have node installed, then run `npm install` in the project folder

--- 

## Usage

1) You'll need a txt file with the list of cards you want to print in the following format:

```
3x card name 1
4x anotherCard
2x Beer Luffy
```

2) You'll need a folder with the images, where for each `card name` in the list above you'll need a `card name.jpg` in the folder.

The names in the list must match file names in the folder.
The extension doesn't matter (any image type will work).
Leading/trailing spaces in the list are ignored.


For the list in *#1* you could have a folder with:
```
card name 1.jpg
anotherCard.png
Beer Luffy.gif
```

3) Run the script like this:
`node proxy --list path/to/the/cardlist.txt --images path/to/the/image/folder`

By default it will generate the print at `./output.pdf` using A4 paper size and 300ppi.

But you can also change those by passing other options:
```
--output path/to/where/you/want/the/output/file.pdf
--paper A3    (only A3 and A4 are currently supported, A4 is the default)
--ppi 150      (any resolution you want)
```

---

## OPTCG Image Downloader

There's also a script to download OPTCG images directly from the official website. 
You'll need to have all names in your list as the card code, for instance:

```
4xST28-002
4xST28-001
4xOP09-035
4xOP06-100
```

Then run:
`node opDownloader --list path/to/the/list.txt --output path/to/a/folder`

You can then run the command to generate the pdf right after:
`node proxy --list path/to/the/list.txt --images path/to/the/same/folder`