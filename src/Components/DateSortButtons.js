import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Box from '@material-ui/core/Box';

export default function DateSortButtons({handleFilter}){
    return( 
        <>
            <Box fontSize="h6.fontSize" m={1}>
                Sort by Date
            </Box>
            <IconButton id = 'Up' onClick={({currentTarget}) => handleFilter(currentTarget.id)}>
                <ArrowUpwardIcon color="secondary" fontSize="large" />
            </IconButton>
            <IconButton id = 'Down' onClick={({currentTarget}) => handleFilter(currentTarget.id)}>
                <ArrowDownwardIcon color="secondary" fontSize="large" />
            </IconButton>
        </>
    );
}