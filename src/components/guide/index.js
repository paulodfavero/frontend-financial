import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment-timezone";

import {
  makeStyles,
  Container,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box
} from "@material-ui/core";

import CardComponent from "../card";

import { gainsMonthActive } from "../../lib/gains/gains-selector";
import { gainsMonth } from "../../lib/gains/gains-reducer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    borderRadius: "10px 10px 0 0 ",
    overflow: "hidden",
    marginTop: -10
  }
}));

export default function ScrollableTabsButtonAuto({ listCard }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const gainsMonthGet = useSelector(state => gainsMonthActive(state));

  const handleChange = (event, newValue) => {
    dispatch(gainsMonth(newValue));
    setValue(newValue);
  };

  const getCurrentMonth = () => {
    if (gainsMonthGet) {
      return gainsMonthGet;
    }
    return parseInt(moment(new Date()).format("M") - 1);
  };

  useEffect(() => {
    handleChange("", getCurrentMonth());
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Jan" {...a11yProps(0)} />
          <Tab label="Fev" {...a11yProps(1)} />
          <Tab label="Mar" {...a11yProps(2)} />
          <Tab label="Abr" {...a11yProps(3)} />
          <Tab label="Mai" {...a11yProps(4)} />
          <Tab label="Jun" {...a11yProps(5)} />
          <Tab label="Jul" {...a11yProps(6)} />
          <Tab label="Ago" {...a11yProps(7)} />
          <Tab label="Set" {...a11yProps(8)} />
          <Tab label="Out" {...a11yProps(9)} />
          <Tab label="Nov" {...a11yProps(10)} />
          <Tab label="Dez" {...a11yProps(11)} />
        </Tabs>
      </AppBar>

      {listCard &&
        listCard.map((item, index) => (
          <TabPanel value={value} index={index}>
            {item.map(item => (
              <CardComponent
                key={item.name}
                origin="gain"
                name={item.name}
                category={item.category}
                value={item.value}
                partials={item.partials}
                startDate={item.startDate}
                limitDate={item.limitDate}
                expensesTypes={item.expensesTypes}
              />
            ))}
          </TabPanel>
        ))}
    </div>
  );
}
