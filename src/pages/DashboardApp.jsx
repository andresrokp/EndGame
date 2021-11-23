import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import Login from './Login';

// ----------------------------------------------------------------------
// const VIEWER_QUERY = gql`
//   query {
//     viewer {
//       name
//       login
//     }
//   }
// `;
// const REPOSITORIES_QUERY = gql`
//   query MyRepositories($first: Int!) {
//     viewer {
//       name
//       avatarUrl
//       login
//       repositories(first: $first) {
//         nodes {
//           id
//           name
//           stargazers {
//             totalCount
//           }
//         }
//       }
//     }
//   }
// `;

// ----------------------------------------------------------------------
export default function DashboardApp() {
  // const { data, loading } = useQuery(VIEWER_QUERY);
  const [first, setFirst] = useState(1);
  // const { data, loading, refetch } = useQuery(REPOSITORIES_QUERY, { variables: { first } });

  return (
    <>
      {/* {loading ? '' : `${data.viewer.name} - ${data.viewer.login}`}
      <div>
        {data?.viewer?.map(({ name, login }) => (
          <>
            <p>
              {}
              {name} - {login}
            </p>
          </>
        ))}
      </div> */}

      <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, Welcome back</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppTasks />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
}
