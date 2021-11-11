import { useState } from "react";
import {
  Grid,
  Link,
  Button,
  Avatar,
  Checkbox,
  TextField,
  Container,
  makeStyles,
  Typography,
  IconButton,
  InputLabel,
  CssBaseline,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  FormControlLabel,
} from "@material-ui/core/";
import { Link as RouterLink } from "react-router-dom";
import { LockOutlined, Visibility, VisibilityOff } from "@material-ui/icons";

import validateLoginFormData from "./validate";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

const useStyle = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(8),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyle();
  const { login } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    email: "test@gmail.com",
    password: "12345678",
    shouldRemeber: false,
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "shouldRemeber")
      return setFormData({
        ...formData,
        shouldRemeber: !formData.shouldRemeber,
      });

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateLoginFormData(formData);
    if (errors) return setFormErrors(errors);

    setFormErrors({});
    setIsLoading(true);
    const err = await login(formData);
    if (err) {
      setFormErrors(err);
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <CssBaseline />

      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <Typography component="h1" variant="h5">
        Login
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email"
          margin="normal"
          variant="outlined"
          placeholder="jhon@doe.com"
          value={formData.email}
          error={!!formErrors.email}
          onChange={handleInputChange}
          helperText={formErrors.email}
        />

        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel error={!!formErrors.password} htmlFor="password">
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            labelWidth={72} // Sets white background behind floating label
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!formErrors.password}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formErrors.password && (
            <FormHelperText error>{formErrors.password}</FormHelperText>
          )}
        </FormControl>

        <FormControlLabel
          label="Remember me"
          control={
            <Checkbox
              color="primary"
              name="shouldRemeber"
              onClick={handleInputChange}
              checked={formData.shouldRemeber}
            />
          }
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          color="primary"
          disableElevation
          variant="contained"
          disabled={isLoading}
          className={classes.submit}
        >
          Login
        </Button>

        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>

          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
