import React from 'react';
import classes from './ToolBar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/Navigationitems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className={classes.ToolBar}>
        <DrawerToggle clicked={props.drawerClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default toolbar;