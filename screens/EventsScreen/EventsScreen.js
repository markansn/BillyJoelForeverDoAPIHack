import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { MapView } from "expo";
import { generate } from "shortid";
import PropTypes from "prop-types";
import MapsManager from "../../lib/MapsManager";
import Button from "../../components/Button";
import { Page, Horizontal } from "../../components/Containers";
import {
  BodyText,
  TitleText,
  ErrorText,
  SubtitleText,
  SearchResultTopText,
} from "../../components/Typography";
import Colors from "../../constants/Colors";
import Shadow from "../../lib/Shadow";
import SearchResult from "../../components/SearchResult";
import EventManager from "../../lib/EventManager";

const styles = StyleSheet.create({
  address: {
    marginVertical: 20,
  },
  booking: {
    backgroundColor: Colors.cardBackground,
    marginVertical: 5,
    padding: 20,
    ...Shadow(2),
  },
  bookingHeader: {
    backgroundColor: Colors.accentColor,
    color: Colors.cardBackground,
    marginBottom: 5,
    padding: 20,
    ...Shadow(2),
  },
  bookingList: {
    marginTop: 20,
  },
  cardHeader: {
    borderBottomColor: Colors.dividerLine,
    borderBottomWidth: 0.5,
    marginBottom: 5,
    paddingBottom: 5,
  },
  container: {
    flex: 1,
  },
  coordinatesError: {
    marginBottom: 10,
  },
  details: {
    justifyContent: "space-between",
    marginTop: 20,
  },
  equipmentList: {
    backgroundColor: Colors.cardBackground,
    marginTop: 20,
    padding: 20,
    ...Shadow(2),
  },
  padder: {
    height: 20,
  },
});

const initialRegion = {
  latitude: 51.5246586,
  longitude: -0.1339784,
  latitudeDelta: 0.0012,
  longitudeDelta: 0.0071,
};

class EventsScreen extends Component {
  static navigationOptions = {
    title: "Events at UCL",
  };
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    token: PropTypes.string,
  };
  static defaultProps = {
    token: "",
  };
  static mapStateToProps = state => ({
    token: state.user.token,
  });
  constructor() {
    super();
    this.state = {
      subscribedEvents: [],
      events: [],
      showAll: true,
    };
  }
  
  async saveClub(key, club) {
    subscribeEvents.append(club);
    try {
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error){
        console.log(error.message);
    }
  }

  renderEvent = ({ event }) => {
    if (subscribeEvents.includes(event.club) || showAll) {
      return (
        <SearchResult
            key={event.id}
            topText={event.name}
            bottomText={event.description}
            type="location"
            buttonText="View"
            onPress={this.saveClub(event.id, event.club)}
        />
      );
    }
  };

  fetchEvents = async () => {
    try {
        this.state.events = await EventManager.eventController.getEvents();
    } catch (error){
        console.log(error);
    }
  };

  async onSwitchChange() {
    showAll = !showAll;
  }

  componentDidMount() {
    const { token, navigation } = this.props;
    // const { room } = navigation.state.params;
    // const { roomid, siteid } = room;
    // this.fetchEquipment(token, roomid, siteid);
    // this.fetchRoomBookings(token, roomid, siteid);
    this.fetchEvents();
  }
  
  render() {
    const {
      equipment,
      fetchEquipmentError,
      fetchBookingsError,
      roombookings,
    } = this.state;
    const { room } = this.props.navigation.state.params;
    const {
      roomname: name,
      classification_name: classification,
      capacity,
      location,
    } = room;

    return (
      <View style={styles.container}>
        <Page>
          <TitleText>Events</TitleText>
          <Horizontal>
            <BodyText style={common.flex}>Show all Events</BodyText>
            <Switch 
              onValueChange={() => this.onSwitchChange()}
              value={showAll}
              />
          </Horizontal>
            {events.map(this.renderEvent)}
        </Page>
      </View>
    );
  }
}

export default connect(
  EventsScreen.mapStateToProps,
  () => ({}),
)(EventsScreen);
