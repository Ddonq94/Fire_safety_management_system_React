import React from "react";
import AppFrame from "../components/AppFrame";
import { AppBar, Box, Tabs, Tab, Typography } from "@material-ui/core";
import TransactionFE from "./TransactionFE";
import TransactionFT from "./TransactionFT";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function Transaction() {
  const styles = {
    top: {
      marginTop: "20px",
    },
    bottom: {
      marginBottom: "20px",
    },
    table: {
      marginTop: "20px",
      marginBottom: "40px",
    },
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <AppFrame
      headerText="Welcome Back, Sean Uthman"
      headerTextPosition="flex-start"
      headerTextSize="h5"
      frameTitle="Transaction Management"
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Fire Extinguisher" />
        <Tab label="Fire Truck" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <TransactionFE />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TransactionFT />
      </TabPanel>
    </AppFrame>
  );
}

export default Transaction;