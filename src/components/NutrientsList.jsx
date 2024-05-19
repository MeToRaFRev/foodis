import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { ListItemIcon } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalculateIcon from '@mui/icons-material/Calculate';
import FunctionsIcon from '@mui/icons-material/Functions';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function NutrientsList(props) {
    const { searchedItem } = props;
    const maxInputFoods = searchedItem?.inputFoods.length || 1; // To avoid division by zero
    const foodNutrientsArray = searchedItem?.foodNutrients || [];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popoverIndex, setPopoverIndex] = React.useState(null);

    const handlePopoverOpen = (event, index) => {
        setAnchorEl(event.currentTarget);
        setPopoverIndex(index);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverIndex(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box
            sx={{ width: '100%', height: 400, position: 'relative' }}
        >
            <List style={{ maxHeight: '100%', overflow: 'auto' }}>
                {foodNutrientsArray.map((foodNutrient, index) => {
                    const nutrientAmount = foodNutrient?.amount;
                    const foodNutrientDetails = foodNutrient?.nutrient;
                    const dataPoints = foodNutrient?.dataPoints;
                    const accuracyRatio = dataPoints / maxInputFoods;

                    return (
                        <ListItem key={index} component="div" disablePadding>
                            <Box
                                sx={{
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px 16px',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        height: '100%',
                                        width: `${accuracyRatio * 100}%`,
                                        bgcolor: 'green',
                                        opacity: 0.7,
                                        zIndex: 1,
                                    }}
                                />
                                <ListItemText
                                    primary={`${foodNutrientDetails.name} | ${nutrientAmount || 0}${foodNutrientDetails.unitName}`}
                                    sx={{ position: 'relative', zIndex: 2 }}
                                />
                                <IconButton
                                    onMouseEnter={(event) => handlePopoverOpen(event, index)}
                                    onMouseLeave={handlePopoverClose}
                                >
                                    <ListItemIcon>
                                        {foodNutrient?.foodNutrientDerivation?.description?.toLowerCase().includes('calculated') ?
                                         <CalculateIcon /> : 
                                         foodNutrient?.foodNutrientDerivation?.description?.toLowerCase().includes('analytical') ? 
                                         <BarChartIcon /> : 
                                         foodNutrient?.foodNutrientDerivation?.description?.toLowerCase().includes('summed') ?
                                            <FunctionsIcon /> :
                                         null}
                                    </ListItemIcon>
                                </IconButton>
                                <Popover
                                    id={`popover-${index}`}
                                    open={open && popoverIndex === index}
                                    anchorEl={anchorEl}
                                    onClose={handlePopoverClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    PaperProps={{
                                        onMouseEnter: () => clearTimeout(),
                                        onMouseLeave: handlePopoverClose,
                                    }}
                                >
                                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                                </Popover>
                            </Box>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}
