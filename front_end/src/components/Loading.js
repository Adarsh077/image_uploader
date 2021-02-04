import { LinearProgress, makeStyles } from "@material-ui/core";

const useLoadingStyle = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progress: {
    width: "40vh",
  },
}));

const Loading = () => {
  const classes = useLoadingStyle();

  return (
    <div className={classes.container}>
      <LinearProgress className={classes.progress} />
    </div>
  );
};

export default Loading;
