import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableHighlight} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Main, Profile} from '../../screens';
import {LAVINA_BLUE, GRAY, LIGHT} from '../../styles/colors';
import {resetDocsState, setDir} from '../../redux/slices/docs';
import {FONT_SIZE_20} from '../../styles/typography';
import Icon from 'react-native-feather1s';
import {getDocsStoreData} from '../../redux/selectors/docs';

export default function FooterWithTabs(props) {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  const {dir} = useSelector(getDocsStoreData);

  return (
    <Tab.Navigator
      initialRouteName={dir ? dir : 'inbox'}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: LAVINA_BLUE,
        inactiveTintColor: GRAY,
      }}>
      <Tab.Screen
        name="inbox"
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="download"
              style={{color: color, fontSize: FONT_SIZE_20}}
            />
          ),
          tabBarButton: (props) => (
            <TouchableHighlight {...props} underlayColor={LIGHT} />
          ),
          unmountOnBlur: true,
        }}
        listeners={() => ({
          tabPress: (e) => {
            if (dir == 'inbox') {
              e.preventDefault();
            } else {
              dispatch(resetDocsState());
              dispatch(setDir('inbox'));
            }
          },
        })}>
        {() => <Main dirSelected="inbox" {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="outbox"
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              style={{color: color, fontSize: FONT_SIZE_20}}
              name="upload"
            />
          ),
          tabBarButton: (props) => (
            <TouchableHighlight {...props} underlayColor={LIGHT} />
          ),
          unmountOnBlur: true,
        }}
        listeners={() => ({
          tabPress: (e) => {
            if (dir == 'outbox') {
              e.preventDefault();
            } else {
              dispatch(resetDocsState());
              dispatch(setDir('outbox'));
            }
          },
        })}>
        {() => <Main dirSelected="outbox" {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="draft"
        options={{
          tabBarIcon: ({color}) => (
            <Icon style={{color: color, fontSize: FONT_SIZE_20}} name="save" />
          ),
          tabBarButton: (props) => (
            <TouchableHighlight {...props} underlayColor={LIGHT} />
          ),
          unmountOnBlur: true,
        }}
        listeners={() => ({
          tabPress: (e) => {
            if (dir == 'draft') {
              e.preventDefault();
            } else {
              dispatch(resetDocsState());
              dispatch(setDir('draft'));
            }
          },
        })}>
        {() => <Main dirSelected="draft" {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="profile"
        options={{
          tabBarIcon: ({color}) => (
            <Icon style={{color: color, fontSize: FONT_SIZE_20}} name="user" />
          ),
          tabBarButton: (props) => (
            <TouchableHighlight {...props} underlayColor={LIGHT} />
          ),
          unmountOnBlur: true,
        }}
        listeners={() => ({
          tabPress: (e) => {
            if (dir == 'profile') {
              e.preventDefault();
            } else {
              dispatch(resetDocsState());
              dispatch(setDir('profile'));
            }
          },
        })}>
        {() => <Profile {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
