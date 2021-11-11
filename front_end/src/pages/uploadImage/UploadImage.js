import { useState, useContext } from "react";
import { withSnackbar } from "notistack";
import clsx from "clsx";
import {
  Container,
  Typography,
  Button,
  TextField,
  makeStyles,
  Paper,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

import { GlobalContext } from "../../context/GlobalState";
import toBase64 from "./toBase64";
import validateFormData from "./validate";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(4),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  nameFeild: {
    marginTop: theme.spacing(4),
  },

  /* IMage Upload Container */
  uploadFeild: {
    marginTop: theme.spacing(2),
    position: "relative",
    padding: 0,
    overflow: "hidden",
    width: "100%",
    height: "300px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
    },

    color: theme.palette.grey[500],
    fontSize: "3rem",
  },
  uploadFeildError: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },
  image: {
    position: "absolute",
    width: "auto",
    maxWidth: "100%",
    height: "auto",
    maxHeight: "300px",
    zIndex: 1,
  },

  /* input[type='file'] */
  imageFeild: {
    position: "absolute",
    bottom: "0",
    height: "100%",
    zIndex: 2,

    "& .MuiOutlinedInput-root, & .MuiOutlinedInput-input": {
      height: "100%",
      opacity: 0,
      cursor: "pointer",
    },
  },
  icon: {
    marginBottom: theme.spacing(3),
  },
}));

const UploadImage = (props) => {
  const classes = useStyle();
  const { addImage } = useContext(GlobalContext);

  const [formData, setFormData] = useState({ imageName: "", image: "" });
  const [formErrors, setFormErrors] = useState({ imageName: "", image: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;

    const imageSizeInMb = (e.target.files[0].size / 1000000).toFixed(2);

    if (imageSizeInMb > 1.5)
      return setFormErrors({
        ...formErrors,
        image: "Image size should be less than 1.5MB",
      });

    setFormErrors({
      ...formErrors,
      image: "",
    });

    const base64 = await toBase64(e.target.files[0]);

    setFormData({ ...formData, image: base64 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFormData(formData);
    if (errors) return setFormErrors(errors);
    setFormErrors({});
    setIsLoading(true);

    const err = await addImage(formData);
    if (err) {
      setFormErrors(err);
    } else {
      setFormData({ imageName: "", image: "" });
      setFormErrors({});
      props.enqueueSnackbar("Image is uploaded", {
        variant: "success",
      });
    }
    setIsLoading(false);
  };

  const uploadContainerClass = clsx({
    [classes.uploadFeild]: true,
    [classes.uploadFeildError]: Boolean(formErrors.image),
  });

  return (
    <Container
      component="form"
      onSubmit={handleSubmit}
      className={classes.container}
      maxWidth="sm"
    >
      <div className={classes.header}>
        <Typography component="h1" variant="h5">
          Upload Image
        </Typography>
        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={isLoading}
          color="primary"
        >
          Submit
        </Button>
      </div>
      <TextField
        fullWidth
        type="text"
        name="imageName"
        label="Image Name"
        variant="outlined"
        onChange={handleChange}
        value={formData.imageName}
        className={classes.nameFeild}
        error={!!formErrors.imageName}
        helperText={formErrors.imageName}
      />

      <FormControl margin="normal" fullWidth>
        <Paper variant="outlined" className={uploadContainerClass}>
          {!formData.image && (
            <>
              <CloudUpload fontSize="inherit" className={classes.icon} />
              <Typography> Drag & Drop or Click</Typography>
              <Typography> to upload</Typography>
            </>
          )}
          <TextField
            fullWidth
            type="file"
            inputProps={{ accept: "image/*" }}
            name="image"
            variant="outlined"
            className={classes.imageFeild}
            onChange={handleImageChange}
          />
          {formData.image && (
            <img
              src={formData.image}
              className={classes.image}
              alt="select"
            />
          )}
        </Paper>
        {formErrors.image && (
          <FormHelperText style={{ marginLeft: "16px" }} error>
            {formErrors.image}
          </FormHelperText>
        )}
      </FormControl>
    </Container>
  );
};

export default withSnackbar(UploadImage);
