"use strict";

const config = require('../config');
const fs = require('fs');
const request = require('request');
const sharp = require('sharp');


module.exports = {

    downloadMediaByUrl: (mediaUrl, fileDestPath, callback) => {

        request(mediaUrl).pipe(fs.createWriteStream(fileDestPath))
            .on('close', function () {
                //console.log("saving process is done!");
            });
    },

    getMediaFileUrl: (fileName = "", folderName = "", subFolderId = "", placeholder = true) => {

        var mediaUrl = "";
        if (fileName == "" && placeholder) {
            mediaUrl = config.siteUrl + "/default/placeholder-" + folderName + ".jpg";
        } else {
            mediaUrl = config.siteUrl + "/uploads/" + folderName + "/";
            if (subFolderId != "") {
                mediaUrl += subFolderId + "/";
            }
            mediaUrl += fileName;
        }
        return mediaUrl;
    },

    getMediaTypeByExtension: (extension) => {

        extension = extension.toLowerCase();
        var image_type_extensions = ['jpeg', 'jpg', 'png'];
        var video_type_extensions = ['mp4', '3gp', 'wmv', 'webm', 'flv'];
        var doc_type_extensions = ['doc', 'docx', 'odt', 'pdf'];
        var audio_type_extensions = ['mp3', 'wma'];

        if (image_type_extensions.includes(extension)) {
            var type = 'image';
        } else if (video_type_extensions.includes(extension)) {
            var type = 'video';
        } else if (doc_type_extensions.includes(extension)) {
            var type = 'document';
        } else if (audio_type_extensions.includes(extension)) {
            var type = 'audio';
        } else {
            var type = '';
        }
        return type;
    },

    getMediaTypeByMimeType: (mimeType) => {

        var image_type_mimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        var video_type_mimeTypes = ['video/mp4', 'video/3gp', 'video/wmv', 'video/webm', 'video/flv'];
        var doc_type_mimeTypes = ['application/doc', 'application/docx', 'application/odt', 'application/pdf', 'application/xlsx'];
        var audio_type_mimeTypes = ['audio/mp3', 'audio/wma'];

        if (image_type_mimeTypes.includes(mimeType)) {
            var type = 'image';
        } else if (video_type_mimeTypes.includes(mimeType)) {
            var type = 'video';
        } else if (doc_type_mimeTypes.includes(mimeType)) {
            var type = 'document';
        } else if (audio_type_mimeTypes.includes(mimeType)) {
            var type = 'audio';
        } else {
            var type = '';
        }
        return type;
    },

    createDirectory: (path) => {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path,{ recursive: true })
        }
    },

    deleteFile: (path) => {
        if (fs.existsSync(path)) {
            fs.unlinkSync(path, function (err) { console.log(err.toString()); });
        }
    },

    deleteFolderRecursive: (path) => {

        if (fs.existsSync(path)) {

            fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    },

    uploadFile: (fileData, destPath) => {

        var fileName = Date.now() + fileData.name.replace(/[^0-9a-z.]/gi, '');
        var destFilePath = destPath + "/" + fileName;
        var file_data_bitmap = new Buffer.from(fileData.data, 'base64');

        fs.writeFileSync(destFilePath, file_data_bitmap, function (err) {
            if (err) { throw err; }
        });
        return fileName;
    },

    createThumbnail: (filePath, thumbPath, width = 200, height = 200) => {
        sharp(filePath)
            .rotate()
            .resize(width, height)
            .toFile(thumbPath)
            .then(data => { })
            .catch(err => { console.log(err.toString()) });
    },
    savePDF: (fileData, destPath) => {

        var fileName = Date.now() + fileData.name.replace(/[^0-9a-z.]/gi, '');
        var destFilePath = destPath + "/" + fileName +".pdf";
        var file_data_bitmap = new Buffer.from(fileData.data, 'base64');

        fs.writeFileSync(destFilePath, file_data_bitmap, function (err) {
            if (err) { throw err; }
        });
        return fileName;
    },

}