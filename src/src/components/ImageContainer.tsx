import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useDropzone } from 'react-dropzone';

import ImageTitle from './ImageTitle';
import ImageUpload from './ImageUpload';
import FileUploadBtn from './FileUploadBtn';

function ImageContainer() {
    return (
        <Container>
          <Grid
            container
            spacing={0}
            justify="center"
          >
            <ImageTitle title="Upload your Image" />
          </Grid>
          <Grid
            container
            spacing={0}
            justify="center"
          >
            <ImageUpload />
          </Grid>
          <Grid
            container
            spacing={0}
            justify="center"
          >
            or
          </Grid>
          <Grid
            container
            spacing={0}
            justify="center"
          >
            <FileUploadBtn />
          </Grid>
        </Container>
    );
}

export default ImageContainer;