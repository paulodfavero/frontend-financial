import React, { useState, useRef } from "react";
import * as R from "ramda";
import PropTypes from "prop-types";
import clsx from "clsx";
import api from "../../services/api";

import { useDispatch, useSelector } from "react-redux";
import { handleOpenMenu } from "../../lib/menuFast/menu-reducer";
import { expensesListUpdated } from "../../lib/expenses/expenses-reducer";
import { gainsListUpdated } from "../../lib/gains/gains-reducer";
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
    partials: "",
    startDate: "",
    limitDate: "",
    expensesType: ""
  });

  const dispatch = useDispatch();
  const isOpened = useSelector(state => R.path(["menu", "isOpened"], state));

  const handleChange = event => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };
  const handleBack = () => {
    dispatch(handleOpenMenu(false));
    dispatch(expensesListUpdated(true));
    dispatch(gainsListUpdated(true));
  };
  const handleUpdateList = status => {
    dispatch(expensesListUpdated(status));
    dispatch(gainsListUpdated(status));
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
      await api
        .post(`/${page}`, state)
        .then(res => {
          handleBack();
          handleUpdateList(true);
          setState({
            name: "",
            category: "",
            value: "",
            partials: "",
            startDate: "",
            limitDate: "",
            expensesType: ""
          });
        })
        .catch(erro => {
          console.log(erro);
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
        />
        <TextField
          onChange={handleChange}
          label="Categoria"
          name="category"
          variant="outlined"
          size="small"
          value={state.category}
        />
        <TextField
          onChange={handleChange}
          label="Valor"
          name="value"
          variant="outlined"
          type="number"
          size="small"
          value={state.value}
        />
        <TextField
          onChange={handleChange}
          label="Parcelas"
          name="partials"
          variant="outlined"
          size="small"
          value={state.partials}
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
