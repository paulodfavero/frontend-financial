import React from "react";
import { makeStyles, Typography, CardContent, Card } from "@material-ui/core";

import { FormatNumber } from "../../utils/formaterNumber";

const useStyles = makeStyles(theme => ({
  root: {
    "& p": {
      fontSize: 14
    }
  },
  smallFont: {
    fontSize: 12,
    marginRight: 4
  },
  avatar: {
    fontSize: 12,
    textTransform: "uppercase",
    "& img": {
      width: "100%",
      height: "auto"
    }
  },
  flex: {
    display: "flex",
    alignItems: "center"
  }
}));

export default function RecipeReviewCard({
  origin,
  name,
  category,
  value,
  partials,
  startDate,
  expensesType,
  limitDate,
  payer
}) {
  const classes = useStyles();
  let date = "";
  if (limitDate) {
    date = limitDate.split("-");
    date = `${date[2]}.${date[1]}`;
  }
  const remainingAmount =
    (parseInt(partials.total) + 1 - parseInt(partials.current)) *
    parseInt(value);
  return (
    <>
      <Card className={classes.root}>
        {/* <CardHeader
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

        <Divider /> */}
        <CardContent>
          <div className={classes.flex}>
            <Typography variant="body2" color="textSecondary">
              <strong>
                <span className={classes.smallFont}>{date}</span>
              </strong>
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {payer || name} /{" "}
              <span className={classes.smallFont}>{category}</span>
            </Typography>
            {expensesType !== "Fixa" && partials.total && (
              <>
                <Typography variant="body2" color="textSecondary">
                  <span
                    className={classes.smallFont}
                  >{`${partials.current}/${partials.total}`}</span>
                </Typography>
                {remainingAmount}
              </>
            )}
          </div>
          <Typography variant="body1" color="textSecondary">
            <strong>{FormatNumber(value)}</strong>
          </Typography>
        </CardContent>
        {/* <CardContent>
          <Typography variant="body1" color="textSecondary">
            <strong>{limitDate}</strong>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>{FormatNumber(value)}</strong>
          </Typography>
        </CardContent> */}
      </Card>
    </>
  );
}
