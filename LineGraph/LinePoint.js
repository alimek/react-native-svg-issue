// @flow
import React from 'react';
import { Circle, Text } from 'react-native-svg';
import { LineGraphItem } from './index';

type CirclePropTypes = {
  x: Function,
  y: Function,
  item: LineGraphItem,
  data: Array<LineGraphItem>, // eslint-disable-line
  startColor: string, // eslint-disable-line
  endColor: string, // eslint-disable-line
  index: number,
};

type LinePointPropTypes = {
  show: boolean,
};

const MaxCircle = ({
  x, y, item, index, data, startColor, endColor,
}: CirclePropTypes) => (
  <Circle
    cx={x(index)}
    cy={y(item.value)}
    r={4}
    stroke={index <= data.length / 2 ? startColor : endColor}
    strokeWidth={2}
    fill="white"
  />
);

const MaxTitle = ({
  x, y, item, index,
}: CirclePropTypes) => (
  <Text
    dx={x(index)}
    dy={y(item.value) - 10}
    alignmentBaseline="middle"
    textAnchor="middle"
    stroke="grey"
  >
    {parseFloat(item.value).toFixed(1)}
  </Text>
);

class LinePoint extends React.Component<LinePointPropTypes> {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <React.Fragment>
        <MaxTitle {...this.props} />
        <MaxCircle {...this.props} />
      </React.Fragment>
    );
  }
}

export default LinePoint;
