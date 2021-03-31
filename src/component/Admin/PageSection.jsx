import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const PaginationContainer = styled.div`
  margin: 50px 0;
  height: 10px;
  & > nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function PageSection({ pageNo, setPageNo, pageCount }){

  const classes = useStyles();

  const handleChange = (event, value) => {
    setPageNo(value);
  };

  return (
    <PaginationContainer>
      <Pagination count={pageCount} page={pageNo} onChange={handleChange} className={classes.root} />
    </PaginationContainer>
  );

}

export default PageSection;

const useStyles = makeStyles((theme) => ({
    root: {
      '@media(max-width: 780px)': {
        '&>ul': {
          '&>li': {
            '&>button': {
              fontSize: '15px !important',
              minWidth: '25px !important',
              height: '25px !important',
              '&>svg': {
                fontSize: '20px !important',
              },
            },
          },
        },
      },
      '&>ul': {
        '&>li': {
          '&>button': {
            fontSize: '20px',
            minWidth: '50px',
            height: '52px',
            '&>svg': {
              fontSize: '40px',
            },
          },
        },
      },
    },
  }));