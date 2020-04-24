import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  makeStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  CardContent,
  Card,
  Switch
} from "@material-ui/core";

import { expensesList } from "../../lib/expenses/expenses-reducer";
import {
  expensesGet,
  expensesUpdateStatus
} from "../../lib/expenses/expenses-selector";
import { gainsList } from "../../lib/gains/gains-reducer";
import { gainsGet, gainsUpdateStatus } from "../../lib/gains/gains-selector";

import { FormatNumber } from "../../utils/formaterNumber";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
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
  },
  payed: {
    "& $root": {
      background: "#c0fdc0"
    }
  }
}));

export default function RecipeReviewCard({
  origin,
  id,
  name,
  category,
  value,
  partials,
  startDate,
  expensesType,
  limitDate,
  payer,
  status
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    checkedA: status
  });

  const handleChange = async (event, origin) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (origin === "gains") {
      await gainsUpdateStatus(event.target.value, event.target.checked);
      const res = await gainsGet();
      dispatch(gainsList(res));
    } else {
      await expensesUpdateStatus(event.target.value, event.target.checked);
      const res = await expensesGet();
      dispatch(expensesList(res));
    }
  };
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
      <ExpansionPanel className={state.checkedA && classes.payed}>
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Card className={classes.root}>
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
                  </>
                )}
              </div>
              <Typography variant="body1" color="textSecondary">
                <strong>{FormatNumber(value)}</strong>
              </Typography>
            </CardContent>
          </Card>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Card className={classes.root}>
            <CardContent>
              <div>
                {expensesType !== "Fixa" && partials.total && (
                  <>
                    <Typography variant="body2" color="textSecondary">
                      Valor Restante:
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {FormatNumber(remainingAmount)}
                    </Typography>
                  </>
                )}
              </div>

              <Switch
                checked={state.checkedA}
                onChange={event => handleChange(event, origin)}
                name="checkedA"
                inputProps="aria-label"
                color="primary"
                value={id}
              />
            </CardContent>
          </Card>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}
