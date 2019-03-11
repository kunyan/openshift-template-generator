import React from 'react';
import { render } from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import yaml from 'js-yaml';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ITemplate, IBuildConfigSpec, IBuildConfig } from './model';
import App from './containers/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d32f2f'
    },
    secondary: {
      main: '#1976d2'
    }
  },
  typography: {
    useNextVariants: true
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
const template: ITemplate = {
  apiVersion: 'v1',
  kind: 'Template',
  objects: [buildConfig]
};

// console.log(yaml.safeDump(template))
render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
