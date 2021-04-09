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

import ProductCreateBtn from '../component/Admin/ProductCreateBtn';
import ProductCreate from '../component/Admin/ProductCreate';
import ProductListSection from '../component/Admin/ProductListSection';
import ProductSearch from '../component/Admin/ProductSearch';
import ProductPageSection from '../component/Admin/ProductPageSection';
import Header from '../component/Header';

import constants from '../lib/constants';

function Admin() {
    const location = useLocation();
    const classes = useStyles();

    const [pageNo, setPageNo] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [userlist, setUserlist] = useState([]);

    const [productPageNo, setProductPageNo] = useState(1);
    const [productlist, setProductlist] = useState([]);
    const [productCount, setProductCount] = useState(1);

    const [tab, setTab] = useState(0);
    const [pdCreate, setPdCreate] = useState(false);
    
    const handleChange = (event, newValue) => {
        if(newValue === 1){
            setPdCreate(false);
        }
        setTab(newValue);

        axios({
            method: 'GET',
            url: constants.BackUrl + `/api/v1/inventory/admin/user`,
        }).then((response) => {
            setUserlist(response.data.userlist);
            setPageCount(Math.ceil(response.data.usercount / 10));
            setPageNo(1);
            setPdCreate(false);
            axios({
                method: `GET`,
                url: constants.BackUrl + `/api/vi/inventory/products/list`,
            }).then((response)=>{
                setProductlist(response.data.list);
                setProductCount(Math.ceil(response.data.list_num / 10));
                setProductPageNo(1);
            }).catch((error)=>{
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        axios({
            method: 'GET',
            url: constants.BackUrl + `/api/v1/inventory/admin/user`,
        }).then((response) => {
            setUserlist(response.data.userlist);
            setPageCount(Math.ceil(response.data.usercount / 10));
            setPdCreate(false);
            axios({
                method: `GET`,
                url: constants.BackUrl + `/api/vi/inventory/products/list`,
            }).then((response)=>{
                setProductlist(response.data.list);
                setProductCount(Math.ceil(response.data.list_num / 10));
            }).catch((error)=>{
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }, [location])

    return (
        <div>
            <div id="wrapper">
                <div id="main">
                    <div className="inner">
                        <Header />
                        <AppBar position="static" color="transparent" className={classes.appbar}>
                            <Tabs
                                value={tab}
                                // inkBarStyle={{background: '#f56a6a'}}
                                textColor="primary"
                                onChange={handleChange}
                                aria-label="disabled tabs example"
                            >
                                <Tab label="User" className={classes.tab} />
                                <Tab label="Product" className={classes.tab} />
                            </Tabs>
                        </AppBar>
                        {tab === 0 && <>
                            <UserListSection userlist={userlist} pageNo={pageNo} setUserlist={setUserlist}/>
                            <UserSearch setUserlist={setUserlist} setPageCount={setPageCount} setPageNo={setPageNo}/>
                            <PageSection pageNo={pageNo} setPageNo={setPageNo} pageCount={pageCount} />
                        </>} 
                        {tab === 1 && !pdCreate && <>
                            <ProductCreateBtn setPdCreate={setPdCreate}/>
                            <ProductListSection productlist={productlist} productPageNo={productPageNo} />
                            <ProductSearch setProductlist={setProductlist} setProductCount={setProductCount} setProductPageNo={setProductPageNo}/>
                            <ProductPageSection productPageNo={productPageNo} setProductPageNo={setProductPageNo} productCount={productCount} />
                        </>}
                        {tab === 1 && pdCreate && <>
                            <ProductCreate />
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
    },
    appbar: {
        marginBottom: '20px',
    }
});