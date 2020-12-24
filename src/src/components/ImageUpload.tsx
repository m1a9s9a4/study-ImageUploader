import React, {useState, useCallback} from 'react';
import image from '../image.svg';
import {makeStyles, Theme} from '@material-ui/core';
import {useDropzone} from 'react-dropzone';
import { Progress } from 'reactstrap';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: "40%",
    border: '1px dotted',
    borderRadius: '5px',
    padding: '30px'
  },
  image: {
    width: "80%",
    marginLeft: "10%",
  }
}));

function ImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState({});
  const onDrop = useCallback(acceptedFiles => {
    setIsUploading(true);
    setIsUploaded(false);
    acceptedFiles.forEach((file: File) => {
      const params = new FormData();
      params.append('file', file);
      setTimeout(() => {
        axios.post('http://localhost:8000/api/upload/',
          params,
          {
            headers: {
            'content-type': 'multipart/form-data',
          },
        })
          .then(({data}) => {
            const newProgress = progress + 100 / acceptedFiles.length;
            setProgress(newProgress);
            console.log(data);
            const newFiles = {path: data.path, name: data.name};
            setFiles(newFiles);
          })
          .catch((error) => {
            console.error(error);
          })
      }, 3000)
    });
  }, [progress, setIsUploading])
  const {getRootProps, getInputProps} = useDropzone({onDrop});
  const classes = useStyles();

  if (isUploading && progress === 100) {
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
    }, 1000)
  }
  return (
    <div className={classes.wrapper}>
      {isUploaded ? (
        <ul>
          <a href={files.path}>{files.name}</a>
        </ul>
      ) : (
        ""
      )}

      {isUploading ? (
          <div>
            {progress >= 100 ? (
              <div className="text-center">uploaded!</div>
            ) : (
              <div>
                <div className="text-center">{progress}%</div>
                <Progress value={progress} />
              </div>
            )}
          </div>
        ) : (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <img src={image} alt="uploading" className={classes.image}/>
            <p className="text-center">Drag & Drop your image here</p>
            {/*<ul>{files}</ul>*/}
          </div>
        )}
    </div>
  )
}

export default ImageUpload;