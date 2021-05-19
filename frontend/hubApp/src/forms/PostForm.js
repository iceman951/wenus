import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Divider,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Avatar,
  Card,
  CardContent,
  Container,
  Backdrop,
  CircularProgress,
} from "@material-ui/core/";
import { red } from "@material-ui/core/colors";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      position: "absolute",
      width: "70vh",
      backgroundColor: "#4d4d4d",
      borderRadius: "10px 10px 10px 10px",
      padding: theme.spacing(2, 3, 2),
    },
    typography: {
      color: "#fff",
    },
    input: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
      color: "white",
    },
    card: {
      marginTop: "3%",
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    details: {
      display: "flex",
      flexDirection: "row",
    },
    avatar: {
      backgroundColor: red[500],
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));
export default function PostForm() {
    const classes = useStyles()
  return (
    <div className={classes.paper}>
      <Typography align="center" variant="h6" className={classes.typography}>
        สร้างโพสต์
      </Typography>
      <Divider
        style={{
          marginBottom: "3%",
          marginTop: "3%",
        }}
      />
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="tag">Tags</InputLabel>
          <Select
            id="tag"
            value={formik.values.tag}
            onChange={formik.handleChange("tag")}
            autoWidth
            className={classes.input}
          >
            <MenuItem value="ทั่วไป">ทั่วไป</MenuItem>
            <MenuItem value="ความรัก">ความรัก</MenuItem>
            <MenuItem value="การศึกษา">การศึกษา</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="text"
          placeholder="คุณอยากโพสต์อะไร?"
          multiline
          rows={6}
          fullWidth
          InputProps={{ className: classes.input }}
          value={formik.values.text}
          onChange={formik.handleChange("text")}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
        />
        <Button
          fullWidth
          // style={{ backgroundColor: "blue", color: "white" }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formik.values.text}
        >
          โพสต์
        </Button>
      </form>
    </div>
  );
}
