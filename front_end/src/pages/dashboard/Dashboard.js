import { useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import {
  GridList,
  withWidth,
  isWidthUp,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalState";
import Loading from "../../components/Loading";
import ImageTile from "./components/ImageTile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "75vh",
    flexDirection: "column",
  },
  emptyImage: {
    width: "25vw",
    height: "25vh",
    margin: theme.spacing(4, 0),
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();

  const { loadImages, images } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!images.length) {
      setIsLoading(true);
      loadImages()
        .then(() => setIsLoading(false))
        .catch((err) => setIsLoading(false) && console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loading />;

  const getGridListCols = () => {
    if (isWidthUp("xl", props.width)) {
      return 6;
    }

    if (isWidthUp("lg", props.width)) {
      return 4;
    }

    if (isWidthUp("md", props.width)) {
      return 2;
    }

    return 1;
  };

  if (!isLoading && !images.length) {
    return (
      <div className={classes.root}>
        <Typography variant="h6">No Images Uploaded yet!</Typography>
        <img
          className={classes.emptyImage}
          src="assets/images/empty.svg"
          alt="no images added"
        />
        <Button
          onClick={() => props.history.push("/upload")}
          variant="contained"
          disableElevation
          color="primary"
        >
          Upload Image
        </Button>
      </div>
    );
  }

  return (
    <GridList cols={getGridListCols()} spacing={12} cellHeight={220}>
      {images.map((imageObj) => (
        <ImageTile {...imageObj} key={uuid()} />
      ))}
    </GridList>
  );
};

export default withWidth()(Dashboard);
