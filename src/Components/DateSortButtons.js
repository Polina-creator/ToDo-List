import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Box from '@material-ui/core/Box';

export default function DateSortButtons(props){
    return( 
        <>
            <Box fontSize="h6.fontSize" m={1}>
                Sort by Date
            </Box>
            <IconButton id = 'asc' onClick={props.handleOrder}>
                <ArrowUpwardIcon color="secondary" fontSize="large" />
            </IconButton>
            <IconButton id = 'desc' onClick={props.handleOrder}>
                <ArrowDownwardIcon color="secondary" fontSize="large" />
            </IconButton>
        </>
    );
}