import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#fff",
    
    },
    innerContainer:{
    backgroundColor: "#ADD8E6",
    width: SIZES.width*0.7,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    },
    title: {
    fontSize: 24,
    fontFamily: "bold",
    marginBottom: 20,
    },
    input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    },
    // button: {
    // width: "100%",
    // height: 40,
    // backgroundColor: COLORS.red,
    // borderRadius: 5,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 10,
    // },
    buttonText: {
    color: "white",
    fontFamily: "bold",
    },
    label:{
        fontFamily:'regular',
        fontSize: SIZES.small,
        marginBottom:5,
        marginEnd:5,
        textAlign:'right',
        color:COLORS.words,
    },
    inputWrapper: {
        borderColor: "#ccc",
        backgroundColor:COLORS.lightWhite,
        borderWidth:1, 
        height:40,
        borderRadius:5,
        flexDirection:'row',            
        paddingHorizontal:10,
        alignItems:'center', 
        marginBottom: 10,
    },
    iconStye:{
        marginRight:10,
    },
    errorMessage:{
        color:COLORS.red,
        fontFamily:'regular',
        marginTop:5,
        marginLeft:5,
        fontSize:SIZES.xSmall,
    },
    registrations:{
        marginTop:SIZES.xxLarge*1.3,
        marginRight:SIZES.xxLarge*1.5,
        textAlign:'center',
        color:COLORS.words,
        fontFamily: "regular",
        fontSize:SIZES.large,
    }
});
    
    
export default styles;