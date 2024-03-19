import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

const style = StyleSheet.create({
   container:{
      marginBottom:60,
      marginTop:20,
   },
  header: {
    backgroundColor: COLORS.white,
  },
  coverCont:{
    height:SIZES.height*0.37,

  },
  cover: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.primary,
    height:SIZES.height*0.2,
  },
  profilePictureContainer: {
    width: "70%",
    height: 270,
    borderRadius: 20,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: "white"
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
    fontSize: 25,
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  menuItem: {
    marginBottom: 15,
  },
  label: {
    fontFamily: 'regular',
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    fontFamily: 'regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20, 
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
    backgroundColor: COLORS.red, 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20, // Adjust the spacing as needed
    alignItems: "center",
  },
  
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "bold",
  },
});

export default style;
