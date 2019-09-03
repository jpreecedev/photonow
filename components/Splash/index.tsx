import React from "react";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { DefaultButton } from "../DefaultButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url("/static/audience-blur-church-976866.jpg")`,
      backgroundPosition: "center",
      position: "relative"
    },
    title: {
      color: "white",
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      borderBottom: `4px solid ${theme.palette.primary.dark}`,
      backgroundColor: "rgba(255,255,255,0.5)",
      marginBottom: theme.spacing(4),
      zIndex: 1,
      textShadow: `1px 0px 1px ${theme.palette.primary.dark}, 0px 1px 1px ${theme.palette.primary.main},
    2px 1px 1px ${theme.palette.primary.dark}, 1px 2px 1px ${theme.palette.primary.main},
    3px 2px 1px ${theme.palette.primary.dark}, 2px 3px 1px ${theme.palette.primary.main},
    4px 3px 1px ${theme.palette.primary.dark}, 3px 4px 1px ${theme.palette.primary.main},
    5px 4px 1px ${theme.palette.primary.dark}, 4px 5px 1px ${theme.palette.primary.main},
    6px 5px 1px ${theme.palette.primary.dark}, 5px 6px 1px ${theme.palette.primary.main},
    7px 6px 1px ${theme.palette.primary.dark};`
    },
    subTitle: {
      color: "white",
      marginBottom: theme.spacing(4),
      zIndex: 1
    },
    spacer: {
      padding: theme.spacing(10)
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  })
);

function Splash() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <div className={classes.overlay}></div>
      <Typography component="h1" variant="h3" className={classes.title}>
        FIND MY FACE
      </Typography>
      <Typography
        align="center"
        component="p"
        variant="h4"
        className={classes.subTitle}
      >
        Use our face scanning tool to find pictures of yourself in a crowd
      </Typography>
      <DefaultButton
        variant="contained"
        color="primary"
        size="large"
        to="/get-started"
      >
        Get Started
      </DefaultButton>
      <div className={classes.spacer}></div>
    </section>
  );
}

export { Splash };
