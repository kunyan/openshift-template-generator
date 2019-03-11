import React from 'react';
import classNames from 'classnames';
import yaml from 'js-yaml';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Button,
  Snackbar,
  IconButton,
  SnackbarContent,
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import VerticalLinearStepper from '../components/VerticalLinearStepper';
import BuildConfig from '../components/BuildConfig';
import { IBuildConfig, ITemplate } from '../model';
import Highlight from 'react-highlight';
import CopyToClipboard from 'react-copy-to-clipboard';
import green from '@material-ui/core/colors/green';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2
    // textAlign: "center",
    // color: theme.palette.text.secondary
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    backgroundColor: green[600],
    display: 'flex',
    alignItems: 'center'
  }
});

const buildConfig: IBuildConfig = {
  apiVersion: 'v1',
  kind: 'BuildConfig',
  spec: {
    output: {
      pushSecret: {
        name: 'images-paas-push-config'
      },
      to: {
        kind: 'DockerImage',
        name: 'images.paas.redhat.com/${project}/${app}:${tag}'
      }
    },
    source: {
      type: 'Git',
      git: {
        uri: 'https://github.com/sclorg/nodejs-ex',
        ref: 'master'
      }
    },
    strategy: {
      type: 'Source',
      sourceStrategy: {
        env: [
          {
            name: 'IOJS',
            value: '123'
          },
          {
            name: 'GIT_SSL_NO_VERIFY',
            value: 'true'
          }
        ]
      }
    }
  }
};

interface IProps {
  classes: Partial<ClassNameMap>;
}
interface IState {
  template: ITemplate;
  open: boolean;
  activeStep: number;
  skipped: Set<number>;
}
class App extends React.Component<IProps> {
  state: IState = {
    activeStep: 0,
    skipped: new Set(),
    open: false,
    template: {
      apiVersion: 'v1',
      kind: 'Template',
      objects: [buildConfig]
    }
  };

  getSteps() {
    return ['BuildConfig', 'DeploymentConfig', 'Route', 'Secret', 'ConfigMap'];
  }

  isStepSkipped(step: number) {
    return this.state.skipped.has(step);
  }

  handleNext = () => {
    let { skipped } = this.state;
    if (this.isStepSkipped(this.state.activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(this.state.activeStep);
    }

    this.setState({
      activeStep: this.state.activeStep + 1,
      skipped
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
    console.log(this.state.skipped);
  };

  handleSkip = () => {
    const skipped = new Set(this.state.skipped.values());
    skipped.add(this.state.activeStep);
    this.setState({
      activeStep: this.state.activeStep + 1,
      skipped
    });
    console.log(skipped);
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <BuildConfig
            data={this.state.template.objects[0] as IBuildConfig}
            onChange={this.onBuildConfigChange}
          />
        );
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown step';
    }
  }

  onBuildConfigChange = (c: IBuildConfig) => {
    this.setState({
      template: {
        ...this.state.template,
        objects: [c]
      }
    });
  };
  render() {
    const result = yaml.safeDump(this.state.template);
    return (
      <div className={this.props.classes.root}>
        <AppBar
          position="static"
          className="primary"
          style={{ boxShadow: 'none' }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit">
              OpenShift Template Generator
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={8}>
          <Grid item xs={2}>
            <VerticalLinearStepper
              skipped={this.state.skipped}
              steps={this.getSteps()}
              activeStep={this.state.activeStep}
            />
          </Grid>
          <Grid item xs={8}>
            {this.getStepContent(this.state.activeStep)}
            <div>
              <Button
                disabled={this.state.activeStep === 0}
                onClick={this.handleBack}
                className={this.props.classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSkip}
                className={this.props.classes.button}
              >
                Skip
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNext}
                className={this.props.classes.button}
              >
                {this.state.activeStep === this.getSteps().length - 1
                  ? 'Finish'
                  : 'Next'}
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs>
            <CopyToClipboard text={result} onCopy={this.handleClick}>
              <Button
                variant="contained"
                color="primary"
                className={this.props.classes.button}
              >
                Copy to clipboard
              </Button>
            </CopyToClipboard>
            <Highlight className="">{result}</Highlight>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
        >
          <SnackbarContent
            className={this.props.classes.message}
            aria-describeby="copy notification"
            message={
              <span id="message-id" className={this.props.classes.message}>
                <CheckCircleIcon
                  className={classNames(
                    this.props.classes.icon,
                    this.props.classes.iconVariant
                  )}
                />
                Copied
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={this.props.classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(App);
