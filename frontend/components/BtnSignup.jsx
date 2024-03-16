import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const BtnSignup = ({title, onPress, isValid, loader}) => {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={styles.btnStyle(isValid ===false? COLORS.gray: COLORS.primary)}
    >
        {loader === false ? (
            <Text style={styles.btnTxt}>{title}</Text>
        ):(
            <ActivityIndicator/>
        )}
    </TouchableOpacity>
  )
}

export default BtnSignup

const styles = StyleSheet.create({
   
    btnStyle: ()=>({
        height:45,
        width:'90%',
        marginVertical:SIZES.xxLarge,
        marginHorizontal:'5%',
        backgroundColor:COLORS.red,
        justfyContent:'center',
        alignItems:'center',
        borderRadius:12
    }),

    btnTxt:{
        fontFamily:'bold',
        color:"#fff",
        fontSize:18,
        marginVertical:10
    },

})