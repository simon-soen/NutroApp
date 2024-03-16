import { StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../constants";

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SIZES.small, // Fix the typo here
        flexDirection: "row",
        borderRadius: SIZES.small,
        padding: SIZES.medium,
        backgroundColor: "#fff",
        ...SHADOWS. medium,
        shadowColor: COLORS.lightWhite,
       
      },
      

    image:{
       width: 65, 
       backgroundColor:COLORS.secondary,
       borderRadius:SIZES.medium,
       justifyContent:"center",
       alignItems:"center",
    },

    productImg:{
        width:"100%",
        height: 65,
        borderRadius:SIZES.small,
        resizeMode:"cover",
    },

    textContainer:{
        flex:1,
        marginHorizontal:SIZES.medium,
    },

    productTitle:{
        fontSize:SIZES.medium,
        fontFamily:"bold",
        color:COLORS.primary,  
    },

    supplier:{
        fontSize:SIZES.small + 2,
        fontFamily:"regular",
        color:COLORS.gray,   
        marginTop: 3
    },
    quantity:{
        fontSize:SIZES.small + 2,
        fontFamily:"regular",
        color:COLORS.gray,   
        marginTop: 3,
        marginHorizontal: SIZES.small,
    },
    ratingRow:{
        paddingBottom: SIZES.small,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width:SIZES.width - 10 ,
        // top:20
       
       },
       rating:{ 
        top:SIZES.small.large,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginHorizontal:SIZES.large  
       },

        ratingText:{
          color:COLORS.gray,
          fontFamily:"medium",
          paddingHorizontal:SIZES.small
        },
        

}); 

export default styles;
    