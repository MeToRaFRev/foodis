import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import styled from '@mui/material/styles/styled';
import NutrientsList from './NutrientsList';

const WhiteCard = styled(Card)`
  background-color: ${({ bgColor }) => bgColor || 'white'};
  padding: ${({ padding }) => padding || '1rem'};
  border-radius: ${({ borderRadius }) => borderRadius || '1rem'};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '75%'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(${({ blur }) => blur || '10px'});
`;

function Info(props) {
  const { searchedItem } = props;
  console.log(searchedItem)
  return (
    <Box sx={{
      display: 'flex',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
      padding: '1rem',
      borderRadius: '1rem',
      width: '25%',
      height: '75%',
      opacity: searchedItem ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out', // Added transition for smooth change
    }}>
      <WhiteCard height="10%">
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {searchedItem?.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
        {searchedItem?.foodCategory.description.replace(/Products/g, '')}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
        {searchedItem?.inputFoods.length} Datapoints
        </Typography>
      </WhiteCard>
      <NutrientsList searchedItem={searchedItem}/>
    </Box>
  );
}

export default Info;
