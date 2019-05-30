import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  innerEl: {
    margin: 5,
    padding: 3
  },
  welcome: {
    fontSize: 20,
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  postRow: {
    margin: 3,
    padding: 5,
    backgroundColor: '#FF6D00',
    borderRadius: 3,
  },
  postInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  postImage: {
    flex: 1,
    margin: 3,
    width: 40,
    height: 40
  },
  PostText: {
    padding: 5,
    color: '#fff',
    flex: 3
  }
});