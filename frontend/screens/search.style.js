import {StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../constants"; 


const styles = StyleSheet.create({
    searchContainer:{ 
        justifyContent:"center",
        alignContent:"center",
        flexDirection:"row",
           borderRadius:SIZES.large,
        marginVertical:SIZES.large,
        height:50,
        marginHorizontal:SIZES.small,
        backgroundColor:COLORS.secondary,
    },

    searchIcon:{
        marginHorizontal:10,
        color:COLORS.gray,
        marginTop:SIZES.small
        
    },

    searchWrapper:{
        flex: 1,
        backgroundColor:COLORS.secondary,
        borderRadius:SIZES.small,
        marginRight:SIZES.small,
        marginTop:SIZES.small

    },

    searchInput:{
        fontFamily:"regular",   
        width:"100%",    
        paddingHorizontal:SIZES.small
    }, 

  searchBtn:{
        width:50,
        height:"100%",
        borderRadius:SIZES.large,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:COLORS.primary,
    },

    searchImage: {
        resizeMode: "contain",
        width:SIZES.width-80,
        height:SIZES.height-300,
        opacity:0.9,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      searchIcon: {
        marginRight: 10,
      },
      searchWrapper: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.gray,
        marginRight: 10,
      },
      searchInput: {
        fontSize: SIZES.body3,
      },
      searchBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        padding: 10,
      },
      resultContainer: {
        alignItems: 'center',
      },
      listContentContainer: {
        width: '100%',
        paddingHorizontal: 12,
      },
  
});

export default styles;
