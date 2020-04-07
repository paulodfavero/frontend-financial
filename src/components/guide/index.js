import React from "react";
import PropTypes from "prop-types";
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
    width: "100%"
  }
}));

export default function ScrollableTabsButtonAuto({ listCard }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <TabPanel value={value} index={0}>
        {listCard &&
          listCard.map(item => (
            <CardComponent
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
      <TabPanel value={value} index={1}>
        Fev
      </TabPanel>
      <TabPanel value={value} index={2}>
        Mar
      </TabPanel>
      <TabPanel value={value} index={3}>
        Abr
      </TabPanel>
      <TabPanel value={value} index={4}>
        Mai
      </TabPanel>
      <TabPanel value={value} index={5}>
        Jun
      </TabPanel>
      <TabPanel value={value} index={6}>
        Jul
      </TabPanel>
      <TabPanel value={value} index={7}>
        Ago
      </TabPanel>
      <TabPanel value={value} index={8}>
        Set
      </TabPanel>
      <TabPanel value={value} index={9}>
        Out
      </TabPanel>
      <TabPanel value={value} index={10}>
        Nov
      </TabPanel>
      <TabPanel value={value} index={11}>
        Dez
      </TabPanel>
    </div>
  );
}
