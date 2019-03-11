import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { IBuildConfig } from '../model';
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
  data: IBuildConfig;

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
  data: IBuildConfig;
  buildStrategy: string;
}
class BuildConfig extends React.Component<IProps, IState> {
  state: IState = {
    data: this.props.data,
    buildStrategy: 'source-to-image'
  };

  onChangeBuildStrategy = (event: any) => {
    this.setState({
      buildStrategy: event.currentTarget.value
    });
  };

  onChangeGitUri = (event: any) => {
    const data = this.state.data;
    data.spec.source.git.uri = event.currentTarget.value;

    this.props.onChange(data);
  };

  onChangeGitRef = (event: any) => {
    const data = this.state.data;
    data.spec.source.git.ref = event.currentTarget.value;

    this.props.onChange(data);
  };

  onChangeDockerfile = (event: any) => {
    const data = this.state.data;
    data.spec.source.dockerfile = event.currentTarget.value;

    this.props.onChange(data);
  };

  renderSourceToImage() {
    if (this.state.buildStrategy === 'source-to-image') {
      return (
        <FormControl
          component={'fieldset' as 'div'}
          className={this.props.classes.root}
        >
          <TextField
            id="git-uri"
            label="Git URI"
            value={this.state.data.spec!.source!.git!.uri}
            onChange={this.onChangeGitUri}
            className={this.props.classes.textField}
            helperText="Git URI"
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="git-ref"
            label="Git Ref"
            value={this.state.data.spec!.source!.git!.ref}
            onChange={this.onChangeGitRef}
            className={this.props.classes.textField}
            helperText="Git Branch or Tag name"
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </FormControl>
      );
    }
  }

  renderDockerfile() {
    if (this.state.buildStrategy === 'dockerfile') {
      return (
        <FormControl
          component={'fieldset' as 'div'}
          className={this.props.classes.root}
        >
          <TextField
            id="dockerfile"
            label="Dockerfile"
            value={this.state.data.spec.source.dockerfile}
            onChange={this.onChangeDockerfile}
            className={this.props.classes.textField}
            multiline={true}
            rows={10}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </FormControl>
      );
    }
  }

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
            value={this.state.buildStrategy}
            // row
          >
            <FormControlLabel
              value="source-to-image"
              control={<Radio color="primary" />}
              label="Source to Image"
              onChange={this.onChangeBuildStrategy}
            />
            <FormControlLabel
              value="dockerfile"
              control={<Radio color="primary" />}
              label="Dockerfile"
              onChange={this.onChangeBuildStrategy}
            />
            <FormControlLabel
              value="custom"
              control={<Radio color="primary" />}
              label="Custom"
              onChange={this.onChangeBuildStrategy}
            />
          </RadioGroup>
        </FormControl>
        {this.renderSourceToImage()}
        {this.renderDockerfile()}
      </div>
    );
  }
}

export default withStyles(styles)(BuildConfig);
