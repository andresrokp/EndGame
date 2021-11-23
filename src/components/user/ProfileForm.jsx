import { useState } from 'react';


// import { GET_USER } from 'graphql/user/queries'; //useEffect debe ir arriba,//

// import { useParams, Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { useMutation } from '@apollo/client';
// import useFormData from 'hooks/useFormData';
// import Input from 'components/Input';
// import DropDown from 'components/DropDown';
// import { EDIT_USER } from 'graphql/user/mutations';
// import { toast } from 'react-toastify';
// import ButtonLoading from 'components/ButtonLoading';
// import { Enum_Rol } from 'utils/enums';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

// const EditUser = () => {
//   const [userData, setUserData] = useState({});
//   const { form, formData, updateFormData } = useFormData(null);
//   const { _id } = useParams();
//   const {
//     loading: loadingQuery,
//     error: errorQuery,
//     data: dataQuery,
//   } = useQuery(GET_USER, {
//     variables: { _id },
//   });

// const [editUser, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
//   useMutation(EDIT_USER);

// const submitForm = async (e) => {
//   e.preventDefault();
//   console.log(formData);
//   await editUser({
//     variables: { _id, ...formData },
//   });
// };

// useEffect(() => {
//   if (dataMutation) {
//     toast.success('User successfully modified');
//     setUserData(dataMutation.editUser);
//   }
//   if (dataQuery) {
//     console.log('dq', dataQuery);
//     setUserData(dataQuery.User);
//   }
// }, [dataMutation, dataQuery]);

// useEffect(() => {
//   if (errorMutation) {
//     toast.error('Error: User modification failed');
//   }
// }, [errorMutation]);

// if (loadingQuery) return <div>Loading</div>;

// const role = [
//   {
//     value: 'student',
//     label: 'Student'
//   },
//   {
//     value: 'leader',
//     label: 'Leader'
//   },
//   {
//     value: 'administrator',
//     label: 'Administrator'
//   }
// ];

export default function ProfileForm(props) {
  const [values, setValues] = useState({
    initialValues: {
      firstName: '',
      lastName: '',
      identification: '',
      email: '',
      // role: '',
      password: ''
    }
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Identification"
                name="identification"
                onChange={handleChange}
                required
                value={values.identification}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Role"
                name="role"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.role}
                variant="outlined"
              >
                {role.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid> */}
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                required
                value={values.password}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
}
