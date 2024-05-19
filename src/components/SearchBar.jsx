import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import foods from '../data/foodsData.js';

const unitHierarchy = {
  'g': 1,    // Microgram
  'mg': 2,    // Milligram
  'µg': 3,     // Gram
  'kcal': 4,  // Kilocalorie (energy)
  'kJ': 5,    // Kilojoule (energy)
  'IU': 6,    // International Unit (varies by substance)
  'sp gr': 7  // Specific gravity (not a unit of mass or energy, but density)
};

function getUnitRank(unitName) {
  return unitHierarchy[unitName] || Infinity;
}

function sortNutrients(nutrients) {
  return nutrients.sort((a, b) => {
    const unitRankA = getUnitRank(a.nutrient.unitName);
    const unitRankB = getUnitRank(b.nutrient.unitName);

    if (unitRankA === unitRankB) {
      return b.amount - a.amount;
    } else {
      return unitRankA - unitRankB;
    }
  });
}


export default function SearchBar(props) {
  const { setSearchedItem } = props;

  return (
    <Stack spacing={2} sx={{ width: '25%' }}>
      <Autocomplete
        freeSolo
        id="searchBar"
        onChange={(event, value) => {
          let searchedItem = foodsOptions.find(food => food.description === value);

          if (searchedItem) {
            console.log('Before sorting:', searchedItem.foodNutrients);
            searchedItem.foodNutrients = sortNutrients(searchedItem.foodNutrients);
            console.log('After sorting:', searchedItem.foodNutrients);
            setSearchedItem(searchedItem);
          } else {
            console.error('Searched item not found');
          }
        }}
        disableClearable
        options={foodsOptions.map((option) => option.description)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="This food"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}

// Top 100 foods as described in your dataset
const foodsOptions = foods.map((food) => {
  food.title = food.description;
  return food;
});
