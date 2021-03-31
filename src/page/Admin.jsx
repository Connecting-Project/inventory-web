import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import PageSection from '../component/Admin/PageSection';
import UserListSection from '../component/Admin/UserListSection';
import UserSearch from '../component/Admin/UserSearch';

import constants from '../lib/constants';

function Admin() {
    const location = useLocation();
    const classes = useStyles();

    const [pageNo, setPageNo] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [userlist, setUserlist] = useState([]);
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        axios({
            method: 'GET',
            url: constants.BackUrl + `/api/v1/inventory/admin/user`,
        }).then((response) => {
            setUserlist(response.data.userlist);
            setPageCount(Math.ceil(response.data.usercount / 10));
        }).catch((error) => {
            console.log(error);
        });
    }, [location])


    return (
        <div>
            <div id="wrapper">
                <div id="main">
                    <div className="inner">

                        <header id="header">
                            <a href="index.html" className="logo"><strong>Hawaiian-Pizza</strong> INVENTORY</a>
                            <ul className="icons">
                                <li><a href="!#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                                <li><a href="!#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                                <li><a href="!#" className="icon fa-snapchat-ghost"><span className="label">Snapchat</span></a></li>
                                <li><a href="!#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                                <li><a href="!#" className="icon fa-medium"><span className="label">Medium</span></a></li>
                            </ul>
                        </header>
                        <AppBar position="static" color="transparent">
                            <Tabs
                                value={tab}
                                inkBarStyle={{background: '#f56a6a'}}
                                textColor="primary"
                                onChange={handleChange}
                                aria-label="disabled tabs example"
                            >
                                <Tab label="User" className={classes.tab} />
                                <Tab label="Product" className={classes.tab} />
                            </Tabs>
                        </AppBar>
                        {tab === 0 ? <>
                            <UserListSection userlist={userlist} pageNo={pageNo} />
                            <UserSearch setUserlist={setUserlist} setPageCount={setPageCount} />
                            <PageSection pageNo={pageNo} setPageNo={setPageNo} pageCount={pageCount} />
                        </> : <>

                        </>}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Admin;

const useStyles = makeStyles({
    tab: {
        boxShadow: 'none',
    }
});