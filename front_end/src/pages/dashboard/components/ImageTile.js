import {
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import { Delete } from "@material-ui/icons";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";

const useStyles = makeStyles(() => ({
  gridListTile: {
    overflow: "hidden",
    "& .MuiGridListTile-tile": {
      borderRadius: 4,
    },
    "& .MuiGridListTileBar-root": {
      opacity: 0,
    },
    "&:hover .MuiGridListTileBar-root": {
      opacity: 1,
    },
  },
}));

const ImageTile = (props) => {
  const classes = useStyles();
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteImage } = useContext(GlobalContext);

  const handelDelete = async () => {
    setIsDeleting(true);
    const err = await deleteImage(props._id);
    if (err) {
      setIsDeleting(false);
      console.log(err);
      props.enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    } else {
      props.enqueueSnackbar("Image deleted sucessfully", {
        variant: "success",
      });
    }
  };

  return (
    <GridListTile
      key={props.imageName}
      style={{ ...props.style }}
      className={classes.gridListTile}
    >
      <img src={props.image} alt={props.imageName} />
      <GridListTileBar
        title={props.imageName}
        actionIcon={
          <IconButton
            onClick={handelDelete}
            aria-label={`info about asas`}
            className={classes.icon}
          >
            {isDeleting ? (
              <CircularProgress style={{ color: "white" }} size={24} />
            ) : (
              <Delete style={{ color: "white" }} />
            )}
          </IconButton>
        }
      />
    </GridListTile>
  );
};
export default withSnackbar(ImageTile);
