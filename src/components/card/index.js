import React from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  Divider,
  CardContent,
  IconButton,
  Card,
  CardHeader
} from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";

import { FormatNumber } from "../../utils/formaterNumber";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  avatar: {
    fontSize: 12,
    textTransform: "uppercase",
    "& img": {
      width: "100%",
      height: "auto"
    }
  }
}));

export default function RecipeReviewCard({
  origin,
  name,
  category,
  value,
  partials,
  startDate,
  expensesTypes,
  limitDate,
  payer,
  installments,
  logo
}) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar} src={logo}>
              {expensesTypes}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreHoriz />
            </IconButton>
          }
          title={name}
          subheader={category || payer}
        />

        <Divider />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            <strong>{limitDate}</strong>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>{FormatNumber(value)}</strong>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
