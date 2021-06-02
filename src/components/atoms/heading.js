import React from 'react';
import {View, Text} from 'native-base';
import {FONT_SIZE_18, FONT_FAMILY_REGULAR} from '../../styles/typography';
import {LAVINA_BLUE} from '../../styles/colors';

export default function Heading({
  text,
  fontSize = FONT_SIZE_18,
  color = LAVINA_BLUE,
  fontFamily = FONT_FAMILY_REGULAR,
  align = 'center',
  wrapperStyles,
  headingStyles,
}) {
  return (
    <View style={[getWrapperStyles(align), wrapperStyles]}>
      <Text
        style={[getHeadingStyles(fontSize, color, fontFamily), headingStyles]}>
        {text}
      </Text>
    </View>
  );
}

const getWrapperStyles = (align) => {
  return {
    display: 'flex',
    alignItems: align,
  };
};

const getHeadingStyles = (fontSize, color, fontFamily) => {
  return {
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  };
};
