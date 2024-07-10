import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    title: string;
    handlePress: () => void;
    containerStyles?: any;
    textStyles?: any;
    isLoading?: boolean;
};

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''} `}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <Text className={`text-primary text-lg font-psemibold ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton