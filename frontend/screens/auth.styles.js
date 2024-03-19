import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4d8076',
        justifyContent: 'center',
        alignItems: 'center',
      },
      innerCont:{
        width: SIZES.width * 0.9,
        height:SIZES.height * 0.45,
        borderRadius: 20,
        backgroundColor: "#fff",
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 10, // For Android
        position: 'absolute',
      },
      loginCont:{
        width: '80%',
        height: 40,
        backgroundColor: '#4d8076',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        marginHorizontal: 50,
        marginTop: 20,
      },
      loginText:{
        color: '#fff',
        fontSize: 20,
        fontFamily: 'bold',
      },
      login:{
        paddingTop: 20,
        color: '#4d8076',
        fontSize: 30,
        fontFamily: 'bold',
        textAlign: 'center',
      },
      profileImage:{
        width: 90,
        height: 90,
        borderRadius: 999,
        alignSelf: 'center',
        marginTop : -40  
      },
      label:{
        marginHorizontal: 50,
        fontFamily: "regular",
      },
      input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 20,
    
      },
      signup: {
        width: '70%',
        flexDirection: 'row',
        marginTop: 20,
        alignSelf:"center"
      },
      signtext:{
        fontSize:15,
        fontFamily: "regular",
      }
});
    
    
export default styles;