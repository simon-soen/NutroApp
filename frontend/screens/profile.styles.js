import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const style = StyleSheet.create({
   container:{
      marginBottom:60,
   },
  header: {
    backgroundColor: COLORS.white,
  },
  cover: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.primary,
    height:200,
  },
  profilePictureContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontFamily: 'bold',
    fontSize: 20,
    color: COLORS.white,
  },
  loginBtn: {
    marginVertical: 10,
    padding: 5,
    backgroundColor: COLORS.lightGray,
    borderRadius: 5,
  },
  email: {
    fontFamily: 'regular',
    fontSize: 16,
    color: COLORS.black,
  },
  profileContainer: {
    paddingHorizontal: 20,
  },
  menuWrapper: {
    marginTop: 20,
  },
  sectionHeader: {
    fontFamily: 'bold',
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: 10,
  },
  menuItem: {
    marginBottom: 15,
  },
  label: {
    fontFamily: 'regular',
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 5,
  },
  input: {
    fontFamily: 'regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  // buttonText: {
  //   fontFamily: 'regular',
  //   fontSize: 16,
  //   color: COLORS.white,
  // },
  deleteButton: {
    backgroundColor: COLORS.red,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: COLORS.red, // Define your preferred background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20, // Adjust the spacing as needed
    alignItems: "center",
  },
  
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default style;
