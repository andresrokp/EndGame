import { useQuery, useMutation } from '@apollo/client';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import * as React from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  NativeSelect,
  FormControl,
  InputLabel,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
// our thing
import { UPDATE_STATE_ADMIN, UPDATE_STATE_LEADER } from '../graphql/users/mutations';
import { GET_USERS, GET_STUDENTS } from '../graphql/users/queries';
import { ContextUser } from '../contexts/ContextUser';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '' },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'lastName', label: 'lastName', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  console.log('applySortFilter', 'array', array, 'comparator', comparator, 'query', query);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

// afr - function to define gql document upon session user role
function queryUSERS(role) {
  switch (role) {
    case 'admin':
      return GET_USERS;
    case 'leader':
      return GET_STUDENTS;
    default:
      return GET_USERS;
  }
}

// afr - aquí inicia el componente -----------------------------------

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // afr - to change the student status as leader
  const [mtUpdateStateLeader] = useMutation(UPDATE_STATE_LEADER);
  // afr - to change any user status as admin
  const [UpdateStateAdmin] = useMutation(UPDATE_STATE_ADMIN);
  // afr - take the session user data
  const { userData } = React.useContext(ContextUser);
  // afr - the list to be rendered
  const [stUserList, setStUserList] = useState([]);
  // afr - loading from DDBB with a conditioned query inside the function
  const { data, loading } = useQuery(queryUSERS(userData.role));
  // - setting the list state on data fetching
  useEffect(() => {
    if (data) {
      if (userData.role === 'admin') setStUserList(data.allUsers);
      if (userData.role === 'leader') setStUserList(data.allStudents);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <div>Loading....</div>;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = stUserList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  // afr - to change the student status as leader on dropdown change
  const handleChangeStatus = async (_id, nextOption) => {
    const paqueteEnvioBd = {
      input: {
        userById: _id,
        status: nextOption
      }
    };
    console.log('paqueteEnvioBd: ', paqueteEnvioBd);
    if (userData.role === 'admin') await UpdateStateAdmin({ variables: paqueteEnvioBd });
    if (userData.role === 'leader') await mtUpdateStateLeader({ variables: paqueteEnvioBd });
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stUserList.length) : 0;

  const filteredUsers = applySortFilter(stUserList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  //  afr - aqui inicia el RETURN del componente --------------------\\\\

  return (
    <>
      {!loading ? (
        <Page title="User | Mercurio">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h4" gutterBottom>
                User
              </Typography>
            </Stack>

            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 300 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={stUserList.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          const { _id, name, lastName, role, status } = row;
                          const isItemSelected = selected.indexOf(name) !== -1;
                          return (
                            <TableRow
                              hover
                              key={_id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell />
                              <TableCell padding="checkbox">
                                <Typography>&nbsp;</Typography>
                                {/* <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, name)}
                                /> */}
                              </TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar
                                    alt={name}
                                    src="/static/mock-images/avatars/avatar_default.jpg"
                                  />
                                  <Typography variant="subtitle2" noWrap>
                                    {name}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">{lastName}</TableCell>
                              <TableCell align="left">{role}</TableCell>
                              <TableCell align="left">
                                <FormControl minWidth>
                                  <InputLabel
                                    variant="standard"
                                    htmlFor="uncontrolled-native"
                                    color="success"
                                  >
                                    {status}
                                  </InputLabel>
                                  <NativeSelect
                                    defaultValue={status}
                                    inputProps={{
                                      name: 'select',
                                      id: 'uncontrolled-native'
                                    }}
                                    onChange={(e) => handleChangeStatus(_id, e.target.value)}
                                  >
                                    <option disabled hidden>
                                      {' '}
                                    </option>
                                    <option value="pending">Pending</option>
                                    <option value="authorized">Authorized</option>
                                    <option value="unauthorized">Unauthorized</option>
                                  </NativeSelect>
                                </FormControl>
                              </TableCell>
                              {/* <TableCell align="right">{/* <UserMoreMenu /> */}
                              {/* </TableCell> */}
                            </TableRow>
                          );
                        })}
                      {/* {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )} */}
                    </TableBody>
                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={4} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={stUserList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </Page>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
