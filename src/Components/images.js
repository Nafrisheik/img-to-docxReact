import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: 900,
      height: 650,
    },
  }));
function Images({imageList}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
      <ImageList rowHeight={460} className={classes.imageList} cols={2}>
        {imageList.map((item) => (
          <ImageListItem key={item} cols={item.cols || 1}>
            <img src={item} alt={item} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
                            )
}

export default Images
