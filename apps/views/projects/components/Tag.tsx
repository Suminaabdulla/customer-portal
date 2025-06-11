import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FilterTags = ({tagDetails, selectTag, selectedTag}) => {
    return (
        <TouchableOpacity style={selectedTag?.id === tagDetails?.id ? {...styles.container, ...styles.selectedTag} : styles.container} onPress={selectTag}>
            <Text>
                {tagDetails?.name}
            </Text>
        </TouchableOpacity>
    );
};

export default FilterTags;
const styles = StyleSheet.create({
    container: {
        borderRadius:20,
        backgroundColor:'#E4E4E4',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        paddingVertical:10,
        minWidth:55,
        paddingHorizontal:10,
        marginHorizontal: 5,
    },
    selectedTag : {
        backgroundColor:'#b01c1210',
    },

  });
