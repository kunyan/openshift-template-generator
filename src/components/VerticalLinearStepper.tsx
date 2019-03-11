import React from 'react';
import { withStyles, StyleRules, Theme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => ({
  root: {
    width: '90%'
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});
interface IProps {
  classes: Partial<ClassNameMap>;
  activeStep: number;
  steps: string[];
  skipped: Set<number>;
}

interface IState {
  activeStep: number;
}
class VerticalLinearStepper extends React.Component<IProps> {
  state: IState = {
    activeStep: this.props.activeStep
  };
  isStepSkipped(step: number) {
    return this.props.skipped.has(step);
  }

  getSteps() {
    return ['BuildConfig', 'DeploymentConfig', 'Route', 'Secret', 'ConfigMap'];
  }

  renderSteps() {
    return this.props.steps.map((label: string, index: number) => (
      <Step key={label} completed={this.isStepSkipped(this.state.activeStep)}>
        <StepLabel
          optional={<Typography variant="caption">Optional</Typography>}
        >
          {label}
        </StepLabel>
      </Step>
    ));
  }

  render() {
    return (
      <div>
        <Stepper activeStep={this.state.activeStep} orientation="vertical">
          {this.renderSteps()}
        </Stepper>
      </div>
    );
  }
}

export default withStyles(styles)(VerticalLinearStepper);
