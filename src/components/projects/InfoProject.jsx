import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Typography, Box } from '@mui/material';
import { GET_PROJECT_ID } from '../../graphql/projects/prj-queries';

InfoProject.propTypes = {
  firstProjectData: PropTypes.object
};

function typoCouple(first, second) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Typography variant="body2">{first}</Typography>
      <Typography variant="body2">{second}</Typography>
    </Box>
  );
}

export default function InfoProject({ firstProjectData }) {

  const { data, error, loading } = useQuery(GET_PROJECT_ID, {
    variables: {
      id: firstProjectData.dataID
    }
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  
  const projectInfo = data.project;
  
  return(
    <>
      <Box sx={{ minWidth: 240 }}>
        {typoCouple()}
        <Typography variant="subtitle2" noWrap>
          Project Name:
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {projectInfo.name}
        </Typography>
      </Box>
      <ul>
        <li><h2>Project Name : {projectInfo.name}</h2></li>
        <li><h3>Project ID : {projectInfo._id.substr(-4,4)} OJO '(*solo 4*)'</h3></li>
        <li><h2>General Objective:</h2></li>
        <li><p>{projectInfo.generalObjective}</p></li>
        <li><h2>Specific objectives</h2></li>
        <li><ul>
          {projectInfo.specificObjectives.map((elem, index) => 
            <li key={index}><p>{elem}</p></li>
          )}
        </ul></li>
        <li><h2>Start date: {projectInfo.startDate}</h2></li>
        <li><h2>End date: {projectInfo.endDate}</h2></li>
        <li><h2>Project details</h2></li>
        <li><h3>Budget: {projectInfo.budget}</h3></li>
        <li><h3>Status: {projectInfo.status}</h3></li>
        <li><h3>Leader: {projectInfo.leader_id}</h3></li>
        <li><h3>Leader ID: {projectInfo.leader_id}</h3></li>
      </ul>
    </>
  );
}