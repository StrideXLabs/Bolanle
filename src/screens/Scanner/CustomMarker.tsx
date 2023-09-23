import React from 'react';
import {View} from 'react-native';

const CustomMarker = () => {
  const markerSize = 300; // Adjust the size of the marker as needed
  const cornerSize = 30; // Adjust the size of the corners as needed
  const cornerThickness = 4; // Adjust the thickness of the corners as needed
  const cornerColor = 'white'; // Adjust the color of the corners as needed
  const markerColor = 'rgba(0, 0, 0, 0.2)'; // Adjust the color of the marker as needed

  return (
    <View
      style={{
        width: markerSize,
        height: markerSize,
        position: 'relative',
        backgroundColor: markerColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* Top Left Corner */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: cornerSize,
          height: cornerThickness,
          backgroundColor: cornerColor,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: cornerThickness,
          height: cornerSize,
          backgroundColor: cornerColor,
        }}
      />

      {/* Top Right Corner */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: cornerSize,
          height: cornerThickness,
          backgroundColor: cornerColor,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: cornerThickness,
          height: cornerSize,
          backgroundColor: cornerColor,
        }}
      />

      {/* Bottom Left Corner */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: cornerSize,
          height: cornerThickness,
          backgroundColor: cornerColor,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: cornerThickness,
          height: cornerSize,
          backgroundColor: cornerColor,
        }}
      />

      {/* Bottom Right Corner */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: cornerSize,
          height: cornerThickness,
          backgroundColor: cornerColor,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: cornerThickness,
          height: cornerSize,
          backgroundColor: cornerColor,
        }}
      />
    </View>
  );
};

export default CustomMarker;
