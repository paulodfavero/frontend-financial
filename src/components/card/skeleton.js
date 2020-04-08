import React from "react";
import { makeStyles, Card, CardContent } from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
  content: {
    padding: "22px 16px !important"
  }
}));

const repeat = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function SkeletonCard() {
  const classes = useStyles();

  return (
    <>
      {repeat.map(item => (
        <Card key={item}>
          <CardContent className={classes.content}>
            <Skeleton variant="text" width="100%" height={8} />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
