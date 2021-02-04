import { useState, useContext } from "react";
import {
  Grid,
  Link,
  Button,
  TextField,
  Container,
  makeStyles,
  CssBaseline,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
} from "@material-ui/core/";
import { Link as RouterLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import validateRegisterFormData from "./validate";
import { GlobalContext } from "../../context/GlobalState";

const useStyle = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(8),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyle();
  const { register } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateRegisterFormData(formData);
    if (errors) return setFormErrors(errors);

    setFormErrors({});
    setIsLoading(true);
    const err = await register(formData);
    if (err) {
      setFormErrors(err);
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <CssBaseline />

      <img src="assets/images/welcome.svg" alt="welcome" width="100%" />

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
                  tabIndex="-1"
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

        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel error={!!formErrors.password} htmlFor="confirm-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="confirm-password"
            labelWidth={136} // Sets white background behind floating label
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={!!formErrors.password}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  tabIndex="-1"
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
          Register
        </Button>

        <Grid container justify="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              {"Already have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;
