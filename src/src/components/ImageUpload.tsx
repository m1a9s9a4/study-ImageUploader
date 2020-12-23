import React, {useState, useCallback} from 'react';
import image from '../image.svg';
import {makeStyles, Theme} from '@material-ui/core';
import {useDropzone} from 'react-dropzone';
import { Progress } from 'reactstrap';

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

function saveImage(file: File) {
  console.log(file);
}


function ImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const onDrop = useCallback(acceptedFiles => {
    setIsUploading(true);
    setIsUploaded(false);
    acceptedFiles.forEach((file: File) => {
      setTimeout(() => {
        saveImage(file);
        const newProgress = progress + 100 / acceptedFiles.length;
        setProgress(newProgress);
      }, 3000)
    });
  }, [progress, setIsUploading])
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});
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
          {acceptedFiles.map((file: File, index: number) => (
            <li key={index}>{file.name}</li>
          ))}
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