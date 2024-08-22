import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { insertDataList } from '../redux/reducers/data';
import { insertData } from '../@core/api/common_api';
import { handleToast } from '../utils/utils';

// Define props type
interface UserFormProps {
  setDialog: (open: boolean) => void;
}

const defaultTheme = createTheme();

const UserForm: React.FC<UserFormProps> = ({ setDialog }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await insertData({
        email: data.get('email') as string,
        password: data.get('password') as string,
        firstName: data.get('firstName') as string,
        lastName: data.get('lastName') as string,
        mobile: data.get('mobile') as string,
      });
      if (res.status === 1) {
        dispatch(insertDataList(res.data));
        setDialog(false);
        handleToast(res.status, res.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="mobile"
                label="Mobile No."
                name="mobile"
                autoComplete="mobile"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setDialog(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserForm;
