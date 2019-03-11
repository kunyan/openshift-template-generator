import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { IBuildConfig, IDeploymentConfig } from '../model';
import { FloatProperty } from 'csstype';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

interface IProps {
  classes: Partial<ClassNameMap>;
  data: IDeploymentConfig;

  onChange: (data: IBuildConfig) => void;
}

const styles = (theme: Theme) => ({
  root: {
    display: 'block'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

interface IState {
  data: IDeploymentConfig;
  // buildStrategy: string;
}
class DeploymentConfig extends React.Component<IProps, IState> {
  state: IState = {
    data: this.props.data
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <FormControl
          component={'fieldset' as 'div'}
          className={this.props.classes.formControl}
        >
          <FormLabel component={'legend' as 'label'}>Build Strategy</FormLabel>
          <RadioGroup
            aria-label="Build Strategy"
            name="buildStrategy"
            // row
          >
            <FormControlLabel
              value="source-to-image"
              control={<Radio color="primary" />}
              label="Source to Image"
            />
            <FormControlLabel
              value="dockerfile"
              control={<Radio color="primary" />}
              label="Dockerfile"
            />
            <FormControlLabel
              value="custom"
              control={<Radio color="primary" />}
              label="Custom"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(DeploymentConfig);
