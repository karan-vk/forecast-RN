import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Text } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions/index";

import FeedScreen from "./main/Feed";

const Tab = createBottomTabNavigator();

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
    // fetchUser();
  }
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={FeedScreen} />
      </Tab.Navigator>
    );
  }
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Main);
