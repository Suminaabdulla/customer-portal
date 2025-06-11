import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // Import the Icon component

const withAnimatedHeader = (WrappedComponent) => {
  return ({ headerName, headerContent, scrollableContentStyle, ...props }) => {
    const scrollY = useRef(new Animated.Value(0)).current;

    // Interpolate header height and opacity based on scroll position
    const headerHeight = scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [80, 60],
      extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        {/* Animated Header */}
        <Animated.View
          style={[
            styles.header,
            { height: headerHeight, opacity: headerOpacity },
          ]}
        >
          {headerContent ? (
            headerContent
          ) : (
            <>
                   <Image
                  source={{ uri: 'https://naffco.zendesk.com/embeddable/avatars/17178862226333' }}
                  style={styles.profileImage}
                />
            <Text style={styles.headerText}>{headerName ?? 'E-CONNECT NAFFCO'}</Text>


                        </>
          )}
        </Animated.View>

        {/* Wrapped Component with Scrollable content */}
        <Animated.ScrollView
        style={{paddingTop:80}}
          {...props}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false } // Set to false to allow style updates like height and opacity
          )}
          scrollEventThrottle={16} // For smoother scrolling performance
          contentContainerStyle={scrollableContentStyle}
        >
          <WrappedComponent {...props} />
        </Animated.ScrollView>
      </View>
    );
  };
};

export default withAnimatedHeader;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  header: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',  // Ensure the header has a row layout
    alignItems: 'center',  // Center the content vertically

  },
  headerText: {
    color: 'Black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileIcon: {
    marginLeft: 'auto',  // Push the icon to the right side
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },
});
