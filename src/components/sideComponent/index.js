import React, { useState, useRef } from "react";
import * as R from "ramda";
import PropTypes from "prop-types";
import clsx from "clsx";
import api from "../../services/api";

import { useDispatch, useSelector } from "react-redux";
import { handleOpenMenu } from "../../lib/menuFast/menu-reducer";
import {
  expensesTotal,
  expensesList
} from "../../lib/expenses/expenses-reducer";
import {
  expensesGet,
  expensesTotalValue
} from "../../lib/expenses/expenses-selector";
import { gainsTotal, gainsList } from "../../lib/gains/gains-reducer";
import { gainsGet, gainsTotalValue } from "../../lib/gains/gains-selector";

import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  CircularProgress
} from "@material-ui/core";
import { ArrowBackTwoTone } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  side: {
    background: "#ffffff",
    transform: "translateX(100vw)",
    transition: "all .4s ease",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: 3,
    width: "100vw",
    height: "100vh",
    overflowY: "auto",
    "&.active": {
      transform: "translateX(0vw)"
    }
  },
  back: {
    fontSize: 30,
    margin: theme.spacing(3)
  },
  contentForm: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 4, 10),
    textAlign: "center",
    flex: 1,
    justifyContent: "center"
  },
  wrapper: {
    margin: theme.spacing(1, 0),
    position: "relative",
    width: "100%"
  },
  fabProgress: {
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));
export default function SideComponent({ page }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const [state, setState] = useState({
    name: "",
    category: "",
    value: "",
    partials: {
      total: ""
    },
    startDate: "",
    limitDate: "",
    expensesType: ""
  });

  const dispatch = useDispatch();
  const isOpened = useSelector(state => R.path(["menu", "isOpened"], state));

  const getExpensesList = async () => {
    try {
      const res = await expensesGet();
      dispatch(expensesList(res));
      dispatch(expensesTotal(expensesTotalValue(res)));
    } catch (error) {
      console.log("ERROR TO GET EXPENSES LIST", error);
    }
  };

  const getGainsList = async () => {
    try {
      const res = await gainsGet();
      dispatch(gainsList(res));
      dispatch(gainsTotal(gainsTotalValue(res)));
    } catch (error) {
      console.log("ERROR TO GET GAINS LIST", error);
    }
  };

  const handleChange = event => {
    const name = event.target.name;
    if (name === "partials") {
      setState({
        ...state,
        partials: { total: event.target.value }
      });
    } else {
      setState({
        ...state,
        [name]: event.target.value
      });
    }

    console.log(state);
  };
  const handleBack = () => {
    dispatch(handleOpenMenu(false));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
    try {
      await api.post(`/${page}`, state);
      handleBack();
      if (page === "gains") {
        getGainsList();
      } else {
        getExpensesList();
      }
      setState({
        name: "",
        category: "",
        value: "",
        partials: {
          total: ""
        },
        startDate: "",
        limitDate: "",
        expensesType: ""
      });
    } catch (error) {
      console.log("ERRO POST EXPENSES", error);
    }
  };

  return (
    <div className={clsx(classes.side, `${isOpened && "active"}`)}>
      <ArrowBackTwoTone className={classes.back} onClick={handleBack} />

      <form onSubmit={handleSubmit} className={classes.contentForm}>
        <Typography variant="h3">Cadastre novo gasto</Typography>

        <TextField
          onChange={handleChange}
          label="Nome"
          name="name"
          variant="outlined"
          size="small"
          value={state.name}
          required
        />
        <TextField
          onChange={handleChange}
          label="Categoria"
          name="category"
          variant="outlined"
          size="small"
          value={state.category}
          required
        />
        <TextField
          onChange={handleChange}
          label="Valor"
          name="value"
          variant="outlined"
          type="number"
          size="small"
          value={state.value}
          required
        />
        <TextField
          onChange={handleChange}
          label="Parcelas"
          name="partials"
          variant="outlined"
          size="small"
          value={state.partials.total}
        />
        <TextField
          onChange={handleChange}
          label="Data de Início"
          name="startDate"
          variant="outlined"
          size="small"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={state.startDate}
        />
        <TextField
          onChange={handleChange}
          label="Vencimento"
          name="limitDate"
          variant="outlined"
          size="small"
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          value={state.limitDate}
        />

        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-age-native-simple">
            Tipo de despesa
          </InputLabel>
          <Select
            native
            value={state.expensesType}
            onChange={handleChange}
            label="Tipo de despesa"
            inputProps={{
              name: "expensesType",
              id: "outlined-age-native-simple"
            }}
            required
          >
            <option aria-label="None" value="" />
            <option value="Fixa">Fixa</option>
            <option value="Variável">Variável</option>
          </Select>
        </FormControl>

        <div className={classes.wrapper}>
          <Button
            variant="contained"
            disabled={loading}
            color="secondary"
            type="submit"
            fullWidth
          >
            Adicionar
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </form>
    </div>
  );
}

SideComponent.propTypes = {
  page: PropTypes.string.isRequired
};
