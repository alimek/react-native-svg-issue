// @flow
import React from 'react';
import { View } from 'react-native';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import * as shape from 'd3-shape';
import {
  LineChart, Grid, XAxis, YAxis,
} from 'react-native-svg-charts';
import moment from 'moment';

import LinePoint from './LinePoint';

export type LineGraphItem = {
  date: string,
  value: number,
  addedThisDay: boolean,
};

type LineGraphPropTypes = {
  height: number,
  width: number,
  data: Array<LineGraphItem>,
  startColor: string,
  endColor: string,
  gridMin?: number,
  gridMax?: number,
};

class LineGraph extends React.Component<LineGraphPropTypes> {
  static defaultProps = {
    gridMin: null,
    gridMax: null,
  };

  state = {
    ready: false,
  };

  onLayoutChanged = (event) => {
    const {
      nativeEvent: {
        layout: { height },
      },
    } = event;
    if (height === this.props.height) {
      setTimeout(() => this.setState({ ready: true }), 100);
    }
  };

  render() {
    const {
      height, width, data, startColor, endColor, gridMax, gridMin,
    } = this.props;

    const Gradient = () => (
      <Defs key="gradient">
        <LinearGradient
          id="gradient"
          x1="0"
          y="0%"
          x2="100%"
          y2="0%"
        >
          <Stop
            offset="0%"
            stopColor={startColor}
          />
          <Stop
            offset="100%"
            stopColor={endColor}
          />
        </LinearGradient>
      </Defs>
    );

    return (
      <View
        style={{
          height,
          width,
          flexDirection: 'row'
        }}
      >
        <YAxis
          data={data.map(item => parseFloat(item.value))}
          style={{ marginBottom: 20 }}
          contentInset={{
            top: 30,
            bottom: 30,
            left: 20,
            right: 20,
          }}
          svg={{ fontSize: 10, fill: 'grey' }}
          min={gridMin}
          max={gridMax}
          numberOfTicks={4}
        />
        <View style={{
          flex: 1,
          marginLeft: 10,
        }} onLayout={this.onLayoutChanged}>
          <LineChart
            style={{ flex: 1 }}
            data={data.map(value => value.value)}
            contentInset={{
              top: 30,
              bottom: 30,
              left: 20,
              right: 20,
            }}
            svg={{
              strokeWidth: 3,
              stroke: 'url(#gradient)',
            }}
            curve={shape.curveMonotoneX}
            numberOfTicks={4}
            gridMin={gridMin}
            gridMax={gridMax}
          >
            <Grid
              svg={{
                stroke: 'grey',
              }}
            />
            <Gradient />
            {data.map((value, index) => (
              <LinePoint
                key={index.toString()}
                item={value}
                index={index}
                startColor={startColor}
                endColor={endColor}
                show={this.state.ready && value.addedThisDay}
              />
            ))}
          </LineChart>
          <XAxis
            data={data}
            formatLabel={(value, index) => moment(data[index].date).format('DD MMM')}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 10, fill: 'grey' }}
          />
        </View>
      </View>
    );
  }
}

export default LineGraph;
